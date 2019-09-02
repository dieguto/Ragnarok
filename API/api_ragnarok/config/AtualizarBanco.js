const fs = require('fs');
const mysql = require('mysql2');
const arquivo_sql = __dirname + '/scripts_mysql/db_ragnarok.sql';
let linhasArrayFiltrado = "";
let sql = "";

const linhasArray = fs.readFileSync(arquivo_sql).toString().split("\n");

linhasArrayFiltrado = linhasArray.filter(linha => {
   return linha[0] !== "-";
});

sql = linhasArrayFiltrado.join("").replace(/\s/g, " ");

const con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'bcd127',
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




