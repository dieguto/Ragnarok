import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsuarioEditJogosModalPage } from './usuario-edit-jogos-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioEditJogosModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class UsuarioEditJogosModalPageModule {}
