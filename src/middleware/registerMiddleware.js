const { check } = require('express-validator');
const { validationResult } = require('express-validator');


const validateRegister = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

    check('email')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Debe ser un correo válido'),

    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),

    check('confirmPassword')
        .notEmpty().withMessage('Debe confirmar la contraseña')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Las contraseñas no coinciden'),

    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render('register', {
                error: errors.array()[0].msg 
            });
        }
        next();
    }
];

module.exports = { validateRegister };
