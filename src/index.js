import express from 'express';
import sql from 'mssql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // 👈 NECESARIO para leer req.body como JSON

// Aquí van tus rutas
app.post('/api/productos', async (req, res) => {
    try {
        const { IdProducto, Nombre, Precio, Stock, Descripcion } = req.body;

        if (!IdProducto || !Nombre || !Precio || !Stock || !Descripcion) {
            return res.status(400).json({ error: 'Faltan datos del producto' });
        }

        const pool = await sql.connect({
            user: 'Doky',
            password: '1234',
            server: 'localhost',
            database: 'ProyectoTest',
            options: {
              encrypt: true,
              trustServerCertificate: true
            }
        });

        await pool.request()
            .input('IdProducto', sql.NVarChar(20), IdProducto)
            .input('Nombre', sql.VarChar(50), Nombre)
            .input('Precio', sql.Money, Precio)
            .input('Stock', sql.Int, Stock)
            .input('Descripcion', sql.VarChar(200), Descripcion)
            .query('INSERT INTO Productos (IdProducto, Nombre, Precio, Stock, Descripcion) VALUES (@IdProducto, @Nombre, @Precio, @Stock, @Descripcion)');

        res.status(201).json({ message: 'Producto creado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el producto' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

export default app;