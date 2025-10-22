
jest.mock('../database/db', () => ({
  getConnection: jest.fn()
}));


const pool = require('../database/db');
const { createProducto, deleteProductoByCodigo } = require('../Services/productoService');

const mockConn = {
  query: jest.fn(),
  release: jest.fn()
};

describe('Pruebas unitarias de productoService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    pool.getConnection.mockResolvedValue(mockConn);
  });


  test('createProducto el debe de insertar un producto y devolverlo', async () => {
    mockConn.query.mockResolvedValue([{ insertId: 1 }]);

    const producto = {
      codigo: 'P001',
      nombre: 'Camisa',
      descripcion: 'Camisa azul',
      precio: 50000,
      stock: 10
    };

    const result = await createProducto(producto);

    expect(pool.getConnection).toHaveBeenCalled();
    expect(mockConn.query).toHaveBeenCalledWith(
      'INSERT INTO Productos (codigo, nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)',
      ['P001', 'Camisa', 'Camisa azul', 50000, 10]
    );
    expect(result).toEqual(producto);
    expect(mockConn.release).toHaveBeenCalled();
  });


  test('deleteProductoByCodigo ', async () => {
    mockConn.query.mockResolvedValue([{ affectedRows: 1 }]);

    const result = await deleteProductoByCodigo('P001');

    expect(result).toBe(true);
    expect(mockConn.query).toHaveBeenCalledWith(
      'DELETE FROM Productos WHERE codigo = ?',
      ['P001']
    );
    expect(mockConn.release).toHaveBeenCalled();
  });


  test('createProducto este deberia de lanzar error si la consulta llega a fallar', async () => {
    mockConn.query.mockRejectedValue(new Error('Error de base de datos'));

    const producto = {
      codigo: 'P002',
      nombre: 'Pantalón',
      descripcion: 'Pantalón negro',
      precio: 80000,
      stock: 5
    };

    await expect(createProducto(producto)).rejects.toThrow('Error de base de datos');
    expect(mockConn.release).toHaveBeenCalled();
  });
});

