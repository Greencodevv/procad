import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mentor } from 'src/app/models/Mentor';
import { servico } from 'src/app/models/Servico';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  visitas = servico.visitas;
  usuarioLogadoCodigo = servico.usuarioLogado.codigo;

  constructor(private router: Router) { }

  async ionViewDidEnter() {
    const retornoJsp: any = Mentor.bind(
      'codigoEntrevistador=' + this.usuarioLogadoCodigo,
      'jsp/appProcad/ctrl.jsp',
      'POST'
    );
    const objJsp = JSON.parse(retornoJsp);
    this.visitas = JSON.parse(objJsp['visitas']);
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
