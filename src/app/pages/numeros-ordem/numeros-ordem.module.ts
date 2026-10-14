import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NumerosOrdemPageRoutingModule } from './numeros-ordem-routing.module';

import { NumerosOrdemPage } from './numeros-ordem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NumerosOrdemPageRoutingModule
  ],
  declarations: [NumerosOrdemPage]
})
export class NumerosOrdemPageModule {}
