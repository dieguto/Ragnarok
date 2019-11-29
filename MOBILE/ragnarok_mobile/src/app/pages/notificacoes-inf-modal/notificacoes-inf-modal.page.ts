import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/services/usuario/usuario.class';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notificacoes-inf-modal',
  templateUrl: './notificacoes-inf-modal.page.html',
  styleUrls: ['./notificacoes-inf-modal.page.scss','../classes_padrao_scss/formatacao_tolbar.scss' ],
})
export class NotificacoesInfModalPage implements OnInit {

  usuario:Usuario;
  url =  environment.url;
  

  constructor(private usuarioService: UsuarioService, private navParam : NavParams, private modalCtrl: ModalController) { }

 async ngOnInit() {

    this.usuario = await this.usuarioService.buscarPorIdComAnuncios(this.navParam.get('id_usuario'));
    console.log(this.usuario);
  }


  verificarCampo(json_info_rawg, nome_campo){
    if(json_info_rawg == null){
      return false;

    } else {
      var teste = json_info_rawg.jogo[nome_campo];
      return !(teste == null);
    }

  }
}
