import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

import {Console} from '../../services/anuncio/consoles/console.class';
import {ConsoleService} from '../../services/anuncio/consoles/console.service';
import {GeneroJogoService} from '../../services/anuncio/genero/genero-jogo.service';
import {Genero} from '../../services/anuncio/genero/genero_jogo.class';
@Component({
  selector: 'app-cadastro-anuncio',
  templateUrl: './cadastro-anuncio.page.html',
  styleUrls: ['./cadastro-anuncio.page.scss', '../classes_padrao_scss/formatacao.scss'],
})
export class CadastroAnuncioPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  constructor(
    private generoJogoService: GeneroJogoService, 
    private consoleService: ConsoleService
    ) { }

  generos: Genero[];
  consoles: Console[];

  slideOpts: any = {allowTouchMove: false};
  async ngOnInit() {
    this.generos = await this.generoJogoService.getGeneros();

    this.consoles = await this.consoleService.getConsoles();
  }


  proximo(){
    return this.slides.slideNext();
   }
}
