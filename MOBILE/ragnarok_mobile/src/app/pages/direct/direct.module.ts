import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DirectPage } from './direct.page';
import { ChatPage } from '../chat/chat.page';

const routes: Routes = [
  {
    path: '',
    component: DirectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DirectPage, ChatPage],
  entryComponents: [ChatPage]
})
export class DirectPageModule {}
