const sha512 = require("js-sha512").sha512;
const Usuario = require("../models/Usuario");
const BrCoords = require("../utils/BrasilCoordenadas");
const Anuncio = require("../models/Anuncio");
const controllerAnuncio = require("./ControllerAnuncio");
const Dt = require("../utils/DtUtils");

class ControllerUsuario{

   //callback(err_json, info)
   static getCep(cep, callback){

      let err_json = {};

      err_json.obj = {};

      const cep_sem_traco = typeof cep == 'string' ? cep.replace(/-/g, "") : "vazio";
   
      BrCoords.getByCep(cep_sem_traco, (err, info) => {
         
         if (err) {

            err_json.cod = err;

            if (err == 400) {

               err_json.obj = 
                  {
                     errors: 
                     [
                        {
                           message: "Cep incorreto",
                           path: "cep"
                        }
                     ]
                  };

               callback(err_json, null);

            } else {
               callback(err_json, null);
            }

         } else {
            callback(null, info)
         }
      })

   }

   //FORMATO DO CALLBACK(status, json)
   static gravar(dados_json, callback){

      let { nome, email, senha, cep } = dados_json;

      Usuario.findOne({ where: { email } })
      .then((usuario)=>{

         if(usuario){
            const err_json = 
               {
                  errors: 
                  [
                     {
                        message: "Email já cadastrado",
                        path: "email"
                     }
                  ]
               };

            callback(409, err_json);

         } else {
            this.getCep(cep, (err_json, info) => {
               if(err_json){
                  callback(err_json.cod, err_json.obj);

               } else {
                  const { lat, lon, endereco } = info;
         
                  senha = sha512(senha);
         
                  Usuario.create({
                     nome, email, senha,
                     endereco, lat, lon,
                     is_bloqueado: false,
                     is_admin: false
         
                  }).then((usuario) => {
                     //201 Criado
                     console.log("Usuario criado com sucesso!")
                     callback(201, null);
         
                  }).catch((err) => {
                     //400 Requisição Ruim
                     callback(400, err);
                  });
               }
            })
         }
         
      })
   }

   //FORMATO DO CALLBACK(status, json)
   static getBasicoById(id, callback){

      if(!isNaN(id)){
         Usuario.findByPk(id, { attributes:{ exclude:['is_admin', 'lat', 'lon'] } })
         .then(usuario =>{
            if(usuario){

               if(usuario.is_bloqueado){
                  callback(423, null)

               } else {
                  usuario.is_bloqueado = undefined;

                  callback(200, usuario)
               }
            } else {
               callback(404, null)
            }
         })
         .catch((err) => {
            //404 Não encontrado
            callback(404, null);
         });

      } else {
         console.log("Por favor, digite um numero no parametro 'id'")
         callback(400, null);
      }

   }

   
   
   //FORMATO DO CALLBACK(status, json)
   static getBasicoByIdWithAnuncios(id, qtd, callback){

      if(!isNaN(id) && !isNaN(qtd)){
         const limparAnuncios = (anuncios) => {

            if(anuncios.length != 0) {
               for(let i = 0; i < anuncios.length; i++){
                  if(anuncios[i].preco){
                     anuncios[i].preco = "R$ " + anuncios[i].preco.replace(/\./g, ",");
                  }

                  anuncios[i].slug_jogo = undefined;
                  anuncios[i].slug_jogo_troca = undefined;

                  anuncios[i].dataValues.usuario = undefined;
               }
            }
      
            return anuncios;
         }

         Usuario.findByPk(id, { attributes: { exclude:['lat', 'lon', 'is_admin'] } })
         .then(usuario =>{

            if(usuario){

               if(usuario.is_bloqueado){
                  callback(423, null)

               } else {
                  usuario.is_bloqueado = undefined;

                  Anuncio.findAll({ 
                     where: { id_usuario: usuario.id },
                     limit: qtd
                  })
                  .then(anuncios => {

                     usuario.dataValues.anuncios = limparAnuncios(anuncios);
                     callback(200, usuario)
                  })
                  .catch(err => {
                     console.log(err);
                     usuario.dataValues.anuncios = [];
                     callback(200, usuario);
                  })

               }
            } else {
               callback(404, null)
            }
         })
         .catch((err) => {
            //404 Não encontrado
            callback(404, null);
         });
      } else {
         console.log("Por favor, digite um numero inteiro nos parametros 'id' e 'qtd'")
         callback(400, null);
      }
   }

   //FORMATO DO CALLBACK(status, json)
   static getCompletoById(id, usuario_token, callback){

      if(!isNaN(id)){

         let is_valido = true;

         if(usuario_token.id != id){
            
            if(!usuario_token.is_admin){
               is_valido = false;
            }

         }

         if(is_valido){
            Usuario.scope("completo").findByPk(id)
            .then(usuario =>{
               if(usuario){

                  if(usuario.is_bloqueado){
                     callback(423, null)

                  } else {
                     
                     callback(200, usuario)
                  }
               } else {
                  callback(404, null)
               }
            })
            .catch((err) => {
               //404 Não encontrado
               callback(404, null);
            });

         } else {
            callback(401, null)
         }

      } else {
         console.log("Por favor, digite um numero no parametro 'id'")
         callback(400, null);
      }

   }

