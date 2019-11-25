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
const Notificacao =  require("../models/Notificacao");

class ControllerSocketIo {

   static verificarToken(socket, next){
      const token = socket.handshake.query.token;
   
      jwt.verify(token, JwtAuth.getKey(), (err, dadosToken)=>{
         if(err){
            socket.emit("erro", "o parametro 'token' é necessario para que o socket se conecte");
            socket.disconnect();
   
         } else {

            delete dadosToken.usuario.is_admin;

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
            socket.emit("erro", "somente é permitido um socket por usuario conectado");
            socket.disconnect();
         }

         socket.join("usuario_" + socket.usuario.id);

         socket.broadcast.emit("usuario_" + socket.usuario.id + "_online");

         socket.on("iniciar_chat", async (dados) => {

            this.sairDeTodasAsSalas(socket);

            if(dados.id_anuncio || dados.id_chat){
               const chat = await this.getChat(socket, dados);

               if(chat){

                  console.log("o chat esta ativo?: ", chat.is_ativo)

                  if(chat.is_ativo){

                     const nome_sala = `chat_${chat.id_chat}`;
                  
                     const total_na_sala = this.getTotalDeUsuariosNaSala(io, nome_sala);

                     if(total_na_sala < 2){

                        await this.marcarMensagensComoLidas(socket.usuario.id, chat.id_chat);

                        socket.join(nome_sala);

                        let info_chat = await this.getInfoChat(socket.usuario.id, chat.id_chat, usuarios_online);
                        
                        socket.emit("iniciou", info_chat);

                        socket.emit("mensagens_anteriores", await this.getMensagensTratadas(socket, chat.id_chat));

                        console.log(`chat '${chat.id_chat}' iniciado!`)

                     } else {
                        socket.emit("erro", "erro, mais de uma pessoa no chat de id '" + chat.id_chat + "'");
                     }

                  } else {
                     socket.emit("erro", "erro, o chat '" + chat.id_chat + "' deve estar ativo para que se inicie a conversa");
                  }

                  

               } else {
                  const anuncio = await Anuncio.findByPk(dados.id_anuncio);

                  if(anuncio){

                     if(anuncio.usuario.id != socket.usuario.id){

                        let is_ativo = true;

                        let tipo_chat = "";

                        if(dados.tipo_chat == "troca" || dados.tipo_chat == "venda"){
                           tipo_chat = "de " + dados.tipo_chat + " ";
                           is_ativo = false;
                        }

                        const chat_novo = await Chat.create({ id_anuncio: anuncio.id_anuncio, c_foto: anuncio.c_fotos[0], is_ativo });

                        await ChatUsuario.create({ id_chat: chat_novo.id_chat, id_usuario: socket.usuario.id });

                        await ChatUsuario.create({ id_chat: chat_novo.id_chat, id_usuario: anuncio.usuario.id });

                        //EVENTO DE CHAT CRIADO E ENVIAR INFORMAÇÕES DO CHAT E DEN QUEM TA CONVERSANDO COM A PESSOA
                        //get_chats, get_notificacoes, info_chat
                        socket.join(`chat_${chat_novo.id_chat}`);

                        let info_chat = await this.getInfoChat(socket.usuario.id, chat_novo.id_chat, usuarios_online);
                     
                        socket.emit("iniciou", info_chat);

                        socket.emit("mensagens_anteriores", []);

                        console.log(`chat '${chat_novo.id_chat}' criado e iniciado!`);

                        const notificacao = await Notificacao.create({
                           id_chat: chat_novo.id_chat,
                           para_usuario: anuncio.usuario.id,
                           info: `O usuario ${socket.usuario.nome} iniciou um chat ${tipo_chat}com você`,
                           is_mensagem: false,
                           is_chat: true,
                           visualizada: false
                        });

                        let info_chat_notificacao = await this.getInfoChat(anuncio.usuario.id, chat_novo.id_chat, usuarios_online);

                        notificacao.dataValues.info_chat = info_chat_notificacao;

                        socket.to("usuario_" + anuncio.usuario.id).broadcast.emit("tnnv", await this.getTotalNotificacoesNaoVisualizadas(socket.usuario.id));

                        socket.to("usuario_" + anuncio.usuario.id).broadcast.emit("notificacao", this.getNotificacaoTratada(notificacao));

                     } else {
                        socket.emit("erro", "é impossivel iniciar um chat consigo mesmo");
                     }

                  } else {
                     let erro = "";

                     if(dados.id_anuncio){
                        erro = "anuncio de id '" + dados.id_anuncio + "' não existe";
                     } else {
                        erro = "chat de id '" + dados.id_chat + "' não existe";
                     }
                     
                     socket.emit("erro", erro);
                  }
               }

            } else {
               socket.emit("erro", "para entrar em um chat é necessario informar o id do anuncio, ou o id do chat");
            }
         })

         socket.on("mensagem", async (dados) => {
            if(dados.id_chat && dados.mensagem && dados.mensagem != ""){

               const chat = await this.getChat(socket, dados);

               if(chat){

                  if(chat.is_ativo){

                     const nome_sala = `chat_${chat.id_chat}`;

                     const possui_sala = this.possuiSala(socket, nome_sala);

                     if(possui_sala){

                        const total_na_sala = this.getTotalDeUsuariosNaSala(io, nome_sala);

                        const cuDoUsuarioPara = await this.getCuDoPara(socket.usuario.id, chat.id_chat);

                        let mensagem = await Mensagem.scope("simples").create({
                           para: cuDoUsuarioPara.id_chat_usuario,
                           mensagem: dados.mensagem,
                           visualizada: total_na_sala == 2
                        });

                        mensagem = this.getMensagemTratada(mensagem);

                        if(total_na_sala == 2){

                           socket.to(nome_sala).broadcast.emit("nova_mensagem", mensagem);
                           
                        } else {                   

                           const notificacao = await Notificacao.create({
                              id_chat: cuDoUsuarioPara.id_chat,
                              para_usuario: cuDoUsuarioPara.id_usuario,
                              info: `${socket.usuario.nome} enviou '${mensagem.mensagem}'`,
                              is_mensagem: true,
                              is_chat: false,
                              visualizada: false
                           });

                           let info_chat = await this.getInfoChat(cuDoUsuarioPara.id_usuario, cuDoUsuarioPara.id_chat, usuarios_online);

                           notificacao.dataValues.info_chat = info_chat;

                           socket.to("usuario_" + cuDoUsuarioPara.id_usuario).broadcast.emit("tnnv", await this.getTotalNotificacoesNaoVisualizadas(socket.usuario.id));

                           socket.to("usuario_" + cuDoUsuarioPara.id_usuario).broadcast.emit("notificacao", this.getNotificacaoTratada(notificacao));
                        }

                     } else {
                        socket.emit("erro", "só e possivel enviar uma mensagem caso você inicie chat antes com o evento 'iniciar_chat'");
                     }

                  } else {
                     socket.emit("erro", "erro, o chat '" + chat.id_chat + "' deve estar ativo para que se inicie a conversa");
                  }  

               } else {
                  socket.emit("erro", "só é possivel enviar uma mensagem para um chat ao qual exista, e que você pertança ao mesmo também");
               }

            } else {
               socket.emit("erro", "para enviar uma mensagam é necessario informar o id do chat e tambem a mensagem (a mesma não pode ser vazia)");
            }
         })

         socket.on("sair_chat", () => {
            
            this.sairDeTodasAsSalas(socket);

         })

         socket.on("get_chats", async () => {
            
            const chats = await this.getChats(socket.usuario.id, usuarios_online);

            socket.emit("chats", chats);
         })

         socket.on("get_notificacoes", async () => {
            socket.emit("notificacoes", await this.getNotificacoes(socket.usuario.id, usuarios_online));
			socket.emit("tnnv", await this.getTotalNotificacoesNaoVisualizadas(socket.usuario.id));
         })

         //total_notificacoes_nao_visualizadas
         socket.on("get_tnnv", async () => {
            socket.emit("tnnv", await this.getTotalNotificacoesNaoVisualizadas(socket.usuario.id));
         })

         socket.on("disconnect", () => {
            
            if(socket.usuario){
               socket.broadcast.emit("usuario_" + socket.usuario.id + "_offline");

               const indice = usuarios_online.indexOf(socket.usuario.id);
               
               usuarios_online.splice(indice, 1);
            }

         });

      });
    
      return io;
   }

