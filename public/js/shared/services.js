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
