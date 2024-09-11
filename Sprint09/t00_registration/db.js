const mysql = require('mysql2');
const config = require('./config.json');

const pool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  connectionLimit: config.connectionLimit
});

module.exports = pool.promise();
