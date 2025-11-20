import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import infoUserRoutes from "./routes/infoUserRoutes.js";
import shoppingCartRoutes from "./routes/shoppingCartRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/productos", productRoutes)
app.use("/infoUser", infoUserRoutes)
app.use("/shoppingCart", shoppingCartRoutes)
app.use("/record", recordRoutes)
app.use("/user", userRoutes)
app.use("/auth", authRoutes)

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(` Servidor corriendo en http://localhost:${PORT}`)
);