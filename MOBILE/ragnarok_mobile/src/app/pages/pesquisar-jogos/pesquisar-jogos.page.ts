import { Component, OnInit } from '@angular/core';
import { GeneroJogoService } from '../../services/anuncio/genero/genero-jogo.service';
import { Genero } from '../../services/anuncio/genero/genero_jogo.class';
import { CadastroAnuncioService } from '../../services/anuncio/cadastro_anuncio/cadastro-anuncio.service';
import { Anuncio } from '../../services/anuncio/cadastro_anuncio/anuncio.class';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { JogoPesquisaModalPage } from '../jogo-pesquisa-modal/jogo-pesquisa-modal.page';

@Component({
  selector: 'app-pesquisar-jogos',
  templateUrl: './pesquisar-jogos.page.html',
  styleUrls: ['./pesquisar-jogos.page.scss',  '../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class PesquisarJogosPage implements OnInit {

  generos: Genero[];
  anuncios: Anuncio[];
  url =  environment.url;

  constructor(private generoJogoService: GeneroJogoService, private cadastroAnuncioService: CadastroAnuncioService, private modalCtrl: ModalController ) { }

  async ngOnInit() {

    this.generos = await this.generoJogoService.getGenerosPopulares();
    this.anuncios = await this.cadastroAnuncioService.buscarTodosPesquisa(999999,1);

    console.log(this.anuncios);

    console.log(this.generos);
  }

  verificarCampo(json_info_rawg, nome_campo){
    if(json_info_rawg == null){
      return false;

    } else {
      var teste = json_info_rawg.jogo[nome_campo];
      return !(teste == null);
    }

  }

  async showModal(id_anuncio){
    console.log(id_anuncio);
    let modal = await this.modalCtrl.create({
      component : JogoPesquisaModalPage,
      componentProps: {id_anuncio: id_anuncio}

    });

    return await modal.present();
  }


}
