const Op = require("sequelize").Op;
const Sequelize = require("sequelize");
const getDistancia = require("../utils/GetDistancia");
const Anuncio = require("../models/Anuncio");
const Usuario = require("../models/Usuario");
const fs = require("fs");
const path = require("path");
const https = require('https');
const round = require("../utils/Round");
const Dt = require("../utils/DtUtils");
const controllerChat = require("../controller/ControllerChat");

class ControllerAnuncio {

   static checkParams(params, cb){

      if(isNaN(params.id_usuario)){
         cb("Erro: Preencha o parametro da url 'id_usuario' de forma correta, valor esperado '123' e não 'abcde'");
         
      }else if(isNaN(params.id_console) && (!params.is_by_id_usuario && !params.troca && !params.get_todos)){
         cb("Erro: Preencha o parametro da url 'id_console' com um numero");
          
      }else if(params.order_by == 0){
         cb("Erro: Preencha o parametro da url 'order_by' com 'preco' ou 'distancia'");
          
      }else if(isNaN(params.val_min)){
         cb("Erro: Preencha o parametro da url 'val_min' com um numero");
          
      }else if(isNaN(params.val_max)){
         cb("Erro: Preencha o parametro da url 'val_max' com um numero");
          
      }else if(params.ordem == 0){
         cb("Erro: Preencha o parametro da url 'ordem' com 'asc' (crescente) ou 'desc' (decrescente) ");
          
      }else if(isNaN(params.id_console_troca) && params.troca){
         cb("Erro: Preencha o parametro da url 'id_console_troca' com um numero");
          
      } else if(isNaN(params.pagina)){
         cb("Erro: Preencha o parametro da url 'pagina' com um numero"); 
         
      } else if(isNaN(params.max_app)){
         cb("Erro: Preencha o parametro da url 'max_app' com um numero"); 
         
      } else if(isNaN(params.id_genero) && params.is_jogo){
         cb("Erro: Preencha o parametro da url 'id_genero' com um numero"); 
      
      } else {
         cb(null)
      }
   }

   static getTxtDistancia(coord1, coord2){
      const distancia  = getDistancia(
         {
            lat: coord1.lat, 
            lon: coord1.lon
         },
         {
            lat: coord2.lat, 
            lon: coord2.lon
         }, 1);

      let dist_txt = "";

      const resto = distancia % 1;

      if(distancia > 1){
         dist_txt = distancia + " km";
         dist_txt = dist_txt.replace(/\./g, ",")
      
      } else {
         const dist_form = Math.round(resto * 1000);
         dist_txt = dist_form + " metros";
      }

      return dist_txt;
   }

   static getAnuncios(order, where, offset, max_app, callback){

      let opcoes = {
         where,
         order,
         offset,
         limit:max_app,
      };
 
      Anuncio.findAll(opcoes)
      .then(anuncios =>{
         if(anuncios.length != 0){
            callback(200, anuncios);
         } else {
            callback(404, null);
         }
         
      }) 
      .catch(err =>{
         callback(404, null);
      })
   }

   static organizar(anuncios, opcoes){

      if(anuncios != null){
         for(let i = 0; i < anuncios.length; i++){
            if(opcoes.coords){
               const distancia = this.getTxtDistancia(anuncios[i].usuario, opcoes.coords);
               anuncios[i].dataValues.distancia = distancia
            }

            if(!opcoes.todos){
               anuncios[i].is_acessorio = undefined;
               anuncios[i].is_console = undefined;
               anuncios[i].is_jogo = undefined;
            }

            if(anuncios[i].preco){
               anuncios[i].preco = "R$ " + anuncios[i].preco.replace(/\./g, ",");
            }

            if(!opcoes.is_by_usuario){
               anuncios[i].usuario.is_bloqueado = undefined;
               anuncios[i].usuario.is_admin = undefined;
            } else {
               anuncios[i].dataValues.usuario = undefined;
            }
            
            anuncios[i].usuario.lon = undefined;
            anuncios[i].usuario.lat = undefined;

            //caso seja mais que uma fpto
            // fs.readdir(caminho_fotos, (err, files) => {
            //    console.log("friend or foooooee");
            // });
         }
      } else {
         anuncios = [];
      }
      
      return anuncios;
   }

   static getHttps(opcoes){
      return new Promise((resolve, reject) => {
         https.get(opcoes, (res)=>{

            res.setEncoding('utf8');
   
            let dados_acc_do_buffer = "";
   
            res.on("data", (buffer)=>{
               dados_acc_do_buffer += buffer;
            })
            .once('end', ()=>{
               const resp_json = JSON.parse(dados_acc_do_buffer);
               
               resolve(resp_json);
            })
   
         }).on("error", (err)=>{
            reject(500)
         })

      })
   }

