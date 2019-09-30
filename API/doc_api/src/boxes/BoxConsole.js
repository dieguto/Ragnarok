import React, { Component } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxConsole extends Component{

   componentWillMount(){
      this.titulo = "Console"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");

      //======================

      this.respPopulares = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:[
                  {
                     "nome": "Xbox 360",
                     "id_console": 4,
                     "total": 2
                  },
                  {
                     "nome": "Playstation 2",
                     "id_console": 1,
                     "total": 1
                  },
                  {
                     "nome": "Nintendo 3DS",
                     "id_console": 7,
                     "total": 1
                  },
                  {
                     "nome": "Playstation 3",
                     "id_console": 2,
                     "total": 1
                  },
                  {
                     "nome": "Nintendo Switch",
                     "id_console": 8,
                     "total": 1
                  },
                  {
                     "nome": "Xbox One",
                     "id_console": 5,
                     "total": 1
                  },
                  {
                     "nome": "Playstation 4",
                     "id_console": 3,
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
                      "id_console": 1,
                      "nome": "Playstation 2"
                  },
                  {
                      "id_console": 2,
                      "nome": "Playstation 3"
                  },
                  {
                      "id_console": 3,
                      "nome": "Playstation 4"
                  },
                  {
                      "id_console": 4,
                      "nome": "Xbox 360"
                  },
                  {
                      "id_console": 5,
                      "nome": "Xbox One"
                  },
                  {
                      "id_console": 6,
                      "nome": "Nintendo Wii"
                  },
                  {
                      "id_console": 7,
                      "nome": "Nintendo 3DS"
                  },
                  {
                      "id_console": 8,
                      "nome": "Nintendo Switch"
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
               rota="/console/todos" jsonResp={ this.respTodos } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Populares' metodo='get' 
               rota="/console/populares" jsonResp={ this.respPopulares } />

         </CardPrincipal>

      );
   }

}

export default BoxConsole;