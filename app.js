require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

// Flujos
const flujoBase = require("./flows/base");
const flujoMonitoreo = require("./flows/monitoreo");
const flujoCombustible = require("./flows/combustible");
const flujoCotizacionesGPS = require("./flows/cotizaciones");
const flujoUbicacion = require("./flows/ubicacion");

// Función de envío automático
// const enviarMensajeCadaMinuto = require("./utils/autoMessage");

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterProvider = createProvider(BaileysProvider);

  const flujos = createFlow([
    flujoBase,
    flujoMonitoreo,
    flujoCombustible,
    flujoCotizacionesGPS,
    flujoUbicacion,
  ]);

  const bot = createBot({
    flow: flujos,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();

  adapterProvider.on("ready", async () => {
    console.log("✅ Proveedor listo, iniciando envío de mensajes...");
    // enviarMensajeCadaMinuto(adapterProvider);
  });
};

main();
