const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor proyecto de velas y manillas");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
