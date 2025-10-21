const pool = require('../dataBase/db');

async function createProducto(producto) {
  const conn = await pool.getConnection();
  try {
    const { codigo, nombre, descripcion, precio, stock } = producto;
    const [result] = await conn.query(
      'INSERT INTO Productos (codigo, nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)',
      [codigo, nombre, descripcion, precio, stock]
    );
    return producto; 
  } catch (e) {
    console.error('Error al crear producto:', e.message);
    throw e;
  } finally {
    conn.release();
  }
}


async function deleteProductoByCodigo(codigo) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      'DELETE FROM Productos WHERE codigo = ?',
      [codigo]
    );
    return result.affectedRows > 0;
  } catch (e) {
    console.error('Error al eliminar producto:', e.message);
    throw e;
  } finally {
    conn.release();
  }
}

module.exports = { createProducto, deleteProductoByCodigo };
