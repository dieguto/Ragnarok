import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { UsuarioPageRoutingModule } from './usuario.router.module';
import { UsuarioPage } from './usuario.page';
import { UsuarioEditModalPage } from '../usuario-edit-modal/usuario-edit-modal.page';
import { UsuarioEditJogosModalPage } from '../usuario-edit-jogos-modal/usuario-edit-jogos-modal.page';
import { UsuarioEditConsoleModalPage } from '../usuario-edit-console-modal/usuario-edit-console-modal.page';


const routes: Routes = [
  {
    path: '',
    component: UsuarioPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    UsuarioPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuarioPage, UsuarioEditModalPage, UsuarioEditJogosModalPage, UsuarioEditConsoleModalPage],
  entryComponents: [UsuarioEditModalPage, UsuarioEditJogosModalPage, UsuarioEditConsoleModalPage]
})
export class UsuarioPageModule {}
