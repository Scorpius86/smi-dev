//const API = "http://smi.alianzacacaoperu.org/api/";
//const API = "http://localhost:8000/api/";

const API_SECCIONES = UrlAPI.base + "/secciones";
const API_REGIONES = UrlAPI.base + "/mapas/regiones";
const API_DISTRITOS = UrlAPI.base + "/mapas/distritos";

const API_AUTHENTICATE = UrlAPI.base + "/authenticate";
const API_VALIDAR_ACCESO = UrlAPI.base + "/validateLogin";
const KEY_AUTHENTICATED_USER = "auth";

const KEY_LANGUAGE = "lang";
const DEFAULT_LANGUAGE = "es";

const URL_HOME = "main";
const URL_LOGIN = "login";

function getLanguage() {
  if (localStorage.getItem(KEY_LANGUAGE) == null) return DEFAULT_LANGUAGE;
  return JSON.parse(localStorage.getItem(KEY_LANGUAGE));
}

function setLanguage($language) {
  localStorage.setItem(KEY_LANGUAGE, JSON.stringify($language));
  Environment.language = $language;
}

function authenticatedUser() {
  if (localStorage.getItem(KEY_AUTHENTICATED_USER) != null) {
    return JSON.parse(localStorage.getItem(KEY_AUTHENTICATED_USER));
  }
  return null;
}

function saveUserCredentials($credentials) {
  localStorage.setItem(KEY_AUTHENTICATED_USER, JSON.stringify($credentials));
}

function clearCredentials() {
  if (localStorage.length > 0) localStorage.clear();
}

function showLoading() {
  $("#loading").modal("show");
}

function hideLoading() {
  $("#loading").modal("hide");
}
