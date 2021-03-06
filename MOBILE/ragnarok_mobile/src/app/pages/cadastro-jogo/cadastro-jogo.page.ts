import { Component, OnInit, ViewChild} from '@angular/core';
import { IonSlides, IonSearchbar, IonList, IonItem, IonImg } from '@ionic/angular';
import {Console} from '../../services/anuncio/consoles/console.class';
import {ConsoleService} from '../../services/anuncio/consoles/console.service';
import {GeneroJogoService} from '../../services/anuncio/genero/genero-jogo.service';
import {Genero} from '../../services/anuncio/genero/genero_jogo.class';
import {SugestoesJogo} from '../../services/sugestoes_jogo/sugestoes_jogo.class';
import {SugestoesJogoService} from '../../services/sugestoes_jogo/sugestoes-jogo.service';
import {Anuncio} from '../../services/anuncio/cadastro_anuncio/anuncio.class';
import {CadastroAnuncioService} from '../../services/anuncio/cadastro_anuncio/cadastro-anuncio.service';
import {CameraResultType, CameraSource, Plugins, KeyboardResize } from '@capacitor/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

const { Keyboard } = Plugins;

@Component({
  selector: 'app-cadastro-jogo',
  templateUrl: './cadastro-jogo.page.html',
  styleUrls: ['./cadastro-jogo.page.scss',  '../classes_padrao_scss/formatacao.scss'],
})
export class CadastroJogoPage implements OnInit {

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
    this.foto = '../../assets/picture.png';
    this.generos = await this.generoJogoService.getGeneros();

    this.consoles = await this.consoleService.getConsoles();

    var inputValue = (<HTMLInputElement>document.getElementById('pop12')).value;

    console.log("eu", inputValue);

    this.teste();

    const teste2 = await Keyboard.setResizeMode({
      mode: KeyboardResize.None
     
   })


    
  }

  // proxima pagina
  proximo(){
    return this.slides.slideNext();
   }


  //  filtrando jogo
   filtrarJogos(valor){
      if(valor == "jogo"){    
        if(this.ionSearchBar.value == ""){
          const a = new SugestoesJogo({nome: "digite um jogo", slug_jogo:"a", imagem_fundo:"a"});
          this.sugestoes_jogos = [a];
        } else if(this.ionSearchBar.value != undefined){
             this.SugestoesJogoService.getJogos(this.ionSearchBar.value)
             .then(jogos => {
               if(this.ionSearchBar.value != ""){
                this.sugestoes_jogos = jogos;
                console.log(jogos);
               }
              
             });
          }
      }else if(valor == "jogo_desejado"){
        var inputValue = (<HTMLInputElement>document.getElementById('pop12')).value;

        console.log("eu", inputValue);
    
        if(inputValue == ""){
          const a = new SugestoesJogo({nome: "digite um jogo", slug_jogo:"a", imagem_fundo:"a"});
          this.sugestoes_jogos_desejado = [a];
        } else if(this.ionSearchBar.value != undefined){
             this.SugestoesJogoService.getJogos(inputValue)
             .then(jogos => {
               if(inputValue != ""){
                this.sugestoes_jogos_desejado = jogos;
                // console.log(jogos);
               }
              
             });
          }
      }

   }


   async teste(){
    const teste2 = await Keyboard.setResizeMode({
       mode: KeyboardResize.None
      
    })
 }


  //  Tirando foto
   async tirarFoto(){
    const imagem = await Plugins.Camera.getPhoto({
      quality:50,
      allowEditing:false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      saveToGallery: false
    });

    this.base_64 = imagem.dataUrl;
    this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(imagem && (imagem.dataUrl));

    
    // this.ionImg.src = this.imagens;
   }

   async galeria(){
    const imagem = await Plugins.Camera.getPhoto({
      quality:50,
      allowEditing:false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      saveToGallery: false
    });

    this.base_64 = imagem.dataUrl;
    this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(imagem && (imagem.dataUrl));

    
    // this.ionImg.src = this.imagens;
   }

   async criarAnuncio(){
  

    try {
      this.anuncio = this.formCriarAnuncio.value;
      console.log(this.anuncio);
      const result = await this.cadastroAnuncioService.criarAnuncio(this.anuncio, this.base_64);
      console.log(this.anuncio);
      console.log(result);

      // alert(result)
      // alert(JSON.stringify(result));
    } catch (error) {
      // alert(error);
      // alert(JSON.stringify(error));
      console.log(error);
    }

   }
}
