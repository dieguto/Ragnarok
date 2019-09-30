const Sequelize = require("sequelize");
const con = require("../config/conexao");
const Usuario = require("./Usuario");
const Genero = require("./Genero");
const Console = require("./Console");
const Dt = require("../utils/DtUtils");

class Anuncio extends Sequelize.Model { }

Anuncio.init({
   id_anuncio: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
   },
   id_usuario:{
      type:Sequelize.INTEGER,
      allowNull: false
   },
   titulo:{
      type:Sequelize.STRING(150),
      validate:{
         len:{
            args:[3, 150],
            msg: "No minimo 3 caracteres e no maximo 150"
         }
      },
      allowNull: false
   },
   descricao:{
      type:Sequelize.TEXT,
      allowNull: true
   },
   info_rawg:{
      type:Sequelize.TEXT,
      allowNull: true,
      get(){
         if(this.getDataValue("info_rawg")){
            return JSON.parse(this.getDataValue("info_rawg"));
         } else {
            return null;
         }
      },
      set(json_info_rawg){
         if(json_info_rawg){
            this.setDataValue("info_rawg", JSON.stringify(json_info_rawg))
         } else {         
            this.setDataValue("info_rawg", null)
         }
      }
   },
   preco:{
      type:Sequelize.DECIMAL(6, 2),
      allowNull: true,
      validate:{
         min:{
            args: 1,
            msg: "O valor minimo de preço é de R$ 1"
         },
         max:{
            args: 1000,
            msg: "O valor maximo de preço é de R$ 1000"
         },
      }
   },
   c_fotos:{
      type:Sequelize.STRING(300),
      allowNull: false,
      get(){
         return JSON.parse(this.getDataValue("c_fotos"))
      },
      set(caminho){
         this.setDataValue("c_fotos", JSON.stringify(caminho))
      }
   },
   id_console:{
      type: Sequelize.INTEGER,
      allowNull: false
   },
   id_console_troca:{
      type: Sequelize.INTEGER,
      allowNull: true
   },
   slug_jogo:{
      type:Sequelize.STRING(150),
      allowNull: true
   },
   slug_jogo_troca:{
      type:Sequelize.STRING(150),
      allowNull: true
   },
   id_genero:{
      type:Sequelize.INTEGER,
      allowNull: true
   },
   is_acessorio:{
      type:Sequelize.BOOLEAN,
      allowNull:false
   },
   is_console:{
      type:Sequelize.BOOLEAN,
      allowNull:false
   },
   is_jogo:{
      type:Sequelize.BOOLEAN,
      allowNull:false
   },
   criado_em:{
      type:Sequelize.DATE,
      get(){
         return Dt.padraoComHoras(this.getDataValue("criado_em"))
      }
   },
   atualizado_em:{
      type:Sequelize.DATE,
      get(){
         return Dt.padraoComHoras(this.getDataValue("atualizado_em"))
      }
   }
},{
	defaultScope: {
      include: [{ all: true, nested: true }],
      attributes: { 
         exclude: [
            'excluido_em',
            'id_usuario',
            'id_console_troca',
            'id_console',
            'id_genero'
         ] 
      }
   },
   scopes:{
      completo: { }
   },
   createdAt: 'criado_em',
   updatedAt: 'atualizado_em',
   deletedAt: 'excluido_em',
   timestamps: true,
   underscored: true,
   paranoid: true,
   tableName: 'tbl_anuncio',
   modelName:'anuncio',
   sequelize: con
});

Anuncio.belongsTo(Console,
   {as:"console", foreignKey: "id_console"})
   
Anuncio.belongsTo(Console,
   {as:"console_troca", foreignKey: "id_console_troca"})

Anuncio.belongsTo(Genero, 
   {as:"genero", foreignKey: 'id_genero'})
   
Anuncio.belongsTo(Usuario, 
   {as:"usuario", foreignKey: 'id_usuario'})

 module.exports = Anuncio;
 

