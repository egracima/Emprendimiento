import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/authProvider.jsx';
import { LoginUser } from "../services/authServices.js";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {isAuthenticated,setIsAuthenticated} = useAuth();

  const [form, setForm] = useState({
    UserName: "",
    Pass: ""
  });

  useEffect(() => {
      if (isAuthenticated) {
        navigate('/Home');
      }
    }, [isAuthenticated, navigate]);

     const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /*const validarFormulario = () => {
    if (UserName.trim() === "" || Pass.trim() === "") {
      setError("Todos los campos son obligatorios");
      console.log("paso por validarFormulario")
      return false;
    }
    return true;
  };
  */
  
  /*const autenticarUsuario = async () => {
    const response = await axios.get("http://localhost:3000/user/getAll");
    const usuarios = response.data.data;
    console.log("Paso por autenticarUsuario")
  
    return usuarios.find(
      (u) => u.UserName === UserName && u.Pass === Pass,
    );
  };*/

  // -----------------------------
  // Submit principal
  // -----------------------------
  /*const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validarFormulario()) return;

    try {
      const usuario = await autenticarUsuario();

      if (!usuario) {
        setError("Usuario o contraseña incorrectos");
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(usuario));
      alert("¡Bienvenido!");

    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Hubo un problema con el servidor");
    }
  };
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = await LoginUser(form)
        
      console.log("Login exitoso:", data);

      setIsAuthenticated(true);
      alert("Inicio de sesión exitoso");
      navigate("/Home");

    } catch (error) {
      console.error("Error en login:", error);
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>

          <label htmlFor="usuario">Nombre de usuario</label>
          <input
            id="usuario"
            name="UserName"
            type="text"
            value={form.UserName}
            onChange={handleChange}
          />

          <label htmlFor="pass">Contraseña</label>
          <input
            id="pass"
            name="Pass"
            type="password"
            value={form.Pass}
            onChange={handleChange}
          />

          <button className="login-btn" type="submit">
            Entrar
          </button>

        </form>
      </div>
    </div>
  );
}