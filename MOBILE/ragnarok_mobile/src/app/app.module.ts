import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {Storage, IonicStorageModule} from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import { UsuarioService } from './services/usuario/usuario.service';
import { ChatPage } from './pages/chat/chat.page';

// storage: Storage
console.log(localStorage.getItem("token"));
const config: SocketIoConfig = { url: 'http://localhost:3108', options: {
  query:{
    token: localStorage.getItem("token")
  }
} 
};

console.log("PASSEI DOOOOOOOOOOOOOOO SocketIoConfig")

console.log(config);

export function jwtOptionsFacgtory(storage){
  return{
    tokenGetter: ()=>{
      return storage.get('access_token');
    },  
    whitelistedDomains:['http://3.92.51.72:3107']
  }
}

@NgModule({
  declarations: [AppComponent, ChatPage],
  entryComponents: [ChatPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule, 
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      SocketIoModule.forRoot(config),
      NgxMaskIonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      JwtModule.forRoot({
        jwtOptionsProvider:{
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFacgtory,
          deps:[Storage]
        }
      })

    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
