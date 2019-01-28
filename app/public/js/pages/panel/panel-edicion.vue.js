Vue.component("vue-panel-edicion", {
  template: `
        
        <div class="container-fluid">
            <template v-if="display">                
                <nav class="navbar-expand-md navbar-light py-0s">
                    <div class="navbar-nav">
                        <div class="d-flex justify-content-between">
                            <div class="nav-item">
                                <a class="border-right px-3 nav-link closePanel-button" >
                                    <i class="fas fa-2x fa-angle-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>                    
                
                <div class="row">
                    <div class="col-12  text-center">
                        <h4>{{title}}</h4>
                    </div>                    
                </div>
                <div class="content">
                    <template v-if="tipo=='grafico'">
                        <template v-if="(mapFeature.selectedLayers.length > 1)">
                            <select class="form-control" name="ddlPanelFeature" v-on:change="onSeleccionarPanelFeature()" v-model="selFeature">
                                <option value="0">Todos</option>
                                <option v-for="feature in detalle.selectedFeatures" 
                                    :value="feature.key" 
                                    :selected="feature.selected === true?'selected':''">{{feature.nombre}}</option>
                            </select>
                            <br> 
                        </template>
                        <!--
                        <ul class="nav nav-pills mb-3" role="tablist">

                            <li v-for="cultivo in detalle.cultivos" class="nav-item">
                                <a class="nav-link active" v-bind:id="'cultivo-' + cultivo.id + '-tab'" data-toggle="pill" v-on:click="onSeleccionCultivo(cultivo)"
                                    v-bind:href="'#cultivo-'+ cultivo.id" role="tab" :aria-controls="'cultivo-' + cultivo.id" aria-selected="true">
                                    {{cultivo.nombre}}
                                </a>
                            </li>
                        
                        </ul>
                        -->
                        <div class="tab-content">                            
<!--
                            <div v-for="cultivo in detalle.cultivos" class="tab-pane fade show active" v-bind:id="'cultivo-' + cultivo.id" role="tabpanel"  >
-->                            
                                <div class="panel-tabs">
                                    <ul>
                                        <li v-for="cultivo in detalle.cultivos">
                                            <a v-if="cultivo.producciones.length>0" v-bind:href="'#cultivo-tabs-' + cultivo.id">{{cultivo.nombre}}</a>
                                        </li>
                                    </ul>
                                    <div v-for="cultivo in detalle.cultivos" v-bind:id="'cultivo-tabs-' + cultivo.id">
                                        <div v-if="cultivo.producciones.length>0" class="row sliderTasaAnio">
                                            <form class="formSliderTasaAnio">                                
                                                <div class="form-group">
                                                    <label for="ddlTasa">
                                                        <span v-bind:id="'sliderTasaLabel-' + cultivo.tipoCultivo.idTipoCultivo">Tasa: <span v-bind:id="'sliderTasaVal-' + cultivo.tipoCultivo.idTipoCultivo">85</span>%</span>
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <input class="sliderTasa" v-bind:id="'sliderTasa-' + cultivo.tipoCultivo.idTipoCultivo" data-slider-id='sliderTasaKey' type="text" data-slider-min="0" data-slider-max="150"
                                                        data-slider-step="5" data-slider-value="85" v-model="selRangoTasa" />

                                                    <select style="display:none;" class="form-control" name="ddlTasa" v-on:change="onSeleccionarTasa(cultivo)" v-model="selTasaId">
                                                        <option v-for="tasa in cultivo.tasas" v-bind:value="tasa.id">{{tasa.tasa }}</option>
                                                    </select>
                                                </div>                                 
                                                <div class="form-group">
                                                    <label for="ddlAnio">
                                                        <span v-bind:id="'sliderAnioLabel-' + cultivo.tipoCultivo.idTipoCultivo">Año: <span v-bind:id="'sliderAnioVal-' + cultivo.tipoCultivo.idTipoCultivo">2018</span></span>
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <input v-bind:id="'sliderAnio-' + cultivo.tipoCultivo.idTipoCultivo" data-slider-id='sliderAnioKey' type="text" data-slider-min="2005" data-slider-max="2025"
                                                        data-slider-step="1" data-slider-value="2018" v-model="selRangoAnio" />

                                                    
                                                </div>
                                            </form>
                                        </div>
                                        <div v-if="cultivo.producciones.length>0" class="row">
                                            <div class="divChartProduccion">
                                                <canvas class="chartProduccion"></canvas>
                                            </div>  
                                        </div>
                                        <div v-if="cultivo.producciones.length>0" class="row">
                                            <div class="col-xs-6 divChartProductividad">
                                                <canvas class="chartProductividad"></canvas>
                                            </div>  
                                            <div class="col-xs-6 divChartArea">
                                                <canvas class="chartArea"></canvas>
                                            </div>  
                                        </div>
                                    </div>
                                </div>   
<!--         
                            </div>                            
-->
                        </div>
                        
                    </template>
                    <template v-if="tipo=='edicion'">
                        
                        <table class="table table-sm">                            
                            <tr>
                                <th>{{detalle.label.panel_label_name}}</th>
                                <td>{{detalle.detalle.nombre}}-{{detalle.detalle.abreviatura}}</td>
                            </tr>
                            
                            <tr v-for="atributo in detalle.detalle.atributos">
                                <td>{{atributo.nombre}}</td>
                                <td>{{atributo.valor}}</td>
                            </tr>

                        </table>
                    </template>
                    <template v-if="detalle.permiteEditar">
                        <div>
                            <br>
                            <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal" 
                                data-whatever="@mdo">{{detalle.label.button_edit}}
                            </button>
                        </div>
                    </template>
                </div>                
            </template>
        </div>
        
      `,
  data() {
    return {
      title: "",
      display: true,
      input: {},
      detalle: {},
      selFeature: "0",
      mapFeature:{selectedLayers:[]},
      selCultivoId: "",
      selTasa: null,
      selTasaBase: null,
      selTasaId: 0,
      permiteEditar: false,
      selRangoAnio: 2018,
      selRangoTasa: 85,
      tipo: "edicion" //grafico
    };
  },

  created() {
    //this.onMostrarMensaje();
    this.detalle.detalle = {};
    this.detalle.label = {};
  },
  methods: {
    hide: function() {
      $("#nav-panel").hide();
    },
    show: function() {
      const me = this;
      this.display = true;

      showLoading();

      this.title = "";
      this.title = this.detalle.nombre || this.detalle.codigoGIS;
      this.mapFeature = mapFeature;

      this.permiteEditar = false;
      let authenticate = authenticatedUser();
      if (authenticate != null && authenticate.id > 0) {
        this.permiteEditar = true;
      }
      let language = getLanguage();
      if (language == null || language.length == 0) {
        language = "es";
      }
      this.detalle.label = messages[language].label;

      if (this.detalle.cultivos == null) {
        this.detalle.cultivos = [];
        return false;
      }

      this.onSeleccionCultivo(this.detalle.cultivos[0]);

      let selectedElements = [];
      mapFeature.selectedLayers.forEach(l => {
        let selected = false;
        let filtro = this.input.seccion.seccion_detalle.filter(x => {
            return x.codigoGIS == l.key;
        });
        if (filtro.length > 0) {
            selected = (this.detalle.codigoGIS == filtro[0].codigoGIS);
            selectedElements.push({
              key: filtro[0].codigoGIS,
              nombre: filtro[0].nombre,
              selected: selected
            });
        }
      });

      this.detalle.selectedFeatures = [];
      if (selectedElements.length > 1) {
        this.detalle.selectedFeatures = selectedElements;
        this.title = "Región";
      }
    },
    onSeleccionCultivo: function(cultivo) {
      this.selCultivoId = cultivo.id;
      this.selCultivo = cultivo;
      this.renderCultivo(cultivo);
    },

    renderCultivo: function(cultivo) {
      const me = this;
      if($(".panel-tabs").tabs().length > 0){
        $(".panel-tabs").tabs("destroy");
      }
      $(".closePanel-button").off("click");
      $(".closePanel-button").on("click", function() {
        $("#nav-panel").toggle();
      });

      showLoading();
    
      setTimeout(function() {    

        if (me.detalle && me.detalle.cultivos && me.detalle.cultivos.length > 0) {
            me.detalle.cultivos.forEach(function(cultivo) {
              const $idElement = "cultivo-tabs-" + cultivo.id;
              if(cultivo.producciones.length>0){
                generarGraficasLimites($idElement, cultivo);
              }
            });
        }      

        $(".panel-tabs").tabs();

        hideLoading();
        $("#nav-panel").show();
      }, 200);
    },

    onCambiarAnio: function(me, anio) {
      me.selTasa = _.clone(me.selTasaBase);
      me.selTasaBase.proyecciones.forEach(x => {
        x.detalle = x.detalle.filter(y => y.dato <= anio);
      });

      console.log(me.selTasa);
    },
    onSeleccionarPanelFeature: function() {
      const me = this;
      let lista = [];

      if (this.selFeature == "0") {
        this.detalle.selectedFeatures.forEach(x => {
          lista.push(x.key);
        });
      } else {
        lista.push(this.selFeature);
      }

      mapFeature.loadPanel(
        this.input.seccion.id,
        lista,
        this.selCultivoId,
        function(data) {
          console.log(data);
          if(data){
            me.detalle = data;
            me.show();
          }
        }
      );
    }
  },
  // props: ['title'],
  $_veeValidate: {
    validator: "new"
  }
});
