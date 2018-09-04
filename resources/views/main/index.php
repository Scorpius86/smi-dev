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
    <link href="css/bootstrap/theme/lumen/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
        crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
        crossorigin="" />
    <link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />
    <link href="css/jquery.mCustomScrollbar.min.css" rel="stylesheet">

    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">

    <link href="css/floating-labels.css" rel="stylesheet">
    <link href="css/sidebar.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <title>Peru Cacao</title>



</head>

<body>
    

    <div id='loading' class="modal bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" 
                        aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
            </div>
        </div>
    </div>
    
    <nav class="main-form bs-bottom navbar navbar-expand-md navbar-light bg-custom py-0">
        <a class="nav-link pl-3" id="btnShowMenu">
            <i class="fas fa-2x fa-bars"></i>
        </a>
        <a class="navbar-brand ml-4" href="#">
            <!-- <i class="fa fa-home fa-2x"></i> -->
            <img src="img/logos/usaid-logo.jpg" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div class="navbar-brand ml-2">
                <!-- <i class="fa fa-building fa-2x"></i> -->
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
                        <a class="border-right px-3 nav-link logout-button">
                            <i class="fas fa-2x fa-sign-out-alt"></i>
                        </a>
                    </div>                    
                </div>
                <!-- <div class="d-flex justify-content-between">
                    <div class="nav-item active">
                        <a class="nav-link" href="#">Portal de Inversiones
                            <span class="sr-only">(current)</span>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </div>
                </div> -->
            </div>
            
            <!-- <form class="form-inline mt-2 mt-md-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> -->
        </div>
    </nav>

    <div class="main-form container-fluid px-0">
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
                    <div id="dialog-panel" title="Dialog Title">
                        <div class="dialog-content"></div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <nav class="main-form navbar fixed-bottom navbar-expand-sm navbar-dark bg-brown custom-navbar">
        <div class="d-block w-100">

            <div class="row">
                <div class="col-3">

                </div>
                <div class="col-9">
                   
                    <div class="row" id="map-legend">
                    </div>
                </div>
            </div>
            
            <!-- <p class="mb-0 text-center text-white font-weight-light font-italic">ALIANZA CACAO PERU &copy; 2018 - Todos los derechos reservados</p> -->

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

    <script src="js/utils/custom-polyfills.js"></script>
    <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="js/handlebars/handlebars-v4.0.11.js"></script>
    <script src="js/handlebars/custom-helpers.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.18/datatables.min.css"/> 
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.18/datatables.min.js"></script>

    
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js"></script>

    <script src="js/app/app.js"></script>
    <script src="js/main.js"></script>
    <script id="punto-popupcontent-template" type="text/x-handlebars-template">
       
        <table class="table table-sm">             
            {{#each properties as |item|}}
            <tr>
                <td>{{item.nombre}}</td>
                <td>{{item.valor}}</td>
            </tr>
            {{/each}}

        </table>

        <div>            
            <button type="button" class="btn btn-link">Editar</button>            
        </div>

    </script>
    <script id="panel-popupcontent-template" type="text/x-handlebars-template">
        
        {{#with detalle}}

        <!-- <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"> -->

        <ul class="nav nav-tabs" role="tablist">

            {{#each cultivos}}

            <li class="nav-item">
                <a class="nav-link" id="cultivo-{{id}}-tab" data-toggle="pill" href="#cultivo-{{id}}" role="tab" aria-controls="cultivo-{{id}}" aria-selected="true">
                    {{nombre}}
                </a>
            </li>
          
            {{/each}}
        </ul>
        <div class="tab-content">
            {{#each cultivos}}
            <div class="tab-pane fade show" id="cultivo-{{id}}" role="tabpanel" aria-labelledby="cultivo-{{id}}-tab">
                <div class="panel-tabs">
                    <ul>
                        {{#each ../proyeccion}}
                            <li><a href="#proyeccion-tabs-{{id}}">{{variable}}</a></li>
                        {{/each}}                        
                    </ul>

                    {{#each ../proyeccion}}
                    <div id="proyeccion-tabs-{{id}}">
                        <h5>
                            Contenido {{variable}}
                        </h5>
                        <div style="height:300px;">
                            <canvas class="chart" width="350" height="200"></canvas>
                        </div>  
                    </div>
                    {{/each}}
                </div>            
            </div>
           
            {{/each}}
        </div>


            <!-- {{#each cultivos}}

            <div class="toolbar">
                

                <div class="card" style="width: 8rem;">
                    <div class="card-body">
                        <h6 class="card-title">{{nombre}}</h6>
                        <span class="card-subtitle mb-2 text-muted">Tasa&nbsp;&nbsp;: {{tasa}} </span>
                        <span class="card-subtitle mb-2 text-muted">Precio: {{precio}}</span>                       
                    </div>
                </div>

            </div>
                       
            {{/each}} -->

        <!-- </div> -->

        <!-- <div class="panel-tabs">
            <ul>
                {{#each proyeccion}}
                    <li><a href="#tabs-{{id}}">{{variable}}</a></li>
                {{/each}}
                
            </ul>

            {{#each proyeccion}}
            <div id="tabs-{{id}}">
                <h5>
                    Contenido {{variable}}
                </h5>
                <div style="height:300px;">
                    <canvas class="chart" width="350" height="200"></canvas>
                </div>  
            </div>
            {{/each}}
        </div> -->

        {{/with}}
    </script>
    <script id="secciones-template" type="text/x-handlebars-template">
        <ul class="bg-light">
            {{#each secciones}}
            <li class="sidebar-dropdown">
                <a href="#" class="border-2 border-left border-menu-item d-block">
                    <div class="d-inline-flex align-items-center pl-2 bg-white">
                        <i class="mr-2 fas fa-2x fa-map-marker-alt"></i>
                        <span>{{nombre}}</span>
                    </div>
                </a>
                {{#if hasChildren}}
                <div class="sidebar-submenu">
                    <ul class="py-0">
                        {{#each children}}
                        <li class="bg-light">
                            <a class="d-block" href="#">
                                <div class="d-inline-flex align-items-center">
                                    <i class="mr-2 fas fa-map-marker-alt"></i>
                                    <!-- custom-control-input-->
                                    <input type="checkbox" class="d-none menu-item" data-value="{{json this}}" data-parent="{{json ../this}}" id="{{id}}">
                                    <label class="mb-0" for="{{id}}">{{nombre}}</label>
                                </div>
                            </a>
                        </li>
                        {{/each}}
                    </ul>
                </div>
                {{/if}}
            </li>
            {{/each}}
            
        </ul>
    </script>
</body>

</html>