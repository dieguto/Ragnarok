import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PesquisarJogosPage } from './pesquisar-jogos.page';

const routes: Routes = [
  {
    path: '',
    component: PesquisarJogosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PesquisarJogosPage]
})
export class PesquisarJogosPageModule {}
