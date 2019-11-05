import React, { Component, Fragment } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxUsuario extends Component{

   descToken(termo){
      return (
         <Fragment>
            <p>
               Apenas o proprio usuario poderá se "{ termo }",
               a menos que o token seja de um admin, assim, 
               a requisição é aceita sem maiores problemas.
            </p>
         </Fragment>
      );
   }

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

      this.descCriar = 
      <Fragment>
         <p>Texto legal</p>
      </Fragment>;
      
      //JSON's da rota de buscar usuario com anuncios ===========

      this.respGetByIdWithAnuncios = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson: {
                  "criado_em": "30 de Setembro de 2019",
                  "id": 5,
                  "nome": "Carla",
                  "endereco": "SP, Osasco",
                  "anuncios": [
                      {
                          "info_rawg": {
                              "jogo": {
                                  "nota_metacritic": 93,
                                  "nota_geral": 4.4,
                                  "nome": "Grand Theft Auto: San Andreas",
                                  "dt_lancamento": "26 de Outubro de 2004",
                                  "imagem_fundo": "https://media.rawg.io/media/games/1bb/1bb86c35ffa3eb0d299b01a7c65bf908.jpg",
                                  "imagem_fundo_adicional": "https://media.rawg.io/media/screenshots/236/236efd76a15fca0ce4d9129a788e517e.jpg",
                                  "video": "https://media.rawg.io/media/stories-640/3d0/3d0f771fd1c11a0e1e3ba62d95d916ae.mp4",
                                  "preview_video": "https://media.rawg.io/media/stories-previews/1d0/1d01321bc0f86a1c576e2329bdf13f8f.jpg",
                                  "desenvolvedoras": [
                                      "Rockstar Games",
                                      "Rockstar North"
                                  ],
                                  "publishers": [
                                      "Rockstar Games"
                                  ]
                              }
                          },
                          "c_fotos": [
                              "fotos/1/0.jpg",
                              "fotos/1/1.jpg",
                              "fotos/1/2.jpg"
                          ],
                          "criado_em": "30 de Setembro de 2019 às 06:05:09",
                          "atualizado_em": "30 de Setembro de 2019 às 06:05:09",
                          "id_anuncio": 1,
                          "titulo": "GTA San Andreas ('zerado')",
                          "descricao": "Gta sa zerado na caixa pra play 2",
                          "preco": "R$ 20,00",
                          "is_acessorio": false,
                          "is_console": false,
                          "is_jogo": true,
                          "console": {
                              "id_console": 1,
                              "nome": "Playstation 2",
                              "fabricante": {
                                  "id_fabricante": 1,
                                  "nome": "Sony"
                              }
                          },
                          "console_troca": null,
                          "genero": {
                              "id_genero": 1,
                              "nome": "Ação"
                          }
                      }
                  ]
              }
            }
         },
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson: {
                  "id": 6,
                  "nome": "Jeimer",
                  "endereco": "SP, São Paulo",
                  "criado_em": "24 de Setembro de 2019",
                  "anuncios": []
              }
            }
         },
         {
            status:400,
            resp: null
         },
         {
            status:404,
            resp: null
         },
         {
            status:423,
            resp: null
         }
      ];
      //JSON's da rota de Buscar usuario por ID =========== 

      this.respGetUsuarioById = [
         {
            status:200,
            resp:{
               tipo:"custom",
               customJson:{
                  "id": 6,
                  "nome": "Jeimer",
                  "endereco": "SP, São Paulo",
                  "criado_em": "24 de Setembro de 2019"
              }
            }
         },
         {
            status:400,
            resp: null
         },
         {
            status:404,
            resp: null
         },
         {
            status:423,
            resp: null
         }
      ]

      //JSON's da rota de criar ===========
      this.reqEditar = { 
         id:"id do usuario (OBRIGATORIO)",
         nome: "Chimbinha Gomes (OPCIONAL)", 
         email: "chimbinha@gmail.com (OPCIONAL)",
         cep:"66635-110 (OPCIONAL)", 
         senha: "amo_a_joelma_123 (OPCIONAL)",
         is_admin: "true ou false (OPCIONAL APENAS PARA ADMIN)" 
      };

      // this.descEditar = 
      // <Fragment>
      //    <p>
      //       Apenas o proprio usuario podera "se editar",
      //       a menos que o token seja de um admin, assim, 
      //       liberando a edição do usuario sem maiores 
      //       problemas.
      //    </p>
      // </Fragment>;

      this.respEditar = [
         {
            status:200,
            resp:null
         },
         {
            status:400,
            resp:{
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
      ];

      //JSON's da rota de criar ===========
      this.respGetUsuarioByIdCompleto = [
         {
            status:200,
            resp:{
               tipo:"customizado",
               customJson:{
                  "id": 9,
                  "nome": "Chimbinha Gomes",
                  "email": "chimbinha@gmail.com",
                  "senha": "senha_em_sha512",
                  "endereco": "PA, Belém",
                  "lat": "-1.3719",
                  "lon": "-48.4434",
                  "is_bloqueado": false,
                  "is_admin": false,
                  "cep": "66635-110"
              }
            }
         },
         {
            status:400,
            resp:null
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
            status:423,
            resp:null
         }
      ];

      //JSON's da rota de criar ===========
      this.respBloquear = [
         {
            status:200,
            resp:null,
         },
         {
            status:400,
            resp:null
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
      ];      
      
      //JSON's da rota de criar ===========
      this.respDeletar = [
         {
            status:200,
            resp:null,
         },
         {
            status:400,
            resp:null
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
      ];

      
      //JSON's da rota de  ===========
      //JSON's da rota de  ===========
      //JSON's da rota de  ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Por ID' metodo='get' 
               rota="/usuario/:id" jsonResp={ this.respGetUsuarioById } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Por ID com anuncios' metodo='get' 
               rota="/usuario/:id/com/:qtd/anuncios" jsonResp={ this.respGetByIdWithAnuncios } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Por ID Completo - REQUER TOKEN' metodo='get' 
               rota="/usuario/:id/completo" descricao={ this.descToken("buscar") } jsonResp={ this.respGetUsuarioByIdCompleto } />

            <CardRota parentAcc={ this.parentAcc } titulo='Criar' metodo='post' 
               rota="/usuario" jsonReq={ this.reqCriar } jsonResp={ this.respCriar } />

            <CardRota parentAcc={ this.parentAcc } titulo='Editar - REQUER TOKEN' metodo='put' 
               rota="/usuario" descricao={ this.descToken("editar") } jsonReq={ this.reqEditar } jsonResp={ this.respEditar } />
            
            <CardRota parentAcc={ this.parentAcc } titulo='Deletar - REQUER TOKEN' metodo='delete' 
               rota="/usuario/:id" descricao={ this.descToken("deletar") } jsonResp={ this.respDeletar } />

            <CardRota parentAcc={ this.parentAcc } titulo='Bloquear - REQUER TOKEN DE ADMIN' metodo='patch' 
               rota="/usuario/bloquear/:id" jsonResp={ this.respBloquear } />

         </CardPrincipal>

      );
   }

}

export default BoxUsuario;