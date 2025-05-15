const { addKeyword } = require("@bot-whatsapp/bot");

const flujoCotizacionesGPS = addKeyword([
  "cotizaciones gps",
  "Cotizaciones GPS",
  "GPS",
  "cotar gps",
  "cotizacion",
  "cotizar",
  "cotizaciones",
  "cotar",
])
  .addAnswer("💼 Has elegido Cotizaciones de servicio de GPS💼.")
  .addAnswer(
    "En un momento el servicio de cotización se pondrá en contacto contigo."
  )
  .addAnswer("Por favor, espera un momento.");

module.exports = flujoCotizacionesGPS;