   static getInfoRawg(anuncio){
      return new Promise((resolve, reject) => {
         if(anuncio.is_jogo){

            if (anuncio.slug_jogo && anuncio.slug_jogo_troca){

               this.getJogos(anuncio.slug_jogo, anuncio.slug_jogo_troca)
               .then(info_jogos => {
                  resolve(info_jogos)
               })
               .catch(cod => {
                  console.log(`Jogo '${anuncio.slug_jogo}' ou '${anuncio.slug_jogo_troca}' não encontrado`);
                  reject(400);
               })

            } else if(anuncio.slug_jogo){
               
               this.getJogo(anuncio.slug_jogo)
               .then(jogo => {
                  resolve({ jogo })
               })
               .catch(cod => {
                  console.log(`Jogo '${anuncio.slug_jogo}' não encontrado`);
                  reject(400);
               })

            } else {
               console.log("Um jogo necessita do atributo 'slug_jogo'");
               reject(400)
            }

         } else {
            resolve(null);
         }
      })
   }

   static getJogos(slug_jogo, slug_jogo_troca){
      return new Promise((resolve, reject) => {

         this.getJogo(slug_jogo)
         .then(jogo => {

            this.getJogo(slug_jogo_troca)
            .then(jogo_troca => {
               resolve({ jogo, jogo_troca });
            })
            .catch(cod => {
               reject(cod)
            })
         })
         .catch(cod => {
            reject(cod);
         })

      });
   }

   static getJogo(slug){
      return new Promise((resolve, reject) => {
         const opcoes = {
            hostname: 'api.rawg.io',
            headers: {
              'User-Agent': 'TCC-RAGNAROK'
            },
            path:"/api/games/" + slug 
         }

         this.getHttps(opcoes)
         .then(dados_jogo => {

            if(!dados_jogo.detail){
               let info_jogo = {};

               info_jogo.nota_metacritic = dados_jogo.metacritic;

               info_jogo.nota_geral = round(dados_jogo.rating, 1);

               info_jogo.nome = dados_jogo.name_original;

               info_jogo.dt_lancamento = Dt.getDtCompleta(dados_jogo.released)

               info_jogo.imagem_fundo = dados_jogo.background_image;

               info_jogo.imagem_fundo_adicional = dados_jogo.background_image_additional;

               info_jogo.video = null

               if(dados_jogo.clip){
                  info_jogo.video = dados_jogo.clip.clip;

                  if(dados_jogo.clip.preview){
                     info_jogo.preview_video = dados_jogo.clip.preview;
                  }
               }

               info_jogo.desenvolvedoras = [];

               for(let i = 0; i < dados_jogo.developers.length; i ++){
                  info_jogo.desenvolvedoras.push(dados_jogo.developers[i]["name"]);
               }
               
               info_jogo.publishers = [];
               
               for(let i = 0; i < dados_jogo.publishers.length; i ++){
                  info_jogo.publishers.push(dados_jogo.publishers[i]["name"]);
               }

               resolve(info_jogo)
            } else {
               reject(404)
            }
         })
         .catch(cod => {
            reject(cod)
         })
      })
   }

   static findOneAnuncio(opcoes, tipo){
      const organizar = (anuncio) => {

         if(anuncio.preco && tipo != "completo"){
            anuncio.preco = "R$ " + anuncio.preco.replace(/\./g, ",");
         }
         
         anuncio.usuario.is_bloqueado = undefined;
         anuncio.usuario.is_admin = undefined;
         anuncio.usuario.lon = undefined;
         anuncio.usuario.lat = undefined;
         
         return anuncio;
      }

      return new Promise((resolve, reject) => {
         Anuncio.findOne(opcoes)
         .then((anuncio) => {

            if(anuncio){
               resolve(organizar(anuncio))
            } else {
               reject(404)
            }

         })
         .catch(err => {
            reject(404)
         })
      });
   }

   static getCompletoById(id_anuncio, callback){

      if(!isNaN(id_anuncio)){   

         let opcoes = { 
            where:{
                  id_anuncio
               }
         };  

         this.findOneAnuncio(opcoes, "completo")
         .then((anuncio) => {
            callback(200, anuncio)
         })
         .catch(cod => {
            callback(cod, null);
         })
         
      } else {
         console.log("Por favor, digite um numero no parametro 'id'")
         callback(400, null);
      }

   }

