import { useState } from "react";
import "../styles/Registro.css";
import { RegisterUser } from "../services/authServices";

function Registro() {
  const [form, setForm] = useState({
    UserName: "",
    password: "",
    confirmPassword: "",
    Cedula: "",
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Celular: "",
    Direccion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await RegisterUser(form);
      console.log("Usuario registrado: ", response.data);
      alert("Error de regitro")
    } catch (error) {
      console.error("Error al registrar",error);
      alert("Error en el registro")
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Regístrate</h2>

      <form onSubmit={handleSubmit}>

        <label>Nombre de usuario</label>
        <input
          name="UserName"
          value={form.UserName}
          onChange={handleChange}
        />

        <label>Contraseña</label>
        <input
          name="password"
          value={form.Password}
          onChange={handleChange}
        />

        <label>Confirme contraseña</label>
        <input
          name="confirmPassword"
          value={form.ConfirmPassword}
          onChange={handleChange}
        />

        <label>Cedula</label>
        <input
          name="Cedula"
          value={form.Cedula}
          onChange={handleChange}
        />

        <label>Nombres</label>
        <input
          name="Nombres"
          value={form.Nombres}
          onChange={handleChange}
        />

        <label>Apellidos</label>
        <input
          name="Apellidos"
          value={form.Apellidos}
          onChange={handleChange}
        />

          
        <label>Correo</label>
        <input
          name="Correo"
          value={form.Correo}
          onChange={handleChange}
        />
          
        <label>Direccion</label>
        <input
          name="Direccion"
          value={form.Direccion}
          onChange={handleChange}
        />
          
        <label>Celular</label>
        <input
          name="Celular"
          value={form.Celular}
          onChange={handleChange}
        />

        <button className="register-boton">Registrarte</button>
      </form>
    </div>
  );
}

export default Registro;
