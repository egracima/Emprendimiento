import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import infoUserRoutes from "./routes/infoUserRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/productos", productRoutes)
app.use("/infoUser", infoUserRoutes)

const PORT = 3000;
app.listen(PORT, () =>
  console.log(` Servidor corriendo en http://localhost:${PORT}`)
);