import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { StorageKeysEnums } from 'src/app/enums/StorageKeys.enums';
import { Mentor } from 'src/app/models/Mentor';
import { ArquivoProcad, ArtefatoCras, RecadastramentoCamaragibe, VisitaRecadastramento } from 'src/app/models/Modelo';
import { servico } from 'src/app/models/Servico';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
    selector: 'app-detalhe-pessoa',
    templateUrl: './detalhe-pessoa.page.html',
    styleUrls: ['./detalhe-pessoa.page.scss'],
})
export class DetalhePessoaPage {
    objVisita = servico.visita
    usuarioLogado = servico.usuarioLogado
    arquivo = servico.arquivo;
    arquivos = [];
    filesArr: ArtefatoCras[] = [];
    codigoArquivo: any;

    constructor(private loadingService: LoadingService) {

    }

    async ionViewDidEnter() {
        await this.loadingService.present();
        const location = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true
        });
        this.objVisita.latitude = location.coords.latitude.toString();
        this.objVisita.longitude = location.coords.longitude.toString();
        this.loadingService.dismiss();
    }

    finalizarVisita() {
        const recadastrado = this.objVisita.visitado;
        recadastrado.flagRecadastrado = 1;
        const pessoa = new RecadastramentoCamaragibe(recadastrado);

        const visita = new VisitaRecadastramento(this.objVisita);
        visita.responsavelVisita = this.usuarioLogado;
        visita.flagConcluido = 1;
        console.log('visita.arquivo', visita.arquivos);
        console.log('arquivos', this.arquivo);
        visita.arquivos = [this.arquivo];

        console.log('pessoa', pessoa);

        pessoa.visitas.push(visita);

        const recadastramento = Mentor.rodaTransacaoFromObjeto(2003, 'objRecadastramento', pessoa, true);

        console.log('recadastramento', recadastramento);
        //Mentor.rodaTransacaoFromObjeto(1997, 'objIpojuca2026', this.objVisita, true);
    }

    async handleOpenCamera(documentName: string) {
        try {
            const cameraResults: Photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera,
            });

            const image = "data:image/jpeg;base64," + cameraResults.base64String;

            var artefato: ArtefatoCras = new ArtefatoCras(null)
            artefato.base64 = image;
            this.filesArr.push(artefato);

            const arquivo = new ArquivoProcad(null);
            arquivo.nome = documentName + new Date().getTime();
            arquivo.flagUploadArquivo = 1;
            

            const arquivoUpado = Mentor.rodaTransacaoFromObjeto(2007, 'objArquivo', arquivo, true);
            console.log('arquivoUpado', arquivoUpado['ArquivoProcad']);
            this.arquivo = arquivoUpado['ArquivoProcad'];


            const file = await this.photoToFile(cameraResults);

            console.log('file', file);

            const formData = new FormData();
            formData.append('transacaoMentor', '244');
            formData.append('classe', 'br.com.assistenciaSocial.beans.ArquivoProcad');
            formData.append('tipo', 'Arquivo');
            formData.append('id', String(this.codigoArquivo));
            formData.append('codigo', String(this.codigoArquivo));
            formData.append('parametrosExtra', '');
            formData.append('arquivo', file);

            const xhr = new XMLHttpRequest();

            xhr.open(
                'POST',
                'https://camaragibe.conectasuas.com.br/assistenciaSocial/jsp/uploadArquivoProcad.jsp',
                true
            );

            xhr.onload = () => {
                console.log('Resposta:', xhr.responseText);
            };

            xhr.onerror = () => {
                console.error('Erro no upload' + xhr.status);
            };
            xhr.send(formData);

        } catch (error) {
            console.error(error);
        }
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


    async photoToFile(photo: Photo): Promise<File> {
        const blob = this.base64ToBlob(photo.base64String!, 'image/jpeg');

        return new File(
            [blob],
            this.arquivos[0].nome.toString(),
            { type: 'image/jpeg' }
        );
    }
}
