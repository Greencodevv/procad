import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Mentor } from 'src/app/models/Mentor';
import { ArquivoProcad, ArtefatoCras, RecadastramentoCamaragibe, VisitaRecadastramento } from 'src/app/models/Modelo';
import { servico } from 'src/app/models/Servico';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
    selector: 'app-detalhe-pessoa',
    templateUrl: './detalhe-pessoa.page.html',
    styleUrls: ['./detalhe-pessoa.page.scss'],
})
export class DetalhePessoaPage {
    objVisita = servico.visita
    listaStatus = new VisitaRecadastramento(null).flagConcluidoFormatadoLista;
    listaObsOpcoes = new VisitaRecadastramento(null).obsOpcoesFormatadoLista;
    usuarioLogado = servico.usuarioLogado
    arquivo: ArquivoProcad = null;
    arquivos = [];
    filesArr: ArtefatoCras[] = [];

    constructor(private loadingService: LoadingService, private router: Router, private toastService: ToastService) {
        // Força o usuário a escolher o status antes de salvar
        this.objVisita.flagConcluido = null;
    }

    async ionViewDidEnter() {
        try {
            await this.loadingService.present();
            const location = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000
            });
            this.objVisita.latitude = location.coords.latitude.toString();
            this.objVisita.longitude = location.coords.longitude.toString();
        } catch (error) {
            console.error(error);
            this.toastService.showToast({ message: 'Não foi possível obter a localização. Verifique o GPS e a permissão.' });
        } finally {
            this.loadingService.dismiss();
        }
    }

    converteValor(ev: any) {
        this.objVisita.visitado.flagNaoUnipessoalSimNao = ev.detail.value === 1 ? 1 : 0;
    }

    async finalizarVisita() {
        if (this.objVisita.flagConcluido == null) {
            this.toastService.showToast({ message: 'Status da visita é obrigatório' });
            return;
        }
        if (!this.arquivo) {
            this.toastService.showToast({ message: 'Adicione a foto da visita antes de salvar' });
            return;
        }

        try {
            await this.loadingService.present();
            const recadastrado = this.objVisita.visitado;
            const visita = new VisitaRecadastramento(this.objVisita);
            visita.responsavelVisita = this.usuarioLogado;
            visita.flagConcluido = this.objVisita.flagConcluido;
            recadastrado.flagRecadastrado = this.objVisita.flagConcluido;
            visita.arquivos = [this.arquivo];
            const pessoa = new RecadastramentoCamaragibe(recadastrado);
            pessoa.visitas.push(visita);

            const recadastramento = Mentor.rodaTransacaoFromObjeto(2003, 'objRecadastramento', pessoa, true);
            if (!recadastramento) {
                throw new Error('Retorno vazio ao salvar a visita');
            }

            // A visita já está salva: se a numeração falhar, avisa sem pedir para salvar de novo
            const numeroOrdem = this.geraNumeroOrdem(visita.codigo);
            if (numeroOrdem == null) {
                this.toastService.showToast({ message: 'Visita salva, mas não foi possível gerar o número de ordem.' });
                this.router.navigate(['/inicio']);
                return;
            }

            this.toastService.showToast({ message: `Número de ordem ${numeroOrdem}!`, cssClass: 'toast-success' });
            this.router.navigate(['/inicio']);
        } catch (error) {
            console.error(error);
            this.toastService.showToast({ message: 'Não foi possível salvar a visita. Tente novamente.' });
        } finally {
            this.loadingService.dismiss();
        }
    }

    // O número é gerado no servidor (sequência do banco) para ser único entre todos os aparelhos
    geraNumeroOrdem(codigoVisita: number): number | null {
        if (!codigoVisita) {
            return null;
        }
        try {
            const retornoJsp: any = Mentor.bind(
                'codigoVisita=' + codigoVisita,
                'jsp/appProcad/numeroOrdem.jsp',
                'POST'
            );
            const retorno = JSON.parse(retornoJsp);
            if (retorno.erro || retorno.numeroOrdem == null) {
                console.error('Erro ao gerar numeroOrdem:', retorno.erro);
                return null;
            }
            return retorno.numeroOrdem;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async handleOpenCamera(documentName: string) {
        let cameraResults: Photo;
        try {
            cameraResults = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera,
            });
        } catch (error) {
            // Usuário cancelou a câmera ou negou a permissão
            console.error(error);
            return;
        }

        try {
            await this.loadingService.present({ message: 'Enviando foto' });

            const arquivo = new ArquivoProcad(null);
            arquivo.nome = documentName + "_" + this.objVisita.visitado.nome;
            arquivo.flagUploadArquivo = 1;

            const arquivoUpado = Mentor.rodaTransacaoFromObjeto(2007, 'objArquivo', arquivo, true);
            const arquivoProcad = arquivoUpado['ArquivoProcad'];

            const file = this.photoToFile(cameraResults, arquivoProcad.nome.toString());

            const formData = new FormData();
            formData.append('transacaoMentor', '244');
            formData.append('classe', 'br.com.assistenciaSocial.beans.ArquivoProcad');
            formData.append('tipo', 'Arquivo');
            formData.append('id', String(arquivoProcad.codigo));
            formData.append('codigo', String(this.usuarioLogado.codigo));
            formData.append('parametrosExtra', '');
            formData.append('arquivo', file);

            await this.enviaArquivo(formData);

            // Só libera o "Salvar Visita" depois que o upload foi confirmado pelo servidor
            this.arquivo = arquivoProcad;
            const artefato: ArtefatoCras = new ArtefatoCras(null);
            artefato.base64 = "data:image/jpeg;base64," + cameraResults.base64String;
            this.filesArr.push(artefato);
        } catch (error) {
            console.error(error);
            this.arquivo = null;
            this.toastService.showToast({ message: 'Não foi possível enviar a foto. Tente novamente.' });
        } finally {
            this.loadingService.dismiss();
        }
    }

    enviaArquivo(formData: FormData): Promise<void> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(
                'POST',
                'https://abreuelima.conectasuas.com.br/assistenciaSocial/uploadProcad',
                true
            );

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve();
                } else {
                    reject(new Error('Erro no upload: ' + xhr.status + ' ' + xhr.responseText));
                }
            };

            xhr.onerror = () => reject(new Error('Falha de rede no upload'));
            xhr.send(formData);
        });
    }

    base64ToBlob(base64: string, contentType = '', sliceSize = 512): Blob {
        const byteCharacters = atob(base64);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    goBack() {
        this.router.navigate(['/inicio']);
    }


    photoToFile(photo: Photo, nome: string): File {
        const blob = this.base64ToBlob(photo.base64String!, 'image/jpeg');

        return new File(
            [blob],
            nome,
            { type: 'image/jpeg' }
        );
    }
}
