const mysql = require('mysql2');
require('dotenv').config();

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const promisePool = pool.promise();

const createUserTable = async ()=>{
  const query = 
  `CREATE TABLE IF NOT EXISTS Users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(256)
    )
  `
}

try {
  const connection = await promisePool.getConnection();

  await promisePool.query(query);
  
  connection.release();
} catch (error) {
  console.error('No se pudo crear la tabla', error)
};

createUserTable();

module.exports = promisePool;