const { check, validationResult } = require('express-validator');

const validateProduct = [
    check('codigo')
        .notEmpty().withMessage('El código es obligatorio')
        .isLength({ min: 2 }).withMessage('El código debe tener al menos 2 caracteres'),

    check('nombre')
        .notEmpty().withMessage('El nombre es obligatorio'),

    check('descripcion')
        .optional()
        .isLength({ max: 200 }).withMessage('La descripción no puede superar 200 caracteres'),

    check('precio')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),

    check('cantidad')
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

module.exports = { validateProduct };

