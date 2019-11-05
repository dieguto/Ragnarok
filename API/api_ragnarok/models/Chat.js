const Sequelize = require("sequelize");
const con = require("../config/conexao");

class Chat extends Sequelize.Model { };

Chat.init({
   id_chat:{
      type:Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   id_anuncio:{
      type:Sequelize.INTEGER,
      allowNull: false
   },
   id_usuario_dono:{
      type:Sequelize.INTEGER,
      allowNull: false
   },
   id_usuario_interessado:{
      type:Sequelize.INTEGER,
      allowNull: false
   },
   c_foto_conversa:{
      type:Sequelize.STRING(300),
      allowNull: false
   }
},{
   createdAt: 'criado_em',
   deletedAt: 'excluido_em',
   timestamps: true,
   underscored: true,
   paranoid: true,
   tableName: 'tbl_chat',
   modelName:'chat',
   sequelize: con
})

module.exports = Chat;