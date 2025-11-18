import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/database/db.js", () => ({
  getConnection: jest.fn(),
}));

const db = await import("../src/database/db.js");

describe("Pruebas unitarias de conexión de base de datos", () => {
  test("Debe simular conexión a la base de datos", async () => {
    const mockConnection = { request: jest.fn() };
    db.getConnection.mockResolvedValue(mockConnection);

    const conexion = await db.getConnection();

    expect(conexion).toBe(mockConnection);
    expect(db.getConnection).toHaveBeenCalled();
  });
});