   static async getNotificacoes(id_usuario, usuarios_online){

      await Notificacao.update({ visualizada: true }, { where:{ para_usuario: id_usuario } })

      const notificacoes = await Notificacao.findAll({ where:{ para_usuario: id_usuario }, order: [['criado_em', 'desc']] });

      for(let i = 0; i < notificacoes.length; i++){

         let info_chat = await this.getInfoChat(id_usuario, notificacoes[i].id_chat, usuarios_online);

         notificacoes[i].dataValues.info_chat = info_chat;
      }

      return notificacoes;
   }

   static getNotificacaoTratada(notificacao){

      delete notificacao.dataValues.criado_em;
      delete notificacao.dataValues.atualizado_em;
      delete notificacao.dataValues.excluido_em;
      delete notificacao.dataValues.para_usuario;
      delete notificacao.dataValues.id_notificacao;
      delete notificacao.dataValues.visualizada;

      return notificacao;

   }

   static async getChats(id_usuario, usuarios_online){
      const query = `
         SELECT
         c.id_chat, c.id_anuncio, c.c_foto 
         FROM
         tbl_chat AS c
         INNER JOIN
         tbl_chat_usuario AS cu
         ON
         c.id_chat = cu.id_chat
         AND
         cu.id_usuario = ${id_usuario}
         AND
         cu.excluido_em IS NULL
         AND
         c.is_ativo = 1
         AND
         c.excluido_em IS NULL;
      `;

      try {
         const chats_query = await con.query(query, { type: Sequelize.QueryTypes.SELECT });

         let total_nao_lidas = await this.getTotalMsgsLidasPorChat(id_usuario);

         for(let i = 0; i < chats_query.length; i++){
            if(!this.isChatOnLidas(chats_query[i], total_nao_lidas)){
               const chat_add = { id_chat: chats_query[i].id_chat, nao_lidas: 0 };

               total_nao_lidas.push(chat_add);
            }
         }

         let chats = [];

         let i = 0;

         const addAoChats = async () => {

            if(i == total_nao_lidas.length){

               return;

            } else {

               let chat = await this.getInfoChat(id_usuario, total_nao_lidas[i].id_chat, usuarios_online);

               chat.dataValues.nao_lidas = total_nao_lidas[i].nao_lidas;

               chats.push(chat);

               i++;

               await addAoChats();
            }

         }

         await addAoChats();

         return chats;

      } catch (err) {
         return null;
      }
   }

