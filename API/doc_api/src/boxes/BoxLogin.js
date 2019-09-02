import React, { Component } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxLogin extends Component{
   componentWillMount(){
      this.titulo = "Login"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");
      
      //JSON's da rota de logar usuario ===========
      this.reqLogarUsuario = {
         email: "rogerin.ziika@hotmail.com", 
         senha: "hotwheels123" 
      };

      this.respLogarUsuario = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:{
                  token:"um_token_gigante",
                  usuario:{
                     id: 3,
                     nome: "Dj rogerinho",
                     email: "rogerin.ziika@hotmail.com",
                     endereco: "RJ, Morro do alemão",
                     lat: "-66.0000",
                     lon: "-69.7777"
                  }
               }
            }
         },
         {
            status:404,
            resp:null
         },
         {
            status:433,
            resp:null
         },
         {
            status:500,
            resp:null
         }
      ];

      //JSON's da rota de logar admin ===========
      this.reqLogarAdmin = {
         email: "rogerin.ziika@hotmail.com", 
         senha: "hotwheels123" 
      };

      this.respLogarAdmin = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:{
                  token:"um_token_gigante",
                  usuario:{
                     id: 3,
                     nome: "Dj rogerinho",
                     email: "rogerin.ziika@hotmail.com",
                     endereco: "RJ, Morro do alemão",
                     lat: "-66.0000",
                     lon: "-69.7777"
                  }
               }
            }
         },
         {
            status:401,
            resp:null
         },
         {
            status:404,
            resp:null
         },
         {
            status:433,
            resp:null
         },
         {
            status:500,
            resp:null
         }
      ];

      //JSON's da rota de aieou ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Logar Usuario' metodo='post' 
               rota="/login/usuario" jsonReq={ this.reqLogarUsuario } jsonResp={ this.respLogarUsuario } />

            <CardRota parentAcc={ this.parentAcc } titulo='Logar Admin' metodo='post' 
               rota="/login/admin" jsonReq={ this.reqLogarAdmin } jsonResp={ this.respLogarAdmin } />

         </CardPrincipal>

      );
   }

}

export default BoxLogin;