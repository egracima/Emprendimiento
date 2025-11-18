const bycrypt = require('bycryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database/db')

const register = async (req, res)=>{
    try {
        const {name, email, password, confirmPassword} = req.body;
        if (!name || !email || !password){
            return res.status(400).render('register',{
                error: 'Todos los campos son obligatorios'
            })
        }

        if(password !== confirmPassword){
            res.status(400).render('register',{
                error: 'Las contraseñas no son iguales'
            })
        }

        const [existEmail] = await db.query(
            'SELECT * FROM Users WHERE email = ?', [email]
        );

        if(existEmail.length > 0){
            return res.status(400).render('register', {
                error: 'El email ya tiene un registro'
            });
        }

        const hashedPassword = await bycrypt.hash(password);

        await db.query('INSERT INTO (name, email, password) VALUES (?,?,?)', [name, email, password]);
        res.redirect('/login?success=Usuario registrado')

    } catch (error) {
        console.error('Error al registrar el usuario', error)
        res.status(500).render('register', {
            error: 'Error al registrar usuario'
        });
    }
}

const login = async (req, res) =>{
    try {
        const [email, password] = res.body;

    if(!email || !password){
        return res.status(400).render('login', {
            error: 'El email y el password no pueden ser vacios'
        });
    }


    const [searchUser] = await db.query(
        'SELECT * FROM Users WHERE email = ?', [email]
    );

    const validPassword = await bycrypt.compare(password,searchUser[0].password)

    const token = jwt.sign(
        {id: searchUser[0].id, email: searchUser[0].email, name: searchUser[0].name},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE_IN}
    );

    /*
    res.cookie('token', token,{
        httpOnly: true,
        secure: process.env.Enviroment === 'production',
        maxAge: 60*60
    })
    */

    res.redirect('/dashboard');

    } catch (error) {
        console.error('Error en el login',error),
        res.status(500).render('login', { 
            error: 'Error al iniciar sesion'
        });
        
    }
}

const logout = (req, res) =>{
    //res.clearCookie('token')
    res.redirect('login?success=Cerro sesion con exito');
}

module.exports = { register, login, logout}