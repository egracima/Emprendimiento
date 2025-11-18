import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import infoUserRoutes from "./routes/infoUserRoutes.js";
import shoppingCartRoutes from "./routes/shoppingCartRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/productos", productRoutes)
app.use("/infoUser", infoUserRoutes)
app.use("/shoppingCart", shoppingCartRoutes)
app.use("/record", recordRoutes)
app.use("/user", userRoutes)

const PORT = 3000;
app.listen(PORT, () =>
  console.log(` Servidor corriendo en http://localhost:${PORT}`)
);