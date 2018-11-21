jQuery(function($) {
  init();

  validarAcceso("login");
});

function init() {
  $("button#btnLogin").on("click", onLoginButtonClick);
  $("form#login").on("submit", onFormSubmit);
}

function onFormSubmit($e) {
  const $authData = authenticateObject();
  login($authData, function($response) {
    const $redirectUrl = URL_HOME;
    if (typeof window.localStorage !== "undefined") {
      saveUserCredentials($response);
    }
    window.location = $redirectUrl;
  });
  $e.preventDefault();
}

function onLoginButtonClick() {
  const $form = $("form#login");
  $form.submit();
}

function authenticateObject() {
  const $form = $("form#login");
  const $usernameCtrl = $form.find("input#username");
  const $passwordCtrl = $form.find("input[type='password']#password");

  const $username = $usernameCtrl.val();
  const $password = $passwordCtrl.val();
  //const $language = $("#language").val();

  return {
    username: $username,
    password: $password,
    language: "es"
  };
}

function validarAcceso($paginaActual) {
  const $mensaje = $("#lblMensaje");

  $.ajax({
    url: API_VALIDAR_ACCESO,
    type: "POST",
    data: {},
    dataType: "json",
    success: function($response) {
      if (typeof ($response !== "undefined") && $response !== null) {
        $mensaje.val("");
        if ($response.status) {
          if ($response.showLogin) {
            if ($paginaActual != "login") {
              window.location.replace("/login");
            }
          } else {
            //Registar credenciales default
            const $credentialesDefault = {};
            $credentialesDefault.id = -1;
            $credentialesDefault.nombre = "publico";
            $credentialesDefault.login = "publico";
            saveUserCredentials($credentialesDefault);

            window.location.replace("/main");
          }
        } else {
          $mensaje.val(response.error);
        }
      }
    },
    error: function(xhr, status) {},
    complete: function(xhr, status) {}
  });
}

function login($authData, $afterLogin) {
  const $mensaje = $("#lblMensaje");

  $.ajax({
    url: API_AUTHENTICATE,
    type: "POST",
    data: $authData,
    dataType: "json",
    success: function($response) {
      if (typeof ($response !== "undefined") && $response !== null) {
        $mensaje.val("");
        if ($response.status) {
          let dataLogin = {};
          dataLogin.id = $response.data.id;
          dataLogin.login = $response.data.login;
          dataLogin.nombre = $response.data.nombre;
          dataLogin.language = $authData.language;
          $afterLogin(dataLogin);
          console.log("autenticado");
        } else {
          $mensaje.text($response.error);
        }
      }
    },
    error: function(xhr, status) {},
    complete: function(xhr, status) {}
  });
}

function logout($afterLogout) {
  $.ajax({
    url: API_AUTHENTICATE,
    type: "GET",
    dataType: "json",
    success: function($response) {
      if (typeof ($response !== "undefined") && $response !== null) {
        if ($response.status) {
          $afterLogout($response.data);
        }
      }
    },
    error: function(xhr, status) {},
    complete: function(xhr, status) {}
  });
}
