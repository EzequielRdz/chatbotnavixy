const { addKeyword } = require("@bot-whatsapp/bot");

const flujoCombustible = addKeyword([
  "combustible",
  "Combustible",
  "gasolina",
  "gas",
  "Gas",
  "combustible de unidades",
  "Combustible de unidades",
  "combustible gps",
  "Combustible GPS",
  "combustible de unidades gps",
])
  .addAnswer("⛽ Has elegido *Combustible*⛽.")
  .addAnswer(
    "En un momento el servicio de combustible se pondrá en contacto contigo."
  )
  .addAnswer("Por favor, espera un momento.");

module.exports = flujoCombustible;
