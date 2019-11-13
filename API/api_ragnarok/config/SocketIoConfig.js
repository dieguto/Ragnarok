const jwt = require('jsonwebtoken');
const JwtAuth = require("../utils/JwtAuth");
const Sequelize = require("sequelize");
const con = require("./conexao");
const Anuncio = require("../models/Anuncio");
const Chat = require("../models/Chat");
const ChatUsuario = require("../models/ChatUsuario");
const Dt = require("../utils/DtUtils");
const Mensagem = require("../models/Mensagem");

class SocketIoConfig {

   static verificarToken(socket, next){
      const token = socket.handshake.query.token;
   
      jwt.verify(token, JwtAuth.getKey(), (err, dadosToken)=>{
         if(err){
            io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "o parametro 'token' é necessario para que o socket se conecte"});
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

         console.log("Usuario com o id de socket '" + socket.id + "' conectado!");

         if(usuarios_online.indexOf(socket.usuario.id) === -1){
            usuarios_online.push(socket.usuario.id);
         } else {
            io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "somente é permitido um socket por usuario conectado"});
            socket.disconnect();
         }

         socket.join("usuario_" + socket.usuario.id);

         console.log(usuarios_online)

         //socket.join("1");

         //socket.join('queijo');

         //console.log(this.getTotalDeUsuariosNaSala(io, 'queijo'))

         //socket.leave('queijo');

         //socket.to("1").broadcast.emit("batata_evento", { batata: "batata" });

         //socket.to("queijo").broadcast.emit("queijo_evento", { queijo: "queijo" });

         //socket.leaveAll();

         //this.sairDeTodasAsSalas(socket);
   
         //console.log(socket.adapter.sids[socket.id]);

