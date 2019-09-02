import React, { Component } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxUsuario extends Component{
   componentWillMount(){
      this.titulo = "Usuario"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");
      
      //JSON's da rota de criar ===========
      this.reqCriar = { 
         nome: "Chimbinha Gomes", 
         email: "chimbinha@gmail.com",
         cep:"66635-110", 
         senha: "amo_a_joelma_123" 
      };

      this.respCriar = [
         {
            status:201,
            resp:null
         },
         {
            status:400,
            resp:{
               tipo:"erro"
            }
         },
         {
            status:500,
            resp:null
         },
      ];

      //JSON's da rota de abc ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Criar' metodo='post' 
               rota="/usuario" jsonReq={ this.reqCriar } jsonResp={ this.respCriar } />

         </CardPrincipal>

      );
   }

}

export default BoxUsuario;