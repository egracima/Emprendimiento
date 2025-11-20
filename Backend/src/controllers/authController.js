import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import { getConnection, sql } from "../database/db.js";

const register = async (req, res)=>{
    try {
        const {UserName, password, confirmPassword, Cedula ,Nombres, Apellidos, Correo, Celular, Direccion} = req.body;
        if (!UserName || !password || !Cedula || !Nombres || !Apellidos || !Correo || !Celular || !Direccion){
            return res.status(400).json({
                error: 'Todos los campos son obligatorios'
            })
        }

        if(password !== confirmPassword){
            res.status(400).render('register',{
                error: 'Las contraseñas no son iguales'
            })
        }

         const pool = await getConnection();

        const userCheck = await pool.request()
            .input("UserName", sql.VarChar, UserName)
            .query("SELECT * FROM Users WHERE UserName = @UserName");

            if (userCheck.recordset.length > 0) {
                return res.status(400).json({ error: "El usuario ya existe" });
            }

        const emailCheck = await pool.request()
            .input("Correo", sql.VarChar, Correo)
            .query("SELECT * FROM InfoUsers WHERE Correo = @Correo");

            if (emailCheck.recordset.length > 0) {
                return res.status(400).json({ error: "El correo ya está registrado" });
            }

        const cedulaCheck = await pool.request()
            .input("Cedula", sql.VarChar, Cedula)
            .query("SELECT * FROM InfoUsers WHERE Cedula = @Cedula");

            if (cedulaCheck.recordset.length > 0) {
                return res.status(400).json({ error: "La cédula ya está registrada" });
            }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.request()
            .input("UserName", sql.VarChar, UserName)
            .input("Pass", sql.VarChar, hashedPassword)
            .query("INSERT INTO Users (UserName, Pass) VALUES (@UserName, @Pass)");

        await pool.request()
            .input("Cedula", sql.VarChar, Cedula)
            .input("Nombres", sql.VarChar, Nombres)
            .input("Apellidos", sql.VarChar, Apellidos)
            .input("Correo", sql.VarChar, Correo)
            .input("Celular", sql.VarChar, Celular)
            .input("Direccion", sql.VarChar, Direccion)
            .input("UserNameFk", sql.VarChar, UserName)
            .query(`INSERT INTO InfoUsers (Cedula, Nombres, Apellidos, Correo, Celular, Direccion, UserNameFk)
                VALUES (@Cedula, @Nombres, @Apellidos, @Correo, @Celular, @Direccion, @UserNameFk)`);

        return res.json({ success: true, message: "Usuario registrado correctamente" });

    } catch (error) {
        console.error('Error al registrar el usuario', error)
        res.status(500).json({
            error: 'Error al registrar usuario'
        });
    }
}

const login = async (req, res) =>{
    try {
        const {UserName, Pass} = req.body;
        console.log("BODY LOGIN:", req.body);
        
    if(!UserName || !Pass){
        return res.status(400).json({
            error: 'El usuario y la contraseña no pueden ser vacios'
        });
    }

    const pool = await getConnection();

    const userQuery = await pool.request()
      .input("UserName", sql.VarChar, UserName)
      .query("SELECT * FROM Users WHERE UserName = @UserName");

    if (userQuery.recordset.length === 0) {
      return res.status(400).json({ error: "Usuario no existe" });
    }

    const user = userQuery.recordset[0];

    const validPassword = await bcrypt.compare(Pass, user.Pass)

    if (!validPassword) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
        {UserName: user.UserName},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE_IN}
    );

    res.cookie('token', token,{
        httpOnly: true,
        secure: false,//process.env.Enviroment === 'production',
        sameSite: "lax",
        maxAge: 3600000
    })
    
    return res.json({
        message: "Login exitoso",
        user: user.UserName
    });

    } catch (error) {
        console.error('Error en el login',error),
        res.status(500).json({ 
            error: 'Error al iniciar sesion'
        });
        
    }
}

const logout = (req, res) =>{
    res.clearCookie('token')
    res.redirect('/login?success=Cerro sesion con exito');
}

export { register, login, logout };