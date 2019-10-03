import React, { Component, Fragment } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxAnuncio extends Component{

   descToken(termo){
      return (
         <Fragment>
            <p>
               Apenas o proprio usuario poderá "{ termo }"
               seu proprio anuncio, a menos que o token seja
               de um admin, assim, a requisição é aceita sem
               maiores problemas.
            </p>
         </Fragment>
      );
   }

   componentWillMount(){
      this.titulo = "Anuncio"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");
      
      //======================
      this.respBuscar = [
         {
            status: 200,
            resp:{
               tipo:"customizada",
               customJson:{
                  "info_rawg": {
                      "jogo": {
                          "nota_metacritic": null,
                          "nota_geral": 0,
                          "nome": "Barbie Horse Adventures: Riding Camp",
                          "dt_lancamento": "21 de Outubro de 2008",
                          "imagem_fundo": "https://media.rawg.io/media/screenshots/14e/14e30a9531ebbb9bb662a0d92865b7b8.jpg",
                          "imagem_fundo_adicional": "https://media.rawg.io/media/screenshots/7c7/7c7f6f3449bf5f54e91e61bda3a0ad05.jpg",
                          "video": null,
                          "desenvolvedoras": [
                              "Pixel Tales"
                          ],
                          "publishers": [
                              "Activision Blizzard",
                              "Activision Value Publishing"
                          ]
                      }
                  },
                  "c_fotos": [
                      "fotos/3/0.jpg",
                      "fotos/3/1.jpg",
                      "fotos/3/2.jpg"
                  ],
                  "criado_em": "30 de Setembro de 2019 às 07:50:40",
                  "atualizado_em": "30 de Setembro de 2019 às 07:50:40",
                  "id_anuncio": 3,
                  "titulo": "Jogo da barbie",
                  "descricao": "Barbie, pro 3ds ;)",
                  "preco": "R$ 120,20",
                  "slug_jogo": "barbie-horse-adventures-riding-camp",
                  "slug_jogo_troca": null,
                  "is_acessorio": false,
                  "is_console": false,
                  "is_jogo": true,
                  "console": {
                      "id_console": 7,
                      "nome": "Nintendo 3DS",
                      "fabricante": {
                          "id_fabricante": 3,
                          "nome": "Nintendo"
                      }
                  },
                  "console_troca": null,
                  "genero": {
                      "id_genero": 7,
                      "nome": "Infantil"
                  },
                  "usuario": {
                      "criado_em": "30 de Setembro de 2019",
                      "id": 7,
                      "nome": "Sausage Dog",
                      "endereco": "CH, Guangzhou"
                  }
              }
            }
         },
         {
            status: 404,
            resp: null
         }
      ]

      //======================

      this.respBuscarCompleto = [
         {
            status: 200,
            resp:{
               tipo:"customizada",
               customJson:["A resposta é exatamente igual ao do buscar, porém o preço não vem mais formatado (Ex: R$ 20,00) agora ele vem 'cru' (Ex: 20.00)"]
            }
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
         }
      ]

      //======================
      this.descCriar = 
         <Fragment>
            <p>
               Apenas o proprio usuario poderá "criar"
               seus anuncios.
            </p>
         </Fragment>;

      this.reqCriar = [
         {
            desc:"Exemplo de JSON de um jogo para venda",
            exemplo:{
               titulo:"Jogo da polly",
               descricao:"Jogo da polly em ótimo estado!",
               
               is_jogo:true,
               is_console:false,
               is_acessorio:false,
   
               id_genero:12,
               id_console: 3,
               slug_jogo: "polly",
   
               id_console_troca: null,
               slug_jogo_troca: null,
               preco: 29.90,
   
               array_fotos_base64: ['foto_em_base64_1', 'foto_em_base64_2']
            }
         },
         {
            desc:"Exemplo de JSON de um acessorio para venda",
            exemplo:{
               titulo:"Controle de ps3",
               descricao: null,
               
               is_jogo:false,
               is_console:false,
               is_acessorio:true,
   
               id_genero:null,
               id_console: 3,
               slug_jogo: null,
   
               id_console_troca: null,
               slug_jogo_troca: null,
               preco: 35,
   
               array_fotos_base64: ['foto_em_base64_1', 'foto_em_base64_2']
            }
         },
         {
            desc:"Exemplo de JSON de um console para venda",
            exemplo:{
               titulo:"Xbox 360 destravado",
               descricao: "vem 5 jogos na memória de brinde!",
               
               is_jogo:false,
               is_console:true,
               is_acessorio:false,
   
               id_genero:null,
               id_console: 5,
               slug_jogo: null,
   
               id_console_troca: null,
               slug_jogo_troca: null,
               preco: 330.17,
   
               array_fotos_base64: ['foto_em_base64_1', 'foto_em_base64_2']
            }
         },
         {
            desc:"Exemplo de JSON de um jogo para troca",
            exemplo:{
               titulo:"Troco jogo da barbie de play 2 em jogo do max steal de nintendo switch",
               descricao: "Chama chat",
               
               is_jogo:true,
               is_console:false,
               is_acessorio:false,
   
               id_genero:null,
               id_console: 5,
               slug_jogo: "barbie-explorer",
   
               id_console_troca: 2,
               slug_jogo_troca: "max-steel-covert-missions",
               preco: null,
   
               array_fotos_base64: ['foto_em_base64_1', 'foto_em_base64_2']
            }
         }
      ];

      this.respCriar = [
         {
            status: 201,
            resp: null
         },
         {
            status: 400,
            resp: null
         },
         {
            status: 400,
            resp: {
               tipo:"erro"
            }
         },
         {
            status:403,
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

      //======================

      this.reqEditar = ["O JSON é exatamente igual aos do exemplo, porem, o atributo 'id_anuncio' deve ser adicionado ao JSON de envio"];

      this.respEditar = [
         {
            status: 200,
            resp: null
         },
         {
            status: 400,
            resp: null
         },
         {
            status: 400,
            resp: {
               tipo:"erro"
            }
         },
         {
            status:401,
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

      //======================

      this.respDeletar = [
         {
            status: 200,
            resp: null
         },
         {
            status:401,
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

      //======================


      //JSON's da rota de aieou ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Por ID' metodo='get' 
               rota="/anuncio/:id_anuncio" jsonResp={ this.respBuscar } />
            
            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Por ID Completo' metodo='get' 
               rota="/anuncio/:id_anuncio/completo" jsonResp={ this.respBuscarCompleto } />

            <CardRota parentAcc={ this.parentAcc } titulo='Criar - REQUER TOKEN' metodo='post' 
               rota="/anuncio" descricao={ this.descCriar } jsonReq={ this.reqCriar } jsonResp={ this.respCriar } />

            <CardRota parentAcc={ this.parentAcc } titulo='Editar - REQUER TOKEN' metodo='put' 
               rota="/anuncio" descricao={ this.descToken("editar") } jsonReq={ this.reqEditar } jsonResp={ this.respEditar } />

            <CardRota parentAcc={ this.parentAcc } titulo='Deletar - REQUER TOKEN' metodo='delete' 
               rota="/anuncio" descricao={ this.descToken("deletar") } jsonResp={ this.respDeletar } />


         </CardPrincipal>

      );
   }

}

export default BoxAnuncio;