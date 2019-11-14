const jwt = require('jsonwebtoken');
const JwtAuth = require("../utils/JwtAuth");
const Sequelize = require("sequelize");
const Op = Sequelize.Op; 
const con = require("../config/conexao");
const Anuncio = require("../models/Anuncio");
const Chat = require("../models/Chat");
const ChatUsuario = require("../models/ChatUsuario");
const Dt = require("../utils/DtUtils");
const Mensagem = require("../models/Mensagem");
const Usuario = require("../models/Usuario");


class ControllerSocketIo {

   static verificarToken(socket, next){
      const token = socket.handshake.query.token;
   
      jwt.verify(token, JwtAuth.getKey(), (err, dadosToken)=>{
         if(err){
            io.sockets.connected[socket.id].emit("erro", "o parametro 'token' é necessario para que o socket se conecte");
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
            io.sockets.connected[socket.id].emit("erro", "somente é permitido um socket por usuario conectado");
            socket.disconnect();
         }

         socket.join("usuario_" + socket.usuario.id);

         socket.broadcast.emit("usuario_" + socket.usuario.id + "_online");

         // EXEMPLO DE 'dados'
         // const dados = {
         //    id_chat: 12 OU id_anuncio: 12 
         // 
         // }
         // 
         // RETORNO) 3 emits - ("iniciou")[com json do info chat(chat, usuario[e se esta online] e anuncio)] e ("mensagens_anteriores")[e json das mensagem anteriores], ou o ("erro")
         //  
         // io.sockets.connected[socket.id].emit("iniciou", info_chat);
         // 
         // io.sockets.connected[socket.id].emit("mensagens_anteriores", []);
         
         socket.on("iniciar_chat", async (dados) => {

            this.sairDeTodasAsSalas(socket);

            if(dados.id_anuncio || dados.id_chat){
               const chat = await this.getChat(socket, dados);

               if(chat){

                  const nome_sala = `chat_${chat.id_chat}`;
                  
                  const total_na_sala = this.getTotalDeUsuariosNaSala(io, nome_sala);

                  if(total_na_sala < 2){

                     await this.marcarMensagensComoLidas(socket.usuario.id, chat.id_chat);

                     socket.join(nome_sala);

                     let info_chat = await this.getInfoChat(socket.usuario.id, chat.id_chat, usuarios_online);
                     
                     io.sockets.connected[socket.id].emit("iniciou", info_chat);

                     io.sockets.connected[socket.id].emit("mensagens_anteriores", await this.getMensagensTratadas(socket, chat.id_chat));

                     console.log(`chat '${chat.id_chat}' iniciado!`)

                  } else {
                     io.sockets.connected[socket.id].emit("erro", "erro, mais de uma pessoa no chat de id '" + chat.id_chat + "'");
                  }

               } else {
                  const anuncio = await Anuncio.findByPk(dados.id_anuncio);

                  if(anuncio){

                     if(anuncio.usuario.id != socket.usuario.id){
                        
                        //cria o chat e então manda a mensagem

                        const chat_novo = await Chat.create({ id_anuncio: anuncio.id_anuncio, c_foto: anuncio.c_fotos[0] });

                        await ChatUsuario.create({ id_chat: chat_novo.id_chat, id_usuario: socket.usuario.id });

                        await ChatUsuario.create({ id_chat: chat_novo.id_chat, id_usuario: anuncio.usuario.id });

                        //EVENTO DE CHAT CRIADO E ENVIAR INFORMAÇÕES DO CHAT E DEN QUEM TA CONVERSANDO COM A PESSOA
                        //get_chats, get_notificacoes, info_chat
                        socket.join(`chat_${chat_novo.id_chat}`);

                        let info_chat = await this.getInfoChat(socket.usuario.id, chat_novo.id_chat, usuarios_online);
                     
                        io.sockets.connected[socket.id].emit("iniciou", info_chat);

                        io.sockets.connected[socket.id].emit("mensagens_anteriores", []);

                        console.log(`chat '${chat_novo.id_chat}' criado e iniciado!`)
                     } else {
                        io.sockets.connected[socket.id].emit("erro", "é impossivel iniciar um chat consigo mesmo");
                     }

                  } else {
                     let erro = "";

                     if(dados.id_anuncio){
                        erro = "anuncio de id '" + dados.id_anuncio + "' não existe";
                     } else {
                        erro = "chat de id '" + dados.id_chat + "' não existe";
                     }
                     
                     io.sockets.connected[socket.id].emit("erro", erro);
                  }
               }

            } else {
               io.sockets.connected[socket.id].emit("erro", "para entrar em um chat é necessario informar o id do anuncio, ou o id do chat");
            }
         })

         // EXEMPLO DE 'dados'
         // const dados = {
         //    id_chat: 12,
         //    mensagem: "Olá mundo!"
         // }
         socket.on("mensagem", async (dados) => {
            if(dados.id_chat && dados.mensagem){

               const chat = await this.getChat(socket, dados);

               if(chat){

                  const nome_sala = `chat_${chat.id_chat}`;

                  const possui_sala = this.possuiSala(socket, nome_sala);

                  if(possui_sala){

                     const total_na_sala = this.getTotalDeUsuariosNaSala(io, nome_sala);

                     const { cuDoUsuario, cuDoUsuarioPara } = await this.getCusDoChat(socket.usuario.id, chat.id_chat);

                     let mensagem = await Mensagem.scope("simples").create({
                        para: cuDoUsuarioPara.id_chat_usuario,
                        mensagem: dados.mensagem,
                        visualizada: total_na_sala == 2
                     });

                     mensagem = this.getMensagemTratada(mensagem);

                     if(total_na_sala == 2){

                        socket.to(nome_sala).broadcast.emit("nova_mensagem", mensagem);
                        
                     } else {

                        mensagem.dataValues.usuario = socket.usuario;

                        socket.to("usuario_" + cuDoUsuarioPara.id_usuario).broadcast.emit("notificação", mensagem);
                     }

                  } else {
                     io.sockets.connected[socket.id].emit("erro", "só e possivel enviar uma mensagem caso você inicie chat antes com o evento 'iniciar_chat'");
                  }

               } else {
                  io.sockets.connected[socket.id].emit("erro", "só é possivel enviar uma mensagem para um chat ao qual exista, e que você pertança ao mesmo também");
               }

            } else {
               io.sockets.connected[socket.id].emit("erro", "para enviar uma mensagam é necessario informar o id do chat e tambem a mensagem");
            }
         })

         socket.on("disconnect", () => {
            
            if(socket.usuario){
               socket.emit("usuario_" + socket.usuario.id + "_offline");

               const indice = usuarios_online.indexOf(socket.usuario.id);
               
               usuarios_online.splice(indice, 1);
            }

         });

      });
    
      return io;
   }

