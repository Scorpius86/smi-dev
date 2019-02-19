var URL = {};
URL.AUTH_VALIDATE = "auth/validate";
URL.HOME_ADMIN = "admin";
URL.ADMIN_LOGIN = "admin-login";

var CONSTANTES = {};
CONSTANTES.PARAMETRO = {};
CONSTANTES.PARAMETRO.ACTIVAR_AUTENTICACION_PUBLICA =
  "ACTIVAR_AUTENTICACION_PUBLICA";
CONSTANTES.AUTH_VALIDATE = "AUTH_VALIDATE";
CONSTANTES.MAXIMO_PUNTO_CLUSTER = 700;
CONSTANTES.SECCIONES ={
  CONTEO_MARCADORES : 'ConteoMarcadores'
};

var DATA = {};
DATA.Secciones = [];
(DATA.exists = function(key) {
  let filtro = DATA.Secciones.filter(x => x.key == key);
  if (filtro.length > 0) {
    return true;
  }
  return false;
}),
  (DATA.add = function(key, data) {
    if (!DATA.exists(key)) {
      DATA.Secciones.push(data);
      return true;
    }
    return false;
  });

DATA.remove = function(key, data) {
  let filtro = DATA.Secciones.filter(x => x.key == key);
  console.log("Eliminar store: " + key);
  return false;
};

DATA.getByKey = function(key) {
  if (DATA.exists(key)) {
    return filtro[0];
  }
  return null;
};
