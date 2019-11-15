import React, { Component } from 'react';
import CardInfoImportante from '../components/ComponentCardInfoImportante.js';

class BoxImportante extends Component{
   
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
            <h4>Sobre a rota 'Anuncios'</h4>
            <p>
               Esta rota possui alguns atributos que podem ser passados na 
               URL em suas requisição.
            </p>
            <p>
               Eles são muito importantes pois são eles que deteminam quais
               dados, e em qual ordem eles devem ser "entregues"
            </p>
            <p>
               Abaixo segue uma breve explicação sobre cada um, qualquer 
               duvida é só falar comigo na sala ou no whats 
            </p>
            <ul>
               <li>id_usuario) Pode ser igual a zero caso o usuario não esteja logado</li>
               <li>id_console) Caso nenhum console for selecionado ele pode ser igual a zero</li>
               <li>id_console_troca) Caso nenhum console de troca for selecionado ele pode ser igual a zero</li>
               <li>id_genero) Caso nenhum genero for selecionado ele pode ser igual a zero</li>
               <li>slug_jogo) Caso nenhum jogo for selecionado ele pode ser igual a zero</li>
               <li>slug_jogo_troca) Caso nenhum jogo para troca for selecionado ele pode ser igual a zero</li>
               <li>termo_pesquisa) Caso nenhum caso a pesquisa não haja algum termo ele pode ser igual a zero</li>
               <li>pagina) A pagina sempre deverá começar em 1, pode ir até o maximo (quando receber um repsota 404 indicando que não há mais resultados)</li>
               <li>max_app) O max_app (maximo de anuncios por página) é oque seu proprio nome descreve, é o numero de anuncios por pagina</li>
               <li>
                  order_by) O order_by só pode ser dois valores o 1° que é 'preco' (indicando que os anuncios serão ordenados por preço) 
                  e o 2° 'distancia' (indicando que os anuncios serão ordenados por sua distancia total até o usuario) 
               </li>
               <li>
                  ordem) Pode ser apenas dois valores também 1° 'asc' (indica que os anuncios devem ser exibidos de forma crescente) 
                  a 2° 'desc' (indica que os anuncios devem ser exibidos de forma decrescente) 
               </li>
               <li>
                  <p>
                     val_min e val_max) Ambos, respectivamente, representam os valorem minimo e maximo do order_by
                     . Por exemplo, meu order_by é de 'preco', porem so quero os que estão entre 10 e 20 reais, 
                     oque eu faço? Atribuo o valor 10 ao atributo val_min e 20 ao val_max, assim montando a minha URL.
                     Mesma coisa com o order_by 'distancia', supondo que so quero os valores entre  0 e 17 kilometros,
                     simplesmente atribuo o 0 ao val_min e 17 ao val_max.
                  </p>
                  <p>
                     Obs: val_max e val_min, aceitam apenas valores inteiros, sem numeros quebrados ok?
                  </p>
                  <p>
                     Obs2: Algumas rotas ja possuem o order_by "setado", ou seja, elas aceitam apenas aquela "ordenação".
                     Exemplo da rota "Buscar Jogos Para Troca" que aceita apenas ordenaçao por distância.
                  </p>
               </li>
               <li>
                  jogos, consoles e acessorios) Eles representam um "boolean" (caso ele seja zero é false, caso seja 1 é true), 
                  adicionei isto para caso a pessoa só queira ver os jogos de um usuario, ou só os acessorios. Apenas uma 
                  observação, somente UM deles deve ser 'true', os outros dois devem ser false
               </li>
            </ul>
         </CardInfoImportante>

      );
   }

}

export default BoxImportante;