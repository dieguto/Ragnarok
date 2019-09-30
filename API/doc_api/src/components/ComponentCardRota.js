import React, { Component, Fragment } from 'react';
import JSONPretty from 'react-json-prettify';

class ComponentRota extends Component {
 
   componentWillMount() {
      this.estiloJSONPrettyMain = {
         background: 'rgb(0, 0, 0)',
         brace: 'rgb(129, 211, 204)',
         keyQuotes: 'rgb(201, 70, 56)',
         valueQuotes: 'rgb(0, 223, 235)',
         colon: 'rgb(129, 211, 204)',
         comma: 'rgb(129, 211, 204)',
         key: 'rgb(201, 70, 56)',
         value: {
            string: 'rgb(202, 209, 61)',
            null: 'rgb(255, 183, 0)',
            number: 'rgb(0, 132, 255)',
            boolean: 'rgb(129, 211, 204)',
         },
         bracket: 'rgb(129, 211, 204)',
      };

      this.estiloJSONPrettySub = {
         background: 'rgb(0, 0, 0)',
         brace: 'rgb(129, 211, 204)',
         keyQuotes: 'rgb(201, 70, 56)',
         valueQuotes: 'rgb(242, 152, 59)',
         colon: 'rgb(129, 211, 204)',
         comma: 'rgb(129, 211, 204)',
         key: 'rgb(51, 204, 51)',
         value: {
            string: 'rgb(133, 51, 204)',
            null: 'rgb(51, 56, 204)',
            number: 'rgb(204, 51, 150)',
            boolean: 'rgb(235, 0, 12)',
         },
         bracket: 'rgb(129, 211, 204)',
      };

      
   }

   getCompJsonReq(){
      const jsonReq = this.props.jsonReq;
      
      if(jsonReq){
         return(
            <Fragment>
               <p>Formato do JSON a ser enviado:</p>
               <pre className="json">
                  <JSONPretty json={jsonReq} theme={this.estiloJSONPrettyMain} />
               </pre>
            </Fragment>
         );
      } else {
         return(
            <span></span>
         );
      }
   };

   getDescricao(){
      const descricao = this.props.descricao;
      
      if(descricao){
         return(
            <Fragment>
               {descricao}
            </Fragment>
         );
      } else {
         return(
            <span></span>
         );
      }
   }

   render() {

      const GetCompResp = ()=>{

         return this.props.jsonResp.map((resp) =>{
         const status = resp.status;
         let respJson = resp.resp;

         let DivJsonResp = "";
         let desc = "";
         let classStatus = "";
         const statusString = status + "";

         if(respJson){

            if(respJson.tipo === "erro"){
               respJson = {
                  errors: 
                  [
                     {
                        message: "Erro 1",
                        path: "nome_do_campo1"
                     },
                     {
                        message: "Erro 2",
                        path: "nome_do_campo2"
                     },
   
                  ]
               };
            } else {
               respJson = respJson.customJson;
            }

            DivJsonResp =
               <Fragment>
                  <p>E tambem retorna um JSON no formato:</p> 
                  <pre className="json">
                     <JSONPretty json={ respJson } theme={ this.estiloJSONPrettySub } />
                  </pre>
               </Fragment>
         } else {
            DivJsonResp = <span></span>
         }

         if(statusString[0] === "2"){
            classStatus = "verde";

         } else if(statusString[0] === "4" || statusString[0] === "5"){
            classStatus = "vermelho";

         } else {
            classStatus = "alerta";
         }

         switch(status){
            case 200:
               desc = "Ok"
               break;
            
            case 201:
               desc = "Criado com sucesso!"; 
               break;
            
            case 400:
               desc = "Má requisição"; 
               break;
            
            case 401:
               desc = "Não autorizado (não possui o(s) privilégio(s))"; 
               break;
            
            case 403:
               desc = "Probido (token inválido)"; 
               break;
            
            case 404:
               desc = "Não encontrado"; 
               break;
            
            case 409:
               desc = "Conflito"; 
               break;
            
            case 412:
               desc = "Pré condição falhou (falta o header do authorization)"; 
               break;

            case 423:
               desc = "Trancado (Bloqueado)";
               break;

            case 500:
               desc = "Erro no servidor";
               break;

            default:
               desc = "Status " + status;
               break;
         }


         return(
            <Fragment key={status}>
               <div className="cx_resp" style={{marginBottom:10+"px"}}>
                  <span className={ classStatus }>{ status }</span>
                  <span className="desc">{ desc }</span>
               </div>
               { DivJsonResp }
            </Fragment>
         );
            
      })


      };

      return (
         <Fragment>

            <div className="card" style={{marginBottom: 25+'px'}}>

               <div className="card-header" style={{ backgroundColor: 'royalBlue' }} 
                  data-toggle="collapse" data-target={ "#collapse" + this.props.parentAcc + this.props.titulo.replace(/ /g, "_")} aria-controls={ "collapse" + this.props.parentAcc + this.props.titulo.replace(/ /g, "_") }>
                  <h3 className="font-weight-bold">{this.props.titulo}</h3>
               </div>

               <div id={ "collapse" + this.props.parentAcc + this.props.titulo.replace(/ /g, "_") } className="collapse" data-parent={ "#" + this.props.parentAcc }>
                  <div className="card-body" style={{ backgroundColor: 'black' }}>
                     <div className="card-title">
                        <h4 className="font-weight-bold">{this.props.rota}</h4>
                     </div>
                     <div className="card-subtitle text-muted">
                        <p>Método {this.props.metodo.toUpperCase()}</p>
                     </div>
                     <div className="card-text">
                        
                        {this.getDescricao()}

                        {/* VERIFICA SE EXISTE UMA JSON A SER PASSADO NA REQUESIÇÃO */}
                        { this.getCompJsonReq() }
                           
                        <hr/>

                        <p>Possiveis Respostas HTTP:</p>

                        {/* //{ this.getCompJsonResp() } */}

                        <div className="cx_status">

                           <GetCompResp/>

                        </div>

                     </div>
                  </div>
               </div>
            </div>

         </Fragment>
      );
   }
}

export default ComponentRota;