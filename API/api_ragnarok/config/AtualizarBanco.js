const fs = require('fs');
const mysql = require('mysql2');
const arquivo_sql = __dirname + '/scripts_mysql/db_ragnarok.sql';

const linhasArray = fs.readFileSync(arquivo_sql).toString().split("\n");

let linhasArrayFiltrado = [];

for(let i = 0; i < linhasArray.length; i ++){
   if(!linhasArray[i].includes("-- ")){
      linhasArrayFiltrado.push(linhasArray[i]);
   }
}

const sql = linhasArrayFiltrado.join("").replace(/\s/g, " ");

const con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   port: 3306,
   multipleStatements: true
});

con.connect(err =>{
   if(err){
      console.log("Erro ao se conectar: " + err);

   } else {
      console.log("Conectado!");

      console.log("Atualizando...");

      con.query(sql, function (err, results, fields) {
         if (err) {
            console.log("Erro ao atualizar o banco: " + err);

         } else {
            console.log("Banco atualizado com sucesso!")
         }
      });
   }

   con.end()
});