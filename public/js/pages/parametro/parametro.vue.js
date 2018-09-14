var smiParametro = Vue.component("Parametro", {
    template: `
  
          <div class="container">
              <div class="row">
                  <form >
                      <legend>{{title}}</legend>
                     
                      <button type="button" class="btn btn-primary" v-on:click="onBuscar()">Refrescar</button>
                  </form>
              </div>
              
              <br>
              
              <div class="row">
                <table id="parametro-table" class="table" title="">
                    
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Valor</th>
                        <th></th>
                    </tr>
                
                    <tr v-for="parametro in parametros">
                        <td>{{parametro.codigo}}</td>
                        <td>{{parametro.nombre}}</td>
                        <td>{{parametro.valor}}</td>
                        <td>
                            <a class="border-right pr-3 nav-link d-inline-flex" v-on:click="onEditar(parametro)" title="Editar">
                                <span class="mr-2 fa-stack fa-1x">                                        
                                    <i class="fas fa-edit fa-stack-1x "></i>                                
                                </span>                            
                            </a>                           
                        </td>
                        
                    </tr>
                    
                </table>
                
              </div>
              
          </div>
      `,
    data() {
      return {
        title: "Mantenimiento de Parámetros",
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

              //$('#categoria-table').DataTable();

            }
          },
          response => {
            console.log("Error");
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
      onGuardar: function(event) {}
    },
    // props: ['title'],
    $_veeValidate: {
      validator: "new"
    }
  });
  