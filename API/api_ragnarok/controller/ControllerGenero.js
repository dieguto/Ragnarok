const Genero = require("../models/Genero");
const Sequelize = require("sequelize");
const con = require("../config/conexao")

class ControllerGenero {
   static buscarTodos(callback){
      Genero.findAll()
      .then(generos => {
         if(generos.length != 0){
            callback(200, generos);
         } else {
            callback(404, null);
         }
      })
      .catch(err => {
         callback(404, null)
      })
   }

   static populares(callback){

      const query = `
         SELECT g.nome, g.id_genero, COUNT(*) as total
         FROM tbl_genero AS g
         INNER JOIN
         tbl_anuncio AS a
         ON a.id_genero = g.id_genero
         AND
         a.excluido_em IS NULL
         GROUP BY a.id_genero
         ORDER BY total DESC;
      `;

      con.query(query, { type: Sequelize.QueryTypes.SELECT })
      .then(generos => {
         callback(200, generos)
      })
      .catch(err => {
         callback(404, null)
      })
   }
}

module.exports = ControllerGenero;