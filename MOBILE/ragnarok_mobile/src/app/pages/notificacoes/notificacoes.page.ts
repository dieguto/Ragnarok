import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import {ChatService} from '../../services/chat/chat.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';
import { NotificacoesInfModalPage } from '../notificacoes-inf-modal/notificacoes-inf-modal.page';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss','../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class NotificacoesPage implements OnInit {

  notificacoes:[];
  url =  environment.url;
  constructor(
    private socket: Socket, 
    private chatService:ChatService, 
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController) { }

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
  
      this.carregarNotificacoes();
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

  async presentActionSheet(id_anuncio, id_chat){
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      buttons: [{
        text: 'Rejeitar troca',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.excluirChat(id_chat);
          this.carregarNotificacoes();
        }
      }, {
        text: 'Ver informações',
        icon: 'eye',
        handler: () => {
          this.anuncios(id_anuncio);
        }
      }, {
        text: 'Aceitar troca',
        icon: 'checkmark',
        handler: () => {
          this.aceitarChat(id_chat);

        }
      },{
        text: 'fechar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  async anuncios(id_usuario){
    console.log(id_usuario);
    let modal = await this.modalCtrl.create({
      component : NotificacoesInfModalPage,
      componentProps: {id_usuario:id_usuario}

    });

    return await modal.present();
  }


}
