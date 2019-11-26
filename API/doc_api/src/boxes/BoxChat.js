import React, { Component } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxChat extends Component{

   componentWillMount(){
      this.titulo = "Chat"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");

      //======================

      this.respSugestoes = [
         {
            status:200,
            resp:null
         },
         {
            status:400,
            resp:null
         },
         {
            status:403,
            resp:null
         },
         {
            status:404,
            resp:null
         },
         {
            status:412,
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
		 <>
            <CardPrincipal titulo={ this.titulo }>

               <CardRota parentAcc={ this.parentAcc } titulo='Deletar chat - REQUER TOKEN' metodo='delete' 
                  rota="/chat/:id_chat" jsonResp={ this.respSugestoes } />

            </CardPrincipal>
      
            <CardPrincipal titulo={ this.titulo }>

               <CardRota parentAcc={ this.parentAcc } titulo='Ativar chat - REQUER TOKEN' metodo='patch' 
                  rota="/chat/ativar/:id_chat" jsonResp={ this.respSugestoes } />
   
            </CardPrincipal>
		 </>
      );
   }

}

export default BoxChat;