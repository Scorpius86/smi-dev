
const API = "http://smi.alianzacacaoperu.org/api/";
//const API = "http://localhost:8000/api/";

const API_SECCIONES = API + "secciones";
const API_REGIONES = API + "mapas/regiones";
const API_DISTRITOS = API + "mapas/distritos";

const API_AUTHENTICATE = API + "authenticate";
const API_VALIDAR_ACCESO = API + "validateLogin";
const KEY_AUTHENTICATED_USER = "auth";

const URL_HOME = "main";
const URL_LOGIN = "login";

function authenticatedUser(){    
    return JSON.parse(localStorage.getItem(KEY_AUTHENTICATED_USER));
}

function saveUserCredentials($credentials){
    localStorage.setItem(KEY_AUTHENTICATED_USER, JSON.stringify($credentials));
}

function clearCredentials(){
    if(localStorage.length > 0)
        localStorage.clear();
}