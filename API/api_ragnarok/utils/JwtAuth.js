const jwt = require('jsonwebtoken');

class JwtAuth {

   static getKey() {
      return "senha_que_a_gente_quiser";
   }

   static verificarToken(req, res, next) {
      //PEGA O VALOR DO HEADER AUTHORIZATION
      const header_auth_value = req.headers['authorization'];

      if (header_auth_value) {
         //SEPARA A PALAVRA 'BEARER' DO TOKEN, PRA ASSIM CONSEGUIR O MESMO
         const token = header_auth_value.split(" ")[1];

         jwt.verify(token, JwtAuth.getKey(), (err, dadosToken)=>{
            if(err){
               //403 proibido
               res.sendStatus(403).end();
            } else {

               req.dadosToken = dadosToken;
               next();
            }
        });
         
      } else {
         //412 pré condição na requisição falhou (na hora de enviar a requisi- 
         //ção, o cabeçalho (header) do 'authorization' juntamente com o valor 
         //'Bearer numero_do_token' está faltando)
         res.sendStatus(412).end();
      }
   }

   
}

module.exports = JwtAuth;