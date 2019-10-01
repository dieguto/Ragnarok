import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-cadastro-anuncio',
  templateUrl: './cadastro-anuncio.page.html',
  styleUrls: ['./cadastro-anuncio.page.scss', '../classes_padrao_scss/formatacao.scss'],
})
export class CadastroAnuncioPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  constructor() { }


  slideOpts: any = {allowTouchMove: false};
  ngOnInit() {
  }


  proximo(){
    return this.slides.slideNext();
   }
}
