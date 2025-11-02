import * as infoUserService from "../Services/infoUserService.js"

async function createInfoUser(req, res, next) {
  try {
    const payload = req.body;
    const newInfoUser = await infoUserService.createInfoUser(payload);
    res.status(201).json({ ok: true, data: newInfoUser });
  } catch (err) {
    next(err);
  }
}

async function getAllInfoUsers(req, res, next) {
  try {
    const InfoUser = await infoUserService.getAllInfoUsers();
    res.status(200).json({ ok: true, data: InfoUser });
  } catch (err) {
    next(err);
  }
}

async function updateInfoUser(req, res, next) {
  try {
    const { Cedula } = req.params;
    const payload = req.body;
    const updated = await infoUserService.updateInfoUser(Cedula, payload);
    if (!updated) {
      return res.status(404).json({ ok: false, message: "Cedula no encontrada" });
    }
    res.status(200).json({ ok: true, message: "Informacion de usuario actualizada correctamente" });
  } catch (err) {
    next(err);
  }
}

async function deleteInfoUserByCedula(req, res, next) {
  try {
    const { Cedula } = req.params;
    const deleted = await infoUserService.deleteInfoUserByCedula(Cedula);
    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Cedula no encontrada" });
    }
    res.status(200).json({ ok: true, message: "Informacion de usuario eliminada correctamente" });
  } catch (err) {
    next(err);
  }
}

export default { createInfoUser, getAllInfoUsers, updateInfoUser, deleteInfoUserByCedula }