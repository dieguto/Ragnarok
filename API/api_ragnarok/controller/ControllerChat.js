const Chat = require("../models/Chat");
const Anuncio = require("../models/Anuncio");
const Sequelize = require("sequelize");
const con = require("../config/conexao")

class ControllerChat {
   static deletar(id_chat, usuario_token, callback){

      if(!isNaN(id_chat)){

         Chat.findByPk(id_chat)
         .then(chat => {

            if(chat){
               Anuncio.findByPk(chat.id_anuncio)
               .then(anuncio => {

                  if(anuncio){

                     if(usuario_token.id == anuncio.id_usuario || usuario_token.is_admin){

                        this.excluirChat(id_chat)
                        .then(() => {
                           callback(200, null);
                        })

                     } else {
                        callback(401, null);
                     }

                  } else {
                     console.log("Anuncio não encontrado")
                     callback(404, null);
                  }

               })
            } else {
               console.log("Chat não encontrado")
               callback(404, null);
            }

         });

      } else {
         console.log("o campo 'id_chat' deve ser um numero inteiro")
         callback(400, null);
      }
      
   }

   static async excluirTodosOsChatDoUsuario(id_usuario){

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
         c.excluido_em IS NULL;
      `;

      const chats = await con.query(query, { type: Sequelize.QueryTypes.SELECT });

      let i = 0;

      const deletarChat = async () => {

         if(i == chats.length){

            return;

         } else {

            await this.excluirChat(id_chat[i].id_chat)

            i++;

            await deletarChat();
         }

      }

      await deletarChat();

      return;
   }

   static async excluirChat(id_chat){
      const query = `
         UPDATE 
         tbl_chat AS c
         INNER JOIN
         tbl_chat_usuario AS cu
         ON
         cu.id_chat = c.id_chat
         INNER JOIN
         tbl_mensagem AS m
         ON
         m.para = cu.id_chat_usuario
         SET 
         c.excluido_em = now(),
         cu.excluido_em = now(),
         m.excluido_em = now()
         WHERE
         c.excluido_em IS NULL
         AND
         cu.excluido_em IS NULL
         AND
         m.excluido_em IS NULL
         AND
         c.id_chat = ${id_chat};
      `;

      await con.query(query, { type: Sequelize.QueryTypes.UPDATE });

      return;

   }

   static async excluirChatsByAnuncio(id_anuncio){
      const query = `
         UPDATE 
         tbl_chat AS c
         INNER JOIN
         tbl_chat_usuario AS cu
         ON
         cu.id_chat = c.id_chat
         INNER JOIN
         tbl_mensagem AS m
         ON
         m.para = cu.id_chat_usuario
         SET 
         c.excluido_em = now(),
         cu.excluido_em = now(),
         m.excluido_em = now()
         WHERE
         c.excluido_em IS NULL
         AND
         cu.excluido_em IS NULL
         AND
         m.excluido_em IS NULL
         AND
         c.id_anuncio = ${id_anuncio};
      `;

      await con.query(query, { type: Sequelize.QueryTypes.UPDATE });

      return;

   }
}

module.exports = ControllerChat;