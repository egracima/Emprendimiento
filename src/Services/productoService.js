const pool = require('../dataBase/db');


async function createProduct(product) {
  const conn = await pool.getConnection();
  try {
    const { IdProducto, Nombre, Precio, Stock, Descripcion } = product;
    const [result] = await conn.query(
      'INSERT INTO Productos (IdProducto, Nombre, Precio, Stock, Descripcion) VALUES (?, ?, ?, ?, ?)',
      [IdProducto, Nombre, Precio, Stock, Descripcion]
    );
    return { message: 'Producto creado correctamente', result };
  } catch (e) {
    console.error("Error al crear producto:", e.message);
    throw e;
  } finally {
    conn.release();
  }
}


async function getAllProducts() {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM Productos');
    return rows;
  } catch (e) {
    console.error("Error al obtener productos:", e.message);
    throw e;
  } finally {
    conn.release();
  }
}


async function updateProduct(IdProducto, product) {
  const conn = await pool.getConnection();
  try {
    const { Nombre, Precio, Stock, Descripcion } = product;
    const [result] = await conn.query(
      'UPDATE Productos SET Nombre = ?, Precio = ?, Stock = ?, Descripcion = ? WHERE IdProducto = ?',
      [Nombre, Precio, Stock, Descripcion, IdProducto]
    );
    return result.affectedRows > 0;
  } catch (e) {
    console.error("Error al actualizar producto:", e.message);
    throw e;
  } finally {
    conn.release();
  }
}


async function deleteProductById(IdProducto) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query('DELETE FROM Productos WHERE IdProducto = ?', [IdProducto]);
    return result.affectedRows > 0;
  } catch (e) {
    console.error("Error al eliminar producto:", e.message);
    throw e;
  } finally {
    conn.release();
  }
}

async function getProductByNombre(Nombre) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM Productos WHERE Nombre LIKE ?', [`%${Nombre}%`]);
    return rows;
  } catch (e) {
    console.error("Error al buscar producto:", e.message);
    throw e;
  } finally {
    conn.release();
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProductById,
  getProductByNombre
};
