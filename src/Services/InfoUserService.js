import { getConnection, sql } from "../database/db.js"

export async function createInfoUser(InfoUser) {
  const pool = await getConnection();
  try {
    const { Cedula, Nombres, Apellidos, Correo, Celular, Direccion,  UserNameFk} = InfoUser;

    await pool
      .request()
      .input("Cedula", sql.BigInt, Cedula)
      .input("Nombres", sql.VarChar, Nombres)
      .input("Apellidos", sql.VarChar, Apellidos)
      .input("Correo", sql.VarChar, Correo)
      .input("Celular", sql.BigInt, Celular)
      .input("Direccion", sql.VarChar, Direccion)
      .input("UserNameFk", sql.VarChar, UserNameFk)
      .query(
        "INSERT INTO InfoUsers (Cedula, Nombres, Apellidos, Correo, Celular, Direccion, UserNameFk) VALUES (@Cedula, @Nombres, @Apellidos, @Correo, @Celular, @Direccion, @UserNameFk)"
      );

    return { message: "Informacion de usuario creada correctamente" };
  } catch (err) {
    console.error(" Error al crear Informacion del usuario:", err.message);
    throw err;
  }
}

export async function getAllInfoUsers() {
  const pool = await getConnection();
  try {
    const result = await pool.request().query("SELECT * FROM InfoUsers");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener informacion de usuarios:", err.message);
    throw err;
  }
}

export async function updateInfoUser(Cedula, InfoUser) {
  const pool = await getConnection();
  try {
    const { Nombres, Apellidos, Correo, Celular, Direccion,  UserNameFk} = InfoUser;

    const result = await pool
      .request()
      .input("Cedula", sql.BigInt, Cedula)
      .input("Nombres", sql.VarChar, Nombres)
      .input("Apellidos", sql.VarChar, Apellidos)
      .input("Correo", sql.VarChar, Correo)
      .input("Celular", sql.BigInt, Celular)
      .input("Direccion", sql.VarChar, Direccion)
      .input("UserNameFk", sql.VarChar, UserNameFk)
      .query(
        "UPDATE InfoUsers SET Nombres = @Nombres, Apellidos = @Apellidos, Correo = @Correo, Celular = @Celular, Direccion = @Direccion, UserNameFk = @UserNameFk  WHERE Cedula = @Cedula"
      );

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error(" Error al actualizar informacion de usuario:", err.message);
    throw err;
  }
}

export async function deleteInfoUsertByCedula(Cedula) {
  const pool = await getConnection();
  try {
    const result = await pool
      .request()
      .input("Cedula", sql.BigInt, Cedula)
      .query("DELETE FROM InfoUsers WHERE RTRIM(Cedula) = @Cedula");

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error("Error al eliminar informacion de usuario:", err.message);
    throw err;
  }
}