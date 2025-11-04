import { check, validationResult } from 'express-validator'

const validateCreateRecord = [
    check('IdHistorial')
        .notEmpty().withMessage('El id historial es obligatorio')
        .isLength({ min: 2 }).withMessage('id historial debe tener al menos 2 caracteres'),

    check('Fecha')
        .notEmpty().withMessage('La fecha es obligatorio'),

    check('ValorTotal')
        .notEmpty().withMessage('El total es obligatorio')
        .isInt({ min:0 }).withMessage('El valor del total debe ser positivo'),

    check('IdCarritoFk')
        .notEmpty().withMessage('El Id carrito es obligatorio'),

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

const validateUpdateRecord = [
  check('Fecha')
        .notEmpty().withMessage('El nombre es obligatorio'),

    check('ValorTotal')
        .notEmpty().withMessage('El precio es obligatorio')
        .isInt({ min:0 }).withMessage('El valor debe ser positivo'),

    check('IdCarritoFk')
        .notEmpty().withMessage('El precio es obligatorio'),


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

export {validateCreateRecord,validateUpdateRecord} ;