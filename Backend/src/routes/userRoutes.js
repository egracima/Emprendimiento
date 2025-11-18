import express from "express";
import  userCtrl  from "../controllers/userController.js";
import {validateCreateUser, validateUpdateUser} from "../middleware/userMiddleware.js"

const router = express.Router();

router.post("/create",validateCreateUser, userCtrl.createUser);
router.get("/getAll", userCtrl.getAllUsers);
router.put("/update/:UserName",validateUpdateUser, userCtrl.updateUser);
router.delete("/delete/:UserName", userCtrl.deleteUsertById);

export default router;