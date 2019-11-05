import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { UsuarioPageRoutingModule } from './usuario.router.module';
import { UsuarioPage } from './usuario.page';
import { UsuarioEditModalPage } from '../usuario-edit-modal/usuario-edit-modal.page';


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
  declarations: [UsuarioPage, UsuarioEditModalPage],
  entryComponents: [UsuarioEditModalPage]
})
export class UsuarioPageModule {}