   static buscar(id_anuncio, callback){

      if(!isNaN(id_anuncio)){
         const opcoes = { 
            where: { id_anuncio }
         };

         this.findOneAnuncio(opcoes, "busca")
         .then((anuncio) => {
            callback(200, anuncio)
         })
         .catch(cod => {
            callback(cod, null);
         })

      } else {
         console.log("Digite um numero inteiro no parametro 'id_anuncio'")
         callback(400, null)
      }
   }

   static getSqlDaDistancia(lat, lon, val_min, val_max){
      const sql = `
         ROUND(6371 * acos (
            cos ( radians(${lat}) )
            * cos( radians( \`usuario\`.\`lat\` ) )
            * cos( radians( \`usuario\`.\`lon\` ) - radians(${lon}) )
            + sin ( radians(${lat}) )
            * sin( radians( \`usuario\`.\`lat\` ) )), 0) 
         BETWEEN ${val_min} AND ${val_max}
      `;
      
      return Sequelize.literal(sql);
   }

   //callback(status, json)
   static buscarJogos(json_dados, callback){

      json_dados.is_jogo = true;

      this.checkParams(json_dados, err_param => {
         if(err_param){
            console.log(err_param);
            callback(400, null);
            
         } else {
            let { id_usuario, id_console, id_genero, slug_jogo, pagina, max_app, order_by, val_min, val_max, ordem } = json_dados;

            let where = {
               [Op.and]: [
                  Sequelize.literal('`usuario`.`id` <> ' + id_usuario)
              ]
            };

            let order = [];

            if(order_by == "preco"){
               order = [
                  ['preco', ordem]
               ];

               where.preco = {
                  [Op.between]: [val_min, val_max]
               }
            }

            let opcoes = {};

            const offset = ( pagina - 1 ) * max_app;

            Usuario.scope("anuncio").findByPk(id_usuario)
            .then(usuario => {

               if(order_by == "distancia"){
                  if(usuario){
                     const { lat, lon } = usuario;
   
                     opcoes.coords = {};
   
                     opcoes.coords.lat = lat;
                     opcoes.coords.lon = lon;
   
                     order = [
                        Sequelize.literal("ABS((`usuario`.`lat`) - (" + lat + ")) + ABS((`usuario`.`lon`) - (" + lon + ")) " + ordem)
                     ];
   
                     where[Op.and].push(this.getSqlDaDistancia(lat, lon, val_min, val_max))
                  
                  } else {
                     order = [
                        Sequelize.literal("RAND()")
                     ];
                  }
               }
   
               where.is_jogo = true;

               where.slug_jogo_troca = null;
   
               if(slug_jogo != 0){
                  where.slug_jogo = slug_jogo;
               } else {

                  if(id_genero != 0){
                     where.id_genero = id_genero;
                  }
               }

               if(id_console != 0){
                  where.id_console = id_console;
               }
   
               this.getAnuncios(order, where, offset, max_app, (status, anuncios) => {

                  callback(status, this.organizar(anuncios, opcoes));
                  
               });

            });

         }
      });

   }  

   //callback(status, json)
   static buscarAcessorios(json_dados, callback){

      this.checkParams(json_dados, err_param => {
         if(err_param){
            console.log(err_param);
            callback(400, null);
            
         } else {
            let { id_usuario, id_console, termo_pesquisa, pagina, max_app, order_by, val_min, val_max, ordem } = json_dados;

            let where = {
               [Op.and]: [
                  Sequelize.literal('`usuario`.`id` <> ' + id_usuario)
              ]
            };

            let order = [];

            if(order_by == "preco"){
               order = [
                  ['preco', ordem]
               ];

               where.preco = {
                  [Op.between]: [val_min, val_max]
               }
            }

            let opcoes = {};

            const offset = ( pagina - 1 ) * max_app;

            Usuario.scope("anuncio").findByPk(id_usuario)
            .then(usuario => {

               if(order_by == "distancia"){
                  if(usuario){
                     const { lat, lon } = usuario;
   
                     opcoes.coords = {};
   
                     opcoes.coords.lat = lat;
                     opcoes.coords.lon = lon;
   
                     order = [
                        Sequelize.literal("ABS((`usuario`.`lat`) - (" + lat + ")) + ABS((`usuario`.`lon`) - (" + lon + ")) " + ordem)
                     ];
   
                     where[Op.and].push(this.getSqlDaDistancia(lat, lon, val_min, val_max))
                  
                  } else {
                     order = [
                        Sequelize.literal("RAND()")
                     ];
                  }
               }

               if(termo_pesquisa != 0){

                  where[Op.or] = [
                     {
                        titulo:{
                           [Op.like]: "%" + termo_pesquisa + "%"
                        }
                     },
                     {
                        descricao:{
                           [Op.like]: "%" + termo_pesquisa + "%"
                        }
                     }
                  ];

               }
   
               if(id_console != 0){
                  where.id_console = id_console;
               }

               where.is_acessorio = true;

               where.slug_jogo_troca = null;

               this.getAnuncios(order, where, offset, max_app, (status, anuncios) => {

                  callback(status, this.organizar(anuncios, opcoes));
                  
               });
            });

         }
      });
   }

