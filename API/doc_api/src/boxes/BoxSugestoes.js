import React, { Component } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxGenero extends Component{

   componentWillMount(){
      this.titulo = "Sugestões"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");

      //======================

      this.respSugestoes = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:[
                  {
                      "nome": "AAA",
                      "slug": "aaa",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/8b4/8b48705e244232e4a86868661db2eea6.jpg",
                      "dt_lancamento": "14 de Setembro de 2019"
                  },
                  {
                      "nome": "AAA³ - Brain Dots",
                      "slug": "aaa3-brain-dots",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/5fc/5fc6cdd9ad41578e5bdc259d06558a71.jpg",
                      "dt_lancamento": "13 de Dezembro de 2013"
                  },
                  {
                      "nome": "Baa-aaa-aaa",
                      "slug": "baa-aaa-aaa",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/b9e/b9ed37e7f1be6062c106c50aefd4b740.jpg",
                      "dt_lancamento": "31 de Janeiro de 2019"
                  },
                  {
                      "nome": "AAA Game - The Game",
                      "slug": "aaa-game-the-game",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/daf/dafe3a00c1e1ae0e3b2d629035bac6f9.jpg",
                      "dt_lancamento": "04 de Dezembro de 2015"
                  },
                  {
                      "nome": "AAA: El Videojuego",
                      "slug": "aaa-el-videojuego",
                      "imagem_fundo": null,
                      "dt_lancamento": "Data Indisponivel"
                  },
                  {
                      "nome": "AAA GAME... FROM THE FUTURE!",
                      "slug": "aaa-game-from-the-future",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/7e6/7e62d240a43dcc8115128f57c389bff6.jpg",
                      "dt_lancamento": "31 de Agosto de 2019"
                  },
                  {
                      "nome": "AAA Solitaire",
                      "slug": "aaa-solitaire",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/38f/38fe90fab0251da7e5bffb13a2f1266c_RgS513A.jpg",
                      "dt_lancamento": "05 de Março de 2015"
                  },
                  {
                      "nome": "AAA FreeCell",
                      "slug": "aaa-freecell",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/de5/de56e20ead7381fb31e738886216662d_LZen2vi.jpg",
                      "dt_lancamento": "18 de Fevereiro de 2015"
                  },
                  {
                      "nome": "AAA³ Blazing Beats - House Hit Song Maker",
                      "slug": "aaa3-blazing-beats-house-hit-song-maker",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/c4b/c4b39f21399c8ac13b82d8388af8a2f5.jpg",
                      "dt_lancamento": "18 de Dezembro de 2014"
                  },
                  {
                      "nome": "AAA by Ricky_M",
                      "slug": "aaa-by-ricky_m",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/17d/17d26e93c71daa205fa8b07ce1a6d583.jpg",
                      "dt_lancamento": "28 de Julho de 2019"
                  }
              ]
            }
         },
         {
            status:404,
            resp:null
         },
         {
            status:500,
            resp:null
         }
      ]
      //JSON's da rota de aieou ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Sugestões' metodo='get' 
               rota="/sugestoes/:termo_pesquisa/:limite" jsonResp={ this.respSugestoes } />

         </CardPrincipal>

      );
   }

}

export default BoxGenero;