import express from "express";
import  recordCtrl  from "../controllers/recordController.js";
import {validateCreateRecord, validateUpdateRecord} from "../middleware/recordMiddleware.js"

const router = express.Router();

router.post("/create",validateCreateRecord, recordCtrl.createRecord);
router.get("/getAll", recordCtrl.getAllRecords);
router.put("/update/:Id",validateUpdateRecord, recordCtrl.updateRecordById);
router.delete("/delete/:Id", recordCtrl.deleteRecordtById);

export default router;