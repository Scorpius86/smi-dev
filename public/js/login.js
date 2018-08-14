jQuery(function ($) {
    init();
});

function init(){
    $("button#btnLogin").on("click", onLoginButtonClick);
    $("form#login").on("submit", onFormSubmit);    
}

function onFormSubmit($e){    
    const $authData = authenticateObject();
    login($authData, function($response){        
        const $redirectUrl = URL_HOME;
        if(typeof window.localStorage !== 'undefined'){
            saveUserCredentials($response);
        }
        window.location = $redirectUrl;
    });
    $e.preventDefault();
}



function onLoginButtonClick(){
    const $form = $("form#login");
    $form.submit();
}

function authenticateObject(){
    const $form = $("form#login");
    const $usernameCtrl = $form.find("input#username");
    const $passwordCtrl = $form.find("input[type='password']#password");
    const $username = $usernameCtrl.val();
    const $password = $passwordCtrl.val();
    return {
        username: $username,
        password: $password
    };
}

function validarAcceso() {
    //window.location.replace('/login');

    console.log('aqui');

    const $mensaje = $("#lblMensaje");

    $.ajax({
        url: API_VALIDAR_ACCESO,
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function ($response) {
            if (typeof ($response !== 'undefined') && $response !== null) {
                $mensaje.val('');
                if ($response.status) { 
                    if($response.showLogin){
                        window.location.replace('/login');
                    }else{
                        window.location.replace('/main');
                    }
                    
                }else{
                    console.log($mensaje);
                    console.log($response);
                    $mensaje.val(response.error);
                }
            }
        },
        error: function (xhr, status) {},
        complete: function (xhr, status) {}
    });
}

function login($authData, $afterLogin) {
    console.log('aqui');

    const $mensaje = $("#lblMensaje");

    $.ajax({
        url: API_AUTHENTICATE,
        type: 'POST',
        data: $authData,
        dataType: 'json',
        success: function ($response) {
            if (typeof ($response !== 'undefined') && $response !== null) {
                $mensaje.val('');
                if ($response.status) {                    
                    $afterLogin($response.data);
                    console.log('autenticado');
                }
                else{
                    console.log($mensaje);
                    console.log($response);
                    $mensaje.text($response.error);
                }
            }
        },
        error: function (xhr, status) {},
        complete: function (xhr, status) {}
    });
}

function logout($afterLogout) {
    $.ajax({
        url: API_AUTHENTICATE,
        type: 'GET',
        dataType: 'json',
        success: function ($response) {
            if (typeof ($response !== 'undefined') && $response !== null) {
                if ($response.status) {                    
                    $afterLogout($response.data);
                }
            }
        },
        error: function (xhr, status) {},
        complete: function (xhr, status) {}
    });
}