   static async getInfoChat(id_usuario, id_chat, usuarios_online){

      let chat = await Chat.findByPk(id_chat);

      const cuDoUsuarioPara = await this.getCuDoPara(id_usuario, id_chat);

      let usuarioPara = await Usuario.scope("anuncio").findByPk(cuDoUsuarioPara.id_usuario);

      usuarioPara.dataValues.is_online = this.isUsuarioOnline(usuarioPara.id, usuarios_online);

      delete usuarioPara.dataValues.lat;

      delete usuarioPara.dataValues.lon;

      const anuncio = await Anuncio.findByPk(chat.id_anuncio);

      if(anuncio.preco){
         anuncio.dataValues.preco = "R$ " + anuncio.dataValues.preco.replace(/\./g, ",");
      }

      delete chat.dataValues.id_anuncio;

      chat.dataValues.anuncio = anuncio;

      chat.dataValues.usuario = usuarioPara;

      return chat;
   }

   static isUsuarioOnline(id_usuario, usuarios_online){

      return usuarios_online.indexOf(id_usuario) != -1 ? true : false;

   }

   static async getCusDoChat(id_usuario, id_chat){
      
      const cuDoUsuario = await this.getCuDoUsuario(id_usuario, id_chat);

      const cuDoUsuarioPara = await this.getCuDoPara(id_usuario, id_chat);

      return { cuDoUsuario, cuDoUsuarioPara };
   }

   static async getCuDoPara(id_usuario, id_chat){

      const cuDoUsuarioPara = await ChatUsuario.findOne({ where: { id_chat: id_chat, id_usuario: { [Op.ne]: id_usuario } } });

      return cuDoUsuarioPara;
   }

   static async getCuDoUsuario(id_usuario, id_chat){
   
      const cuDoUsuario = await ChatUsuario.findOne({ where: { id_chat: id_chat, id_usuario: id_usuario } });

      return cuDoUsuario;
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
         ORDER BY m.criado_em ASC
         ;
      `;

      try {

         const mensagens = await con.query(query, { type: Sequelize.QueryTypes.SELECT });

         return mensagens;

      } catch (err) {
         return [];
      }
   }

   //Dt.FormatoBrComHoras
   static getMensagemTratada(mensagem){
      mensagem.dataValues.enviada_em = Dt.FormatoBrComHoras(mensagem.criado_em);

      delete mensagem.dataValues.criado_em;
      delete mensagem.dataValues.atualizado_em;
      delete mensagem.dataValues.excluido_em;
      delete mensagem.dataValues.visualizada;
      delete mensagem.dataValues.id_mensagem;
      delete mensagem.dataValues.para;

      return mensagem;
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

      return mensagens;
   };
}

module.exports = ControllerSocketIo;