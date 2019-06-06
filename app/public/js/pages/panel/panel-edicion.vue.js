import PanelConteoMarcadores from './panel-conteo-marcadores.vue.js';
import PanelTipoGrafico from './panel-tipo-grafico.vue.js';
import PanelTipoEdicion from './panel-tipo-edicion.vue.js';
import GeometryLoader from '../../shared/geometry-loader.js';

export default {
    name: "vue-panel-edicion",
    template: `
        
        <div class="container-fluid">
            <template>                
                <nav class="navbar-expand-md navbar-light py-0s">
                    <div class="navbar-nav">
                        <div class="d-flex justify-content-between">
                            <div class="nav-item" id="btnClosePanel">
                                <a class="border-right px-3 nav-link closePanel-button" v-on:click="btnCerrarClick" >
                                    <i class="fas fa-2x fa-times"></i>
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
                    <vue-panel-tipo-grafico :id="idChildrenComponents.panelTipoGrafico"></vue-panel-tipo-grafico>
                    <vue-panel-tipo-edicion :id="idChildrenComponents.panelTipoEdicion"></vue-panel-tipo-edicion>
                    <vue-panel-conteo-marcadores :id="idChildrenComponents.panelConteoMarcadores"></vue-panel-conteo-marcadores>
                   
                    <div>
                        <br>
                        <button id="btnEditar" style="display:none;" type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal" 
                            data-whatever="@mdo">{{detalle.label.button_edit}}
                        </button>
                    </div>
                </div>                
            </template>
        </div>
        
      `,
    data() {
        return {
            title: "",
            codigoSeccion: '',
            input: {},
            labels: {},
            detalle: {},
            selFeature: "0",
            mapFeature: { selectedLayers: [] },
            selCultivoId: "",
            selTasa: null,
            selTasaBase: null,
            selTasaId: 0,
            permiteEditar: false,
            selRangoAnio: 2018,
            selRangoTasa: 85,
            tipo: "edicion", //grafico,
            tipoId: "",
            geometryLoader: GeometryLoader,
            center: null,
            idChildrenComponents: {
                panelTipoGrafico: "panelTipoGrafico",
                panelTipoEdicion: "panelTipoEdicion",
                panelConteoMarcadores: "panelConteoMarcadores"
            }
        };
    },

    created() {
        this.detalle.detalle = {};
        this.detalle.label = {};
        this.geometryLoader = new GeometryLoader();
        let language = getLanguage();
        if (language == null || language.length == 0) {
            language = "es";
        }
        this.labels = messages[language].label;
    },
    methods: {
        RemoveLayers: function (e) {
            this.codigoSeccion = CONSTANTES.SECCIONES.CONTEO_MARCADORES;
            let panel = this.assignPanel();
            panel.RemoveLayers(e);
        },
        DrawEventCREATED: function (e) {
            mapFeature.removeAllSelection();
            this.codigoSeccion = CONSTANTES.SECCIONES.CONTEO_MARCADORES;
            let panel = this.assignPanel();
            panel.DrawEventCREATED(e);
        },
        btnCerrarClick: function () {
            if (this.tipo !== 'grafico') {
                map.eachLayer(function (layer) {
                    if (layer instanceof L.Circle || layer instanceof L.Polygon) {
                        if(layer.feature === undefined || layer.feature === null){
                            map.removeLayer(layer); 
                        }
                        
                    }
                });
            } else {
                mapFeature.removeAllSelection();
            }
        },
        assignPanel: function () {
            let tipoId;
            if (this.tipo == 'grafico') { tipoId = 'panelTipoGrafico'; }
            if (this.tipo == 'edicion') { tipoId = 'panelTipoEdicion'; }
            if (this.codigoSeccion == CONSTANTES.SECCIONES.CONTEO_MARCADORES) {
                tipoId = 'panelConteoMarcadores';
            }
            this.tipoId = tipoId;
            const panel = this.$children.find(c => c.id == tipoId);
            this.setDataChild(panel)
            return panel;
        },
        hide: function () {
            $("#nav-panel").hide();
        },
        show: function () {
            this.hideChildComponents();
            $("#btnClosePanel").off("click");
            $("#btnClosePanel").on("click", function () {
                $("#nav-panel").hide();
            });
            let panel = this.assignPanel();
            panel.show();
            $("#nav-panel").show();
            this.codigoSeccion = '';
        },
        showModal: function () {
            $("#btnEditar").click();

        },
        clearAllSections: function () {
            const customLayer = this.geometryLoader.getCustomLayer();

            this.geometryLoader.removeMarkerAll();

            if (customLayer && customLayer.layer) {
                this.geometryLoader.removeCustomLayer();
                $("#nav-panel").hide();

            }
        },
        setDataChild(child) {
            for (var key in this.$data) {
                if (key != 'idChildrenComponents') {
                    if (hasOwnProperty.call(child, key)) {
                        child[key] = this.$data[key];
                    }
                }
            }
            child.parentPanel = this;
        },
        hideChildComponents() {
            this.$children.forEach(child => {
                child.display = false;
            });
        }
    },
    components: {
        'vue-panel-conteo-marcadores': PanelConteoMarcadores,
        'vue-panel-tipo-grafico': PanelTipoGrafico,
        'vue-panel-tipo-edicion': PanelTipoEdicion
    },
    // props: ['title'],
    $_veeValidate: {
        validator: "new"
    }
}
