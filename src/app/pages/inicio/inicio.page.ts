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

  constructor(private router: Router) { }

  async ionViewDidEnter() {
    const retornoJsp: any = Mentor.bind(
        'codigoEntrevistador=' + servico.usuarioLogado.codigo,
        'jsp/appProcad/ctrl.jsp',
        'POST'
      );
    const objJsp = JSON.parse(retornoJsp);
    this.visitas = JSON.parse(objJsp['visitas']);
  }

  abrirDetalhe(visitaSelecionada: any) {
    servico.visita = visitaSelecionada;
    this.router.navigate(['/detalhe-pessoa']);
  }
}
