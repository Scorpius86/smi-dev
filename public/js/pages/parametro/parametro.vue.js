var smiParametro = Vue.component("Parametro", {
  template: `
          <div class="container-fluid">
              <div class="row">
                  <form >
                      <legend>{{title}}</legend>
                     
                      <button type="button" class="btn btn-primary" v-on:click="onBuscar()">Refrescar</button>
                      <button type="button" class="btn btn-primary" v-on:click="onGuardar()">Guardar</button>
                  </form>
              </div>
              
              <br>
              
              <div class="row">
                <table id="parametro-table" class="table responsive" title="">
                    
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Valor</th>                        
                    </tr>
                
                    <tr v-for="parametro in parametros">
                        <td>{{parametro.codigo}}</td>
                        <td>{{parametro.nombre}}</td>
                        <td style="background-color: #CCEBF3;">
                            <template v-if="parametro.codigo==parametro_ACTIVAR_AUTENTICACION_PUBLICA">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" v-model="parametro.valorBool">
                                    </label>
                                </div>
                            </template>
                            <template v-else>
                                {{parametro.valor}}
                            </template>
                        </td>
                      
                        
                    </tr>
                    
                </table>
                
              </div>
              
          </div>
      `,
  data() {
    return {
      title: "Mantenimiento de Parámetros",
      parametro_ACTIVAR_AUTENTICACION_PUBLICA: "ACTIVAR_AUTENTICACION_PUBLICA",
      parametros: [],
      filtro: {
        textoBusqueda: ""
      }
    };
  },

  created() {
    this.load(this.filtro);
  },
  methods: {
    load: function() {
      this.$http.get("http://smi.alianzacacaoperu.org/api/parametros").then(
        response => {
          if (response.body.status == true) {
            this.parametros = response.body.data.filter(
              x => x.idSeccionPadre == null
            );
            this.parametros = _.orderBy(this.parametros, ["nombre"], ["asc"]);

            this.parametros.forEach(element => {
              element.valorBool = element.valor == 1;
            });

            //$('#categoria-table').DataTable();
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    onBuscar: function() {
      console.log(this.filtro);
      this.load(this.filtro);
    },
    onEliminar: function(seccion) {},
    onAgregar: function(event) {},
    onEditar: function(seccion) {},
    onGuardar: function(event) {
      var param = {};
      
      this.parametros.forEach(element => {
        if (element.codigo == this.parametro_ACTIVAR_AUTENTICACION_PUBLICA) {
          element.valor = 0;
          if (element.valorBool) {
            element.valor = 1;
          }
        }
      });

      param.parametros = this.parametros;

      this.$http.post("http://smi.alianzacacaoperu.org/api/parametros", param).then(
        response => {
          if (response.body.status == true) {
            alert("guardado");
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  // props: ['title'],
  $_veeValidate: {
    validator: "new"
  }
});
