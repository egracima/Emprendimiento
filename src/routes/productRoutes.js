import express from "express";
import  productoCtrl  from "../controllers/productController.js";
import validateProduct from "../middleware/productMiddleware.js"

const router = express.Router();

router.post("/createProduct",validateProduct, productoCtrl.createProducto);
router.get("/getAllProduct",validateProduct, productoCtrl.getAllProductos);
router.put("/update:IdProduct",validateProduct, productoCtrl.updateProducto);
router.delete("/delete:IdProducto",validateProduct, productoCtrl.deleteProducto);

export default router;