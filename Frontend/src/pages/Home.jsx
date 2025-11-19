import React, { useState } from "react";
import "../styles/Home.css"; 
import ShoppingCart from './ShoppingCart'; 



const formatoCOP = (monto) => {

    return new Intl.NumberFormat('es-CO', { 
        style: 'currency', 
        currency: 'COP', 
        minimumFractionDigits: 0 
    }).format(monto);
};

const COLECCION_INICIAL_PRODUCTOS = [
 
  { id: 1, nombre: "Vela Artesanal Lavanda", imagen: "vela.jpg", precio: 25000, precioAnterior: 30000, categoria: "Velas", reseñas: 89 },
  { id: 3, nombre: "Manilla Dorada Tejida", imagen: "manilla.jpg", precio: 45000, precioAnterior: null, categoria: "Manillas", reseñas: 67 },
  { id: 5, nombre: "Vela Cítrica Energía", imagen: "vela-citrica.jpg", precio: 28000, precioAnterior: null, categoria: "Velas", reseñas: 55 },
  { id: 7, nombre: "Manilla Cobre Vintage", imagen: "manilla-cobre.jpg", precio: 55000, precioAnterior: null, categoria: "Manillas", reseñas: 78 },
];



const TarjetaProducto = ({ producto, alAgregarACesta }) => {
  const { nombre, imagen, precio, precioAnterior, reseñas, categoria } = producto;
  const mostrarEstrellas = () => { return "⭐⭐⭐⭐⭐"; };

  return (
    <article className="tarjeta-producto-individual"> 
      <div className="contenedor-imagen">
        <img src={imagen} alt={nombre} className="imagen-producto" /> 
        <button className="boton-favorito" aria-label="Añadir a favoritos">
          ♡ 
        </button> 
        {precioAnterior && <span className="etiqueta-descuento">{-Math.round(((precioAnterior - precio) / precioAnterior) * 100)}%</span>}
        {!precioAnterior && categoria === "Manillas" && <span className="etiqueta-artesanal">Artesanal</span>}
      </div>

      <div className="detalles-producto">
        <h3 className="nombre-producto">{nombre}</h3> 
        <div className="calificacion-producto">
          <span className="estrellas-rating">{mostrarEstrellas()}</span> 
          <span className="conteo-reseñas">({reseñas} reseñas)</span>
        </div>
        
        <div className="info-precio">
          {}
          <span className="precio-actual">{formatoCOP(precio)}</span>
          {}
          {precioAnterior && <span className="precio-anterior">{formatoCOP(precioAnterior)}</span>}
        </div>
        
        <button 
          className="boton-añadir-cesta"
          onClick={() => alAgregarACesta(producto)}
        >
          🛒 Agregar a Cesta
        </button>
      </div>
    </article>
  );
};

const Home = () => {
  const [catalogo] = useState(COLECCION_INICIAL_PRODUCTOS); 
  const [productosEnCesta, setProductosEnCesta] = useState([]); 
  const [mostrarCesta, setMostrarCesta] = useState(false); 
  
  const productosDestacados = catalogo.slice(0, 2); 
  const masVelas = catalogo.filter(p => p.categoria === "Velas" && !productosDestacados.some(d => d.id === p.id));
  const masManillas = catalogo.filter(p => p.categoria === "Manillas" && !productosDestacados.some(d => d.id === p.id));

  const agregarProductoACesta = (producto) => {
    setProductosEnCesta(prevItems => [...prevItems, producto]);
    setMostrarCesta(true); 
  };

  return (
    <div className="contenedor-pagina-principal">
      
      {}
      <header className="cabecera-sitio">
        <div className="logotipo">Trama y Mecha</div>
        <nav className="navegacion-principal">
          <a href="#inicio" className="enlace-nav activo">Inicio</a>
          {}
          <a href="#productos" className="enlace-nav">Productos</a>
          <a href="#contacto" className="enlace-nav">Contacto</a>
        </nav>
        
        {}
        <div className="contenedor-icono-cesta" onClick={() => setMostrarCesta(!mostrarCesta)}>
          🛒 
          {productosEnCesta.length > 0 && <span className="contador-cesta">{productosEnCesta.length}</span>}
        </div>
      </header>
      
      <main>
        {}
        <section className="seccion-destacados">
          <h2 className="titulo-seccion">Productos Destacados</h2>
          <p className="subtitulo-seccion">Descubre nuestra colección artesanal de velas y manillas únicas</p>
          <div className="rejilla-productos">
            {productosDestacados.map(p => (
              <TarjetaProducto key={p.id} producto={p} alAgregarACesta={agregarProductoACesta}/>
            ))}
          </div>
        </section>

        {}
        {masVelas.length > 0 && (
          <section className="seccion-categoria">
            <h2 className="titulo-seccion">Más Velas</h2>
            <div className="rejilla-productos">
              {masVelas.map(p => (
                <TarjetaProducto key={p.id} producto={p} alAgregarACesta={agregarProductoACesta}/>
              ))}
            </div>
          </section>
        )}
        
        {}
        {masManillas.length > 0 && (
          <section className="seccion-categoria">
            <h2 className="titulo-seccion">Nuestras Manillas</h2>
            <div className="rejilla-productos">
              {masManillas.map(p => (
                <TarjetaProducto key={p.id} producto={p} alAgregarACesta={agregarProductoACesta}/>
              ))}
            </div>
          </section>
        )}
      </main>
      
      {}
      <ShoppingCart 
        productosEnCesta={productosEnCesta} 
        mostrarCesta={mostrarCesta}
        cerrarCesta={() => setMostrarCesta(false)} 
      />
    </div>
  );
};

export default Home;