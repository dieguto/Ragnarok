const sha512 = require("js-sha512").sha512;
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const Auth = require("../utils/JwtAuth");

class ControllerLogin{

   //FORMATO DO CALLBACK(status, json)
   static logarUsuario(json_dados, callback){
      
      let { email, senha } = json_dados;

      senha = sha512(senha);
   
      Usuario.findOne({ where: { email, senha } })
      .then((usuario) => {
   
         if (usuario.is_bloqueado) {
            //433 Trancado
            console.log("Erro ao gerar token do usuario pois o mesmo esta bloqueado");
            callback(433, null);
   
         } else {
               //POR QUESTÕES DE SEGURANÇA A SENHA É 'ANULADA'
               usuario.senha = undefined;
   
               jwt.sign({ usuario }, Auth.getKey(), { expiresIn: "24h" }, (err, token) => {
                  if (err) {
                     //500 Erro do servidor
                     console.log("Erro ao gerar token do usuario: " + err);
                     callback(500, null);

                  } else {
                     //200 Ok
                     callback(200, { token, usuario });
                  }
               })
         }
   
      })
      .catch((err) => {
         //404 Não encontrado
         console.log("Erro usuario não encontrado!");
         callback(404, null);
      });

   }

   //FORMATO DO CALLBACK(status, json)
   static logarAdmin(json_dados, callback){

      let { email, senha } = json_dados;

      senha = sha512(senha);
   
      Usuario.findOne({ where: { email, senha } })
      .then((admin) => {
   
         if (admin.is_bloqueado) {
            //433 Trancado
            console.log("Erro: não foi possivel gerar token do admin pois o mesmo esta bloqueado");
            callback(433, null);
   
         } else {

            if (admin.is_admin) {
               //POR QUESTÕES DE SEGURANÇA A SENHA É 'ANULADA'
               admin.senha = undefined;
   
               jwt.sign({ admin }, Auth.getKey(), { expiresIn: "24h" }, (err, token) => {
                  if (err) {
                     //500 Erro do servidor
                     console.log("Erro: não foi possivel gerar token do admin -> " + err);
                     callback(500, null);
                  } else {
                     //200 Ok
                     callback(200, { token, admin });
                  }
               });

            } else {
               //433 Trancado
               console.log("Erro: não foi possivel gerar o token do admin, pois o mesmo não possui o privilégio");
               callback(433, null);
            }

         }
      })
      .catch((err) => {
         //404 Não encontrado
         console.log("Erro: Admin não encontrado!");
         callback(404, null);
      });

   }

}

module.exports = ControllerLogin;