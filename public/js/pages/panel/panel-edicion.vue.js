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
                        <template v-if="detalle.multipleSelection">
                            <select class="form-control" name="ddlPanelFeature" v-on:change="onSeleccionarPanelFeature()" v-model="selFeature">
                                <option value="0">Todos</option>
                                <option v-for="feature in detalle.selectedFeatures" v-bind:value="feature.key">{{feature.nombre}}</option>
                            </select>
                            <br> 
                        </template>

                        <ul class="nav nav-pills mb-3" role="tablist">

                            <li v-for="cultivo in detalle.cultivos" class="nav-item">
                                <a class="nav-link active" v-bind:id="'cultivo-' + cultivo.id + '-tab'" data-toggle="pill" v-on:click="onSeleccionCultivo(cultivo)"
                                    v-bind:href="'#cultivo-'+ cultivo.id" role="tab" :aria-controls="'cultivo-' + cultivo.id" aria-selected="true">
                                    {{cultivo.nombre}}
                                </a>
                            </li>
                        
                        </ul>
                        <div class="tab-content">                            

                            <div v-for="cultivo in detalle.cultivos" class="tab-pane fade show active" v-bind:id="'cultivo-' + cultivo.id" role="tabpanel"  >

                                <form>
                                
                                    <div class="form-group">
                                        <label for="ddlTasa">Tasa</label>
                                        <select class="form-control" name="ddlTasa" v-on:change="onSeleccionarTasa(tasa)" v-model="selTasaId">
                                            <option v-for="tasa in cultivo.tasas" v-bind:value="tasa.id">{{tasa.tasa }}</option>
                                        </select>
                                    </div>
                                    <!--
                                    <div>
                                        <span style="font-weight:bold;">{{detalle.label.panel_label_tasa}}&nbsp;&nbsp;:</span>{{cultivo.tasa}}
                                        <span style="font-weight:bold;">{{detalle.label.panel_label_price}}:</span>{{cultivo.precio}}
                                    </div>
                                    -->

                                    <div class="form-group">
                                        <label for="ddlTasa">
                                            <span id="sliderAnioLabel">Año: <span id="sliderAnioVal">2018</span></span>
                                        </label>
                                        &nbsp;&nbsp;
                                        <input id="sliderAnio" type="text" data-slider-min="2005" data-slider-max="2025" data-slider-step="1" data-slider-value="2018" v-model="selRangoAnio" />
                                        
                                    </div>
                                </form>
                                <div class="panel-tabs">
                                    <ul>
                                        <li v-for="proyeccion in selTasa.proyecciones"><a v-bind:href="'#proyeccion-tabs-' + proyeccion.id">{{proyeccion.variable}}</a></li>
                                    </ul>
                                    <div v-for="proyeccion in selTasa.proyecciones" v-bind:id="'proyeccion-tabs-' + proyeccion.id">
                                        <div style="height:300px;">
                                            <canvas class="chart" width="350" height="200"></canvas>
                                        </div>  
                                    </div>
                                </div>            
                            </div>                            
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
      selCultivoId: "",
      selTasa: null,
      selTasaId: 0,
      multipleSelection: false,
      permiteEditar: false,
      selRangoAnio:2018,
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
      $(".panel-tabs").tabs("destroy");
      $(".closePanel-button").off("click");
      $(".closePanel-button").on("click", function() {
        $("#nav-panel").toggle();
      });

      this.title = "";
      this.title = this.detalle.nombre || this.detalle.codigoGIS;

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
      console.log(this.detalle);

      this.onSeleccionCultivo(this.detalle.cultivos[0]);

      this.detalle.multipleSelection = false;

      let selectedElements = [];
      mapFeature.selectedLayers.forEach(l => {
        let filtro = this.input.seccion.seccion_detalle.filter(x => {
          return x.codigoGIS == l.key;
        });

        if (filtro.length > 0) {
          selectedElements.push({
            key: filtro[0].codigoGIS,
            nombre: filtro[0].nombre
          });
        }
      });

      this.detalle.selectedFeatures = [];
      if (selectedElements.length > 1) {
        this.detalle.selectedFeatures = selectedElements;
        this.detalle.multipleSelection = true;
        this.title = "Región";
      }

      setTimeout(function() {
        // if (me.detalle.cultivos && me.detalle.cultivos.length > 0) {
        //   me.detalle.cultivos.forEach(function(cultivo) {
        //     if (cultivo.proyecciones && cultivo.proyecciones.length > 0) {
        //       cultivo.proyecciones.forEach(function(x) {
        //         const $idElement = "proyeccion-tabs-" + x.id;
        //         generarGrafico($idElement, x);
        //       });
        //     }
        //   });
        // }

        $("#sliderAnio").bootstrapSlider();
        $("#sliderAnio").on("slide", function(slideEvt) {
          $("#sliderAnioVal").text(slideEvt.value);
        });

        if (
          me.selTasa &&
          me.selTasa.proyecciones &&
          me.selTasa.proyecciones.length > 0
        ) {
          me.selTasa.proyecciones.forEach(function(x) {
            const $idElement = "proyeccion-tabs-" + x.id;
            generarGrafico($idElement, x);
          });
        }

        $(".panel-tabs").tabs();

        hideLoading();
        $("#nav-panel").show();
      }, 100);
    },
    onSeleccionCultivo: function(cultivo) {
      this.selCultivoId = cultivo.id;
      this.selCultivo = cultivo;
      if (this.selCultivo.tasas != null && this.selCultivo.tasas.length > 0) {
        this.onSeleccionarTasa(this.selCultivo.tasas[0]);
      }
    },
    onSeleccionarTasa: function(tasa) {
      this.selTasaId = tasa.id;
      this.selTasa = tasa;

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
          me.detalle = data;
          me.show();
        }
      );
    }
  },
  // props: ['title'],
  $_veeValidate: {
    validator: "new"
  }
});