         // EXEMPLO DE 'dados'
         // const dados = {
         //    id_chat: 12 OU id_anuncio: 12 
         //    mensagem: "Olá mundo!"
         // }
         socket.on("iniciar_chat", async (dados) => {

            this.sairDeTodasAsSalas(socket);

            if(dados.id_anuncio || dados.id_chat){
               const chat = await this.getChat(socket, dados);

               if(chat){

                  const nome_sala = `chat_${chat.id_chat}`;
                  
                  const total_na_sala = this.getTotalDeUsuariosNaSala(io, nome_sala);

                  if(total_na_sala < 1){

                     await this.marcarMensagensComoLidas(socket.usuario.id, chat.id_chat);

                     io.sockets.connected[socket.id].emit("mensagens_anteriores", await this.getMensagensTratadas(socket, chat.id_chat));

                     socket.join(nome_sala);

                  } else {
                     io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "erro, mais de uma pessoa no chat de id '" + chat.id_chat + "'"});
                  }

               } else {
                  const anuncio = await Anuncio.findByPk(dados.id_anuncio);

                  if(anuncio){
                     console.log("tem")
                     //cria o chat e então manda a mensagem

                     const chat = await Chat.create({ id_anuncio: anuncio.id_anuncio, c_foto_conversa: anuncio.c_fotos[0] });

                     await ChatUsuario.create({ id_chat: chat.id_chat, id_usuario: socket.usuario.id });

                     await ChatUsuario.create({ id_chat: chat.id_chat, id_usuario: anuncio.id_usuario });

                     //EVENTO DE CHAT CRIADO E ENVIAR INFORMAÇÕES DO CHAT E DEN QUEM TA CONVERSDANDO COM A PESSOA

                     socket.join(`chat_${chat.id_chat}`);

                  } else {
                     io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "anuncio de id '" + dados.id_anuncio + "' não existe"});
                  }
               }

            } else {
               io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "para entrar em um chat é necessario informar o id do anuncio, ou o id do chat"});
            }
         })

         // EXEMPLO DE 'dados'
         // const dados = {
         //    id_chat: 12,
         //    mensagem: "Olá mundo!"
         // }
         socket.on("enviar_mensagem", async (dados) => {
            if(dados.id_chat){

               const chat = await this.getChat(socket, dados);

               if(chat){

                  const nome_sala = `chat_${chat.id_chat}`;

                  const possui_sala = this.possuiSala(socket, nome_sala);

                  if(possui_sala){
                     
                     const cuDoUsuarioEnviando = ChatUsuario.findOne({ where: { id_chat: chat.id_chat, id_usuario: socket.usuario.id } });
                     const cuDoUsuarioPara = ChatUsuario.findOne({ where: { id_chat: chat.id_chat, id_usuario: { $ne:socket.usuario.id } } });

                     const total_na_sala = this.getTotalDeUsuariosNaSala(io, nome_sala);

                     const mensagem = await Mensagem.scope("simples").create({
                        para: cuDoUsuarioPara.id_chat_usuario,
                        mensagem: dados.mensagem,
                        visualizada: total_na_sala == 2
                     })

                     console.log(mensagem);

                     if(total_na_sala == 2){

                        //socket.to(nome_sala).broadcast.emit("nova_mensagem", )
                        
                     } else {

                     }

                  } else {
                     io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "só e possivel enviar uma mensagem caso você inicie chat antes com o evento 'iniciar_chat'"});
                  }

               } else {
                  io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "só é possivel enviar uma mensagem para um chat ao qual exista, e que você pertança ao mesmo também"});
               }

            } else {
               io.sockets.connected[socket.id].emit("erro", {status: 400, msg: "para enviar uma mensagam é necessario informar o id do chat"});
            }
         })

         socket.on("disconnect", socket => {
            const indice = socket.usuario ? usuarios_online.indexOf(socket.usuario.id) : -1;
            
            usuarios_online.splice(indice, 1);

            console.log(usuarios_online)
         });

      });
    
      return io;
   }

   static getTotalDeUsuariosNaSala(io, nome_sala){
      const sala = io.sockets.adapter.rooms[nome_sala];

      return sala ? sala.length : 0;
   }

   static possuiSala(socket, sala){
      const salas = this.getSalas(socket);

      let possui_sala = false;

      for(let i = 0; i < salas.length; i++){
         if(salas[i] == sala){

            possui_sala = true;
            i = salas.length;
         
         }
      }

      return possui_sala;
   }

   static getSalas(socket){
      let salas = Object.keys(socket.adapter.sids[socket.id]);

      for(let i = 0; i < salas.length; i++){
         if(salas[i] == socket.id){
            salas.splice(i, 1);
         }
      }

      return salas;
   }

   static sairDeTodasAsSalas(socket){
      const salas = this.getSalas(socket);

      for(let i = 0; i < salas.length; i++){
         if(!salas[i].includes("usuario_")){
            socket.leave(salas[i]);
         }
      }

      return;
   }

   static async getChat(socket, dados){

      const id_usuario = socket.usuario.id;

      if(dados.id_anuncio){
         return await this.usuarioPossuiChatByIdAnuncio(id_usuario, dados.id_anuncio);

      } else if(dados.id_chat){
         return await this.usuarioPossuiChatByIdChat(id_usuario, dados.id_chat);

      }
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

         return chats[0];

      } catch (err) {
         return null;
      }
   }

   static async usuarioPossuiChatByIdChat(id_usuario, id_chat){

      const query = `
         SELECT cu.* FROM 
         tbl_chat_usuario AS cu
         WHERE
         cu.id_chat = ${id_chat}
         AND
         cu.id_usuario = ${id_usuario}
         AND
         cu.excluido_em IS NULL
         ;       
      `;

      try {
         const chats = await con.query(query, { type: Sequelize.QueryTypes.SELECT });

         return chats[0];

      } catch (err) {
         return null;
      }
   }

   static async marcarMensagensComoLidas(id_usuario, id_chat){
      
      const query = `
         UPDATE tbl_mensagem AS m
         INNER JOIN 
         tbl_chat_usuario AS cu
         ON
         cu.id_chat_usuario = m.para
         SET 
         m.visualizada = 1
         WHERE
         m.visualizada = 0
         AND
         cu.id_usuario = ${id_usuario}
         AND
         cu.id_chat = ${id_chat}
         AND
         m.excluido_em IS NULL
         AND
         cu.excluido_em IS NULL;
      `;

      await con.query(query, { type: Sequelize.QueryTypes.UPDATE });

      return;
   }

   static async getMensagens(id_chat){

      const query = `
         SELECT m.mensagem, 
         m.criado_em AS enviada_em,
         cu.id_usuario AS para_usuario  
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

   static async getMensagensTratadas(socket, id_chat){
      let mensagens = await this.getMensagens(id_chat);

      for(let i = 0; i < mensagens.length; i++){

         mensagens[i].enviada_em = Dt.FormatoBrComHoras(mensagens[i].enviada_em);

         mensagens[i].is_para_usuario = false;

         if(socket.usuario.id == mensagens[i].para_usuario){
            mensagens[i].is_para_usuario = true;
         }

         delete mensagens[i].para_usuario;
      }

      //console.log(mensagens)

      return mensagens;
   };
}

module.exports = SocketIoConfig;