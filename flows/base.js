const { addKeyword } = require("@bot-whatsapp/bot");

const flujoBase = addKeyword([
  "hola",
  "hi",
  "hey",
  "buenas",
  "buen dia",
  "buenas tardes",
  "buenas noches",
  "apoyenme con esta unidad",
  "ayuda",
  "ayudame",
  "necesito ayuda",
  "necesito apoyo",
  "apoyo",
  "ayuda porfavor",
  "unidad",
  "porfavor",
])
  .addAnswer(
    "Hola, soy tu asistente virtual de *DSISACMA*🤖, ¿en qué puedo ayudarte?😄"
  )
  .addAnswer(
    "Por favor, dime qué necesitas: \n*Monitoreo*💻 \n*Combustible*⛽ \n*Cotizaciones de servicio de GPS*💼 \n*Ubicación*📍"
  )
  .addAnswer("Escribe lo que necesitas, porfavor.");

module.exports = flujoBase;
