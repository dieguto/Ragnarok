import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import {ChatService} from '../../services/chat/chat.service';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss','../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class NotificacoesPage implements OnInit {

  notificacoes:[];
  url =  environment.url;
  constructor(private socket: Socket, private chatService:ChatService, private modalCtrl: ModalController) { }

  ngOnInit() {
      this.carregarNotificacoes();

      this.socket.on("notificacoes", notificacoes =>{
        console.log(notificacoes);
        this.notificacoes = notificacoes;
      })
      
  }


  async aceitarChat(id_chat){
    // Aceitando chat 
      console.log(id_chat);
      const result = await this.chatService.ativarChat(id_chat);
      console.log(result);
      console.log('eu sou o result', result);
      // Abrindo chat para conversa 
      let modal = await this.modalCtrl.create({
        component : ChatPage,
        componentProps: {id_chat: id_chat}
      });
  
      return await modal.present();
  }

  async excluirChat(id_chat){
    console.log(id_chat);
    const result = await this.chatService.deletarChat(id_chat);

    console.log(result);
    this.carregarNotificacoes();


  }

  carregarNotificacoes(){
   this.socket.emit('get_notificacoes');
   return;
  }

}
