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
    <link rel="stylesheet" href="js/library/leaflet/MarkerCluster.Default.css" />
    <link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />
    <link href="css/jquery.mCustomScrollbar.min.css" rel="stylesheet">

    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">

    <link href="css/floating-labels.css" rel="stylesheet">
    <link href="css/sidebar.css" rel="stylesheet">
    <link href="css/sidebar-right.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <title>Peru Cacao</title>

</head>

<body >

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

    <div id="vue-modal">
        <vue-mensaje-modal ref="message"></vue-mensaje-modal>
    </div>
    
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div id="modal-content-atributos" class="modal-content">
                
            </div>
        </div>
    </div>    
    
    <nav id="app" class="main-form bs-bottom navbar navbar-expand-md navbar-light bg-custom py-0">
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
                <!-- <span class="font-weight-light custom-text-title text-capitalize">PORTAL DE INVERSIONES</span> -->
                <span class="font-weight-light custom-text-title text-capitalize"> {{ $t("label.main_title") }} </span>
                                   
            </div>
            <div class="navbar-nav">
                <div class="d-flex justify-content-between">
                    
                    <div class="nav-item">
                        <a class="border-right px-3 nav-link">
                        </a>                       
                    </div>

                    <div class="nav-item">
                        <a class="border-right pr-3 nav-link d-inline-flex" href="#">
                            <span class="mr-2 fa-stack fa-1x">
                                <i class="fas fa-square fa-stack-2x"></i>
                                <i class="fas fa-user-circle fa-stack-1x fa-inverse"></i>                                
                            </span>                            
                            <span id="username" class="mt-1 font-weight-light"></span>
                        </a>
                    </div>
                    
                    <div class="nav-item p-1">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ selectedLanguage }}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item border-right px-3 nav-link" href="#" @click="onChangeLanguage('es')">
                                    {{ $t("label.main_language_spanish") }}
                                </a>
                                <a class="dropdown-item border-right px-3 nav-link" href="#" @click="onChangeLanguage('en')">
                                    {{ $t("label.main_language_english") }}
                                </a>                                
                            </div>
                        </div>
                    </div>                  
                    
                    <div class="nav-item p-2">
                        <a class="border-right px-3 nav-link">
                            <div class="custom-control custom-checkbox mr-sm-2">
                                <input type="checkbox" disabled class="custom-control-input" id="multiple" @change="onChangeSelection($event)">
                                <label class="custom-control-label" for="multiple">{{ $t("label.main_selection_multiple")}}</label>
                            </div>
                        </a>                        
                    </div>
                    <div class="nav-item">
                        <a class="border-right px-3 nav-link closePanel-button" href="#">
                            <i class="fas fa-2x fa-calendar"></i>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a class="border-right px-3 nav-link logout-button" href="#">
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
                <div class="sidebar-content">
                    <!-- sidebar-header  -->
                    <div id="menu-sidebar" class="sidebar-menu mt-4">
                        <vue-seccion-component ref="param"></vue-seccion-component>
                    </div>
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
            <nav id="nav-panel" class="sidebar-right-wrapper" style="display:none;">
                <div id="vue-panel" class="sidebar-right-content">
                   <vue-panel-edicion ref="param"></vue-panel-edicion>
                </div>
            </nav>
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
    <script src="js/library/leaflet/leaflet.markercluster.js"></script>
    <script src="js/library/leaflet/leaflet.SelectAreaFeature.js"></script>

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

    <link rel="stylesheet" type="text/css" href="js/library/bootstrap-slide/css/bootstrap-slider.css"/> 
    <script src="js/library/bootstrap-slide/bootstrap-slider.js"></script>

    <!-- Se agrega la librería VueJS -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/vee-validate/2.1.1/vee-validate.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
    <script src="https://unpkg.com/http-vue-loader"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.1/vue-router.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vuetify/1.3.5/vuetify.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/8.3.0/vue-i18n.min.js"></script>
    
    
    <!-- https://bootstrap-vue.js.org/docs/ -->
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.0.0/polyfill.min.js"></script>
    <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>

    <script src="js/utils/environment.js"></script>
    <script src="js/shared/constantes.js"></script>
    <script src="js/shared/lang.js"></script>
    <script src="js/shared/services.js"></script>
    <script src="js/app/app.js"></script>

    <script src="js/main.js"></script>
    <script src="js/map-features.js"></script>

    <script src="js/pages/ui/message.vue.js"></script>
    <script src="js/pages/seccion/seccion.component.vue.js"></script>
    <script src="js/pages/panel/panel-edicion.vue.js"></script>
        

    <script id="secciones-editar-atributos" type="text/x-handlebars-template">
        {{#with data as |panelData|}}
        <div class="modal-header">
            <h3 class="modal-title"> {{titulo}} </h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body" style="overflow-y:scroll; height:400px;">
            <form>
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" 
                            href="#seccion-informacion" role="tab" aria-controls="seccion-informacion" aria-selected="true">
                            {{panelData.label.panel_title_information}}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#seccion-atributos" role="tab" aria-controls="seccion-informacion" 
                            aria-selected="false">
                            {{panelData.label.panel_title_attributes}}
                        </a>
                    </li>           
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="seccion-informacion" role="tabpanel" aria-labelledby="seccion-informacion-tab">
                        <br>
                        {{#with detalle}}
                        <input type="hidden" data-validate="true" data-field="idSeccion" value="{{idSeccion}}">
                        <input type="hidden" data-validate="true" data-field="idSeccionDetalle" value="{{id}}">
                        <input type="hidden" data-validate="true" data-field="codigoGIS" value="{{codigoGIS}}">
                        <div class="form-group">
                            <label for="formGroupExampleInput">{{panelData.label.panel_label_name}}</label>
                            <input type="text" class="form-control" data-validate="true" data-field="nombre" placeholder="{{panelData.label.panel_label_name}}" value="{{nombre}}">
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput2">{{panelData.label.panel_label_short_name}}</label>
                            <input type="text" class="form-control" data-validate="true" data-field="abreviatura" placeholder="{{panelData.label.panel_label_short_name}}" value="{{abreviatura}}">
                        </div>
                        <div class="form-group">
                            <label for="formGroupExampleInput2">{{panelData.label.panel_label_description}}</label>
                            <input type="text" class="form-control" data-validate="true" data-field="descripcion" placeholder="{{panelData.label.panel_label_description}}"  value="{{descripcion}}">
                        </div>
                        {{/with}}
                    </div>
                    <div class="tab-pane fade" id="seccion-atributos" role="tabpanel" aria-labelledby="seccion-informacion-tab">
                        <br>
                        <div>
                            <button type="button" class="btn btn-primary" onClick="agregarAtributo()">{{panelData.label.button_add}}</button>
                        </div>
                        <table id ="table-atributo" class="table table-sm">
                            <thead>
                                <tr>
                                    <th>{{panelData.label.panel_attribute_title_attribute}}</th>
                                    <th>{{panelData.label.panel_attribute_title_value}}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {{#each atributos}}
                                <tr  data-id="{{id}}">
                                    <td>
                                        <input type="text" class="atributo-nombre" value="{{nombre}}" data-field-id="{{id}}">
                                    </td>
                                    <td>
                                        <input type="text" class="atributo-valor" value="{{valor}}" data-field-id="{{id}}">
                                    </td>
                                    <td>
                                        <a class="nav-link" style="cursor: pointer;" onClick="quitarAtributo('{{id}}')">
                                            <i class="fas fa-trash-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                                {{/each}}
                            </tbody>                    
                        </table>
                    </div>
                </div>

            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{panelData.label.button_cancel}}</button>
            <button type="button" class="btn btn-primary" onClick="saveSeccionDetalleClick()">{{panelData.label.button_ok}}</button>
        </div>
        {{/with}}
    </script>

    <<script>

        //Vue.use(VueRouter);
        //Vue.use(VeeValidate);

        // Create VueI18n instance with options
        const i18n = new VueI18n({
            locale: getLanguage(), // set locale
            messages, // set locale messages
        });
        
        var app = new Vue({
            el: '#app',
            watch: {},
            mounted() {
            },
            data: {
                msg: 'Hello',
                email: '',
                selectedLanguage: messages.es.label.main_language_spanish
            },
            created: function() {
                let language=getLanguage();
                this.selectedLanguage= messages.es.label.main_language_spanish;
                if(language=='en'){
                    this.selectedLanguage= messages.en.label.main_language_english;
                }

            },
            methods: {
                onChangeLanguage: function(language){
                    console.log('aqui');
                    i18n.locale= language;
                    setLanguage(language);
                    smiSeccion.$refs.param.language = language;
                    this.setSelectedLanguage(language);
                },
                setSelectedLanguage: function(language){
                    this.selectedLanguage= messages.es.label.main_language_spanish;
                    if(language=='en'){
                        this.selectedLanguage= messages.en.label.main_language_english;
                    }
                },
                onChangeSelection: function(event){
                    if(mapFeature){
                        mapFeature.multipleSelection = false;
                        if(event.target.checked){
                            mapFeature.multipleSelection = true;
                        }else{
                            mapFeature.removeAllSelection();
                            smiPanel.$refs.param.hide();
                            smiPanel.$refs.param.detalle={};
                        }
                    }
                }
            },
            i18n
        });

        var smiSeccion=new Vue({ el: '#menu-sidebar' });
        var smiMensaje=new Vue({ el: '#vue-modal' });
        var smiPanel=new Vue({ el: '#vue-panel' });
    </script>

</body>

</html>