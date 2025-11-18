import * as productService from "../Services/productService.js";

async function createProduct(req, res, next) {
  try {
    const payload = req.body;
    const newProduct = await productService.createProduct(payload);
    res.status(201).json({ ok: true, data: newProduct });
  } catch (err) {
    next(err);
  }
}

async function getAllProducts(req, res, next) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ ok: true, data: products });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { IdProducto } = req.params;
    const payload = req.body;
    const updated = await productService.updateProduct(IdProducto, payload);
    if (!updated) {
      return res.status(404).json({ ok: false, message: "Producto no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Producto actualizado correctamente" });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { IdProducto } = req.params;
    const deleted = await productService.deleteProductById(IdProducto);
    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Producto no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Producto eliminado correctamente" });
  } catch (err) {
    next(err);
  }
}

export default { createProduct, getAllProducts, updateProduct, deleteProduct }