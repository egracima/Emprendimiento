import { getConnection, sql } from "../database/db.js";

// ✅ Crear un producto
export const createProduct = async (producto) => {
  const { codigo, nombre, descripcion, precio, stock } = producto;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("codigo", sql.VarChar(10), codigo)
      .input("nombre", sql.VarChar(100), nombre)
      .input("descripcion", sql.VarChar(255), descripcion)
      .input("precio", sql.Decimal(10, 2), precio)
      .input("stock", sql.Int, stock)
      .query(`
        INSERT INTO Productos (codigo, nombre, descripcion, precio, stock)
        VALUES (@codigo, @nombre, @descripcion, @precio, @stock)
      `);
    return { message: "✅ Producto creado correctamente" };
  } catch (error) {
    console.error("❌ Error al crear producto:", error.message);
    throw error;
  }
};

// ✅ Obtener todos los productos
export const getAllProduct = async () => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Productos");
    return result.recordset;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error.message);
    throw error;
  }
};

// ✅ Actualizar un producto
export const updateProduct = async (codigo, producto) => {
  const { nombre, descripcion, precio, stock } = producto;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo", sql.VarChar(10), codigo)
      .input("nombre", sql.VarChar(100), nombre)
      .input("descripcion", sql.VarChar(255), descripcion)
      .input("precio", sql.Decimal(10, 2), precio)
      .input("stock", sql.Int, stock)
      .query(`
        UPDATE Productos
        SET nombre = @nombre,
            descripcion = @descripcion,
            precio = @precio,
            stock = @stock
        WHERE codigo = @codigo
      `);

    if (result.rowsAffected[0] === 0)
      return { message: "⚠️ Producto no encontrado" };

    return { message: "✅ Producto actualizado correctamente" };
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error.message);
    throw error;
  }
};

// ✅ Eliminar un producto por ID (código)
export const deleteProductoById = async (codigo) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo", sql.VarChar(10), codigo)
      .query("DELETE FROM Productos WHERE codigo = @codigo");

    if (result.rowsAffected[0] === 0)
      return { message: "⚠️ Producto no encontrado" };

    return { message: "✅ Producto eliminado correctamente" };
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error.message);
    throw error;
  }
};