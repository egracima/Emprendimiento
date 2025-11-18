import { check, validationResult } from 'express-validator'

const validateCreateInfoUser = [
    check('Cedula')
        .notEmpty().withMessage('La cedula es obligatoria')
        .isInt({ min: 10 }).withMessage('La cedula no puede ser menos de 10 digitos'),

    check('Nombres')
        .notEmpty().withMessage('Los nombres son obligatorios'),

    check('Apellidos')
        .notEmpty().withMessage('Los Apellidos son obligatorios'),

    check('Correo')
        .notEmpty().withMessage('El Correo es obligatoria')
        .isEmail().withMessage('debe de ser un correo valido'),

    check('Celular')
        .notEmpty().withMessage('El num de celular es obligatorio')
        .isInt({ min: 10, max: 10 }).withMessage('El celular debe contener 10 digitos'),

    check('Direccion')
        .notEmpty().withMessage('La Direccion es obligatoria')
        .isLength({ min: 5 }).withMessage('La dirección debe tener al menos 5 caracteres'),

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
        .notEmpty().withMessage('El Correo es obligatoria')
        .isEmail().withMessage('Debe ser un correo válido'),

    check('Celular')
        .notEmpty().withMessage('El num de celular es obligatorio')
        .isInt({ min: 10, max: 10 }).withMessage('El celular debe contener 10 digitos'),

    check('Direccion')
        .notEmpty().withMessage('La Direccion es obligatoria')
        .isLength({ min: 5 }).withMessage('La dirección debe tener al menos 5 caracteres'),

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