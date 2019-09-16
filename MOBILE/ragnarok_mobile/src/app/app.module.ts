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
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';

import {NgxMaskIonicModule} from 'ngx-mask-ionic'

export function jwtOptionsFacgtory(storage){
  return{
    tokenGetter: ()=>{
      return storage.get('access_token');
    },  
    whitelistedDomains:['10.107.144.30']
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule, 
      HttpClientModule,
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
export class AppModule {}
