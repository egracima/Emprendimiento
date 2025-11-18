import { check, validationResult } from 'express-validator'

const validateCreateShoppingCart = [
    check('IdCarrito')
        .notEmpty().withMessage('La id es obligatoria')
        .isLength({ min: 2 }).withMessage('Id Carrito debe tener al menos 2 caracteres'),

    check('Cantidad')
        .notEmpty().withMessage('La Cantidad son obligatorios'),

    check('ValorPagar')
        .notEmpty().withMessage('El ValorPagar son obligatorios'),

    check('IdProductoFk')
        .notEmpty().withMessage('El Producto es obligatoria'),

    check('UserNameFk')
        .notEmpty().withMessage('El User es obligatorio'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                ok: false,
                errors: errors.array().map(e => ({
                    field: e.param,
                    msg: e.msg
                }))
            });
        }
        next();
    }
];

const validateUpdateShoppingCart = [
   check('Cantidad')
        .notEmpty().withMessage('La Cantidad son obligatorios'),

    check('ValorPagar')
        .notEmpty().withMessage('El ValorPagar son obligatorios'),

    check('IdProductoFk')
        .notEmpty().withMessage('El Producto es obligatoria'),

    check('UserNameFk')
        .notEmpty().withMessage('El User es obligatorio'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        ok: false,
        errors: errors.array().map(e => ({
          field: e.param,
          msg: e.msg
        }))
      });
    }
    next();
  }
];

export {validateCreateShoppingCart,validateUpdateShoppingCart} ;