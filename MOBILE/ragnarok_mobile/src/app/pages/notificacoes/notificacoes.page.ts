import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss','../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class NotificacoesPage implements OnInit {

  notificacoes:[];
  url =  environment.url;
  constructor(private socket: Socket) { }

  ngOnInit() {
      this.socket.emit('get_notificacoes');

      this.socket.on("notificacoes", notificacoes =>{
        console.log(notificacoes);
        this.notificacoes = notificacoes;
      })
      
  }

}
