import React from 'react';
import '../styles/ShoppingCart.css'; 
import MercadoPagoWallet from '../components/mercadoPagoCheckouts/MercadoPagoWallet';

const ShoppingCart = ({ productosEnCesta, cerrarCesta, mostrarCesta }) => {
  
  const montoTotal = productosEnCesta.reduce((suma, item) => suma + item.precio, 0);

 
  const formatoCOP = (monto) => {
      
      return new Intl.NumberFormat('es-CO', { 
          style: 'currency', 
          currency: 'COP', 
          minimumFractionDigits: 0 
      }).format(monto);
  };

  return (
    <>
      {mostrarCesta && <div className="superposicion-cesta" onClick={cerrarCesta}></div>}

      <div className={`cesta-lateral-panel ${mostrarCesta ? 'open' : ''}`}>
        
        <div className="encabezado-cesta">
          <h3>🛒 Mi Carrito ({productosEnCesta.length})</h3>
          <button onClick={cerrarCesta} className="boton-cerrar-panel">X</button>
        </div>
        
        {productosEnCesta.length === 0 ? (
          <p className="mensaje-cesta-vacia">Tu carrito está vacío. ¡añade magia!</p>
        ) : (
          <>
            <div className="lista-productos-cesta">
              {productosEnCesta.map(item => (
                <div key={item.id} className="item-cesta">
                  <p><strong>{item.nombre}</strong></p>
                  <p>{formatoCOP(item.precio)}</p>
                </div>
              ))}
            </div>
            
            <div className="resumen-pedido">
              <p>Total a pagar: <strong>{formatoCOP(montoTotal)}</strong></p>
              <MercadoPagoWallet productos={productosEnCesta} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;