import express from "express";
import  infoUserCtrl  from "../controllers/infoUserController.js";
import {validateCreateInfoUser, validateUpdateInfoUser} from "../middleware/infoUserMiddleware.js"

const router = express.Router();

router.post("/create",validateCreateInfoUser, infoUserCtrl.createInfoUser);
router.get("/getAll", infoUserCtrl.getAllInfoUsers);
router.put("/update/:Cedula",validateUpdateInfoUser, infoUserCtrl.updateInfoUser);
router.delete("/delete/:Cedula", infoUserCtrl.deleteInfoUserByCedula);

export default router;