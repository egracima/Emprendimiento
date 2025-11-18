import { getConnection, sql } from "../database/db.js"

export async function createUser(User) {
  const pool = await getConnection();
  try {
    const { UserName, Pass } = User;

    await pool
      .request()
      .input("UserName", sql.VarChar, UserName)
      .input("Pass", sql.VarChar, Pass)
      .query(
        "INSERT INTO Users (UserName, Pass) VALUES (@UserName, @Pass)"
      );

    return { message: "Usuario creado correctamente" };
  } catch (err) {
    console.error(" Error al crear usuario:", err.message);
    throw err;
  }
}

export async function getAllUsers() {
  const pool = await getConnection();
  try {
    const result = await pool.request().query("SELECT * FROM Users");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener usuarios:", err.message);
    throw err;
  }
}

export async function updateUser(UserName, User) {
  const pool = await getConnection();
  try {
    const { Pass } = User;

    const result = await pool
      .request()
      .input("UserName", sql.VarChar, UserName)
      .input("Pass", sql.VarChar, Pass)
      .query(
        "UPDATE Users SET Pass = @Pass WHERE RTRIM(UserName) = @UserName"
      );

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error(" Error al actualizar el usuario:", err.message);
    throw err;
  }
}

export async function deleteUsertById(UserName) {
  const pool = await getConnection();
  try {
    const result = await pool
      .request()
      .input("UserName", sql.VarChar, UserName)
      .query("DELETE FROM Users WHERE RTRIM(UserName) = @UserName");

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error("Error al eliminar el usuario:", err.message);
    throw err;
  }
}