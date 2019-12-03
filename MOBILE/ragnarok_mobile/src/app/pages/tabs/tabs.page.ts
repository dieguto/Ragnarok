import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {  Plugins, LocalNotificationScheduleResult, LocalNotificationPendingList } from '@capacitor/core';


// private pushNotification:PushNotification, private modals:ModalsPlugin
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  total:number;
  notifs: LocalNotificationScheduleResult;
pendingNotifs: LocalNotificationScheduleResult;
teste: LocalNotificationPendingList;
  constructor(private socket: Socket ) {

  }

 async ngOnInit(){

    await Plugins.LocalNotifications.requestPermissions();

    try {
      Plugins.LocalNotifications.registerActionTypes({
        types: [
          {
            id: 'OPEN_PRODUCT',
            actions: [
              {
                id: 'view',
                title: 'Abrir',
              }
            ]
          }
        ]
      });

      this.socket.emit('get_tnnv');

      this.socket.on('tnnv', notificacoes =>{
  
        console.log('eu sou a notificacao',notificacoes);
        this.total = notificacoes;
      });
  
  
  
      this.socket.on('notificacao', notificacao =>{
        // alert(notificacao.info);
        this.socket.emit('get_notificacoes');
        this.scheduleNow(notificacao);
  
      });
     
  
      this.socket.on('erro', erro =>{
        // alert("ERRO: " + erro);
      });

      


      Plugins.LocalNotifications.addListener('localNotificationReceived', (notification) => {
        console.log('Notification: ', notification);
      })

      Plugins.LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        console.log('Notification action performed', notification);
      });

    } catch(e) {
      console.log(e);
    }

    console.log("entrei no setime");



}


ionViewDidLoad() {
  console.log('ionViewDidLoad LocalNotificationsPage');
}

async scheduleNow(notificacao) {

  
  this.notifs = await Plugins.LocalNotifications.schedule({
    notifications: [{
      title: `${notificacao.is_chat ? 'Novo chat' : 'Nova mensagem'}`,
      body: notificacao.info,
      // Get random id to test cancel
      id: Math.floor(Math.random()*10),
      sound: 'beep.aiff',
      smallIcon: "res://ionitron.png",
      attachments: [
        { id: 'face', url: 'res://ionitron.png' }
      ],
      actionTypeId: 'OPEN_PRODUCT',
      extra: {
        productId: 'PRODUCT-1',


      }
    }
  ]
  });
}




cancelNotification() {
  this.pendingNotifs && Plugins.LocalNotifications.cancel(this.pendingNotifs);
}

toJson(o: any) {
  return JSON.stringify(o, null, 2);
}
}
