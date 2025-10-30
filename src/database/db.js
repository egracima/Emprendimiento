import sql from 'mssql'
import dotenv from 'dotenv'
dotenv.config()

const stringConnection = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(stringConnection)
.connect()
.then(pool=>{
    console.log('Conectado')
    return pool
})
.catch(err =>{
  console.error('Error al conectar la base de datos', err)
})

async function getConnection() {
  try {
    const pool = await sql.connect(stringConnection);
    return pool;
  } catch (err) {
    console.error("Error de conexión a DB:", err.message);
    throw err;
  }
}

export { sql, getConnection }