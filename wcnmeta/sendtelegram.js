// Función para enviar datos a Telegram
function sendToTelegram(message) {
  // Verificar si el mensaje está vacío
  if (!message) {
    console.error('Error al enviar el mensaje a Telegram: El texto del mensaje está vacío');
    return;
  }

  const botToken = '1597773806:AAFh0xrEMv7pmSuDF84XGc5MA5C7SMdiKZw'; // Agrega aquí el token de tu bot de Telegram
  const chatId = '1116794830'; // Agrega aquí el ID de tu chat de Telegram

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const data = {
    chat_id: chatId,
    text: message
  };

  axios.post(telegramUrl, data)
    .then(response => {
      console.log('Mensaje enviado a Telegram:', response.data);
    })
    .catch(error => {
      console.error('Error al enviar el mensaje a Telegram:', error.response.data);
    });
}
