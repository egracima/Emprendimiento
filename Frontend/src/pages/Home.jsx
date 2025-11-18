
import React, { useState } from 'react';


const mockProducts = [
  { id: 1, name: "Vela Artesanal Lavanda", imageUrl: "vela.jpg", price: 25.00, oldPrice: 30.00, discount: 17, rating: 4.5, reviewCount: 89, category: "Velas", isArtesanal: false },
  { id: 2, name: "Vela Aromática Rosas", imageUrl: "vela2.jpg", price: 30.00, oldPrice: null, discount: null, rating: 4.7, reviewCount: 45, category: "Velas", isArtesanal: true },
  { id: 3, name: "Manilla Dorada Tejida", imageUrl: "manilla.jpg", price: 45.00, oldPrice: null, discount: null, rating: 5.0, reviewCount: 67, category: "Manillas", isArtesanal: true },
  { id: 4, name: "Manilla Plateada Trenzada", imageUrl: "manilla2.jpg", price: 35.00, oldPrice: 40.00, discount: 12, rating: 4.3, reviewCount: 23, category: "Manillas", isArtesanal: false },
];


const Home = () => {
  const [products] = useState(mockProducts);


  const velas = products.filter(p => p.category === "Velas");
  const manillas = products.filter(p => p.category === "Manillas");

  return (
    <>
      {}
      <header className="main-header">
        <div className="logo">Trama y Mecha</div>
        <nav className="nav-menu">
          <a href="#">Inicio</a>
          <a href="#velas">Velas</a>
          <a href="#manillas">Manillas</a>
          <a href="#">Contactanos</a>
        </nav>
      </header>

      
      <main className="container">
        
        <section id="velas" className="featured-products-header">
          <h1>Velas</h1>
          <p>Descubre la coleccion de velas artesanales</p>
        </section>
        <section className="products-grid">
          {velas.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>

       
        <section id="manillas" className="featured-products-header">
          <h1>Manillas</h1>
          <p>Explora nuestras manillas hechas a mano con diseños exclusivos</p>
        </section>
        <section className="products-grid">
          {manillas.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
