import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import {Anuncio} from '../../services/anuncio/cadastro_anuncio/anuncio.class';
import { CadastroAnuncioService } from '../../services/anuncio/cadastro_anuncio/cadastro-anuncio.service';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.page.html',
  styleUrls: ['./home-modal.page.scss','../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class HomeModalPage implements OnInit {


  anuncios: Anuncio;
  id_anuncio: Number;

  constructor(private cadastroAnuncioService: CadastroAnuncioService, private navParam : NavParams, private modalCtrl: ModalController) { }

  async ngOnInit() {

    this.anuncios = await this.cadastroAnuncioService.buscarPorID(this.navParam.get('id_anuncio'));
    console.log(this.anuncios);
    // this.anuncios = this.navParam.get('idade');

  }


  async closeModal(){
    this.modalCtrl.dismiss();
  }

  verificarCampo(json_info_rawg, nome_campo){
    if(json_info_rawg == null){
      return false;

    } else {
      var teste = json_info_rawg.jogo[nome_campo];
      return !(teste == null);
    }

  }

  isNullOuUnd(campo){
    var teste = this.isNull(campo);
    return teste;
    // return this.isNull(campo);
  }



  isNull(campo){
    var teste = campo == null;
    return teste;
    // return typeof campo !== "string";
  }


}
