import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss',  '../classes_padrao_scss/formatacao.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor() { }

  ngOnInit() {
  }

  slideOpts: any = {allowTouchMove: false};

  proximoJogo(){
   return this.slides.slideNext();
  }
}
