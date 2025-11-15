const mssql = {
  connect: jest.fn(),
  Request: jest.fn().mockImplementation(() => ({
    input: jest.fn().mockReturnThis(),
    query: jest.fn().mockResolvedValue({ recordset: [] }),
  })),
  sql: {
    Int: jest.fn(),
    VarChar: jest.fn(),
    Decimal: jest.fn(),
  },
};

module.exports = mssql;