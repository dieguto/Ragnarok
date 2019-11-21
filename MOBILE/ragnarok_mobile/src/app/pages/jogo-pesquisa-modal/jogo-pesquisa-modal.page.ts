import { Component, OnInit } from '@angular/core';
import { CadastroAnuncioService } from 'src/app/services/anuncio/cadastro_anuncio/cadastro-anuncio.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Anuncio } from 'src/app/services/anuncio/cadastro_anuncio/anuncio.class';

@Component({
  selector: 'app-jogo-pesquisa-modal',
  templateUrl: './jogo-pesquisa-modal.page.html',
  styleUrls: ['./jogo-pesquisa-modal.page.scss', '../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class JogoPesquisaModalPage implements OnInit {
  anuncios: Anuncio;
  constructor(private cadastroAnuncioService: CadastroAnuncioService, private navParam : NavParams, private modalCtrl: ModalController) { }

 async ngOnInit() {

    this.anuncios = await this.cadastroAnuncioService.buscarPorID(this.navParam.get('id_anuncio'));
    console.log(this.anuncios);
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



}