    //callback(status, json)
   static buscarConsoles(json_dados, callback){

      this.checkParams(json_dados, err_param => {
         if(err_param){
            console.log(err_param);
            callback(400, null);
            
         } else {

            let { id_usuario, id_console, pagina, max_app, order_by, val_min, val_max, ordem } = json_dados;

            let where = {
               [Op.and]: [
                  Sequelize.literal('`usuario`.`id` <> ' + id_usuario)
              ]
            };

            let order = [];

            if(order_by == "preco"){
               order = [
                  ['preco', ordem]
               ];

               where.preco = {
                  [Op.between]: [val_min, val_max]
               }
            }

            let opcoes = {};

            const offset = ( pagina - 1 ) * max_app;

            Usuario.scope("anuncio").findByPk(id_usuario)
            .then(usuario => {

               if(order_by == "distancia"){
                  if(usuario){
                     const { lat, lon } = usuario;
   
                     opcoes.coords = {};
   
                     opcoes.coords.lat = lat;
                     opcoes.coords.lon = lon;
   
                     order = [
                        Sequelize.literal("ABS((`usuario`.`lat`) - (" + lat + ")) + ABS((`usuario`.`lon`) - (" + lon + ")) " + ordem)
                     ];
   
                     where[Op.and].push(this.getSqlDaDistancia(lat, lon, val_min, val_max))
                  
                  } else {
                     order = [
                        Sequelize.literal("RAND()")
                     ];
                  }
               }

               where.is_console = true;

               where.slug_jogo_troca = null;

               if(id_console != 0){
                  where.id_console = id_console;
               }

               this.getAnuncios(order, where, offset, max_app, (status, anuncios) => {

                  callback(status, this.organizar(anuncios, opcoes));
                  
               });
            });
         }
      });

   }

    //callback(status, json)
   static buscarTrocas(json_dados, callback){

      json_dados.trocas = true;

      this.checkParams(json_dados, err_param => {
         if(err_param){
            console.log(err_param);
            callback(400, null);
            
         } else {

            let { id_usuario, id_console, id_console_troca, slug_jogo, slug_jogo_troca, pagina, max_app, val_min, val_max, ordem } = json_dados;

            let where = {
               [Op.and]: [
                  Sequelize.literal('`usuario`.`id` <> ' + id_usuario)
              ]
            };

            let order = [];

            let opcoes = {};

            const offset = ( pagina - 1 ) * max_app;

            Usuario.scope("anuncio").findByPk(id_usuario)
            .then(usuario => {

               if(usuario){
                  const { lat, lon } = usuario;

                  opcoes.coords = {};

                  opcoes.coords.lat = lat;
                  opcoes.coords.lon = lon;

                  order = [
                     Sequelize.literal("ABS((`usuario`.`lat`) - (" + lat + ")) + ABS((`usuario`.`lon`) - (" + lon + ")) " + ordem)
                  ];

                  where[Op.and].push(this.getSqlDaDistancia(lat, lon, val_min, val_max))
               
               } else {
                  order = [
                     Sequelize.literal("RAND()")
                  ];
               }

               where.is_jogo = true;
               where.preco = null;

               if(id_console != 0){
                  where.id_console_troca = id_console;
               }
               
               if(id_console_troca != 0){
                  where.id_console = id_console_troca;
               }

               if(slug_jogo != 0){
                  where.slug_jogo_troca = slug_jogo;
               }

               if(slug_jogo_troca != 0){
                  where.slug_jogo = slug_jogo_troca;
               }

               this.getAnuncios(order, where, offset, max_app, (status, anuncios) => {

                  callback(status, this.organizar(anuncios, opcoes));
                  
               });
            });
         }
      });

   } 
   
