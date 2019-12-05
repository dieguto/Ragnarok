import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneroJogoService } from '../../services/anuncio/genero/genero-jogo.service';
import { Genero } from '../../services/anuncio/genero/genero_jogo.class';
import { CadastroAnuncioService } from '../../services/anuncio/cadastro_anuncio/cadastro-anuncio.service';
import { Anuncio } from '../../services/anuncio/cadastro_anuncio/anuncio.class';
import { environment } from 'src/environments/environment';
import { ModalController, IonSearchbar, IonRefresher } from '@ionic/angular';
import { JogoPesquisaModalPage } from '../jogo-pesquisa-modal/jogo-pesquisa-modal.page';
import { Plugins, KeyboardResize } from '@capacitor/core';

const { Keyboard } = Plugins;

@Component({
  selector: 'app-pesquisar-jogos',
  templateUrl: './pesquisar-jogos.page.html',
  styleUrls: ['./pesquisar-jogos.page.scss',  '../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class PesquisarJogosPage implements OnInit {
  @ViewChild(IonSearchbar, {static:false}) ionSearchBar: IonSearchbar;
  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;
  generos: Genero[];
  anuncios: Anuncio[];
  url =  environment.url;

  constructor(private generoJogoService: GeneroJogoService, private cadastroAnuncioService: CadastroAnuncioService, private modalCtrl: ModalController ) { }

  async ngOnInit() {

    this.generos = await this.generoJogoService.getGenerosPopulares();
    this.anuncios = await this.cadastroAnuncioService.buscarTodosPesquisa(999999,1, 0);

    console.log(this.anuncios);

    console.log(this.generos);

      this.teste();

      const teste2 = await Keyboard.setResizeMode({
        mode: KeyboardResize.None
       
     })
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

  async filtrarPesquisa(){
    this.anuncios = await this.cadastroAnuncioService.buscarTodosPesquisa(999999,1, this.ionSearchBar.value);
  }


  async buscarPorCategoria(id_genero){
    this.anuncios = await this.cadastroAnuncioService.buscarPorCategoria(999999, 1, id_genero);
  }

  async recarregar(){

    this.anuncios = await this.cadastroAnuncioService.buscarTodosPesquisa(999999,1, 0);

    console.log(this.anuncios);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.refresher.complete();
    }, 500);
  }

  async teste(){
    const teste2 = await Keyboard.setResizeMode({
       mode: KeyboardResize.None
      
    })
 }

}
