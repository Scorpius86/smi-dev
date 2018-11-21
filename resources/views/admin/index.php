<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
        crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>

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
    <link href="css/admin.css" rel="stylesheet">
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

    <div class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div id="modal-content-atributos" class="modal-content">
                
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
               
            </div>
            
        </div>
    </nav>

    <div class="main-form container-fluid px-0">
        <div class="page-wrapper chiller-theme toggled d-flex">
            <nav id="sidebar" class="sidebar-wrapper">
                <div id="home-menu" class="sidebar-content">
                    <!-- sidebar-header  -->
                    <vue-home-menu ref="param"></vue-home-menu>
                    <!-- sidebar-menu  -->
                </div>
            </nav>
            <main class="page-content">                
                <div class="container-fluid" id="map-container">
                    <div id="dialog-panel" title="Dialog Title">
                        <div class="dialog-content">
                            <div id="app" v-cloak>
                                <v-app>
                                    <router-view></router-view>
                                </v-app>
                            </div>
                        </div>
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
   
    <script src="js/utils/custom-polyfills.js"></script>
    <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
   

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
  
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>

    
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <!-- Se agrega la librería VueJS -->
    <script src="https://unpkg.com/vee-validate@2.0.0-rc.25/dist/vee-validate.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
    <script src="https://unpkg.com/http-vue-loader"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <script src="https://unpkg.com/vuetify@1.0.17/dist/vuetify.min.js"></script>
    
    <!-- https://bootstrap-vue.js.org/docs/ -->
    
    <script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
    <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
    
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!-- Vue Pages and Components here -->
    <script src="js/utils/environment.js"></script>
    <script src="js/shared/constantes.js"></script>
    <script src="js/pages/home/home.vue.js"></script>
    <script src="js/pages/home/home-menu.vue.js"></script>
    <script src="js/pages/seccion/seccion.vue.js"></script>
    <script src="js/pages/categoria/categoria.vue.js"></script>
    <script src="js/pages/parametro/parametro.vue.js"></script>
    <script src="js/pages/usuario/usuario.vue.js"></script>

    <script>
        

        //Ocultar menu
        $('#btnShowMenu').on('click', function () {
            $('#sidebar').toggle();
        });

        Vue.use(VueRouter);
        Vue.use(VeeValidate);
        // Vue.http.headers.common['Content-Type'] = 'application/json';
        // Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
        // Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*';
        // Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin';
        const routes = [{
                path: '/',
                component: smiHomeAdmin
            },
            {
                path: '/seccion',
                component: smiSeccion
            },            
            {
                path: '/categoria',
                component: smiCategoria
            },            
            {
                path: '/parametro',
                component: smiParametro
            },            
            {
                path: '/usuario',
                component: smiUsuario
            }
        ]
        let router = new VueRouter({
            //mode: 'history',
            routes // short for `routes: routes`
        })
        router.beforeEach((to, from, next) => {
            next()
        })
        
        var app = new Vue({
            el: '#app',
            watch: {},
            mounted() {
            },
            data: {
                msg: 'Hello',
                email: ''
            },
            methods: {},
            router
        })
      
      var smiHomeMenu=new Vue({ el: '#home-menu' });

      console.log(smiHomeMenu);
      smiHomeMenu.$refs.param.show();

    </script>   
    
</body>

</html>