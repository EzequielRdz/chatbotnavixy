const { addKeyword } = require("@bot-whatsapp/bot");

const flujoMonitoreo = addKeyword([
  "monitoreo",
  "Monitoreo",
  "monitoreo gps",
  "Monitoreo GPS",
  "monitoreo de unidades",
  "Monitoreo de unidades",
  "monitorear",
  "monitorea",
  "monitorea gps",
])
  .addAnswer("📡 Has elegido *Monitoreo*💻.")
  .addAnswer("En un momento el monitorista se pondrá en contacto contigo.")
  .addAnswer("Por favor, espera un momento.");

module.exports = flujoMonitoreo;
