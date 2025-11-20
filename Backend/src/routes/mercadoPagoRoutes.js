import express from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const router = express.Router();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN; // Asegúrate de tener esto en tu .env

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

router.post("/create-preference", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: "No se recibieron items del carrito." 
      });
    }

    // Mapear y validar items
    const itemsFormatted = items.map((item) => ({
      title: item.title,
      unit_price: Number(item.unit_price),
      quantity: Number(item.quantity),
    }));

    // Crear preferencia en Mercado Pago
    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: itemsFormatted,
        back_urls: {
          success: "http://localhost:5173/pago-exitoso",
          failure: "http://localhost:5173/pago-fallido",
          pending: "http://localhost:5173/pago-pendiente"
        }
      }
    });

    console.log("Response de Mercado Pago:", response);

    // Manejar ambos formatos de respuesta
    const preferenceId = response?.id || response?.body?.id;

    if (!preferenceId) {
      return res.status(500).json({ 
        error: "No se recibió ID de preferencia de Mercado Pago" 
      });
    }

    return res.status(200).json({
      preferenceId
    });

  } catch (error) {
    console.error("Error creando preferencia en Mercado Pago:", error);
    return res.status(500).json({ 
      error: "Error procesando la solicitud." 
    });
  }
});

export default router;