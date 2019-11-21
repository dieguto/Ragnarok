import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, IonContent } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss', '../classes_padrao_scss/formatacao.scss'],
})
export class ChatPage implements OnInit {

  constructor(private socket: Socket,private modalCtrl: ModalController, private navParam : NavParams) { }
  infoChat:String;
  id_chat: Number;
  url =  environment.url;
  @ViewChild(IonContent, {static:false}) ionContent: IonContent;

  ngOnInit() {
    
    var mensagens = (<HTMLInputElement>document.getElementById('mensagens'));
    mensagens.innerHTML =  "";
    
    this.socket.emit("sair_chat");

    this.socket.removeAllListeners("iniciou");

    this.socket.removeAllListeners("mensagens_anteriores");

    this.socket.removeAllListeners("nova_mensagem");

    this.id_chat = this.navParam.get('id_chat');

    console.log();

    const opcoes_chat = {
      id_chat: this.id_chat
    }

    this.socket.emit("iniciar_chat", opcoes_chat)

    this.socket.on("iniciou", info_chat => {
      this.infoChat = info_chat;
    })

    this.socket.on('mensagens_anteriores', mensagens => {
      console.log(mensagens);
      for (let mensagem of mensagens){
        this.carregarMensagem(mensagem)
     }
   })
  //  this.ionContent.scrollToBottom(500);
      // ();

   this.socket.on('nova_mensagem', mensagem => {
    mensagem.is_para_usuario = true;
    this.carregarMensagem(mensagem);
 })

  }

  enviarMensagem(){
    
    var txt_mensagem = (<HTMLInputElement>document.getElementById('txt_mensagem'));

    const msg = txt_mensagem.value;

    const mensagem = {
        id_chat: this.id_chat,
        mensagem: msg
    };
    
    this.socket.emit('mensagem', mensagem);

    const mensagem_a_ser_carregada = {
      mensagem: msg,
      is_para_usuario: false
    }

    txt_mensagem.value = "";
    
    this.carregarMensagem(mensagem_a_ser_carregada)
  }

   ionViewWillEnter() {
    var mensagens = (<HTMLInputElement>document.getElementById('mensagens'));
    mensagens.innerHTML =  "";
}

  carregarMensagem(mensagem){
    var mensagens = (<HTMLInputElement>document.getElementById('mensagens'));

    if(mensagem.is_para_usuario === true){
      mensagens.innerHTML += `<div style="width:100vw; min-height: 10vh; overflow: auto; float:right; background-color:gray; display: inline-block">
        ${mensagem.mensagem}
      </div>`;
    } else if(mensagem.is_para_usuario === false) {
      mensagens.innerHTML += `<div style="width:100vw; min-height: 10vh; overflow: auto; float:left; background-color:green; display: inline-block">
        ${mensagem.mensagem}
      </div>`;

    }

    mensagens.scrollBy(0, 500);

    // mensagens.scrol

  }
  async closeModal(){
    // this.socket.emit("sair_chat");

    // this.socket.removeAllListeners("iniciou");

    // this.socket.removeAllListeners("mensagens_anteriores");

    // this.socket.removeAllListeners("nova_mensagem");

    this.modalCtrl.dismiss();
  }

}
