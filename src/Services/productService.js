import { getConnection, sql } from "../database/db.js";

export async function createProduct(producto) {
  const pool = await getConnection();
  try {
    const { IdProducto, Nombre, Precio, Stock, Descripcion } = producto;

    await pool
      .request()
      .input("IdProducto", sql.VarChar, IdProducto)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Precio", sql.Money, Precio)
      .input("Stock", sql.Int, Stock)
      .input("Descripcion", sql.VarChar, Descripcion)
      .query(
        "INSERT INTO Productos (IdProducto, Nombre, Precio, Stock, Descripcion) VALUES (@IdProducto, @Nombre, @Precio, @Stock, @Descripcion)"
      );

    return { message: "Producto creado correctamente" };
  } catch (err) {
    console.error("Error al crear producto:", err.message);
    throw err;
  }
}

export async function getAllProducts() {
  const pool = await getConnection();
  try {
    const result = await pool.request().query("SELECT * FROM Productos");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener productos:", err.message);
    throw err;
  }
}

export async function updateProduct(IdProducto, product) {
  const pool = await getConnection();
  try {
    const { Nombre, Precio, Stock, Descripcion } = product;

    const result = await pool
      .request()
      .input("IdProducto", sql.VarChar, IdProducto)
      .input("Nombre", sql.VarChar, Nombre)
      .input("Precio", sql.Money, Precio)
      .input("Stock", sql.Int, Stock)
      .input("Descripcion", sql.VarChar, Descripcion)
      .query(
        "UPDATE Productos SET Nombre = @Nombre, Precio = @Precio, Stock = @Stock, Descripcion = @Descripcion WHERE RTRIM(IdProducto) = @IdProducto"
      );

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error("Error al actualizar producto:", err.message);
    throw err;
  }
}

export async function deleteProductById(IdProducto) {
  const pool = await getConnection();
  try {
    const result = await pool
      .request()
      .input("IdProducto", sql.VarChar, IdProducto)
      .query("DELETE FROM Productos WHERE RTRIM(IdProducto) = @IdProducto");

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error("Error al eliminar producto:", err.message);
    throw err;
  }
}
