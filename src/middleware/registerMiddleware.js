const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const validateRegister = [
    check('Cedula')
        .notEmpty().withMessage('La cédula es obligatoria')
        .isNumeric().withMessage('La cédula debe contener solo números')
        .isLength({ min: 6 }).withMessage('La cédula debe tener al menos 6 dígitos'),

    check('Nombres')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

    check('Apellidos')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),

    check('Correo')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Debe ser un correo válido'),

    check('Celular')
        .notEmpty().withMessage('El número de celular es obligatorio')
        .isMobilePhone('es-CO').withMessage('Debe ser un número de celular válido de Colombia'),

    check('Direccion')
        .notEmpty().withMessage('La dirección es obligatoria')
        .isLength({ min: 5 }).withMessage('La dirección debe tener al menos 5 caracteres'),

    check('UserNameFk')
        .notEmpty().withMessage('El nombre de usuario es obligatorio'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array().map(err => err.msg)
            });
        }
        next();
    }
];

module.exports = { validateRegister };

