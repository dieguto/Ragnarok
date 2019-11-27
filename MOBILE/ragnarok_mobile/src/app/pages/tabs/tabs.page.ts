import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  total:number;
  constructor(private socket: Socket) {

  }

  ngOnInit(){
    

    console.log("entrei no setime");
    this.socket.emit('get_tnnv');

    this.socket.on('tnnv', notificacoes =>{

      console.log('eu sou a notificacao',notificacoes);
      this.total = notificacoes; 
    });    



    this.socket.on('notificacao', notificacao =>{ 
      alert(notificacao.info);
      this.socket.emit('get_notificacoes');
    })    

    this.socket.on('erro', erro =>{ 
      alert("ERRO: " + erro);
    })


  }

}