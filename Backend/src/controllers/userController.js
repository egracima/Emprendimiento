import * as userService from "../Services/userService.js";

async function createUser(req, res, next) {
  try {
    const payload = req.body;
    const newUser = await userService.createUser(payload);
    res.status(201).json({ ok: true, data: newUser });
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const User = await userService.getAllUsers();
    res.status(200).json({ ok: true, data: User });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { UserName } = req.params;
    const payload = req.body;
    const updated = await userService.updateUser(UserName, payload);
    if (!updated) {
      return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Usuario actualizado correctamente" });
  } catch (err) {
    next(err);
  }
}

async function deleteUsertById(req, res, next) {
  try {
    const { UserName } = req.params;
    const deleted = await userService.deleteUsertById(UserName);
    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Usuario eliminado correctamente" });
  } catch (err) {
    next(err);
  }
}

export default { createUser, getAllUsers, updateUser, deleteUsertById }