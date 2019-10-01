import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroAnuncioPage } from './cadastro-anuncio.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroAnuncioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroAnuncioPage]
})
export class CadastroAnuncioPageModule {}
