const Sequelize = require("sequelize");
const con = require("../config/conexao");
const Dt = require("../utils/DtUtils");

class Usuario extends Sequelize.Model { }

Usuario.init({
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   nome: {
      type: Sequelize.STRING(200),
      allowNull: false,
      validate: {
         len: {
            args: [3, 200],
            msg: "No minimo 3 caracteres e no maximo 200"
         }
      }
   },
   email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
         isEmail: {
            args: true,
            msg: "Preencha com um Email válido!"
         },
         len: {
            args: [3, 100],
            msg: "No minimo 3 caracteres e no maximo 100"
         }
      }
   },
   senha: {
      type: Sequelize.STRING(128),
      allowNull: false
   },
   endereco:{
      type:Sequelize.STRING(150),
      allowNull: false
   },
   lat:{
      type:Sequelize.DECIMAL(7, 4),
      allowNull: false
   },
   lon:{
      type:Sequelize.DECIMAL(7, 4),
      allowNull: false
   },
   is_bloqueado: {
      type: Sequelize.BOOLEAN,
      allowNull: false
   },
   is_admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false
   },
   cep: {
      type: Sequelize.STRING(9),
      allowNull: false
   },
   criado_em:{
      type:Sequelize.DATE,
      get(){
         return Dt.padrao(this.getDataValue("criado_em"))
      }
   },
},{
   defaultScope: {
      attributes: { 
         exclude: [
            'atualizado_em',
            'excluido_em',
            'email',
            'senha',
            'cep'
         ] 
      }
   },
   scopes:{
      completo:{
         attributes: {  
            exclude: [
               'criado_em',
               'atualizado_em',
               'excluido_em'
            ] 
         }
      },
      anuncio:{
         attributes: { 
            exclude: [
               'atualizado_em',
               'excluido_em',
               'is_admin',
               'is_bloqueado',
               'email',
               'senha',
               'cep'
            ] 
         }
      }
   },
   createdAt: 'criado_em',
   updatedAt: 'atualizado_em',
   deletedAt: 'excluido_em',
   timestamps: true,
   underscored: true,
   paranoid: true,
   tableName: 'tbl_usuario',
   modelName:'usuario',
   sequelize: con
});

module.exports = Usuario;