import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Mentor } from 'src/app/models/Mentor';
import { servico } from 'src/app/models/Servico';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

interface OrdemVisita {
  codigoVisita: number;
  numeroOrdem: number;
  dataVisita: string;
  nome: string;
  endereco: string;
}

@Component({
  selector: 'app-numeros-ordem',
  templateUrl: './numeros-ordem.page.html',
  styleUrls: ['./numeros-ordem.page.scss'],
})
export class NumerosOrdemPage {
  ordens: OrdemVisita[] = [];
  carregou = false;

  constructor(private router: Router, private loadingService: LoadingService, private toastService: ToastService) {
    // Dentro das tabs o ionViewDidEnter não é confiável ao voltar de fora das abas, então recarrega a cada navegação
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd && e.urlAfterRedirects.startsWith('/numeros-ordem')),
      takeUntilDestroyed()
    ).subscribe(() => this.carregarOrdens());
  }

  async carregarOrdens() {
    try {
      await this.loadingService.present();
      const retornoJsp: any = Mentor.bind(
        'codigoEntrevistador=' + servico.usuarioLogado.codigo,
        'jsp/appProcad/numerosOrdemVisitas.jsp',
        'POST'
      );
      const retorno = JSON.parse(retornoJsp);
      if (retorno.erro) {
        throw new Error(retorno.erro);
      }
      this.ordens = retorno.ordens || [];
    } catch (error) {
      console.error(error);
      this.toastService.showToast({ message: 'Não foi possível carregar os números de ordem.' });
    } finally {
      this.carregou = true;
      this.loadingService.dismiss();
    }
  }
}
