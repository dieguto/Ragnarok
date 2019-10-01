import React, { Component, Fragment } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxAnuncios extends Component{

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
      this.titulo = "Anuncios - LER IMPORTANTE"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");

      //======================

      this.respJogos = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:[
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
                      "criado_em": "30 de Setembro de 2019 às 11:20:13",
                      "atualizado_em": "30 de Setembro de 2019 às 11:20:13",
                      "id_anuncio": 1,
                      "titulo": "GTA San Andreas ('zerado')",
                      "descricao": "Gta sa zerado na caixa pra play 2",
                      "preco": "R$ 20,00",
                      "slug_jogo": "grand-theft-auto-san-andreas",
                      "slug_jogo_troca": null,
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
                      },
                      "usuario": {
                          "criado_em": "30 de Setembro de 2019",
                          "id": 5,
                          "nome": "Carla",
                          "endereco": "SP, Osasco"
                      },
                      "distancia": "8,1 km"
                  }
              ]
            }
         },
         {
            status:400,
            resp:null
         },
         {
            status:404,
            resp:null
         }
      ]

      this.respAcessorios = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:[
                  {
                      "info_rawg": null,
                      "c_fotos": [
                          "fotos/5/0.jpg",
                          "fotos/5/1.jpg",
                          "fotos/5/2.jpg"
                      ],
                      "criado_em": "30 de Setembro de 2019 às 11:20:13",
                      "atualizado_em": "30 de Setembro de 2019 às 11:20:13",
                      "id_anuncio": 5,
                      "titulo": "headset de play 3 feio",
                      "descricao": "headset usado pra demais de play 3",
                      "preco": "R$ 79,90",
                      "slug_jogo": null,
                      "slug_jogo_troca": null,
                      "console": {
                          "id_console": 2,
                          "nome": "Playstation 3",
                          "fabricante": {
                              "id_fabricante": 1,
                              "nome": "Sony"
                          }
                      },
                      "console_troca": null,
                      "genero": null,
                      "usuario": {
                          "criado_em": "30 de Setembro de 2019",
                          "id": 5,
                          "nome": "Carla",
                          "endereco": "SP, Osasco"
                      },
                      "distancia": "8,1 km"
                  }
              ]
            }
         },
         {
            status:400,
            resp:null
         },
         {
            status:404,
            resp:null
         }
      ]

      this.respConsoles = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:[
                  {
                      "info_rawg": null,
                      "c_fotos": [
                          "fotos/6/0.jpg",
                          "fotos/6/1.jpg",
                          "fotos/6/2.jpg"
                      ],
                      "criado_em": "30 de Setembro de 2019 às 11:20:14",
                      "atualizado_em": "30 de Setembro de 2019 às 11:20:14",
                      "id_anuncio": 6,
                      "titulo": "um nitendo switch filézin",
                      "descricao": null,
                      "preco": "R$ 49,50",
                      "slug_jogo": null,
                      "slug_jogo_troca": null,
                      "console": {
                          "id_console": 8,
                          "nome": "Nintendo Switch",
                          "fabricante": {
                              "id_fabricante": 3,
                              "nome": "Nintendo"
                          }
                      },
                      "console_troca": null,
                      "genero": null,
                      "usuario": {
                          "criado_em": "30 de Setembro de 2019",
                          "id": 6,
                          "nome": "Jeimer",
                          "endereco": "SP, São Paulo"
                      },
                      "distancia": "17,1 km"
                  }
              ]
            }
         },
         {
            status:400,
            resp:null
         },
         {
            status:404,
            resp:null
         }
      ]

      this.respTrocas = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:[
                  {
                      "info_rawg": {
                          "jogo_troca": {
                              "nota_metacritic": null,
                              "nota_geral": 0,
                              "nome": "Miner Ultra Adventures",
                              "dt_lancamento": "27 de Janeiro de 2017",
                              "imagem_fundo": "https://media.rawg.io/media/screenshots/ee6/ee659851099b2cdca5d583880386e8cc.jpg",
                              "imagem_fundo_adicional": "https://media.rawg.io/media/screenshots/6e3/6e31e98eda2f1cb4d9461c814f1501c3.jpg",
                              "video": null,
                              "desenvolvedoras": [
                                  "Old School Blender Addicted"
                              ],
                              "publishers": [
                                  "Manic Mind Game Lab"
                              ]
                          },
                          "jogo": {
                              "nota_metacritic": 61,
                              "nota_geral": 3.7,
                              "nome": "No Mans Sky",
                              "dt_lancamento": "09 de Agosto de 2016",
                              "imagem_fundo": "https://media.rawg.io/media/games/174/1743b3dd185bda4a7be349347d4064df.jpg",
                              "imagem_fundo_adicional": "https://media.rawg.io/media/screenshots/914/914ad9dcc3603508f0200ed8073d00f4.jpg",
                              "video": "https://media.rawg.io/media/stories-640/7f6/7f6303ed351e6c2454ed909a90815d1d.mp4",
                              "preview_video": "https://media.rawg.io/media/stories-previews/322/322a68b347ebd990240b4b0a22b4a85b.jpg",
                              "desenvolvedoras": [
                                  "Hello Games",
                                  "Hello Games LTD"
                              ],
                              "publishers": [
                                  "Hello Games"
                              ]
                          }
                      },
                      "c_fotos": [
                          "fotos/8/0.jpg",
                          "fotos/8/1.jpg",
                          "fotos/8/2.jpg"
                      ],
                      "criado_em": "30 de Setembro de 2019 às 11:20:14",
                      "atualizado_em": "30 de Setembro de 2019 às 11:20:14",
                      "id_anuncio": 8,
                      "titulo": "troco No man's sky de PS4 por Mineirinho ultra adventures de xbox one",
                      "descricao": null,
                      "preco": null,
                      "slug_jogo": "no-mans-sky",
                      "slug_jogo_troca": "miner-ultra-adventures",
                      "console": {
                          "id_console": 3,
                          "nome": "Playstation 4",
                          "fabricante": {
                              "id_fabricante": 1,
                              "nome": "Sony"
                          }
                      },
                      "console_troca": {
                          "id_console": 5,
                          "nome": "Xbox One",
                          "fabricante": {
                              "id_fabricante": 2,
                              "nome": "Microsoft"
                          }
                      },
                      "genero": null,
                      "usuario": {
                          "criado_em": "30 de Setembro de 2019",
                          "id": 8,
                          "nome": "Chimba",
                          "endereco": "AM, Cordajás"
                      },
                      "distancia": "3102,6 km"
                  }
              ]
            }
         },
         {
            status:400,
            resp:null
         },
         {
            status:404,
            resp:null
         }
      ]

      this.respTodos = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:['Pode retornar JSONs de jogos, acessorios, consoles e até trocas (caso a  ordenação não seja por preço, tendo em vista que anuncios de troca não possuem preço), e tambem é retornado o is_jogo, is_acessorio e is_console']
            }
         },
         {
            status:400,
            resp:null
         },
         {
            status:404,
            resp:null
         }
      ]

      this.respUsuario = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:['Pode retornar JSONs de jogos, acessorios, consoles (traz de todos os tipos caso todas as opcões da URL (jogos, acessorios e consoles) sejam false, caso contrario traz apenas do que estiver como true), e tambem é retornado o is_jogo, is_acessorio e is_console']
            }
         },
         {
            status:400,
            resp:null
         },
         {
            status:404,
            resp:null
         }
      ]

      this.respUsuarioTroca = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:['Retorna apenas JSONs de troca do usuario (ordenação não disponivel)']
            }
         },
         {
            status:400,
            resp:null
         },
         {
            status:404,
            resp:null
         }
      ]
      //JSON's da rota de aieou ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Jogos' metodo='get' 
               rota="/anuncios/jogos/:id_usuario/:id_console/:id_genero/:slug_jogo/:pagina/:max_app/:order_by/:val_min/:val_max/:ordem" jsonResp={ this.respJogos } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Acessorios' metodo='get' 
               rota="/anuncios/acessorios/:id_usuario/:id_console/:termo_pesquisa/:pagina/:max_app/:order_by/:val_min/:val_max/:ordem" jsonResp={ this.respAcessorios } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Consoles' metodo='get' 
               rota="/anuncios/consoles/:id_usuario/:id_console/:pagina/:max_app/:order_by/:val_min/:val_max/:ordem" jsonResp={ this.respConsoles } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Jogos Para Troca' metodo='get' 
               rota="/anuncios/trocas/:id_usuario/:slug_jogo/:id_console/:slug_jogo_troca/:id_console_troca/:pagina/:max_app/distancia/:val_min/:val_max/:ordem" jsonResp={ this.respTrocas } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Todos' metodo='get' 
               rota="/anuncios/todos/:id_usuario/:termo_pesquisa/:pagina/:max_app/:order_by/:val_min/:val_max/:ordem" jsonResp={ this.respTodos } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Anuncios do Usuario - Exceto trocas' metodo='get' 
               rota="/anuncios/usuario/:id_usuario/:jogos/:consoles/:acessorios/:pagina/:max_app/preco/:val_min/:val_max/:ordem" jsonResp={ this.respUsuario } />

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Jogos Para Troca do Usuario' metodo='get' 
               rota="/anuncios/troca/usuario/:id_usuario/:pagina/:max_app" jsonResp={ this.respUsuarioTroca } />

         </CardPrincipal>

      );
   }

}

export default BoxAnuncios;