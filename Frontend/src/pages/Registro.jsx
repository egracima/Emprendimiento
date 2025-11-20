import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Registro.css";

function Registro() {
  const [form, setForm] = useState({
    Nombre: "",
    Apellido: "",
    Documento: "",
    Correo: "",
    Direccion: "",
    Ciudad: "",
    Telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Datos del registro:", form);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Regístrate</h2>

      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          name="Nombre"
          value={form.Nombre}
          onChange={handleChange}
        />

        <label>Apellido</label>
        <input
          name="Apellido"
          value={form.Apellido}
          onChange={handleChange}
        />

        <label>Documento</label>
        <input
          name="Documento"
          value={form.Documento}
          onChange={handleChange}
        />

        <label>Correo</label>
        <input
          name="Correo"
          value={form.Correo}
          onChange={handleChange}
        />

        <div className="two-inputs">
          <div>
            <label>Direccion</label>
            <input
              name="Direccion"
              value={form.Direccion}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Ciudad</label>
            <input
              name="Ciudad"
              value={form.Ciudad}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Telefono</label>
        <input
          name="Telefono"
          value={form.Telefono}
          onChange={handleChange}
        />

        <button className="register-boton">Registrarte</button>
      </form>

      <div className="register-links-container">
        <Link to="/" className="nav-link-registro">
            Ir a Inicio
        </Link>
        <span> | </span>
        <Link to="/Login" className="nav-link-registro">
            Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}

export default Registro;