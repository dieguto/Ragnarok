import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-selecao-tipo-anuncio',
  templateUrl: './selecao-tipo-anuncio.page.html',
  styleUrls: ['./selecao-tipo-anuncio.page.scss',  '../classes_padrao_scss/formatacao.scss'],
})


export class SelecaoTipoAnuncioPage implements OnInit {



  constructor(private route: ActivatedRoute) { }

  ngOnInit() {


  }
  


  abrirPagina(nomeDaPagina: string){
     
      this.route.snapshot.paramMap.get(nomeDaPagina);
  }

}
