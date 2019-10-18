import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import {Anuncio} from '../../services/anuncio/cadastro_anuncio/anuncio.class';
import {CadastroAnuncioService} from '../../services/anuncio/cadastro_anuncio/cadastro-anuncio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss',  '../classes_padrao_scss/formatacao.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  anuncios: Anuncio[];
  url =  environment.url;

  constructor(private cadastroAnuncioService: CadastroAnuncioService) {
  }

  async ngOnInit() {

   this.anuncios = await this.cadastroAnuncioService.buscarTodosHome(99999, 1);

   for(let anuncio of this.anuncios){
     console.log(anuncio);
   }
  }

  verificarCampo(json_info_rawg, nome_campo){
    
    //console.log(JSON.stringify(json_info_rawg));
    //console.log(typeof json_info_rawg.jogo[nome_campo]);

    console.log("meu tipo é: " + typeof JSON.stringify(json_info_rawg));
    console.log("meu valor é: " + JSON.stringify(json_info_rawg));
    
    var aaa = JSON.stringify(json_info_rawg);

    console.log("a comparação é: " + aaa == 'null');
    
    if(JSON.stringify(json_info_rawg) === null){
      return false;

    } else {
      return this.isNullOuUnd(json_info_rawg.jogo[nome_campo]);
    }

  }

  isNullOuUnd(campo){
    return this.isUndefined(campo) || this.isNull(campo)
  }

  isUndefined(campo){
    return typeof campo === "undefined";
  }

  isNull(campo){
    return typeof campo !== "string";
  }
  slideOpts: any = {allowTouchMove: false};

  proximoJogo(){
   return this.slides.slideNext();
  }
}
