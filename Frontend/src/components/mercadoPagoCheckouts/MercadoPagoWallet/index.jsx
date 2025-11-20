import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"

const MercadoPagoWallet = ({ productos }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const publicKey = "APP_USR-28f3330a-444e-4d34-b016-e6ca0ffc963f";
  const createPreferenceIdEndpoint = "http://localhost:3000/mercadopago/create-preference";

  useEffect(() => {
    initMercadoPago(publicKey, { locale: "es-CO" });
  }, []);

  const pagar = async () => {
    try {
      setLoading(true);
      setError(null);

      const productosMP = productos.map(p => ({
        title: p.nombre,
        unit_price: Number(p.precio),
        quantity: 1
      }));

      const response = await axios.post(createPreferenceIdEndpoint, {
        items: productosMP
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { preferenceId } = response.data;
      console.log("Preferencia generada:", preferenceId);
      setPreferenceId(preferenceId);

    } catch (error) {
      console.error("Error generando preferencia", error);
      setError("Error al procesar el pago. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <button 
        onClick={pagar} 
        disabled={loading}
        style={{
          padding: '10px 16px',
          backgroundColor: '#009EE3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Procesando...' : 'Pagar con MercadoPago'}
      </button>

      {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

      {preferenceId && (
        <div id="wallet_container" style={{ marginTop: '10px' }} />
      )}
      
      {preferenceId && (
        <Wallet initialization={{ preferenceId }} container="wallet_container" />
      )}
    </div>
  );
};

export default MercadoPagoWallet;