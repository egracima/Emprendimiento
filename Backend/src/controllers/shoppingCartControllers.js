import * as shoppingCartService from "../Services/shoppingCartService.js"

async function createShoppingCart(req, res, next) {
  try {
    const payload = req.body;
    const newShoppingCart = await shoppingCartService.createShoppingCart(payload);
    res.status(201).json({ ok: true, data: newShoppingCart });
  } catch (err) {
    next(err);
  }
}

async function getAllShoppingCart(req, res, next) {
  try {
    const ShoppingCart = await shoppingCartService.getAllShoppingCarts();
    res.status(200).json({ ok: true, data: ShoppingCart });
  } catch (err) {
    next(err);
  }
}

async function updateShoppingCart(req, res, next) {
  try {
    const { Idcarrito } = req.params;
    const payload = req.body;
    const updated = await shoppingCartService.updateShoppingCart(Idcarrito, payload);
    if (!updated) {
      return res.status(404).json({ ok: false, message: "Id no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Carrito de compras actualizado correctamente" });
  } catch (err) {
    next(err);
  }
}

async function deleteShoppingCartById(req, res, next) {
  try {
    const { Idcarrito } = req.params;
    const deleted = await shoppingCartService.deleteShoppingCartById(Idcarrito);
    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Id no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Carrito de compras eliminado correctamente" });
  } catch (err) {
    next(err);
  }
}

export default { createShoppingCart, getAllShoppingCart, updateShoppingCart, deleteShoppingCartById }