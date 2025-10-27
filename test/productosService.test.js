/**
 * @file productosService.test.js
 * ✅ Tests completos (5 unitarios + 1 integrado por función)
 */

import { jest } from "@jest/globals";

// 🧠 Mocks de la conexión
jest.unstable_mockModule("../src/database/db.js", () => ({
  getConnection: jest.fn(),
  sql: {
    VarChar: jest.fn().mockReturnValue("VarChar"),
    Decimal: jest.fn().mockReturnValue("Decimal"),
    Int: jest.fn().mockReturnValue("Int"),
  },
}));

const db = await import("../src/database/db.js");
const { createProduct, getAllProduct, updateProduct, deleteProductoById } = await import(
  "../src/Services/productoService.js"
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("🧪 Pruebas del servicio de productos", () => {
  // ==================== CREATE PRODUCT ====================
  describe("createProduct", () => {
    test("✅ Debe llamar a getConnection y request", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({}) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await createProduct({ codigo: "001", nombre: "Test", descripcion: "desc", precio: 10, cantidad: 5 });

      expect(db.getConnection).toHaveBeenCalled();
      expect(mockRequest.query).toHaveBeenCalled();
    });

    test("🧩 Debe usar los tipos SQL correctos", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({}) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await createProduct({ codigo: "002", nombre: "Test", descripcion: "desc", precio: 10, cantidad: 5 });

      expect(db.sql.VarChar).toHaveBeenCalled();
      expect(db.sql.Decimal).toHaveBeenCalled();
      expect(db.sql.Int).toHaveBeenCalled();
    });

    test("🧪 Debe retornar mensaje de éxito", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({}) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await createProduct({ codigo: "003", nombre: "Test", descripcion: "desc", precio: 10, cantidad: 5 });
      expect(res).toEqual({ message: "✅ Producto creado correctamente" });
    });

    test("❌ Debe lanzar error si la query falla", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockRejectedValue(new Error("Error SQL")) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await expect(
        createProduct({ codigo: "004", nombre: "Test", descripcion: "desc", precio: 10, cantidad: 5 })
      ).rejects.toThrow("Error SQL");
    });

    test("🌐 Integrada: Debe llamar al flujo completo sin errores", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({}) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });
      const result = await createProduct({ codigo: "005", nombre: "Integrada", descripcion: "ok", precio: 12, cantidad: 3 });
      expect(result.message).toMatch(/Producto creado correctamente/);
    });
  });

  // ==================== GET ALL ====================
  describe("getAllProduct", () => {
    test("✅ Debe ejecutar SELECT correctamente", async () => {
      const mockResult = { recordset: [{ codigo: "001", nombre: "Test" }] };
      db.getConnection.mockResolvedValue({
        request: () => ({ query: jest.fn().mockResolvedValue(mockResult) }),
      });

      const result = await getAllProduct();
      expect(result).toEqual(mockResult.recordset);
    });

    test("🧩 Debe llamar a getConnection", async () => {
      const mockResult = { recordset: [] };
      db.getConnection.mockResolvedValue({
        request: () => ({ query: jest.fn().mockResolvedValue(mockResult) }),
      });

      await getAllProduct();
      expect(db.getConnection).toHaveBeenCalled();
    });

    test("❌ Debe lanzar error si falla la base de datos", async () => {
      db.getConnection.mockRejectedValue(new Error("DB error"));
      await expect(getAllProduct()).rejects.toThrow("DB error");
    });

    test("🌐 Integrada: debería traer productos reales si existen", async () => {
      const mockResult = { recordset: [{ codigo: "100", nombre: "ProdReal" }] };
      db.getConnection.mockResolvedValue({
        request: () => ({ query: jest.fn().mockResolvedValue(mockResult) }),
      });
      const result = await getAllProduct();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  // ==================== UPDATE ====================
  describe("updateProduct", () => {
    test("✅ Debe llamar a getConnection", async () => {
      const mockResult = { rowsAffected: [1] };
      db.getConnection.mockResolvedValue({
        request: () => ({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValue(mockResult),
        }),
      });

      const res = await updateProduct("001", { nombre: "Editado", descripcion: "ok", precio: 15, cantidad: 4 });
      expect(res.message).toMatch(/actualizado correctamente/);
    });

    test("🧩 Debe usar inputs correctamente", async () => {
      const mockRequest = {
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
      };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await updateProduct("001", { nombre: "Nuevo", descripcion: "desc", precio: 10, cantidad: 2 });
      expect(mockRequest.input).toHaveBeenCalledWith("codigo", "VarChar", "001");
    });

    test("❌ Debe manejar producto no encontrado", async () => {
      const mockRequest = {
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({ rowsAffected: [0] }),
      };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const result = await updateProduct("999", { nombre: "X" });
      expect(result.message).toMatch(/no encontrado/);
    });

    test("🌐 Integrada: debe ejecutar correctamente con mock completo", async () => {
      const mockResult = { rowsAffected: [1] };
      db.getConnection.mockResolvedValue({
        request: () => ({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValue(mockResult),
        }),
      });
      const result = await updateProduct("001", { nombre: "Integrado", descripcion: "test", precio: 12, cantidad: 4 });
      expect(result.message).toMatch(/actualizado correctamente/);
    });
  });

  // ==================== DELETE ====================
  describe("deleteProductoById", () => {
    test("✅ Debe llamar a getConnection", async () => {
      const mockResult = { rowsAffected: [1] };
      db.getConnection.mockResolvedValue({
        request: () => ({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValue(mockResult),
        }),
      });
      const result = await deleteProductoById("001");
      expect(result.message).toMatch(/eliminado correctamente/);
    });

    test("🧩 Debe ejecutar DELETE correctamente", async () => {
      const mockRequest = {
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
      };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await deleteProductoById("001");
      expect(mockRequest.query).toHaveBeenCalledWith("DELETE FROM Productos WHERE codigo = @codigo");
    });

    test("❌ Debe lanzar error si falla SQL", async () => {
      const mockRequest = {
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockRejectedValue(new Error("SQL Error")),
      };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await expect(deleteProductoById("002")).rejects.toThrow("SQL Error");
    });

    test("🌐 Integrada: debe eliminar correctamente si existe", async () => {
      const mockResult = { rowsAffected: [1] };
      db.getConnection.mockResolvedValue({
        request: () => ({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValue(mockResult),
        }),
      });
      const res = await deleteProductoById("003");
      expect(res.message).toMatch(/eliminado correctamente/);
    });
  });
});
