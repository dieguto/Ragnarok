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
            status:409,
            resp:{
               tipo:"erro"
            }
         },
         {
            status:500,
            resp:null
         },
      ];

      //JSON's da rota de Buscar usuario por ID =========== 
      this.reqGetUsuarioById = null;

      this.respGetUsuarioById = [
         {
            status:200,
            resp:{
               tipo:"custom",
               customJson:{
                  id: 1,
                  nome: "Diego Silva",
                  email: "diego@ragnarok.com",
                  endereco: "SP, Jandira",
                  lat: "-23.5289",
                  lon: "-46.8991",
                  is_bloqueado: false
              }
            }
         },
         {
            status:404,
            resp: null
         }
      ]
      //JSON's da rota de  ===========
      //JSON's da rota de  ===========
      //JSON's da rota de  ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Criar' metodo='post' 
               rota="/usuario" jsonReq={ this.reqCriar } jsonResp={ this.respCriar } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Usuario por ID' metodo='get' 
               rota="/usuario/:id" jsonReq={ this.reqGetUsuarioById } jsonResp={ this.respGetUsuarioById } />

         </CardPrincipal>

      );
   }

}

export default BoxUsuario;