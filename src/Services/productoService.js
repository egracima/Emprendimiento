import { getConnection, sql } from "../database/db.js";

export async function createProducto({ codigo, nombre, descripcion, precio, stock }) {
  const pool = await getConnection();

  try {
    await pool.request()
      .input("codigo", sql.VarChar(10), codigo)
      .input("nombre", sql.VarChar(100), nombre)
      .input("descripcion", sql.VarChar(255), descripcion)
      .input("precio", sql.Decimal(10, 2), precio)
      .input("stock", sql.Int, stock)
      .query(`
        INSERT INTO Productos (codigo, nombre, descripcion, precio, stock)
        VALUES (@codigo, @nombre, @descripcion, @precio, @stock)
      `);

    return { codigo, nombre, descripcion, precio, stock };
  } catch (error) {
    console.error("❌ Error al crear producto:", error.message);
    throw error;
  }
}

export async function deleteProductoByCodigo(codigo) {
  const pool = await getConnection();

  try {
    const result = await pool.request()
      .input("codigo", sql.VarChar(10), codigo)
      .query("DELETE FROM Productos WHERE codigo = @codigo");

    return result.rowsAffected[0] > 0;
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error.message);
    throw error;
  }
}