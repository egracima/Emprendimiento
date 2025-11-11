
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Imagen y badge artesanal */}
      <div className="product-image-container">
        <img src={product.imageUrl} alt={product.name} />
        {product.isArtesanal && <span className="artesanal-badge">Artesanal</span>}
      </div>

      {/* Detalles del producto */}
      <div className="product-details">
        <h3>{product.name}</h3>

        {/* Reseñas */}
        <div className="ratings">
          {/* Estrellas doradas usando Font Awesome */}
          {Array.from({ length: 5 }, (_, i) => (
            <i
              key={i}
              className={`fas fa-star`}
              style={{ color: i < Math.round(product.rating) ? '#ffc107' : '#ccc' }}
            ></i>
          ))}
          <span className="review-count">({product.reviewCount})</span>
        </div>

        {/* Precio y descuento */}
        <div className="price-section">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
          {product.discount && <span className="discount-badge">{product.discount}% OFF</span>}
        </div>

        {/* Botón agregar al carrito */}
        <button className="add-to-cart-btn">
          <i className="fas fa-shopping-cart"></i> Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
