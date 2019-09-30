const Sequelize = require("sequelize");
const con = require("../config/conexao");

class Genero extends Sequelize.Model { }

Genero.init({
   id_genero:{
      type:Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   nome:{
      type:Sequelize.STRING(50),
      validate:{
         len:{
            args: [3, 50],
            msg:"No minimo 3 caracteres e no maximo 50"
         }
      },
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
   tableName: 'tbl_genero',
   modelName:'genero',
   sequelize: con
});

module.exports = Genero;