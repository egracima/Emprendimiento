import { getConnection, sql } from "../database/db.js";

export async function createProduct(product) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input("codigo", sql.VarChar, product.codigo)
      .input("nombre", sql.VarChar, product.nombre)
      .input("descripcion", sql.VarChar, product.descripcion)
      .input("precio", sql.Decimal, product.precio)
      .input("cantidad", sql.Int, product.cantidad)
      .query(
        `INSERT INTO Productos (codigo, nombre, descripcion, precio, cantidad)
         VALUES (@codigo, @nombre, @descripcion, @precio, @cantidad)`
      );
    return { message: "Producto creado correctamente" };
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Productos");
    return result.recordset;
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    throw error;
  }
}

export async function updateProduct(codigo, product) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("codigo", sql.VarChar, codigo)
      .input("nombre", sql.VarChar, product.nombre)
      .input("descripcion", sql.VarChar, product.descripcion)
      .input("precio", sql.Decimal, product.precio)
      .input("cantidad", sql.Int, product.cantidad)
      .query(
        `UPDATE Productos SET 
          nombre = @nombre, 
          descripcion = @descripcion, 
          precio = @precio, 
          cantidad = @cantidad 
         WHERE codigo = @codigo`
      );

    if (result.rowsAffected[0] === 0) {
      return { message: "Producto no encontrado" };
    }
    return { message: "Producto actualizado correctamente" };
  } catch (error) {
    console.error("Error al actualizar producto:", error.message);
    throw error;
  }
}

export async function deleteProductById(codigo) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("codigo", sql.VarChar, codigo)
      .query("DELETE FROM Productos WHERE codigo = @codigo");

    if (result.rowsAffected[0] === 0) {
      return { message: "Producto no encontrado" };
    }
    return { message: "Producto eliminado correctamente" };
  } catch (error) {
    console.error("Error al eliminar producto:", error.message);
    throw error;
  }
}