   static isChatOnLidas(chat, total_nao_lidas){
      let is_on_lidas = false;

      for(let i = 0; i < total_nao_lidas.length; i++){
         if(chat.id_chat == total_nao_lidas[i].id_chat){
            is_on_lidas = true;
         }
      }

      return is_on_lidas;
   }

   static async getUltimaMensagemDoChat(id_chat, id_usuario){

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
         ORDER BY m.criado_em DESC
         LIMIT 1;
      `;

      try {
         let ultima_mensagem = await con.query(query, { type: Sequelize.QueryTypes.SELECT });

         ultima_mensagem = ultima_mensagem[0];

         if(ultima_mensagem){

            ultima_mensagem.is_para_usuario = false;

            if(id_usuario == ultima_mensagem.para_usuario){
               ultima_mensagem.is_para_usuario = true;
            }

            delete ultima_mensagem.para_usuario;

            return ultima_mensagem;

         } else {
            return null
         }

      } catch (err) {
         return null;
      }

   }

   static async getTotalNotificacoesNaoVisualizadas(id_usuario){

      const query = `
         SELECT 
         COUNT(IF(N.visualizada = 0, 1, NULL)) as nao_visualizadas
         FROM 
         tbl_notificacao AS n
         WHERE
         n.para_usuario = ${id_usuario}
         AND
         n.excluido_em IS NULL;
      `;

      try {
         const nao_visualizadas = await con.query(query, { type: Sequelize.QueryTypes.SELECT });

         return nao_visualizadas[0].nao_visualizadas;

      } catch (err) {
         return 0;
      }

   }

   static async getTotalMsgsLidasPorChat(id_usuario){
      const query = `
         SELECT
         c.id_chat, 
         COUNT(IF(m.visualizada = 0, 1, NULL)) as nao_lidas
         FROM
         tbl_mensagem AS m
         INNER JOIN
         tbl_chat_usuario AS cu
         ON
         cu.id_chat_usuario = m.para
         INNER JOIN
         tbl_chat AS c
         ON
         cu.id_chat = c.id_chat
         WHERE
         cu.id_usuario = ${id_usuario}
         AND
         m.excluido_em IS NULL
         AND
         cu.excluido_em IS NULL
         AND
         c.is_ativo = 1
         AND
         c.excluido_em IS NULL
         GROUP BY 
         m.para
         ORDER BY
         nao_lidas DESC;
      `;

      try {
         const total_nao_lidas = await con.query(query, { type: Sequelize.QueryTypes.SELECT });

         return total_nao_lidas;

      } catch (err) {
         return [];
      }
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

      chat.dataValues.ultima_mensagem = await this.getUltimaMensagemDoChat(id_chat, id_usuario);

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
         SELECT c.* FROM 
         tbl_chat_usuario AS cu
         INNER JOIN
         tbl_chat AS c
         ON
         c.id_chat = cu.id_chat
         WHERE
         cu.id_chat = ${id_chat}
         AND
         cu.id_usuario = ${id_usuario}
         AND
         cu.excluido_em IS NULL
         AND
         c.excluido_em IS NULL
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
      mensagem.dataValues.enviada_em = mensagem.criado_em;

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