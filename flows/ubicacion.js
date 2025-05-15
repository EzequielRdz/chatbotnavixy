const { addKeyword } = require("@bot-whatsapp/bot");
const axios = require("axios");

let intentos = {};

const flujoUbicacion = addKeyword([
  "ubicacion",
  "ubicación",
  "tracker",
  "rastrear",
  "ubi",
  "localizar",
  "loc",
])
  .addAnswer("🔍 Por favor, dime el *nombre del tracker* (label) que deseas localizar.", {
    capture: true,
  })
  .addAction(async (ctx, { flowDynamic, gotoFlow, endFlow }) => {
    const nombreBuscado = ctx.body.trim().toLowerCase();
    const userId = ctx.from;

    try {
      const auth = await axios.post("https://api.us.navixy.com/v2/user/auth", {
        login: process.env.NAVIXY_LOGIN,
        password: process.env.NAVIXY_PASSWORD,
      });
      const hash = auth.data.hash;

      const listRes = await axios.get(`https://api.us.navixy.com/v2/tracker/list?hash=${hash}`);
      const trackers = listRes.data.list;

      const tracker = trackers.find((t) => t.label.toLowerCase().includes(nombreBuscado));

      if (!tracker) {
        intentos[userId] = (intentos[userId] || 0) + 1;

        if (intentos[userId] >= 3) {
          delete intentos[userId];
          return endFlow("❌ Demasiados intentos fallidos. Intenta más tarde.");
        }

        await flowDynamic("❌ No se encontró un tracker con ese nombre. Intenta nuevamente:");
        return gotoFlow(flujoUbicacion);
      }

      const trackerId = tracker.id;

      const locRes = await axios.get(
        `https://api.us.navixy.com/v2/tracker/get_state?hash=${hash}&tracker_id=${trackerId}`
      );
      const state = locRes.data.state;
      const { lat, lng } = state.gps.location;
      const movementStatus = state.movement_status || "desconocido";

      const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

      await flowDynamic(`📍 *${tracker.label}* (${trackerId})`);
      await flowDynamic(`🗺️ Ubicación:\n${mapsUrl}`);
      await flowDynamic(`🚗 Estado de movimiento: *${movementStatus}*`);

      delete intentos[userId];
    } catch (err) {
      console.error("❌ Error:", err.message);
      return endFlow("❌ Error al obtener ubicación. Intenta más tarde.");
    }
  })
  .addAnswer(
    "❓ ¿Quieres revisar otro tracker? (sí / no) o usa *'Reintentar'* para buscar de nuevo.",
    { capture: true },
    async (ctx, { gotoFlow, endFlow }) => {
      const respuesta = ctx.body.trim().toLowerCase();

      if (["sí", "si", "s", "reintentar", "volver a buscar", "otra búsqueda"].includes(respuesta)) {
        return gotoFlow(flujoUbicacion);
      } else if (["no", "n", "cancelar", "salir", "finalizar"].includes(respuesta)) {
        return endFlow("👋 Ok, hasta luego.");
      } else {
        return endFlow("❓ Responde con 'sí' para revisar otro tracker, 'reintentar' para otra búsqueda o 'no' para finalizar.");
      }
    }
  );

module.exports = flujoUbicacion;
