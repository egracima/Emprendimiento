import * as recordService from "../Services/recordService.js";

async function createRecord(req, res, next) {
  try {
    const payload = req.body;
    const newRecord = await recordService.createRecord(payload);
    res.status(201).json({ ok: true, data: newRecord });
  } catch (err) {
    next(err);
  }
}

async function getAllRecords(req, res, next) {
  try {
    const Records = await recordService.getAllRecords();
    res.status(200).json({ ok: true, data: Records });
  } catch (err) {
    next(err);
  }
}

async function updateRecordById(req, res, next) {
  try {
    const { IdHistorial } = req.params;
    const payload = req.body;
    const updated = await recordService.updateRecord(IdHistorial, payload);
    if (!updated) {
      return res.status(404).json({ ok: false, message: "Historial no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Historial actualizado correctamente" });
  } catch (err) {
    next(err);
  }
}

async function deleteRecordtById(req, res, next) {
  try {
    const { IdHistorial } = req.params;
    const deleted = await recordService.deleteRecordtById(IdHistorial);
    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Historial no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Historial eliminado correctamente" });
  } catch (err) {
    next(err);
  }
}

export default { createRecord, getAllRecords, updateRecordById, deleteRecordtById }