import { check, validationResult } from 'express-validator'

const validateCreateInfoUser = [
    check('Cedula')
        .notEmpty().withMessage('La cedula es obligatoria')
        .isInt({ min: 10 }).withMessage('La cedula no puede ser menos de 10 numeros'),

    check('Nombres')
        .notEmpty().withMessage('Los nombres son obligatorios'),

    check('Apellidos')
        .notEmpty().withMessage('Los Apellidos son obligatorios'),

    check('Correo')
        .notEmpty().withMessage('El Correo es obligatoria'),

    check('Celular')
        .notEmpty().withMessage('El # de celular es obligatorio')
        .isInt({ min: 10, ma: 10 }).withMessage('El Celular debe contener 10 digitos'),

    check('Direccion')
        .notEmpty().withMessage('La Direccion es obligatoria'),

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

const validateUpdateInfoUser = [
  check('Nombres')
        .notEmpty().withMessage('Los nombres son obligatorios'),

    check('Apellidos')
        .notEmpty().withMessage('Los Apellidos son obligatorios'),

    check('Correo')
        .notEmpty().withMessage('El Correo es obligatoria'),

    check('Celular')
        .notEmpty().withMessage('El # de celular es obligatorio')
        .isInt({ min: 10, ma: 10 }).withMessage('El Celular debe contener 10 digitos'),

    check('Direccion')
        .notEmpty().withMessage('La Direccion es obligatoria'),

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

export {validateCreateInfoUser,validateUpdateInfoUser} ;