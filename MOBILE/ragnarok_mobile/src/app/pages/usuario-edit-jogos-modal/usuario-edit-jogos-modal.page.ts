import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSearchbar, IonSlides, IonItem, IonImg } from '@ionic/angular';
import { GeneroJogoService } from '../../services/anuncio/genero/genero-jogo.service';
import { ConsoleService } from '../../services/anuncio/consoles/console.service';
import { SugestoesJogoService } from '../../services/sugestoes_jogo/sugestoes-jogo.service';
import { CadastroAnuncioService } from '../../services/anuncio/cadastro_anuncio/cadastro-anuncio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Anuncio } from 'src/app/services/anuncio/cadastro_anuncio/anuncio.class';
import { Genero } from 'src/app/services/anuncio/genero/genero_jogo.class';
import { SugestoesJogo } from 'src/app/services/sugestoes_jogo/sugestoes_jogo.class';

@Component({
  selector: 'app-usuario-edit-jogos-modal',
  templateUrl: './usuario-edit-jogos-modal.page.html',
  styleUrls: ['./usuario-edit-jogos-modal.page.scss', '../classes_padrao_scss/formatacao.scss'],
})
export class UsuarioEditJogosModalPage implements OnInit {

  @ViewChild(IonSearchbar, {static:false}) ionSearchBar: IonSearchbar;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @ViewChild(IonItem, {static:false}) ionItem: IonItem;
  @ViewChild(IonImg, {static:false})  ionImg: IonImg;
  
  
  jogos: String;
  fotos_base64: String[];
  anuncio: Anuncio;
  generos: Genero[];

  consoles: Console[];
  sugestoes_jogos: SugestoesJogo[];
  sugestoes_jogos_desejado:SugestoesJogo[];
  foto: SafeResourceUrl;
  // imagens: String;
  base_64: string;
  slideOpts: any = {allowTouchMove: false};
  public formCriarAnuncio : FormGroup;

  constructor(
    
    private modalCtrl: ModalController,
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
        array_fotos_base64:[null, Validators.required]
      })
    }



    async ngOnInit() {
    this.generos = await this.generoJogoService.getGeneros();

    this.consoles = await this.consoleService.getConsoles();
  }

  async closeModal(){
    this.modalCtrl.dismiss();
  }


}
