const { getConnection, sql } = require("../config/dataBase");

async function obtenerUsuarios(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Usuarios");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { obtenerUsuarios };