const sha512 = require("js-sha512").sha512;
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const Auth = require("../utils/JwtAuth");

class ControllerAuth{

   //FORMATO DO CALLBACK(status, json)
   static logar(tipo, json_dados,callback){
      
      let { email, senha } = json_dados;

      senha = sha512(senha);
   
      Usuario.findOne({ where: { email, senha }, attributes:{ exclude:['lat','lon'] } })
      .then((usuario) => {
         
         if(usuario){
            if (usuario.is_bloqueado) {
               //423 Trancado
               console.log("Erro ao gerar token do usuario pois o mesmo esta bloqueado");
               callback(423, null);
      
            } else {
               
               usuario.is_bloqueado = undefined;
   
               if(tipo == "admin" && !usuario.is_admin){
                  console.log("Erro ao gerar token do usuario pois o mesmo não é admin");
                  callback(401, null)
   
               } else {
                  let opcoes_token = { expiresIn: "24h" };
   
                  if(tipo == "admin"){
                     opcoes_token = {};
                  }
   
                  jwt.sign({ usuario }, Auth.getKey(), opcoes_token, (err, token) => {
                     if (err) {
                        //500 Erro do servidor
                        console.log("Erro ao gerar token: " + err);
                        callback(500, null);
      
                     } else {
                        usuario.is_admin = undefined;
      
                        //200 Ok
                        console.log("Login efetuado com sucesso!")
                        callback(200, { token, usuario });
                     }
                  })
   
               }
               
            }
         } else {
            callback(404, null);
         }
   
      })
      .catch((err) => {
         //404 Não encontrado
         console.log("Erro usuario não encontrado!");
         callback(404, null);
      });

   }

   //callback(status)
   static confirmar(id, senha, callback){
      
      senha = sha512(senha);

      Usuario.findOne({ where: { id, senha } })
      .then((usuario) => {

         if(usuario){
            callback(200);

         } else {
            callback(404);
         }
      })
      .catch(err =>{
         callback(404)
      })
   }
}

module.exports = ControllerAuth;