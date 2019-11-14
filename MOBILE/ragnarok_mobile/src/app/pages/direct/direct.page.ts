import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-direct',
  templateUrl: './direct.page.html',
  styleUrls: ['./direct.page.scss', '../classes_padrao_scss/formatacao.scss'],
})
export class DirectPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async showModalChat(){
    
    let modal = await this.modalCtrl.create({
      component : ChatPage,
      componentProps: {idade: "5"}
    });

    return await modal.present();
  }

}
