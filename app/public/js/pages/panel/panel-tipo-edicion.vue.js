export default {
    name: "vue-panel-tipo-edicion",
    template: `
      <div v-if="display">
        <template v-if="tipo=='edicion'">                            
          <table class="table table-sm">                            
              <tr>
                  <th>{{detalle.label.panel_label_name}}</th>
                  <td>{{seccionDetalle.nombre}}-{{seccionDetalle.abreviatura}}</td>
              </tr>
              
              <tr v-for="atributo in seccionDetalle.atributos">
                  <td>{{atributo.nombre}}</td>
                  <td>{{atributo.valor}}</td>
              </tr>

          </table>
        </template>
      </div>
    `,
    data() {
      return {
        display:false,
        input: {},
        detalle: {},
        seccionDetalle:{},
        selFeature: "0",
        mapFeature:{selectedLayers:[]},
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
        this.seccionDetalle = this.detalle.detalles.find(d=>d.codigoGIS == this.detalle.codigoGISPrincipal)||{};
        this.display = true;
  
        showLoading();
  
        this.title = "";
        this.title = this.seccionDetalle.nombre || this.seccionDetalle.codigoGIS;
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
        this.seccionDetalle.label = messages[language].label;
  
        if (!this.seccionDetalle.cultivo) {
          this.seccionDetalle.cultivos = [];
          return false;
        }  
      }
    }
  }