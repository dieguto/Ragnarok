import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import {ChatService} from '../../services/chat/chat.service';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss','../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class NotificacoesPage implements OnInit {

  notificacoes:[];
  url =  environment.url;
  constructor(private socket: Socket, private chatService:ChatService) { }

  ngOnInit() {
      this.socket.emit('get_notificacoes');

      this.socket.on("notificacoes", notificacoes =>{
        console.log(notificacoes);
        this.notificacoes = notificacoes;
      })
      
  }


  async aceitarChat(id_chat){
    console.log(id_chat);
    // try {
      const result = await this.chatService.ativarChat(id_chat);

      console.log(result);
    // } catch (error) {
      
      // console.log(error);
    // }
  }

}
