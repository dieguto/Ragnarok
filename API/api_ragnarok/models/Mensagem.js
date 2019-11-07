const Sequelize = require("sequelize");
const con = require("../config/conexao");

class Mensagem extends Sequelize.Model { };

Mensagem.init({
   id_mensagem:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   id_chat:{
      type: Sequelize.INTEGER,
      allowNull: false
   },
   id_usuario_destino:{
      type: Sequelize.INTEGER,
      allowNull: false
   },
   visualizada:{
      type: Sequelize.BOOLEAN,
      allowNull: false
   },
   mensagem:{
      type: Sequelize.TEXT,
      allowNull: false
   }
},{
   createdAt: 'criado_em',
   deletedAt: 'excluido_em',
   timestamps: true,
   underscored: true,
   paranoid: true,
   tableName: 'tbl_mensagem',
   modelName:'mensagem',
   sequelize: con
})