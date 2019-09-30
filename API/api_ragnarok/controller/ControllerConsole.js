const Console = require("../models/Console");
const Sequelize = require("sequelize");
const con = require("../config/conexao")

class ControllerConsole {
   static buscarTodos(callback){
      Console.findAll()
      .then(consoles => {
         if(consoles.length != 0){
            callback(200, consoles);
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
         SELECT c.nome, c.id_console, COUNT(*) as total
         FROM tbl_console AS c
         INNER JOIN
         tbl_anuncio AS a
         ON a.id_console = c.id_console
         AND
         a.excluido_em IS NULL
         GROUP BY a.id_console
         ORDER BY total DESC;
      `;

      con.query(query, { type: Sequelize.QueryTypes.SELECT })
      .then(consoles => {
         callback(200, consoles)
      })
      .catch(err => {
         callback(404, null)
      })
   }
}

module.exports = ControllerConsole;