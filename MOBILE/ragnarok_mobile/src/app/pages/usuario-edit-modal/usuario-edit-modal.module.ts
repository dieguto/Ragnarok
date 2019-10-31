import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {NgxMaskIonicModule} from 'ngx-mask-ionic'
import { IonicModule, IonSlides, IonSlide } from '@ionic/angular';

import { UsuarioEditModalPage } from './usuario-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioEditModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMaskIonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuarioEditModalPage]
})
export class UsuarioEditModalPageModule {}
