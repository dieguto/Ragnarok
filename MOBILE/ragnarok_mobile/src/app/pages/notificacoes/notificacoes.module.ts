import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotificacoesPage } from './notificacoes.page';
import { ChatPage } from '../chat/chat.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacoesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificacoesPage],
  entryComponents: []
})
export class NotificacoesPageModule {}
