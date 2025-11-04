import express from "express";
import  ShoppingCartCtrl  from "../controllers/shoppingCartControllers.js";
import {validateCreateShoppingCart, validateUpdateShoppingCart} from "../middleware/shoppingCartMiddleware.js"

const router = express.Router();

router.post("/create",validateCreateShoppingCart, ShoppingCartCtrl.createShoppingCart);
router.get("/getAll", ShoppingCartCtrl.getAllShoppingCart);
router.put("/update/:Id",validateUpdateShoppingCart, ShoppingCartCtrl.updateShoppingCart);
router.delete("/delete/:Id", ShoppingCartCtrl.deleteShoppingCartById);

export default router;