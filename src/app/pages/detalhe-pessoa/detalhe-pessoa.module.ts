import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetalhePessoaPageRoutingModule } from './detalhe-pessoa-routing.module';
import { DetalhePessoaPage } from './detalhe-pessoa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhePessoaPageRoutingModule
  ],
  declarations: [DetalhePessoaPage]
})
export class DetalhePessoaPageModule {}
