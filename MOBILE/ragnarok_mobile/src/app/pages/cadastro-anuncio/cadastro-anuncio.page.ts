import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonSearchbar, IonList, IonItem } from '@ionic/angular';

import {Console} from '../../services/anuncio/consoles/console.class';
import {ConsoleService} from '../../services/anuncio/consoles/console.service';
import {GeneroJogoService} from '../../services/anuncio/genero/genero-jogo.service';
import {Genero} from '../../services/anuncio/genero/genero_jogo.class';
import {SugestoesJogo} from '../../services/sugestoes_jogo/sugestoes_jogo.class';
import {SugestoesJogoService} from '../../services/sugestoes_jogo/sugestoes-jogo.service';




@Component({
  selector: 'app-cadastro-anuncio',
  templateUrl: './cadastro-anuncio.page.html',
  styleUrls: ['./cadastro-anuncio.page.scss', '../classes_padrao_scss/formatacao.scss'],
})
export class CadastroAnuncioPage implements OnInit {
  @ViewChild(IonSearchbar, {static:false}) ionSearchBar: IonSearchbar;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @ViewChild(IonItem, {static:false}) ionItem: IonItem;
  constructor(
    private generoJogoService: GeneroJogoService, 
    private consoleService: ConsoleService,
    private SugestoesJogoService: SugestoesJogoService
    ) { }

  jogos: String;
  generos: Genero[];
  consoles: Console[];
  sugestoes_jogos: SugestoesJogo[];

  slideOpts: any = {allowTouchMove: false};
  async ngOnInit() {
    this.generos = await this.generoJogoService.getGeneros();

    this.consoles = await this.consoleService.getConsoles();

    
  }

  

  proximo(){
    return this.slides.slideNext();
   }





  filtrarJogos(){
    console.log(this.ionSearchBar.value);

    if(this.ionSearchBar.value == ""){
      const a = new SugestoesJogo({nome: "digite um jogo", slug_jogo:"a", imagem_fundo:"a"});
      this.sugestoes_jogos = [a];
    } else if(this.ionSearchBar.value != undefined){
         this.SugestoesJogoService.getJogos(this.ionSearchBar.value)
         .then(jogos => {
           if(this.ionSearchBar.value != ""){
            this.sugestoes_jogos = jogos;
           }
          
         });
      }
   }


   
}