   //callback(status, json)
   static buscarByIdUsuario(json_dados, callback){

      json_dados.is_by_id_usuario = true;

      this.checkParams(json_dados, err_param => {
         if(err_param){
            console.log(err_param);
            callback(400, null);
            
         } else {

            let { id_usuario, pagina, max_app, jogos, acessorios, consoles, val_min, val_max, ordem } = json_dados;

            if(isNaN(jogos) || isNaN(acessorios) || isNaN(consoles)){ 
               console.log("os parametros 'jogos', 'acessorios' e 'consoles' devem ser numeros inteiros");
               callback(400, null);
            } else {

               if((jogos != 0 && jogos != 1) || (acessorios != 0 && acessorios != 1) || (consoles != 0 && consoles != 1)){
                  console.log("os parametros 'jogos', 'acessorios' e 'consoles' devem ser iguais a 1 ou 0");
                  callback(400, null);

               } else {
                  let where = {};

                  let order = [
                     ['preco', ordem]
                  ]; 

                  where.preco = {
                     [Op.between]: [val_min, val_max]
                  }

                  const offset = ( pagina - 1 ) * max_app;

                  if(jogos != 0){
                     where.is_jogo = true;
      
                  } else if(acessorios != 0){
                     where.is_acessorio = true;
      
                  } else if(consoles != 0){
                     where.is_console = true;
                  }

                  where.slug_jogo_troca = null;

                  Usuario.findByPk(id_usuario)
                  .then(usuario => {

                     if(usuario){
                        where.id_usuario = id_usuario;

                        this.getAnuncios(order, where, offset, max_app, (status, anuncios) => {

                           callback(status, this.organizar(anuncios, {}));
                           
                        });
                     } else {
                        callback(404, null);
                     }
                  });
               }

            }
            
         }
      });

   } 

   static buscarTodosByIdUsuarioFiltrado(json_dados, callback){

      let { id_usuario, jogos, acessorios, consoles } = json_dados;

      if(isNaN(jogos) || isNaN(acessorios) || isNaN(consoles) || isNaN(id_usuario)){ 
         console.log("os parametros 'jogos', 'acessorios', 'consoles' e 'id_usuario' devem ser numeros inteiros");
         callback(400, null);
      } else {

         if((jogos != 0 && jogos != 1) || (acessorios != 0 && acessorios != 1) || (consoles != 0 && consoles != 1)){
            console.log("os parametros 'jogos', 'acessorios' e 'consoles' devem ser iguais a 1 ou 0");
            callback(400, null);

         } else {
            let where = {};

            if(jogos != 0){
               where.is_jogo = true;

            } else if(acessorios != 0){
               where.is_acessorio = true;

            } else if(consoles != 0){
               where.is_console = true;
            }

            Usuario.findByPk(id_usuario)
            .then(usuario => {

               if(usuario){
                  where.id_usuario = id_usuario;

                  this.getAnuncios([], where, 0, 999999, (status, anuncios) => {

                     callback(status, this.organizar(anuncios, {}));
                     
                  });
               } else {
                  callback(404, null);
               }
            });
         }

      }     

   } 
   
   //callback(status, json)
   static buscarTrocasByIdUsuario(json_dados, callback){

      let { id_usuario, pagina, max_app } = json_dados;

      if(isNaN(id_usuario) || isNaN(pagina) || isNaN(max_app)){ 
         console.log("os parametros 'id_usuario', 'pagina' e 'max_app' devem ser numeros inteiros");
         callback(400, null);
      
      } else {
         let where = {};

         const offset = ( pagina - 1 ) * max_app;

         where.preco = null;

         Usuario.findByPk(id_usuario)
         .then(usuario => {

            if(usuario){
               where.id_usuario = id_usuario;

               this.getAnuncios([], where, offset, max_app, (status, anuncios) => {

                  callback(status, this.organizar(anuncios, {}));
                  
               });
            } else {
               callback(404, null);
            }
         });  
      }

      

   }
   
