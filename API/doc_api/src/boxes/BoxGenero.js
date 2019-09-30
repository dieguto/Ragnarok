import React, { Component } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxGenero extends Component{

   componentWillMount(){
      this.titulo = "Genero"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");

      //======================

      this.respPopulares = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:[
                  {
                      "nome": "Infantil",
                      "id_genero": 7,
                      "total": 2
                  },
                  {
                      "nome": "Ação",
                      "id_genero": 1,
                      "total": 1
                  },
                  {
                      "nome": "Estratégia",
                      "id_genero": 6,
                      "total": 1
                  },
                  {
                      "nome": "Aventura",
                      "id_genero": 2,
                      "total": 1
                  }
              ]
            }
         },
         {
            status:404,
            resp:null
         }
      ]
      
      this.respTodos = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:[
                  {
                      "id_genero": 1,
                      "nome": "Ação"
                  },
                  {
                      "id_genero": 2,
                      "nome": "Aventura"
                  },
                  {
                      "id_genero": 3,
                      "nome": "Corrida"
                  },
                  {
                      "id_genero": 4,
                      "nome": "Dança"
                  },
                  {
                      "id_genero": 5,
                      "nome": "Esportes"
                  },
                  {
                      "id_genero": 6,
                      "nome": "Estratégia"
                  },
                  {
                      "id_genero": 7,
                      "nome": "Infantil"
                  },
                  {
                      "id_genero": 8,
                      "nome": "Luta"
                  },
                  {
                      "id_genero": 9,
                      "nome": "Música"
                  },
                  {
                      "id_genero": 10,
                      "nome": "Plataforma"
                  },
                  {
                      "id_genero": 11,
                      "nome": "Puzzle"
                  },
                  {
                      "id_genero": 12,
                      "nome": "RPG"
                  },
                  {
                      "id_genero": 13,
                      "nome": "Simulação"
                  },
                  {
                      "id_genero": 14,
                      "nome": "Stealth"
                  },
                  {
                      "id_genero": 15,
                      "nome": "Terror"
                  },
                  {
                      "id_genero": 16,
                      "nome": "FPS"
                  }
              ]
            }
         },
         {
            status:404,
            resp:null
         }
      ]

      //JSON's da rota de aieou ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Todos' metodo='get' 
               rota="/genero/todos" jsonResp={ this.respTodos } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Populares' metodo='get' 
               rota="/genero/populares" jsonResp={ this.respPopulares } />

         </CardPrincipal>

      );
   }

}

export default BoxGenero;