{{-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title> @yield("title","Default")</title>
</head>
<body>
    <h1>Default</h1>
    <h2>Prueba de Html</h2>
    
    @yield("content")

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
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
        crossorigin="" />
    <link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />
    <link href="{{ asset('css/jquery.mCustomScrollbar.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/floating-labels.css') }}" rel="stylesheet">
    <link href="{{ asset('css/sidebar.css') }}" rel="stylesheet">
    <link href="{{ asset('css/main.css') }}" rel="stylesheet">
    <title>
        @yield("title","Peru Cacao")
    </title>
</head>

<body>
    
</body>


<body>
    <nav class="bs-bottom navbar navbar-expand-md navbar-light bg-custom py-0">
        <a class="navbar-brand ml-4" href="#">
            <img src="img/logos/usaid-logo.jpg" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div class="navbar-brand ml-2">
                <a href="#">
                    <img src="img/logos/alianza-cacao-logo.jpg" />
                </a>
                <span class="font-weight-light custom-text-title text-capitalize">PORTAL DE INVERSIONES</span>
            </div>
            <div class="navbar-nav">
                <div class="d-flex justify-content-between">
                    <div class="nav-item">
                        <a class="border-right pr-3 nav-link d-inline-flex" href="#">
                            <span class="mr-2 fa-stack fa-1x">
                                <i class="fas fa-square fa-stack-2x"></i>
                                <i class="fas fa-user-circle fa-stack-1x fa-inverse"></i>                                
                            </span>                            
                            <span id="username" class="mt-1 font-weight-light"></span>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a class="border-right px-3 nav-link" href="#">
                            <i class="fas fa-2x fa-headset"></i>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a class="border-right px-3 nav-link" href="#">
                            <i class="fas fa-2x fa-question-circle"></i>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a class="border-right px-3 nav-link" href="#">
                            <i class="fas fa-2x fa-sign-out-alt"></i>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a class="nav-link pl-3" href="#">
                            <i class="fas fa-2x fa-bars"></i>
                        </a>
                    </div>
                </div>               
            </div>
            <span class="navbar-text">
                <span>Navbar text with an inline element</span>
            </span>           
        </div>
    </nav>

    <div class="container-fluid px-0">
        <div class="page-wrapper chiller-theme toggled d-flex">
            <nav id="sidebar" class="sidebar-wrapper">
                <div class="sidebar-content">
                    <!-- sidebar-header  -->
                    <div id="menu-sidebar" class="sidebar-menu mt-4"></div>
                    <!-- sidebar-menu  -->
                </div>
            </nav>
            <main class="page-content">
                <div class="container-fluid" id="map-container">
                   Aqui el contenido
                </div>
            </main>
        </div>
    </div>

    <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-brown custom-navbar">
        <div class="d-block w-100">
            <p class="mb-0 text-center text-white font-weight-light font-italic">ALIANZA CACAO PERU &copy; 2018 - Todos los derechos reservados</p>
        </div>
    </nav>
    
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
        crossorigin=""></script>
    <script src='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>

    <script src="{{ asset('js/utils/custom-polyfills.js') }}"></script>
    <script src="{{ asset('js/jquery.mCustomScrollbar.concat.min.js') }}"></script>
    <script src="{{ asset('js/handlebars/handlebars-v4.0.11.js') }}"></script>
    <script src="{{ asset('js/handlebars/custom-helpers.js') }}"></script>
    <script src="{{ asset('js/app/app.js') }}"></script>
    <script src="{{ asset('js/main.js') }}"></script>
    

</body>

</html>