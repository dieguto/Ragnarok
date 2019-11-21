const Sequelize = require('sequelize');

const database = "db_ragnarok";
const user = "root";
const password = "";
const host = "localhost";
const port = 3306;

const con = new Sequelize(database, user, password, {
   host,
   port,
   dialect: 'mysql',
   logging: false
});

module.exports = con;
