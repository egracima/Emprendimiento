import { check, validationResult } from 'express-validator'

const validateCreateProduct = [
    check('IdProducto')
        .notEmpty().withMessage('El id producto es obligatorio')
        .isLength({ min: 2 }).withMessage('id producto debe tener al menos 2 caracteres'),

    check('Nombre')
        .notEmpty().withMessage('El nombre es obligatorio'),

    check('Descripcion')
        .optional()
        .isLength({ max: 200 }).withMessage('La descripción no puede superar 200 caracteres'),

    check('Precio')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),

    check('Stock')
        .notEmpty().withMessage('La cantidad es obligatoria')
        .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero positivo'),

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

const validateUpdateProduct = [
  check('Nombre')
    .optional()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  check('precio')
    .optional()
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),

  check('Stock')
    .optional()
    .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero positivo'),

  check('Descripcion')
    .optional()
    .isLength({ max: 200 }).withMessage('La descripción no puede superar 200 caracteres'),

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

export {validateCreateProduct,validateUpdateProduct} ;