   //callback(status, json)
   static buscarTodos(json_dados, callback){

      json_dados.get_todos = true;

      this.checkParams(json_dados, err_param => {
         if(err_param){
            console.log(err_param);
            callback(400, null);
            
         } else {
            let { id_usuario, termo_pesquisa, pagina, max_app, order_by, val_min, val_max, ordem } = json_dados;

            let where = {
               [Op.and]: [
                  Sequelize.literal('`usuario`.`id` <> ' + id_usuario)
              ]
            };

            let order = [];

            if(order_by == "preco"){
               order = [
                  ['preco', ordem]
               ];

               where.preco = {
                  [Op.between]: [val_min, val_max]
               }
            }

            let opcoes = {};

            opcoes.todos = true;

            const offset = ( pagina - 1 ) * max_app;

            Usuario.scope("anuncio").findByPk(id_usuario)
            .then(usuario => {

               if(order_by == "distancia"){
                  if(usuario){
                     const { lat, lon } = usuario;
   
                     opcoes.coords = {};
   
                     opcoes.coords.lat = lat;
                     opcoes.coords.lon = lon;
   
                     order = [
                        Sequelize.literal("ABS((`usuario`.`lat`) - (" + lat + ")) + ABS((`usuario`.`lon`) - (" + lon + ")) " + ordem)
                     ];
   
                     where[Op.and].push(this.getSqlDaDistancia(lat, lon, val_min, val_max))
                  
                  } else {
                     order = [
                        Sequelize.literal("RAND()")
                     ];
                  }
               }

               if(termo_pesquisa != 0){

                  where[Op.or] = [
                     {
                        titulo:{
                           [Op.like]: "%" + termo_pesquisa + "%"
                        }
                     },
                     {
                        descricao:{
                           [Op.like]: "%" + termo_pesquisa + "%"
                        }
                     }
                  ]  

               }

               this.getAnuncios(order, where, offset, max_app, (status, anuncios) => {
                  
                  callback(status, this.organizar(anuncios, opcoes));
                  
               });
            });

         }
      });
   }
 
   static criarFotos(array_fotos_base64, caminho, caminho_relativo){
      return new Promise((resolve, reject) => {

         

         for(let i = 0; i < array_fotos_base64.length; i++){
            array_fotos_base64[i] = array_fotos_base64[i].split(';base64,').pop();
         }

         let c_fotos = [];

         let i = 0;

         const criarFoto = () => {
            const nome_arquivo = i + ".jpg";

            const caminho_foto_relativo = caminho_relativo + nome_arquivo;
            
            const caminho_foto = caminho + "/" + nome_arquivo;

            fs.writeFile(caminho_foto, array_fotos_base64[i], {encoding: 'base64'}, err =>{
               
               c_fotos.push(caminho_foto_relativo);
               
               i++;

               if(err){
                  console.log("Erro ao criar arquivo no caminho: " + caminho_foto);
                  reject(500);

               } else {
                  if(i == array_fotos_base64.length){
                     resolve(c_fotos);
                  } else {
                     criarFoto();
                  }
               }
            })
         }
         
         criarFoto();

      })
   }

   static criarPastaAndFotos(array_fotos_base64, caminho, caminho_relativo){
      return new Promise((resolve, reject) => {

         fs.mkdir(caminho, err => {
            if(!err){

               this.criarFotos(array_fotos_base64, caminho, caminho_relativo)
               .then((c_fotos) => {
                  resolve(c_fotos);
               })
               .catch(cod => {
                  reject(cod);
               })

            } else {
               console.log("Erro ao criar a pasta no caminho: " + caminho);
               reject(500);
            }

         })
      });
   }

   static createAnuncio(anuncio_json, array_fotos_base64){
      return new Promise((resolve, reject) => {

         this.getInfoRawg(anuncio_json)
         .then(info_rawg => {
            
            Anuncio.create(anuncio_json)
            .then(anuncio =>{

               const caminho_relativo = "fotos/" + anuncio.id_anuncio + "/";

               const caminho_fotos = path.resolve(__dirname + "/../fotos/" + anuncio.id_anuncio + "/");

               this.criarPastaAndFotos(array_fotos_base64, caminho_fotos, caminho_relativo)
               .then((c_fotos) => {
                  anuncio.c_fotos = c_fotos;
                  anuncio.info_rawg = info_rawg;

                  anuncio
                  .save()
                  .then(() => {
                     resolve()
                  })
                  .catch((err)=>{
                     const rej = {status: 400, err}
                     reject(rej);
                  })
               })
               .catch(cod => {
                  const rej = {status: cod, err: null};
                  reject(rej);
               })

            })
            .catch(err =>{
               const rej = {status: 400, err};
               reject(rej)
            })

         })
         .catch(cod => {
            const rej = {status: cod, err: null};
            reject(rej);
         }) 
         

      });
   }

