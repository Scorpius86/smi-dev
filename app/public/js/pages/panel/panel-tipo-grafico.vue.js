export default {
    name: "vue-panel-tipo-grafico",
    template: `
      <div v-if="display">
        <template v-if="tipo=='grafico' && detalle.forecast">
            <template v-if="(mapFeature.selectedLayers.length > 1)">
                <select class="form-control" name="ddlPanelFeature" v-on:change="onSeleccionarPanelFeature()" v-model="selFeature">
                    <option value="0">Todos</option>
                    <option v-for="feature in detalle.forecast.selectedFeatures" 
                        :value="feature.key" 
                        :selected="feature.selected === true?'selected':''">{{feature.nombre}}</option>
                </select>
                <br> 
            </template>
            <!--
            <ul class="nav nav-pills mb-3" role="tablist">

                <li v-for="cultivo in detalle.forecast.cultivos" class="nav-item">
                    <a class="nav-link active" v-bind:id="'cultivo-' + cultivo.id + '-tab'" data-toggle="pill" v-on:click="onSeleccionCultivo(cultivo)"
                        v-bind:href="'#cultivo-'+ cultivo.id" role="tab" :aria-controls="'cultivo-' + cultivo.id" aria-selected="true">z
                        {{cultivo.nombre}}
                    </a>
                </li>
            
            </ul>
            -->
            <div class="tab-content">                           
    <!--
                <div v-for="cultivo in detalle.forecast.cultivos" class="tab-pane fade show active" v-bind:id="'cultivo-' + cultivo.id" role="tabpanel"  >
    -->                            
                    <div class="panel-tabs">
                        <ul>
                            <li v-for="cultivo in detalle.forecast.cultivos">
                                <a v-if="cultivo.producciones.length>0" v-bind:href="'#cultivo-tabs-' + cultivo.id">{{cultivo.nombre}}</a>
                            </li>
                        </ul>
                        <div v-for="cultivo in detalle.forecast.cultivos" v-bind:id="'cultivo-tabs-' + cultivo.id">
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
      </div>
    `,
    data() {
      return {        
        display:false,
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

    props:["id"],
  
    created() {
      this.detalle.detalle = {};
      this.detalle.label = {};
    },
    methods: {
      hide: function() {
        
      },
      show: function() {
        const me = this;
        this.display = true;
  
        showLoading();
  
        this.detalle.forecast = this.detalle.forecast||{};
        this.title = "";
        this.title = this.detalle.forecast.nombre || this.detalle.forecast.codigoGIS;
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
  
        if (!this.detalle.forecast.cultivos) {
          this.detalle.forecast.cultivos = [];
          return false;
        }
  
        this.onSeleccionCultivo(this.detalle.forecast.cultivos[0]);
  
        let selectedElements = [];
        mapFeature.selectedLayers.forEach(l => {
          let selected = false;
          let filtro = this.input.seccion.seccion_detalle.filter(x => {
              return x.codigoGIS == l.key;
          });
          if (filtro.length > 0) {
              selected = (this.detalle.forecast.codigoGIS == filtro[0].codigoGIS);
              selectedElements.push({
                key: filtro[0].codigoGIS,
                nombre: filtro[0].nombre,
                selected: selected
              });
          }
        });
  
        this.detalle.forecast.selectedFeatures = [];
        if (selectedElements.length > 1) {
          this.detalle.forecast.selectedFeatures = selectedElements;
          this.title = "Región";
        }
        setTimeout(function() {
           $("#ui-id-1").text(me.detalle.nombre);
      }, 200);
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
  
          if (me.detalle.forecast && me.detalle.forecast.cultivos && me.detalle.forecast.cultivos.length > 0) {
              me.detalle.forecast.cultivos.forEach(function(cultivo) {
                const $idElement = "cultivo-tabs-" + cultivo.id;
                if(cultivo.producciones.length>0){
                  generarGraficasLimites($idElement, cultivo);
                }
              });
          }      
  
          $(".panel-tabs").tabs();
  
          hideLoading();
        }, 200);
      },
  
      onCambiarAnio: function(me, anio) {
        me.selTasa = _.clone(me.selTasaBase);
        me.selTasaBase.proyecciones.forEach(x => {
          x.detalle.forecast = x.detalle.forecast.filter(y => y.dato <= anio);
        });
      },
      onSeleccionarPanelFeature: function() {
        const me = this;
        let lista = [];
  
        if (this.selFeature == "0") {
          this.detalle.forecast.selectedFeatures.forEach(x => {
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
            if(data){
              me.detalle = data;
              me.show();
            }
          }
        );
      }
    }
  }