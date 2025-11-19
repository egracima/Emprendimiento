import React, { useState, useEffect } from 'react';
import axios from 'axios'; 


const Records = () => {
   
    const [records, setRecords] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

   
    const API_URL_BASE = 'http://localhost:3000/api/records'; 

    const obtenerTodosLosRecords = async () => {
        setCargando(true);
        setError(null);

        try {
            
            const respuesta = await axios.get(`${API_URL_BASE}/getAll`);
            
            
            setRecords(respuesta.data); 
        } catch (err) {
            console.error("Error al obtener los registros:", err);
            setError("No se pudo cargar la lista de Records. Verifica la API.");
        } finally {
            setCargando(false);
        }
    };

  
    useEffect(() => {
        obtenerTodosLosRecords();
    }, []); 

    // --- Renderizado JSX ---
    return (
        <div className="records-list">
            <h2>📦 Lista de Records ({records.length} items)</h2>
            <p>Datos obtenidos de la tabla 'Records' a través de la ruta GET **`/getAll`**.</p>

            {cargando && <p className="loading-message">Cargando registros...</p>}
            {error && <p className="error-message">⚠️ {error}</p>}
            
            {records.length === 0 && !cargando && (
                <p>No se encontraron registros en la tabla Records.</p>
            )}

            {records.length > 0 && (
                <div className="lista-registros">
                    {records.map((record) => (
                        
                        <div key={record.Id} className="record-card">
                            <h3>ID de Registro: **{record.Id}**</h3>
                            <p>Total: **${record.Total ? record.Total.toLocaleString() : 'N/A'}**</p>
                            <p>Fecha de Creación: {record.Fecha ? new Date(record.Fecha).toLocaleDateString() : 'Desconocida'}</p>
                            
                            {}
                            <hr/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Records;