import { getConnection, sql } from "../database/db.js"

export async function createShoppingCart(ShoppingCart) {
  const pool = await getConnection();
  try {
    const { IdCarrito, Cantidad, ValorPagar, IdProductoFk, UserNameFk } = ShoppingCart;

    await pool
      .request()
      .input("IdCarrito", sql.VarChar, IdCarrito)
      .input("Cantidad", sql.Int, Cantidad)
      .input("ValorPagar", sql.Money, ValorPagar)
      .input("IdProductoFk", sql.VarChar, IdProductoFk)
      .input("UserNameFk", sql.VarChar, UserNameFk)
      .query(
        "INSERT INTO ShoppingCart (IdCarrito, Cantidad, ValorPagar, IdProductoFk, UserNameFk) VALUES (@IdCarrito, @Cantidad, @ValorPagar, @IdProductoFk, @UserNameFk)"
      );

    return { message: "Carrito de compras creado correctamente" };
  } catch (err) {
    console.error(" Error al crear Carrito de compras:", err.message);
    throw err;
  }
}

export async function getAllShoppingCarts() {
  const pool = await getConnection();
  try {
    const result = await pool.request().query("SELECT * FROM ShoppingCart");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener Carrito de compras:", err.message);
    throw err;
  }
}

export async function updateShoppingCart(IdCarrito, ShoppingCart) {
  const pool = await getConnection();
  try {
    const { Cantidad, ValorPagar, IdProductoFk, UserNameFk} = ShoppingCart;

    const result = await pool
      .request()
      .input("IdCarrito", sql.VarChar, IdCarrito)
      .input("Cantidad", sql.Int, Cantidad)
      .input("ValorPagar", sql.Money, ValorPagar)
      .input("IdProductoFk", sql.VarChar, IdProductoFk)
      .input("UserNameFk", sql.VarChar, UserNameFk)
      .query(
        "UPDATE ShoppingCart SET Cantidad = @Cantidad, ValorPagar = @ValorPagar, IdProductoFk = @IdProductoFk, UserNameFk = @UserNameFk  WHERE IdCarrito = @IdCarrito"
      );

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error(" Error al actualizar Carrito de compras:", err.message);
    throw err;
  }
}

export async function deleteShoppingCartById(IdCarrito) {
  const pool = await getConnection();
  try {
    const result = await pool
      .request()
      .input("IdCarrito", sql.VarChar, IdCarrito)
      .query("DELETE FROM ShoppingCart WHERE RTRIM(IdCarrito) = @IdCarrito");

    return result.rowsAffected[0] > 0;
  } catch (err) {
    console.error("Error al eliminar Carrito de compras:", err.message);
    throw err;
  }
}