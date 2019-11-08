import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsuarioEditConsoleModalPage } from './usuario-edit-console-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioEditConsoleModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuarioEditConsoleModalPage]
})
export class UsuarioEditConsoleModalPageModule {}
