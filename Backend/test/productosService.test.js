import { jest } from "@jest/globals";

jest.mock("mssql");
jest.unstable_mockModule("../src/database/db.js", () => ({
  getConnection: jest.fn(),
  sql: {
    VarChar: "VarChar",
    Decimal: "Decimal",
    Int: "Int",
  },
}));

const db = await import("../src/database/db.js");

const { createProduct, getAllProducts, updateProduct, deleteProductById } = await import(
  "../src/Services/productoService.js"
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Pruebas de productos", () => {

  //CREATE PRODUCT
  describe("createProduct", () => {
    test("Llama a getConnection y request", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({}) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await createProduct({ codigo: "001", nombre: "Test", descripcion: "desc", precio: 10, cantidad: 5 });

      expect(db.getConnection).toHaveBeenCalled();
      expect(mockRequest.query).toHaveBeenCalled();
    });

    test("Usa los tipos SQL correctos en input", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({}) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await createProduct({ codigo: "002", nombre: "Test", descripcion: "desc", precio: 20, cantidad: 3 });

      expect(mockRequest.input).toHaveBeenCalledWith("codigo", "VarChar", "002");
      expect(mockRequest.input).toHaveBeenCalledWith("nombre", "VarChar", "Test");
      expect(mockRequest.input).toHaveBeenCalledWith("precio", "Decimal", 20);
      expect(mockRequest.input).toHaveBeenCalledWith("cantidad", "Int", 3);
    });

    test("Retorna mensaje de éxito", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({}) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await createProduct({ codigo: "003", nombre: "Test", descripcion: "desc", precio: 30, cantidad: 2 });
      expect(res).toEqual({ message: "Producto creado correctamente" });
    });

    test("Lanza error si la query falla", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockRejectedValue(new Error("Error SQL")) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await expect(createProduct({ codigo: "004", nombre: "Test", descripcion: "desc", precio: 10, cantidad: 1 }))
        .rejects.toThrow("Error SQL");
    });

    test("Lanza error si la conexión falla", async () => {
      db.getConnection.mockRejectedValue(new Error("DB error"));
      await expect(createProduct({ codigo: "005", nombre: "Test", descripcion: "desc", precio: 10, cantidad: 1 }))
        .rejects.toThrow("DB error");
    });

    test("Integrada: flujo completo sin errores", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({}) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await createProduct({ codigo: "006", nombre: "Integrada", descripcion: "ok", precio: 12, cantidad: 3 });
      expect(res.message).toMatch(/Producto creado correctamente/);
    });
  });

  //GET ALL
  describe("getAllProducts", () => {
    test("Ejecuta SELECT correctamente", async () => {
      const mockResult = { recordset: [{ codigo: "001", nombre: "Test" }] };
      db.getConnection.mockResolvedValue({ request: () => ({ query: jest.fn().mockResolvedValue(mockResult) }) });

      const result = await getAllProducts();
      expect(result).toEqual(mockResult.recordset);
    });

    test("Llama a getConnection", async () => {
      const mockResult = { recordset: [] };
      db.getConnection.mockResolvedValue({ request: () => ({ query: jest.fn().mockResolvedValue(mockResult) }) });

      await getAllProducts();
      expect(db.getConnection).toHaveBeenCalled();
    });

    test("Lanza error si falla la query", async () => {
      const mockRequest = { query: jest.fn().mockRejectedValue(new Error("DB query error")) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await expect(getAllProducts()).rejects.toThrow("DB query error");
    });

    test("Lanza error si falla la conexión", async () => {
      db.getConnection.mockRejectedValue(new Error("DB connection error"));
      await expect(getAllProducts()).rejects.toThrow("DB connection error");
    });

    test("Devuelve array vacío si no hay resultados", async () => {
      const mockResult = { recordset: [] };
      db.getConnection.mockResolvedValue({ request: () => ({ query: jest.fn().mockResolvedValue(mockResult) }) });

      const result = await getAllProducts();
      expect(result).toEqual([]);
    });

    test("Integrada: retorna lista simulada de productos", async () => {
      const mockResult = { recordset: [{ codigo: "100", nombre: "ProdReal" }] };
      db.getConnection.mockResolvedValue({ request: () => ({ query: jest.fn().mockResolvedValue(mockResult) }) });

      const result = await getAllProducts();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  //UPDATE
  describe("updateProduct", () => {
    test("Llama a getConnection y request", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({ rowsAffected: [1] }) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await updateProduct("001", { nombre: "Editado", descripcion: "ok", precio: 15, cantidad: 4 });
      expect(res.message).toMatch(/actualizado correctamente/);
    });

    test("Usa inputs correctamente", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({ rowsAffected: [1] }) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await updateProduct("001", { nombre: "Nuevo", descripcion: "desc", precio: 10, cantidad: 2 });
      expect(mockRequest.input).toHaveBeenCalledWith("codigo", "VarChar", "001");
    });

    test("Retorna mensaje de éxito si se actualizó", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({ rowsAffected: [1] }) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await updateProduct("002", { nombre: "Actualizado" });
      expect(res.message).toMatch(/actualizado correctamente/);
    });

    test("Retorna mensaje de no encontrado si rowsAffected=0", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({ rowsAffected: [0] }) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await updateProduct("999", { nombre: "X" });
      expect(res.message).toMatch(/no encontrado/);
    });

    test("Lanza error si falla la query", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockRejectedValue(new Error("SQL Error")) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await expect(updateProduct("003", { nombre: "Error" })).rejects.toThrow("SQL Error");
    });

    test("Integrada: flujo completo con mock de actualización", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({ rowsAffected: [1] }) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await updateProduct("004", { nombre: "Integrado", descripcion: "test", precio: 12, cantidad: 4 });
      expect(res.message).toMatch(/actualizado correctamente/);
    });
  });

  //DELETE
  describe("deleteProductById", () => {
    test("Llama a getConnection y request", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({ rowsAffected: [1] }) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await deleteProductById("001");
      expect(res.message).toMatch(/eliminado correctamente/);
    });

    test("Ejecuta DELETE correctamente", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({ rowsAffected: [1] }) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await deleteProductById("001");
      expect(mockRequest.query).toHaveBeenCalledWith("DELETE FROM Productos WHERE codigo = @codigo");
    });

    test("Retorna mensaje de éxito si se eliminó", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({ rowsAffected: [1] }) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await deleteProductById("002");
      expect(res.message).toMatch(/eliminado correctamente/);
    });

    test("Lanza error si falla la query", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockRejectedValue(new Error("SQL Error")) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      await expect(deleteProductById("003")).rejects.toThrow("SQL Error");
    });

    test("Lanza error si falla la conexión", async () => {
      db.getConnection.mockRejectedValue(new Error("DB Error"));
      await expect(deleteProductById("004")).rejects.toThrow("DB Error");
    });

    test("Integrada: flujo completo de eliminación", async () => {
      const mockRequest = { input: jest.fn().mockReturnThis(), query: jest.fn().mockResolvedValue({ rowsAffected: [1] }) };
      db.getConnection.mockResolvedValue({ request: () => mockRequest });

      const res = await deleteProductById("005");
      expect(res.message).toMatch(/eliminado correctamente/);
    });
  });

});
