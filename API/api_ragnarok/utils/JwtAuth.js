class JwtAuth {

   static verificarToken(req, res, next) {
      //PEGA O VALOR DO HEADER AUTHORIZATION
      const header_auth_value = req.headers['authorization'];

      if (typeof header_auth_value != 'undefined') {
         //SEPARA A PALAVRA 'BEARER' DO TOKEN, PRA ASSIM CONSEGUIR O MESMO
         const token = header_auth_value.split(" ")[1];

         //O VALOR DO TOKEN DA REQUISIÇÃO É SETADO
         req.token = token;

         //ESTA FUNCAO SERIA ALGO COMO O END() DO EXPRESS
         next();
      } else {
         res.sendStatus(403).end();
      }
   }

   static getKey() {
      return "senha_que_a_gente_quiser";
   }
}

module.exports = JwtAuth;