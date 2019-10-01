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
                      "nome": "Sengoku BASARA: Samurai Heroes",
                      "slug": "sengoku-basara-samurai-heroes",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/a34/a348e0cb520b018959b1434de9c25762.jpg"
                  },
                  {
                      "nome": "Batla",
                      "slug": "batla",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/006/006ec7ec1ea7de58c26a3a557de4aab0.jpg"
                  },
                  {
                      "nome": "Katana ZERO",
                      "slug": "katana-zero",
                      "imagem_fundo": "https://media.rawg.io/media/games/d37/d37e110ddcc0bd52d99f0f647b737a0a.jpg"
                  },
                  {
                      "nome": "Unearthed: Trail of Ibn Battuta - Episode 1 - Gold Edition",
                      "slug": "unearthed-trail-of-ibn-battuta-episode-1-gold-ed-2",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/439/43919cbc98463693afa57694ae751636.jpg"
                  },
                  {
                      "nome": "You Are Not A Banana",
                      "slug": "you-are-not-a-banana",
                      "imagem_fundo": "https://media.rawg.io/media/screenshots/817/8172477d6ad2000e358520eb77a1fdd8.jpg"
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