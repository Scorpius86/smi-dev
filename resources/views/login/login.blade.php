{{-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Login</h1>
    <h2>Prueba de Html</h2>
    <h3>Bievenidos</h3>

    <a href="/main">Ir a principal</a>
</body>
</html> --}}


<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
        crossorigin="anonymous">
    <!-- Custom styles for this template -->
    <link href="{{ asset('css/bootstrap/theme/lumen/bootstrap.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
        crossorigin="anonymous">
    <link href="{{ asset('css/floating-labels.css') }}" rel="stylesheet">
    <link href="{{ asset('css/main.css') }}" rel="stylesheet">
    <title>Page</title>
</head>

<body>
    <nav class="bs-bottom navbar navbar-expand-md navbar-light bg-custom py-0 mb-4">
        <!-- <a class="navbar-brand ml-4" href="#">            
            <img src="img/logos/usaid-logo.jpg" />
        </a> -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="mx-0 mx-md-5 collapse navbar-collapse  justify-content-between" id="navbarCollapse">
            <div class="navbar-brand ml-2">
                <a href="#">
                    <!-- <i class="fa fa-home fa-2x"></i> -->
                    <img src="img/logos/usaid-logo.jpg" />
                </a>
                <!-- <i class="fa fa-building fa-2x"></i> -->
                <a href="#">
                    <img src="img/logos/alianza-cacao-logo.jpg" />
                </a>
                <span class="font-weight-light custom-text-title text-capitalize">PORTAL DE INVERSIONES</span>
            </div>
            {{-- <div class="navbar-nav">
                <div class="d-flex justify-content-between">
                    <div class="nav-item">
                        <a class="border-right px-3 nav-link" href="#">
                            <i class="fas fa-2x fa-headset"></i>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a class="pl-3 nav-link" href="#">
                            <i class="fas fa-2x fa-question-circle"></i>
                        </a>
                    </div>
                </div>
            </div> --}}
        </div>
    </nav>

    <form id="login" class="form-signin border border-light shadow pt-4 mb-5 bg-white rounded">
        <div class="px-5 mb-2">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Ingresar al Sistema</h1>
            </div>

            <div class="form-label-group">
                <input type="email" id="username" class="rounded-75 form-control form-control-sm" placeholder="Email address" required autofocus>
                <label for="username">Usuario</label>
            </div>

            <div class="form-label-group">
                <input type="password" id="password" class="rounded-75 form-control form-control-sm" placeholder="Password" required>
                <label for="password">Contraseña</label>
            </div>
            <button id="btnLogin" class="rounded-75 btn btn-lg btn-primary btn-block" type="button">Iniciar Sesion</button>
            <div class="custom-control p-2" style="color:red;">
                <label id="lblMensaje"></label>
            </div>

            {{-- <div class="custom-control custom-checkbox my-3">
                <input type="checkbox" class="custom-control-input" id="customControlAutosizing" value="remember-me">
                <label class="custom-control-label" for="customControlAutosizing">Remember me</label>
            </div> --}}
        </div>
        {{-- <p class="m-0 py-3 bg-secondary text-muted text-center">¿Olvido su contraseña?
            <a href="#">Ingrese aqui</a>
        </p> --}}

    </form>

    <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-brown custom-navbar">
        <div class="d-block w-100">
            <p class="mb-0 text-center text-white font-weight-light font-italic">ALIANZA CACAO PERU &copy; 2018 - Todos los derechos reservados</p>
        </div>
    </nav>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script> -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
        crossorigin="anonymous"></script>
    <script src="{{ asset('js/app/app.js') }}"></script>
    <script src="{{ asset('js/login.js') }}"></script>
</body>

</html>