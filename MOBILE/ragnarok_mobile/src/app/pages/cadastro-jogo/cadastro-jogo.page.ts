import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonSearchbar, IonList, IonItem } from '@ionic/angular';

import {Console} from '../../services/anuncio/consoles/console.class';
import {ConsoleService} from '../../services/anuncio/consoles/console.service';
import {GeneroJogoService} from '../../services/anuncio/genero/genero-jogo.service';
import {Genero} from '../../services/anuncio/genero/genero_jogo.class';
import {SugestoesJogo} from '../../services/sugestoes_jogo/sugestoes_jogo.class';
import {SugestoesJogoService} from '../../services/sugestoes_jogo/sugestoes-jogo.service';
import {Anuncio} from '../../services/anuncio/cadastro_anuncio/anuncio.class';
import {CadastroAnuncioService} from '../../services/anuncio/cadastro_anuncio/cadastro-anuncio.service';
import {Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro-jogo',
  templateUrl: './cadastro-jogo.page.html',
  styleUrls: ['./cadastro-jogo.page.scss',  '../classes_padrao_scss/formatacao.scss'],
})
export class CadastroJogoPage implements OnInit {

  @ViewChild(IonSearchbar, {static:false}) ionSearchBar: IonSearchbar;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @ViewChild(IonItem, {static:false}) ionItem: IonItem;
  

  jogos: String;
  fotos_base64: String[];
  anuncio: Anuncio;
  generos: Genero[];
  consoles: Console[];
  sugestoes_jogos: SugestoesJogo[];
  foto: SafeResourceUrl;
  slideOpts: any = {allowTouchMove: false};
  public formCriarAnuncio : FormGroup;


  constructor(
    private generoJogoService: GeneroJogoService, 
    private consoleService: ConsoleService,
    private SugestoesJogoService: SugestoesJogoService,
    private cadastroAnuncioService: CadastroAnuncioService,
    private sanitizer: DomSanitizer,
    formBuilder: FormBuilder 
    ) {
      this.formCriarAnuncio = formBuilder.group({
        titulo:[null, Validators.required],
        id_genero:[null, Validators.required],
        id_console:[null, Validators.required],
        slug_jogo:[null, Validators.required],
        id_console_troca:[null, Validators.required],
        slug_jogo_troca:[null, Validators.required],
        preco:[null, Validators.required],
        descricao:[null, Validators.required],
      })

     }

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

   async tirarFoto(){
    const imagem = await Plugins.Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.fotos_base64.push(imagem.dataUrl);

    this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(imagem && (imagem.dataUrl));

   }

   async criarAnuncio(){
    try {
      this.anuncio = this.formCriarAnuncio.value;

      // alert(typeof this.foto);
      // alert(this.foto);
      console.log(this.anuncio);
      const result = await this.cadastroAnuncioService.criarAnuncio(this.anuncio, this.fotos_base64);
      console.log(this.anuncio);
      console.log(result);
    } catch (error) {
      console.log(error); 
    }
   }
}