   static setCrUpJson(anuncio, callback){
      const { id_usuario, titulo, descricao, id_console } = anuncio;

      let err = false;

      let anuncio_json = {
         is_jogo:false,
         is_console:false,
         is_acessorio:false,

         id_genero:null,
         slug_jogo:null,

		   id_console_troca: null,
         slug_jogo_troca: null,
         preco: null,
         info_rawg: null,

         id_usuario, titulo,
         descricao, id_console,
         c_fotos: ""
      };

      if(!titulo || !id_console){
         err = true;
         console.log("Caso o anuncio esteja sendo criado ou editado, o titulo e o id_console são obrigatórios (ambos não sendo nulos)!!!");
      }
      
      if(anuncio.is_put){
         delete anuncio_json.id_usuario;
         delete anuncio_json.c_fotos;
         delete anuncio_json.id_anuncio;
      }

      if(anuncio.is_jogo){
         const { id_genero, slug_jogo } = anuncio;

         if(id_genero && slug_jogo){

            anuncio_json.id_genero = id_genero;
            anuncio_json.slug_jogo = slug_jogo;

         } else {
            err = true;
            console.log("Caso o anuncio seja de um jogo para venda, é obrigatorio o id_genero e o slug_jogo (ambos não sendo nulos)!!!");
         }
      }

      if(anuncio.preco){
         
         anuncio_json.preco = anuncio.preco;
         
      } else if(anuncio.slug_jogo_troca){

         const { slug_jogo_troca, id_console_troca } = anuncio;

         if(slug_jogo_troca && id_console_troca){

            anuncio_json.slug_jogo_troca = slug_jogo_troca;
            anuncio_json.id_console_troca = id_console_troca;
            
         } else {
            err = true;
            console.log("Caso o anuncio seja de troca, é obrigatorio o slug_jogo_troca e id_console_troca (todos não sendo nulos)!!!");
         }

      } else {
         err = true;
         console.log("Um anuncio deve possuir um slug_jogo e um id_genero caso seja para vendas, ou, um slug_jogo_troca e um id_console troca caso seja para troca!!!");
      }
      
      if (anuncio.is_jogo) {

         anuncio_json.is_jogo = true;

      } else if(anuncio.is_acessorio){

         anuncio_json.is_acessorio = true;
         
      } else if(anuncio.is_console){

         anuncio_json.is_console = true;

      } else {
         err = true;
         console.log("is_jogo, is_acessorio ou is_console é obrigatório!!!");
      }

      if(!err){
         callback(null, anuncio_json)
      } else {
         callback(400, null)
      }
   }

   static rmUndefineds(json){
      const campos_json = Object.keys(json);

      for(let i = 0; i < campos_json.length; i++){

         if(json[campos_json[i]] === undefined){
            delete json[campos_json[i]];
         }

      }
      
      return json;
   }

   static gravar(anuncio, callback){
      
      this.setCrUpJson(anuncio, (cod_err, anuncio_json) => {

         if(!cod_err){

            const { array_fotos_base64 } = anuncio;

            this.createAnuncio(anuncio_json, array_fotos_base64)
            .then(() => {
               console.log("Anuncio criado com sucesso!")
               callback(201, null)
            })
            .catch((json) => {
               callback(json.status, json.err)
            })
         } else {
            callback(cod_err, null)
         }

      })
   }

   static putAnuncio(anuncio_put, anuncio){

      let rej = {};

      return new Promise((resolve, reject) => {

         this.setCrUpJson(anuncio_put, (cod_err, anuncio_json) => {

            if(!cod_err){
               this.getInfoRawg(anuncio_json)
               .then(info_rawg => {
 
                  anuncio_json.info_rawg = info_rawg;

                  const caminho_relativo = "fotos/"+ anuncio.id_anuncio + "/";

                  const caminho_fotos = path.resolve(__dirname + "/../" + caminho_relativo);
   
                  this.excluirArquivosDaPasta(caminho_fotos)
                  .then(() => {

                     const { array_fotos_base64 } = anuncio_put;
      
                     this.criarFotos(array_fotos_base64, caminho_fotos, caminho_relativo)
                     .then(c_fotos => {
                        anuncio_json.c_fotos = c_fotos;

                        Object.assign(anuncio, this.rmUndefineds(anuncio_json));
                        
                        anuncio
                        .save()
                        .then(anuncio => {
                           resolve()
                        })
                        .catch(err => {
                           rej = { status: 400, err };
                           reject(rej);
                        })
                        
                     })
                     .catch(cod => {
                        rej = { status: cod, err: null };
                        reject(rej);
                     })
                     
                  })
                  .catch(cod => {
                     rej = { status: cod, err: null };
                     reject(rej);
                  })

               })
               .catch(cod => {
                  const rej = {status: cod, err: null};
                  reject(rej);
               })
               
   
            } else {
               rej = { status: cod_err, err: null };
               reject(rej);
            }
         })
      
      })

   }

