// Generar un identificador único para el dispositivo
function generateDeviceIdentifier() {
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  return uuidv4();
}

// Obtener la cantidad de veces que el usuario ha cambiado de identidad
function getIdentityChanges() {
  var identityChanges = localStorage.getItem('identityChanges');
  return identityChanges ? parseInt(identityChanges, 10) : 0;
}
