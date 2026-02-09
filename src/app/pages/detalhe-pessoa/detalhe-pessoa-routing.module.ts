import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhePessoaPage } from './detalhe-pessoa.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhePessoaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhePessoaPageRoutingModule {}
