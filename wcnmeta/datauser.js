// Objeto para almacenar los datos del usuario
var userData = {};

// Función para obtener datos de dispositivo, IP y mostrar mensaje en Telegram
function getData() {
  // Obtener información del dispositivo, navegador y sistema operativo
  var userAgent = navigator.userAgent;
  var parser = new UAParser();
  var result = parser.setUA(userAgent).getResult();

  userData.device = result.device.model || '';
  userData.brand = result.device.vendor || '';
  userData.browser = result.browser.name || '';
  userData.os = result.os.name || '';
  userData.ua = userAgent;

  // Obtener el identificador de dispositivo
  var deviceIdentifier = localStorage.getItem('deviceIdentifier');
  var isFirstTime = localStorage.getItem('isFirstTime') === null;

  if (isFirstTime) {
    deviceIdentifier = generateDeviceIdentifier(); // Generar un identificador único
    localStorage.setItem('deviceIdentifier', deviceIdentifier);
    localStorage.setItem('isFirstTime', 'false');
    userData.ua = result.ua || '';
    userData.cpu = result.cpu || {};
    userData.engine = result.engine || '';

    var currentTime = getCurrentTime(); // Obtener la hora actual
    var currentDate = getCurrentDate(); // Obtener la fecha actual

    sendToTelegram(`¡Hola! ¡Bienvenido/a! 

El usuario ingresó en {{getCurrentDate()}} a las {{getCurrentTime()}}. 

Aquí te dejo la información del dispositivo: 

- Dispositivo: {{userData.device}}
- Marca: {{userData.brand}}
- IP: {{ipCliente}}
- Mac Address: {{macCliente}}
- Nombre del dispositivo: 

Información adicional: 

- Agente de usuario: {{userData.ua}}
- Navegador: {{userData.browser.name}}
- Versión del navegador: {{userData.browser.version}}
- CPU: {{userData.cpu.architecture}}
- Motor de renderizado: {{userData.engine.name}}
- Sistema operativo: {{userData.os.name}}

Este usuario es: {{isFirstTime ? 'Su primer inicio' : 'Un usuario recurrente'}}

El usuario ha cambiado de identidad: {{getIdentityChanges() > 0 ? 'Sí' : 'No'}}
El usuario ha cambiado: {{getIdentityChanges()}} veces

¡Gracias por utilizar nuestros servicios!`);
  } else if (deviceIdentifier === localStorage.getItem('deviceIdentifier')) {
    userData.ua = result.ua || '';
    userData.cpu = result.cpu || {};
    userData.engine = result.engine || '';

    var currentTime = getCurrentTime(); // Obtener la hora actual
    var currentDate = getCurrentDate(); // Obtener la fecha actual

    sendToTelegram(`¡Hola! ¡Bienvenido/a! 

El usuario ingresó en {{getCurrentDate()}} a las {{getCurrentTime()}}. 

Aquí te dejo la información del dispositivo: 

- Dispositivo: {{userData.device}}
- Marca: {{userData.brand}}
- IP: {{ipCliente}}
- Mac Address: {{macCliente}}
- Nombre del dispositivo: 

Información adicional: 

- Agente de usuario: {{userData.ua}}
- Navegador: {{userData.browser.name}}
- Versión del navegador: {{userData.browser.version}}
- CPU: {{userData.cpu.architecture}}
- Motor de renderizado: {{userData.engine.name}}
- Sistema operativo: {{userData.os.name}}

Este usuario es: {{isFirstTime ? 'Su primer inicio' : 'Un usuario recurrente'}}

El usuario ha cambiado de identidad: {{getIdentityChanges() > 0 ? 'Sí' : 'No'}}
El usuario ha cambiado: {{getIdentityChanges()}} veces

¡Gracias por utilizar nuestros servicios!`);
  }

  // Actualizar la cantidad de veces que el usuario ha cambiado de identidad
  localStorage.setItem('identityChanges', JSON.stringify(getIdentityChanges() + 1));

  // Otras acciones que deseas realizar
  // ...
}

// Obtener la hora actual en formato de 12 horas
function getCurrentTime() {
    var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // Convertir a formato de 12 horas
  var period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes + ' ' + period;
}

// Obtener la fecha actual
function getCurrentDate() {
  var now = new Date();
  var day = now.getDate();
  var month = now.getMonth() + 1; // Los meses en JavaScript comienzan desde 0, por lo que se suma 1
  var year = now.getFullYear();

  return 'El día ' + day + ' del mes ' + month + ' del año ' + year;
}