   static isAnuncioDoUsuario(id_anuncio, id_usuario) {
      return new Promise((resolve, reject) => {

         Anuncio.findOne({
            where:{
               id_anuncio,
               id_usuario
            }
         })
         .then((anuncio) => {
            if(anuncio){
               resolve(anuncio)
            } else {
               reject(401)
            }
            
         })
         .catch(() => {
            reject(404);
         })
      });
   }

   static excluirArquivosDaPasta(caminho){
      return new Promise((resolve, reject) => {

         fs.readdir(caminho, (err, arquivos) => {
            if(!err){
               if(arquivos.length != 0){

                  let i = 0;

                  const deletarFoto = () => {
                     fs.unlink(caminho + "/" + arquivos[i], err =>{

                        i++;

                        if(err){
                           console.log("Erro ao excluir arquivo no caminho: " + caminho + "/" + arquivos[i])
                           reject(500)
                        } else {
                           if(i == arquivos.length){
                              resolve()
                           } else {
                              deletarFoto();
                           }
                        }
                     })
                  }
                  
                  deletarFoto();

               } else {
                  resolve();
               }
               
            } else {
               console.log("Erro ao ler conteúdos da pasta: " + caminho);
               reject(500)
            }

         })

      })
   }

   static editar(anuncio_put, usuario_token, callback){
      
      const { id_anuncio } = anuncio_put;
      
      if(usuario_token.is_admin){
         Anuncio.findOne({ where: { id_anuncio } })
         .then(anuncio => {

            if(anuncio){
               this.putAnuncio(anuncio_put, anuncio)
               .then(() => {
                  console.log("Anuncio editado com sucesso!")
                  callback(200, null)
               })
               .catch(json => {
                  callback(json.status, json.err);
               })
               
            } else {
               callback(404, null);
            }
         })
         .catch(err => {
            callback(404, null);
         })
      
      } else {
         const id_usuario = usuario_token.id;

         anuncio_put.is_put = true;

         this.isAnuncioDoUsuario(id_anuncio, id_usuario)
         .then((anuncio) => {

            this.putAnuncio(anuncio_put, anuncio)
            .then(() => {
               console.log("Anuncio editado com sucesso!")
               callback(200, null)
            })
            .catch(json => {
               callback(json.status, json.err);
            })
            
         })
         .catch((cod) => {
            callback(cod, null)
         })

      }

   }

   static deletar(id_anuncio, usuario_token, callback){
      
      if(!isNaN(id_anuncio)){

         if(usuario_token.is_admin){
            Anuncio.findOne({ where: { id_anuncio } })
            .then(anuncio => {

               if(anuncio){
                  this.deleteAnuncio(anuncio)
                  .then(() => {
                     console.log("Anuncio deletado com sucesso!")
                     callback(200, null)
                  })
                  .catch(cod => {
                     callback(cod, null);
                  })
                  
               } else {
                  callback(404, null);
               }

            })
            .catch(err => {
               callback(404, null);
            })
         
         } else {
            const id_usuario = usuario_token.id;

            this.isAnuncioDoUsuario(id_anuncio, id_usuario)
            .then((anuncio) => {
               
               this.deleteAnuncio(anuncio)
               .then(() => {
                  console.log("Anuncio deletado com sucesso!")
                  callback(200, null)
               })
               .catch(cod => {
                  callback(cod, null);
               })
               
            })
            .catch((cod) => {
               callback(cod, null)
            })

         }
      } else {
         console.log("Por favor, digite um numero inteiro no parametro 'id_anuncio'")
         callback(400, null)
      }
   }
   
   static deleteAnuncio(anuncio){
      return new Promise((resolve, reject) => {

         const caminho_fotos = path.resolve(__dirname + "/../fotos/" + anuncio.id_anuncio + "/");

         this.excluirArquivosDaPasta(caminho_fotos)
         .then(() => {
            fs.rmdir(caminho_fotos, err =>{

               if(err){
                  console.log("Erro ao exluir a pasta no cmainho: " + caminho_fotos);
                  reject(500)
               } else {
                  controllerChat.excluirChatsByAnuncio(anuncio.id_anuncio)
                  .then(() => {
                     anuncio.destroy();
                     resolve()
                  })
               }

            });
         })
         .catch(cod => {
            reject(cod)
         })
      })
   }
}

module.exports = ControllerAnuncio;