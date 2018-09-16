var smiCategoria = Vue.component("Categoria", {
    template: `
  
          <div class="container-fluid">
              <div class="row">
                  <form >
                      <legend>{{title}}</legend>
                      <div class="form-group">
                         <label for="">Nombre</label>                        
                         <input type="text" v-model="filtro.textoBusqueda" class="form-control" required="required">                        
                      </div>                     
                      <button type="button" class="btn btn-primary" v-on:click="onBuscar()">Buscar</button>
                  </form>
              </div>
              
              <br>
              
              <div class="row">
                <table id="categoria-table" class="table" title="">
                    
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                
                    <tr v-for="categoria in categorias">
                        <td>{{categoria.id}}</td>
                        <td>{{categoria.nombre}}</td>                       
                        <td>
                            <a class="border-right pr-3 nav-link d-inline-flex" v-on:click="onEditar(categoria)" title="Editar">
                                <span class="mr-2 fa-stack fa-1x">                                        
                                    <i class="fas fa-edit fa-stack-1x "></i>                                
                                </span>                            
                            </a>
                            <a class="border-right pr-3 nav-link d-inline-flex" v-on:click="onEliminar(categoria)" title="Eliminar">
                                <span class="mr-2 fa-stack fa-1x">                                        
                                    <i class="fas fa-trash-alt fa-stack-1x "></i>                                
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
        title: "Mantenimiento de Categorías",
        categorias: [],
        filtro: {
          textoBusqueda: ""
        }
      };
    },
  
    created() {
      this.loadCategoria(this.filtro);
    },
    methods: {
      loadCategoria: function() {
        this.$http.get("http://smi.alianzacacaoperu.org/api/secciones").then(
          response => {
           
            if (response.body.status == true) {
              this.categorias = response.body.data.filter(
                x => x.idSeccionPadre == null
              );
              this.categorias = _.orderBy(this.categorias, ["nombre"], ["asc"]);

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
        this.loadCategoria(this.filtro);
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
  