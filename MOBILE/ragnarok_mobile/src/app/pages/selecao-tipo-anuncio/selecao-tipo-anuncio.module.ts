import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelecaoTipoAnuncioPage } from './selecao-tipo-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: SelecaoTipoAnuncioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelecaoTipoAnuncioPage]
})
export class SelecaoTipoAnuncioPageModule {}
