const Sequelize = require("sequelize");
const con = require("../config/conexao");

class Chat extends Sequelize.Model { };

Chat.init({
   id_chat:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   id_anuncio:{
      type: Sequelize.INTEGER,
      allowNull: false
   },
   c_foto:{
      type: Sequelize.STRING(300),
      allowNull: false
   },
   is_ativo:{
      type: Sequelize.BOOLEAN,
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
   tableName: 'tbl_chat',
   modelName:'chat',
   sequelize: con
})

module.exports = Chat;