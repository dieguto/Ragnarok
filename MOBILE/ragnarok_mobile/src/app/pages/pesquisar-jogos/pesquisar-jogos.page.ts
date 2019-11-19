import { Component, OnInit } from '@angular/core';
import { GeneroJogoService } from '../../services/anuncio/genero/genero-jogo.service';
import { Genero } from '../../services/anuncio/genero/genero_jogo.class';

@Component({
  selector: 'app-pesquisar-jogos',
  templateUrl: './pesquisar-jogos.page.html',
  styleUrls: ['./pesquisar-jogos.page.scss',  '../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class PesquisarJogosPage implements OnInit {

  generos: Genero[];

  constructor(private generoJogoService: GeneroJogoService) { }

  async ngOnInit() {

    this.generos = await this.generoJogoService.getGenerosPopulares();
    console.log(this.generos);
  }

}
