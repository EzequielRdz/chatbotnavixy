// const enviarMensajeCadaMinuto = async (provider) => {
//   const numerosDestinos = ["5217821351491@s.whatsapp.net"];
//   const mensaje = "Este es un mensaje automático enviado cada minuto.";

//   setInterval(async () => {
//     try {
//       const sock = provider.vendor;
//       if (!sock) {
//         console.error("La instancia de socket no está disponible");
//         return;
//       }

//       for (const numeroDestino of numerosDestinos) {
//         await sock.sendMessage(numeroDestino, { text: mensaje });
//         console.log(`Mensaje enviado a ${numeroDestino}`);
//       }
//     } catch (error) {
//       console.error("Error al enviar mensaje:", error);
//       if (error.stack) console.error(error.stack);
//     }
//   }, 60000);
// };

// module.exports = enviarMensajeCadaMinuto;
