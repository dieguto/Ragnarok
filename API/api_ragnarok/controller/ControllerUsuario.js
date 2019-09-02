const sha512 = require("js-sha512").sha512;
const Usuario = require("../models/Usuario");
const BrCoords = require("../utils/BrasilCoordenadas");
const Sequelize = require("Sequelize");

class ControllerUsuario{

   //FORMATO DO CALLBACK(status, json)
   static gravar(dados_json, callback){

      let { nome, email, senha, cep } = dados_json;

      Usuario.findOne({ where: { email:email } })
      .then((usuario)=>{

         console.log("O usuario é: " + usuario);

         if(usuario != null){
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
            const cep_sem_traco = cep.replace(/-/g, "");
      
            BrCoords.getByCep(cep_sem_traco, (err, info) => {
               
               if (err) {
                  if (err == 400) {

                     const err_json = 
                        {
                           errors: 
                           [
                              {
                                 message: "Cep incorreto",
                                 path: "cep"
                              }
                           ]
                        };

                     callback(400, err_json);
         
                  } else {
                     callback(500, null);
                  }
         
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
                     callback(201, null);
         
                  }).catch((err) => {
                     console.log("Erro ao criar o usuario: " + err)
                     //400 Requisição Ruim
                     callback(400, err);
                  });
               }
            })
         }
         
      })
   }

   //FORMATO DO CALLBACK(status, json)
   static getById(id, callback){

      Usuario.findOne({ where : { id } })
      .then(usuario =>{
         if(usuario != null){

            usuario.senha = undefined;
            usuario.is_admin = undefined;

            callback(200, usuario)
            
         } else {
            callback(404, null)
         }
      })
   }
}

module.exports = ControllerUsuario;