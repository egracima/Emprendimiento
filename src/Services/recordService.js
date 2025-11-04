import { getConnection, sql } from "../database/db.js"

export async function createRecord(Record) {
  const pool = await getConnection();
  try {
    const { IdHistorial, Fecha, ValorTotal, IdCarritoFk } = Record;

    await pool
      .request()
      .input("IdHistorial", sql.VarChar, IdHistorial)
      .input("Fecha", sql.Date, Fecha)
      .input("ValorTotal", sql.Money, ValorTotal)
      .input("IdCarritoFk", sql.VarChar, IdCarritoFk)
      .query(
        "INSERT INTO Records (IdHistorial, Fecha, ValorTotal, IdCarritoFk) VALUES (@IdHistorial, @Fecha, @ValorTotal, @IdCarritoFk)"
      );

    return { message: "Historial creado correctamente" };
  } catch (err) {
    console.error(" Error al crear historial:", err.message);
    throw err;
  }
}

export async function getAllRecords() {
  const pool = await getConnection();
  try {
    const result = await pool.request().query("SELECT * FROM Records");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener historiales:", err.message);
    throw err;
  }
}

export async function updateRecord(IdHistorial, Record) {
  const pool = await getConnection();
  try {
    const { Fecha, ValorTotal, IdCarritoFk } = Record;

    const result = await pool
      .request()
      .input("IdHistorial", sql.VarChar, IdHistorial)
      .input("Fecha", sql.Date, Fecha)
      .input("ValorTotal", sql.Money, ValorTotal)
      .input("IdCarritoFk", sql.VarChar, IdCarritoFk)
      .query(
        "UPDATE Records SET Fecha = @Fecha, ValorTotal = @ValorTotal, IdCarritoFk = @IdCarritoFk WHERE RTRIM(IdHistorial) = @IdHistorial"
      );

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error(" Error al actualizar el historial:", err.message);
    throw err;
  }
}

export async function deleteRecordtById(IdHistorial) {
  const pool = await getConnection();
  try {
    const result = await pool
      .request()
      .input("IdHistorial", sql.VarChar, IdHistorial)
      .query("DELETE FROM Records WHERE RTRIM(IdHistorial) = @IdHistorial");

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error("Error al eliminar el historial:", err.message);
    throw err;
  }
}