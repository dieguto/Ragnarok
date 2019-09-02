const Sequelize = require("Sequelize");
const Model = Sequelize.Model;
const con = require("../config/Conexao");

class Usuario extends Model { }

Usuario.init({
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
   }
},{
   timestamps: false,
   underscored: true,
   tableName: 'tbl_usuario',
   sequelize: con
});

module.exports = Usuario;