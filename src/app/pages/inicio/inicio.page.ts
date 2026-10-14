import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Mentor } from 'src/app/models/Mentor';
import { servico } from 'src/app/models/Servico';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  visitas = servico.visitas;

  constructor(private router: Router) {
    // Dentro das tabs o ionViewDidEnter não dispara ao voltar do detalhe, então recarrega a cada navegação para /inicio
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd && e.urlAfterRedirects.startsWith('/inicio')),
      takeUntilDestroyed()
    ).subscribe(() => this.carregarVisitas());
  }

  carregarVisitas() {
    const retornoJsp: any = Mentor.bind(
      'codigoEntrevistador=' + servico.usuarioLogado.codigo,
      'jsp/appProcad/ctrl.jsp',
      'POST'
    );
    const objJsp = JSON.parse(retornoJsp);
    this.visitas = JSON.parse(objJsp['visitas']);
    console.log('Visitas:', this.visitas);
  }

  navegaParaLogin() {
    this.router.navigate(['/login']);
  }

  abrirDetalhe(visitaSelecionada: any) {
    if (visitaSelecionada.obs == "null") {
      visitaSelecionada.obs = '';
    }
    servico.visita = visitaSelecionada;
    this.router.navigate(['/detalhe-pessoa']);
  }
}
