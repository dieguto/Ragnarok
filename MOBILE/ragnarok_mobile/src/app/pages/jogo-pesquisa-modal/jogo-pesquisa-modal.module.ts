import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JogoPesquisaModalPage } from './jogo-pesquisa-modal.page';

const routes: Routes = [
  {
    path: '',
    component: JogoPesquisaModalPage
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
export class JogoPesquisaModalPageModule {}
