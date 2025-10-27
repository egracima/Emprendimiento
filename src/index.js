const express = require("express");
const dotenv = require("dotenv");
const sql = require("mssql");
const app = express();

dotenv.config();
app.use(express.json());

app.post("/api/productos", (req, res) => {
  const { IdProducto, Nombre, Precio, Stock, Descripcion } = req.body;
  if (!IdProducto || !Nombre || !Precio || !Stock || !Descripcion) {
    return res.status(400).json({ error: "Faltan datos del producto" });
  }

  res.status(201).json({ message: "Producto creado correctamente" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;