   //cb(status, json)
   static editar(usuario_put, usuario_token, callback){

      let is_valido = true;

      if(usuario_token.id != usuario_put.id){
         
         if(!usuario_token.is_admin){
            is_valido = false;
         }

         if(!usuario_token.is_admin && usuario_put.is_admin){
            is_valido = false;
         }

         if(usuario_put.is_bloqueado){
            is_valido = false;
         }
      }

      if(is_valido){

         if(usuario_put.cep){

            this.getCep(usuario_put.cep, (err_json_cep, info) => {

               if(err_json_cep){
                  callback(err_json_cep.cod, err_json_cep.obj)
               
               } else {
                  usuario_put.endereco = info.endereco;
                  usuario_put.lat = info.lat;
                  usuario_put.lon = info.lon;

                  usuario_put.cep = undefined;

                  this.putUsuario(usuario_put, (status, json) =>{
                     callback(status, json);
                  });
         
               }
            })
         
         } else {

            usuario_put.cep = undefined;

            this.putUsuario(usuario_put, (status, json) =>{
               callback(status, json);
            });

         }
      } else {
         callback(401, null);
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

   static putUsuario(usuario_put, callback){

      if(usuario_put.senha){
         usuario_put.senha = sha512(usuario_put.senha);
      }

      Usuario.findByPk(usuario_put.id)
      .then(usuario =>{
         if(usuario){

            Object.assign(usuario, this.rmUndefineds(usuario_put));

            usuario
            .save()
            .then(() => {
               console.log("Usuario editado com sucesso!")
               callback(200, null);
            })
            .catch((err)=>{
               callback(400, err);
            })
            
         } else {
            callback(404, null)
         }
      })
      .catch((err) => {
         //404 Não encontrado
         callback(404, null);
      });

   }

   static deletar(id_usuario, usuario_token, callback){

      if(!isNaN(id_usuario)){
         let is_valido = true;

         if(usuario_token.id != id_usuario){
            
            if(!usuario_token.is_admin){
               is_valido = false;
            }

         }

         if(is_valido){

            Usuario.findOne({ where: { id: id_usuario } })
            .then(usuario => {
               if(usuario){

                  Anuncio.findAll({ where: { id_usuario } })
                  .then(anuncios => {
                     if(anuncios.length != 0){

                        let i = 0;

                        const deletarAnuncio = () => {

                           controllerAnuncio.deleteAnuncio(anuncios[i])
                           .then(() => {
                              if(i == anuncios.length){
                                 usuario.destroy();
                                 console.log("Usuario deletado com sucesso!")
                                 callback(200, null)
                              } else {
                                 i++;
                                 deletarAnuncio();
                              }
                           })
                           .catch(cod => {
                              callback(cod, null)
                           })

                        }

                        deletarAnuncio();

                     } else {
                        usuario.destroy();
                        console.log("Usuario deletado com sucesso!")
                        callback(200, null)
                     }
                  })
                  .catch(err =>{
                     usuario.destroy();
                     console.log("Usuario deletado com sucesso!")
                     callback(200, null)
                  })

               } else {
                  callback(404, null)
               }
            })
            .catch(err => {
               callback(404, null)
            })

         } else {
            callback(401, null);
         }
      } else {
         console.log("Digite um numero inteiro no parametro 'id_usuario'")
         callback(400, null);
      }
   }

   static bloquear(id_usuario, usuario_token, callback){

      if(!isNaN(id_usuario)){
         
         if(usuario_token.is_admin){

            Usuario.findOne({ where: { id: id_usuario } })
            .then(usuario => {
               if(usuario){

                  Anuncio.findAll({ where: { id_usuario } })
                  .then(anuncios => {
                     if(anuncios.length != 0){

                        let i = 0;

                        const deletarAnuncio = () => {
                           controllerAnuncio.deleteAnuncio(anuncios[i])
                           .then(() => {
                              if(i == anuncios.length){
                                 usuario.is_bloqueado = true;

                                 usuario
                                 .save() 
                                 .then(() => {
                                    console.log("Usuario bloqueado com sucesso!")
                                    callback(200, null)
                                 })
                              } else {
                                 i++;
                                 deletarAnuncio();
                              }
                           })
                           .catch(cod => {
                              callback(cod, null)
                           })
                        }
                           
                        deletarAnuncio();

                     } else {
                        usuario.is_bloqueado = true;

                        usuario
                        .save()
                        .then(() => {
                           console.log("Usuario bloqueado com sucesso!")
                           callback(200, null)
                        })
                     }
                  })
                  .catch(err =>{
                     usuario.is_bloqueado = true;

                     usuario
                     .save()
                     .then(() => {
                        console.log("Usuario bloqueado com sucesso!")
                        callback(200, null)
                     })
                  })

               } else {
                  callback(404, null)
               }
            })
            .catch(err => {
               callback(404, null)
            })

         } else {
            callback(401, null);
         }
      } else {
         console.log("Digite um numero inteiro no parametro 'id_usuario'")
         callback(400, null);
      }
   }
   
}

module.exports = ControllerUsuario;