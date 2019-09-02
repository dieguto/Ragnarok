import React, { Component } from 'react';
import CardInfoImportante from '../components/ComponentCardInfoImportante.js';

class BoxUsuario extends Component{
   
   render(){
      return(
      
         <CardInfoImportante titulo="IMPORTANTE">
            <h4 className="font-bold text-justify" style={{lineHeight:30+"px"}}>
               Antes de realizar qualquer um dos 
               comandos abaixo, certifique-se de 
               que você esta na pasta
               <span className="alerta" style={{marginLeft:5+"px"}}>api_ragnarok</span>
            </h4>
            <div id="cx_foto">
               <img src="https://i.imgur.com/w2n3kaZ.png" alt="Foto do cmd do windows"/>
            </div>
            <h4 className="alerta text-justify" id="cx_nrs">
               
                  SEMPRE QUE VOCÊ DER UM PULL NO PROJETO, 
                  ANTES DE INICIAR A API SEMPRE EXECUTE 
                  ESTE COMANDO
                  <span className="verde" id="nrs">npm run sql</span>
                  , ELE IRÁ ATUALIZAR SEU BANCO DE DADOS
            </h4>
            <h4>Comandos</h4>
            <p>
               Em caso de erros na api execute o comando
               <span className="comando">npm run clean-project</span>,
               e em seguida
               <span className="comando">npm run rebuild-project</span>
            </p>
            <hr/>
         </CardInfoImportante>

      );
   }

}

export default BoxUsuario;