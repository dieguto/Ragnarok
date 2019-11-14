const Sequelize = require("sequelize");
const con = require("../config/conexao");

class ChatUsuario extends Sequelize.Model { };

ChatUsuario.init({
   id_chat_usuario:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   id_chat:{
      type: Sequelize.INTEGER,
      allowNull: false
   },
   id_usuario:{
      type: Sequelize.INTEGER,
      allowNull: false
   }
},{
   defaultScope: {
      attributes: { 
         exclude: [
            'criado_em',
            'atualizado_em',
            'excluido_em'
         ] 
      }
   },
   createdAt: 'criado_em',
   updatedAt: 'atualizado_em',
   deletedAt: 'excluido_em',
   timestamps: true,
   underscored: true,
   paranoid: true,
   tableName: 'tbl_chat_usuario',
   modelName:'chat_usuario',
   sequelize: con
})

module.exports = ChatUsuario;