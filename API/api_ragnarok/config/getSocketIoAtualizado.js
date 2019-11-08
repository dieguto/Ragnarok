const jwt = require('jsonwebtoken');
const JwtAuth = require("../utils/JwtAuth");

const verificarToken = (socket, next) => {
   const token = socket.handshake.query.token;

   jwt.verify(token, JwtAuth.getKey(), (err, dadosToken)=>{
      if(err){
         socket.disconnect();

      } else {
         socket.usuario = dadosToken.usuario;
         next();
      }
   });

};

const get = (io) => {
   
   io.use(verificarToken);

   const conversa1 = [{author: "Autor da conversa 1", message: "essa conversa 1 é d+++"}];

   const conversa2 = [{author: "Autor da conversa 2", message: "essa conversa 2 é irada!!!"}];

   io.on("connection", socket => {


      

      console.log("Usuario com o id de socket '" + socket.id + "' conectado!");

      io.emit("mensagens_anteriores", [{author: "usuario de teste", message: "teste do chat"}]);
      
      console.log(socket.usuario)

      //io.on("conversa1", )

      // dados = {
      //    id_anuncio:333,

      // };

      socket.on("entrar em chat", dados => {
         
      })
   });
 
   return io;
}

module.exports = get;