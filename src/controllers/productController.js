import * as productoService from "../Services/productService.js";

export async function createProducto(req, res, next) {
  try {
    const payload = req.body;
    const newProducto = await productoService.createProduct(payload);
    res.status(201).json({ ok: true, data: newProducto });
  } catch (err) {
    next(err);
  }
}

export async function getAllProductos(req, res, next) {
  try {
    const productos = await productoService.getAllProducts();
    res.status(200).json({ ok: true, data: productos });
  } catch (err) {
    next(err);
  }
}

export async function updateProducto(req, res, next) {
  try {
    const { IdProducto } = req.params;
    const payload = req.body;
    const updated = await productoService.updateProduct(IdProducto, payload);
    if (!updated) {
      return res.status(404).json({ ok: false, message: "Producto no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Producto actualizado correctamente" });
  } catch (err) {
    next(err);
  }
}

export async function deleteProducto(req, res, next) {
  try {
    const { IdProducto } = req.params;
    const deleted = await productoService.deleteProductById(IdProducto);
    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Producto no encontrado" });
    }
    res.status(200).json({ ok: true, message: "Producto eliminado correctamente" });
  } catch (err) {
    next(err);
  }
}


