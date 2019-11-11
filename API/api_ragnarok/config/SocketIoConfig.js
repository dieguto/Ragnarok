const jwt = require('jsonwebtoken');
const JwtAuth = require("../utils/JwtAuth");
const Sequelize = require("sequelize");
const con = require("./conexao");
const Anuncio = require("../models/Anuncio");


class SocketIoConfig {

   static verificarToken(socket, next){
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
   
   static get(io){

      let usuarios_online = [];
      
      io.use(this.verificarToken);
   
      io.on("connection", socket => {

         if(usuarios_online.indexOf(socket.usuario.id) === -1){
            usuarios_online.push(socket.usuario.id);
         }  

         const possuiChat = async (dados) => {
            const id_usuario = socket.usuario.id;
   
            if(dados.id_anuncio){

               return await this.usuarioPossuiChatByIdAnuncio(id_usuario, dados.id_anuncio);


            } else if(dados.id_chat){

            }
         }

         socket.join('batata');

         socket.to("batata").broadcast.emit("e bom", { e_bom: "demais" })
   
         console.log("Usuario com o id de socket '" + socket.id + "' conectado!");
   
         io.emit("mensagens_anteriores", [{author: "usuario de teste", message: "teste do chat"}]);
         
         //console.log(socket.usuario)
   
         //io.on("conversa1", )
   
         // dados = {
         //    id_anuncio:333,
         //    
         // };
   
         socket.on("chat", async (dados) => {
            if(dados.id_anuncio || dados.id_chat){
               const possui_chat = await possuiChat(dados);

               if(possui_chat){


                  
                  io.sockets.connected[socket.id].emit("mensagens_anteriores", );

                  //já inscreve o socket a uma sala, e então manda a mensagem direto

                  console.log("chat existe")
               } else {
                  const anuncio = await Anuncio.findByPk(dados.id_anuncio);

                  if(anuncio){
                     console.log("tem")
                     //cria o chat e então manda a mensagem
                  } else {
                     io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "anuncio de id '" + dados.id_anuncio + "' não existe"});
                  }
               }

            } else {
               io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "para entrar em um chat é necessario informar o id do anuncio, ou o id do chat"});
            }
         })

         socket.on("disconnect", socket => {
            const indice = socket.usuario ? usuarios_online.indexOf(socket.usuario.id) : -1;

            if(indice !== -1){
               usuarios_online.splice(indice, 1);
            }

         });

      });
    
      return io;
   }

   static async usuarioPossuiChatByIdAnuncio(id_usuario, id_anuncio){

      const query = `
         SELECT c.* FROM 
         tbl_chat AS c
         INNER JOIN 
         tbl_anuncio AS a
         ON
         c.id_anuncio = a.id_anuncio

         INNER JOIN
         tbl_chat_usuario AS cu
         ON
         cu.id_chat = c.id_chat
         AND
         cu.id_usuario = ${id_usuario}
         AND
         c.id_anuncio = ${id_anuncio}
         AND
         c.excluido_em IS NULL
         AND
         a.excluido_em IS NULL
         AND
         cu.excluido_em IS NULL
         ;       
      `;

      try {
         const chats = await con.query(query, { type: Sequelize.QueryTypes.SELECT });

         return chats.length == 1;

      } catch (err) {
         return false
      }
   }

   static async getMensagens(id_chat){

      const query = `
         SELECT m.* 
         FROM 
         tbl_chat_usuario AS cu
         INNER JOIN 
         tbl_mensagem AS m
         ON
         m.para = cu.id_chat_usuario
         AND
         cu.id_chat = ${id_chat}
         AND
         m.excluido_em IS NULL
         AND
         cu.excluido_em IS NULL
         ;
      `;

      try {

         const mensagens = await con.query(query, { type: Sequelize.QueryTypes.SELECT });

         return mensagens;

      } catch (err) {
         return [];
      }
   }
}

module.exports = SocketIoConfig;