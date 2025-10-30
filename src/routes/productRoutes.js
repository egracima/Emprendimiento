import express from "express";
import {
  createProducto,
  getAllProductos,
  updateProducto,
  deleteProducto,
} from "../controllers/productController.js";

const router = express.Router();


router.post("/", createProducto);
router.get("/", getAllProductos);
router.put("/:IdProducto", updateProducto);
router.delete("/:IdProducto", deleteProducto);


export default router;








