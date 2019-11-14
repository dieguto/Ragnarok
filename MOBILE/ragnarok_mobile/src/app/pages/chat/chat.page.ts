import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss', '../classes_padrao_scss/formatacao.scss'],
})
export class ChatPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

    // this.socket.connect();;
  }

  
  async closeModal(){
    this.modalCtrl.dismiss();
  }

}
