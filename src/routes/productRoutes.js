import express from "express";
import  productoCtrl  from "../controllers/productController.js";
import {validateCreateProduct, validateUpdateProduct} from "../middleware/productMiddleware.js"

const router = express.Router();

router.post("/createProduct",validateCreateProduct, productoCtrl.createProduct);
router.get("/getAllProduct", productoCtrl.getAllProduct);
router.put("/update/:IdProducto",validateUpdateProduct, productoCtrl.updateProduct);
router.delete("/delete/:IdProducto", productoCtrl.deleteProduct);

export default router;