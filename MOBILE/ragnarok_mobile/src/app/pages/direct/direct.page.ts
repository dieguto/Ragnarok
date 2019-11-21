import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-direct',
  templateUrl: './direct.page.html',
  styleUrls: ['./direct.page.scss', '../classes_padrao_scss/formatacao.scss'],
})
export class DirectPage implements OnInit {

  constructor(private socket: Socket, private modalCtrl: ModalController) { }
  chats: [];
  url =  environment.url;
  ngOnInit() {
    this.socket.emit("sair_chat");

    this.socket.removeAllListeners("iniciou");

    this.socket.removeAllListeners("mensagens_anteriores");

    this.socket.removeAllListeners("nova_mensagem");
   
    
    // this.socket.connect();;
    this.socket.emit('get_chats');

    this.socket.on('chats', info_chats => {
      this.chats = info_chats;
      console.log(info_chats);     
   });

  }

  async showModalChat(id_chat){
    console.log(id_chat);
    let modal = await this.modalCtrl.create({
      component : ChatPage,
      componentProps: {id_chat: id_chat}
    });

    return await modal.present();
  }

}
