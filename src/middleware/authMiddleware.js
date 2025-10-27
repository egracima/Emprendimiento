const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    const token = req.cookie.token;
    if(!token){
        return res.redirect('/login?error=Debes iniciar sesion');
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error('Error al verificar el token', error);
        res.clearCookie('token');
        return res.redirect('/login?error=Sesion expirada, inicie sesion nuevamente');
    }
};

module.exports = { verifyToken }