import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioGuardService } from './services/usuario/usuario-guard.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Plugins, KeyboardResize } from '@capacitor/core';

const { Keyboard } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usuario: UsuarioService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.usuario.authenticationState.subscribe(state =>{
        if(state){
          this.router.navigate(['tabs']);
        }else{
          this.router.navigate(['login']);
        }
      });

      Keyboard.setResizeMode({
        mode:KeyboardResize.None
      });

    });
  }



}
