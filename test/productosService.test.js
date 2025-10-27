import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/database/db.js", () => ({
  getConnection: jest.fn(),
  sql: {
    VarChar: jest.fn(() => "VarChar"),
    Decimal: jest.fn(() => "Decimal"),
    Int: jest.fn(() => "Int"),
  },
}));

const db = await import("../src/database/db.js");
const { createProducto, deleteProductoByCodigo } = await import("../src/Services/productoService.js");

describe("Pruebas del servicio de productos", () => {
  test("crear producto debe llamar a getConnection y ejecutar query", async () => {
    const mockPool = {
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ recordset: [{ id: 1 }] }),
    };

    db.getConnection.mockResolvedValue(mockPool);

    const result = await createProducto({
      codigo: "001",
      nombre: "Producto Test",
      descripcion: "Producto de prueba",
      precio: 500,
      stock: 10,
    });

    expect(db.getConnection).toHaveBeenCalled();
    expect(mockPool.request).toHaveBeenCalled();
    expect(mockPool.input).toHaveBeenCalledWith("codigo", "VarChar", "001");
    expect(mockPool.query).toHaveBeenCalled();
  });
});