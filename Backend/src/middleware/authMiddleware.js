import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ error: "Debes iniciar sesion" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error('Error al verificar el token', error);
        res.clearCookie('token');
        return res.status(401).json({ error: "Sesion expirada, inicie sesion nuevamente" });
    }
};


export { verifyToken }