import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [UserName, setUserName] = useState("");
  const [Pass, setPass] = useState("");
  const [error, setError] = useState("");

  const validarFormulario = () => {
    if (UserName.trim() === "" || Pass.trim() === "") {
      setError("Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

  const autenticarUsuario = async () => {
    const response = await axios.get("http://localhost:3000/user/getAll");
    const usuarios = response.data.data;

    return usuarios.find((u) => u.UserName === UserName && u.Pass === Pass);
  };

  const handleSubmit = async (e) => {
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

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="usuario">Nombre de usuario</label>
          <input
            id="usuario"
            type="text"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="pass">Contraseña</label>
          <input
            id="pass"
            type="password"
            value={Pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Entrar
          </button>
        </form>

        <p className="registro-text">
          ¿No tienes cuenta?{" "}
          <Link to="/Register" className="registro-link">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}