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
   para:{
      type: Sequelize.INTEGER,
      allowNull: false
   },
   mensagem:{
      type: Sequelize.TEXT,
      allowNull: false
   },
   visualizada:{
      type: Sequelize.BOOLEAN,
      allowNull: false
   },
   criado_em:{
      type:Sequelize.DATE,
      get(){
         return Dt.FormatoBrComHoras(this.getDataValue("criado_em"))
      }
   }
},{
   scopes:{
      simples: { 
         attributes: ['mensagem', ['criado_em', 'enviada_em']]
      }
   },
   createdAt: 'criado_em',
   deletedAt: 'excluido_em',
   timestamps: true,
   underscored: true,
   paranoid: true,
   tableName: 'tbl_mensagem',
   modelName:'mensagem',
   sequelize: con
})

module.exports = Mensagem;