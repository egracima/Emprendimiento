const { check, validationResult } = require('express-validator');

const validateProduct = [
    check('IdProducto')
        .notEmpty().withMessage('El id producto es obligatorio')
        .isLength({ min: 2 }).withMessage('id producto debe tener al menos 2 caracteres'),

    check('Nombre')
        .notEmpty().withMessage('El nombre es obligatorio'),

    check('Descripcion')
        .optional()
        .isLength({ max: 200 }).withMessage('La descripción no puede superar 200 caracteres'),

    check('precio')
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

module.exports = { validateProduct };

