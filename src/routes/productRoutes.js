import express from "express";
import  productCtrl  from "../controllers/productController.js";
import {validateCreateProduct, validateUpdateProduct} from "../middleware/productMiddleware.js"

const router = express.Router();

router.post("/create",validateCreateProduct, productCtrl.createProduct);
router.get("/getAll", productCtrl.getAllProducts);
router.put("/update/:IdProducto",validateUpdateProduct, productCtrl.updateProduct);
router.delete("/delete/:IdProducto", productCtrl.deleteProduct);

export default router;