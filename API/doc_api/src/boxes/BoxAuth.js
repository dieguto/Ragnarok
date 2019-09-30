import React, { Component } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxAuth extends Component{
   componentWillMount(){
      this.titulo = "Auth"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");
      
      //JSON's da rota de logar usuario ===========
      this.reqLogarUsuario = {
         email: "php_e_kadettao@hotmail.com", 
         senha: "sonabroderagem6666" 
      };;

      this.respLogarUsuario = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:{
                  "token": "token_gigante",
                  "usuario": {
                      "id": 6969,
                      "nome": "Bloodhound Gang",
                      "endereco": "SP, Santo Amaro",
                      "criado_em": "27 de Setembro de 2019"
                  }
              }
            }
         },
         {
            status:404,
            resp:null
         },
         {
            status:423,
            resp:null
         },
         {
            status:500,
            resp:null
         }
      ];

      //JSON's da rota de logar admin ===========
      this.reqLogarAdmin = {
         email: "php_e_kadettao@hotmail.com", 
         senha: "sonabroderagem6666" 
      };

      this.respLogarAdmin = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:{
                  "token": "token_gigante",
                  "usuario": {
                      "id": 6969,
                      "nome": "Bloodhound Gang",
                      "endereco": "SP, Santo Amaro",
                      "criado_em": "27 de Setembro de 2019"
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
            status:423,
            resp:null
         },
         {
            status:500,
            resp:null
         }
      ];

      //JSON's da rota de aieou ===========
      this.reqConfirmar = {
         "senha": "senha_super_demais_123"
      }

      this.respConfirmar = [
         {
            status:200,
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
         }
      ];
      
      //JSON's da rota de aieou ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Logar Usuario' metodo='post' 
               rota="/auth/login/usuario" jsonReq={ this.reqLogarUsuario } jsonResp={ this.respLogarUsuario } />

            <CardRota parentAcc={ this.parentAcc } titulo='Logar Admin' metodo='post' 
               rota="/auth/login/admin" jsonReq={ this.reqLogarAdmin } jsonResp={ this.respLogarAdmin } />

            <CardRota parentAcc={ this.parentAcc } titulo='Confirmar - REQUER TOKEN' metodo='post' 
               rota="/auth/confirmar" jsonReq={ this.reqConfirmar } jsonResp={ this.respConfirmar } />

         </CardPrincipal>

      );
   }

}

export default BoxAuth;