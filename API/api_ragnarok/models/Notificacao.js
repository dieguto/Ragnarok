const Sequelize = require("sequelize");
const con = require("../config/conexao");

class Notificacao extends Sequelize.Model { };

Notificacao.init({
   id_notificacao:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   id_chat:{
      type: Sequelize.INTEGER,
      allowNull: false
   },
   para_usuario:{
      type: Sequelize.INTEGER,
      allowNull: false
   },
   info:{
      type: Sequelize.TEXT,
      allowNull: false
   },
   is_mensagem:{
      type: Sequelize.BOOLEAN,
      allowNull: false
   },
   is_chat:{
      type: Sequelize.BOOLEAN,
      allowNull: false
   },
   visualizada:{
      type: Sequelize.BOOLEAN,
      allowNull: false
   }
},{
   defaultScope: {
      attributes: [
         'id_chat', 
         'info', 
         'is_chat', 
         'is_mensagem', 
         ['criado_em', 'enviada_em']
      ]
   },
   createdAt: 'criado_em',
   updatedAt: 'atualizado_em',
   deletedAt: 'excluido_em',
   timestamps: true,
   underscored: true,
   paranoid: true,
   tableName: 'tbl_notificacao',
   modelName:'notificacao',
   sequelize: con
})

module.exports = Notificacao;