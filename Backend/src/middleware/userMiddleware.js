import { check, validationResult } from 'express-validator'

const validateCreateUser = [
    check('UserName')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 2 }).withMessage('Nombre de usuario debe tener al menos 2 caracteres'),

    check('Pass')
        .notEmpty().withMessage('La contraseña es obligatorio'),

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

const validateUpdateUser = [
  check('Pass')
        .notEmpty().withMessage('La contraseña es obligatorio'),

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

export {validateCreateUser,validateUpdateUser} ;