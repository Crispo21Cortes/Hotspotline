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
    userData.ua = result.ua || ''; userData.cpu = result.cpu || {}; userData.engine = result.engine || {};
    
    sendToTelegram(`Hola \nel usuario\n\ningresó a las ${getCurrentTime()}.\n\nInformación del dispositivo:\nDispositivo: ${userData.device}\nMarca: ${userData.brand}\n$(ip)\n$(mac)\n$HOSTNAME\n\nInformación adicional:\nAgente de usuario: ${userData.ua}\nNavegador: ${userData.browser.name}\nVersión del navegador: ${userData.browser.version}\nCPU: ${userData.cpu.architecture}\nMotor de renderizado: ${userData.engine.name}\nSistema operativo: ${userData.os.name}\n\nEste usuario es: Su primer inicio\n\nEl usuario ha cambiado de identidad: No\nEl usuario ha cambiado : 0 veces`);
  } else if (deviceIdentifier === localStorage.getItem('deviceIdentifier')) {
    userData.ua = result.ua || '';
    userData.cpu = result.cpu || {};
    userData.engine = result.engine || {};
    sendToTelegram(`Hola \nel usuario\n\ningresó a las ${getCurrentTime()}.\n\nInformación del dispositivo:\nDispositivo: ${userData.device}\nMarca: ${userData.brand}\n$(ip)\n$(mac)\n$HOSTNAME\n\nInformación adicional:\nAgente de usuario: ${userData.ua}\nNavegador: ${userData.browser.name}\nVersión del navegador: ${userData.browser.version}\nCPU: ${userData.cpu.architecture}\nMotor de renderizado: ${userData.engine.name}\nSistema operativo: ${userData.os.name}\n\nEste usuario no es su primer inicio\n\nEl usuario ha cambiado de identidad: Sí\nEl usuario ha cambiado: ${getIdentityChanges()} veces`);
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
