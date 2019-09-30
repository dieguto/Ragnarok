const Sequelize = require("sequelize");
const con = require("../config/conexao");
const Fabricante = require("./Fabricante")

class Console extends Sequelize.Model { }

Console.init({
   id_console:{
      type:Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   id_fabricante:{
      type:Sequelize.INTEGER,
      allowNull: false
   },
   nome:{
      type:Sequelize.STRING(50),
      validate:{
         len:{
            args:[3, 50],
            msg: "No minimo 3 caracteres e no maximo 50"
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
			'excluido_em',
			'id_fabricante'
			] 
	}
   },
   createdAt: 'criado_em',
   updatedAt: 'atualizado_em',
   deletedAt: 'excluido_em',
   timestamps: true,
   underscored: true,
   paranoid: true,
   tableName: 'tbl_console',
   modelName:'console',
   sequelize: con
});

Console.belongsTo(Fabricante,
   {as:"fabricante", foreignKey:"id_fabricante"})

module.exports = Console;