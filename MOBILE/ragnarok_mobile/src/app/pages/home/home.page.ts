import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonRange, ModalController, IonSlide, IonContent, IonRefresher } from '@ionic/angular';
import {Anuncio} from '../../services/anuncio/cadastro_anuncio/anuncio.class';
import {CadastroAnuncioService} from '../../services/anuncio/cadastro_anuncio/cadastro-anuncio.service';
import { environment } from 'src/environments/environment';
import { HomeModalPage } from '../home-modal/home-modal.page';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss',  '../classes_padrao_scss/formatacao_tolbar.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;
  @ViewChild(IonRange, { static: false }) ionRange: IonRange;
  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;

  anuncios: Anuncio[];
  url =  environment.url;
  isVazio = false;

  constructor(private cadastroAnuncioService: CadastroAnuncioService, private modalCtrl: ModalController, private storage:Storage) {
  }

  async ngOnInit() {
    
   this.anuncios = await this.cadastroAnuncioService.buscarTodosHome(1, 1);

   console.log(this.anuncios);
  }

  //  Cria modal e manda id do anuncio para select 
  async showModal(id_anuncio){
    console.log(id_anuncio);
    let modal = await this.modalCtrl.create({
      component : HomeModalPage,
      componentProps: {idade: this.anuncios, id_anuncio: id_anuncio}

    });

    return await modal.present();
  }
  // Filtra por quilometro
async  filtrar_km(){
   let km = this.ionRange.value;

   const PAGINA = "pagina";
   
   await this.storage.set(PAGINA, 1);

   this.cadastroAnuncioService.buscarTodosHome(km, 1).then(anuncio => {
    
    console.log(anuncio);
    this.anuncios = anuncio;
    this.isVazio = false;
  })
  .catch(err => {
    console.log(err);
    if(err.status === 404){
      console.log('erro cabuloso');
      this.anuncios = [];
      this.isVazio = true;
    }
  })
  
  this.slides.slidePrev();
  this.slides.slidePrev();
  this.slides.slidePrev();
  this.slides.slidePrev();

  this.slides.slidePrev();
  this.slides.slidePrev();
  this.slides.slidePrev();

  }

  async buscarMaisAnuncios(){
    const PAGINA = "pagina";
    let pg =  await this.storage.get(PAGINA);
    pg  = pg + 1;
    await this.storage.set(PAGINA, pg);
    let km = this.ionRange.value;
 
    console.log('essa é a pagina', pg);

    
    this.cadastroAnuncioService.buscarTodosHome(km, pg).then(anuncio => {
      
      console.log(anuncio);
      this.anuncios = anuncio;
      this.isVazio = false;
    }).catch(err => {
      console.log(err);
      if(err.status === 404){
        console.log('erro cabuloso');
        this.anuncios = [];
        this.isVazio = true;
      }
    })
    
        this.slides.slidePrev();
        this.slides.slidePrev();
        this.slides.slidePrev();
        this.slides.slidePrev();

        this.slides.slidePrev();
        this.slides.slidePrev();
        this.slides.slidePrev();

        

  }

  // Veririfica os campos do json
  verificarCampo(json_info_rawg, nome_campo){
    if(json_info_rawg == null){
      return false;

    } else {
      var teste = json_info_rawg.jogo[nome_campo];
      return !(teste == null);
    }

  }
  slideOpts: any = {allowTouchMove: false};

  proximoJogo(){
   return this.slides.slideNext();
  }

  async recarregar(){

    this.anuncios = await this.cadastroAnuncioService.buscarTodosHome(1, 1);

    console.log(this.anuncios);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.refresher.complete();
    }, 500);
  }


 
}
