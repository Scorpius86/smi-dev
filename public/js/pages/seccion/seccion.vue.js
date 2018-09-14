var smiSeccion = Vue.component("Seccion", {
  template: `

        <div class="container">
            <div class="row">
                <form >
                    <legend>{{title}}</legend>
                    <div class="form-group">
                       <label for="">Nombre</label>                        
                       <input type="text" v-model="filtro.textoBusqueda" class="form-control" required="required">                        
                    </div>
                    <div class="form-group">
                        <label for="">Categor&iacute;a</label>                        
                        <select v-model="filtro.categoriaSeleccionada" class="form-control" required="required">
                            <option value="0">- Todas -</option>
                            <option v-for="categoria in categorias" v-bind:value="categoria.id">{{categoria.nombre}}</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary" v-on:click="onBuscar()">Buscar</button>
                </form>
            </div>
            
            <br>
            
            <div class="row">
                <table class="table">
                    <tr>
                        <th>Codigo</th>
                        <th>CodigoGIS</th>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                    <tr v-for="seccion in secciones">
                        <td>{{seccion.id}}</td>
                        <td>{{seccion.codigoGIS}}</td>
                        <td>{{seccion.nombre}}</td>
                        <td>
                            <a class="border-right pr-3 nav-link d-inline-flex" v-on:click="onEditar(seccion)" title="Editar">
                                <span class="mr-2 fa-stack fa-1x">                                        
                                    <i class="fas fa-edit fa-stack-1x "></i>                                
                                </span>                            
                            </a>
                            <a class="border-right pr-3 nav-link d-inline-flex" v-on:click="onEliminar(secion)" title="Eliminar">
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
      title: "Mantenimiento de Secciones",
      categorias: [],
      filtro: {
        categoriaSeleccionada: 0,
        textoBusqueda: ""
      },
      secciones: []
    };
  },

  created() {
    this.loadCategoria();
    this.loadSeccion(this.categorias);
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
          }
        },
        response => {
          console.log("Error");
        }
      );
    },
    loadSeccion: function(filtro) {
      this.$http.get("http://smi.alianzacacaoperu.org/api/secciones").then(
        response => {
            console.log(response);
            if (response.body.status==true) {

                if(filtro.textoBusqueda && filtro.textoBusqueda.length > 0){
                    this.secciones= response.body.data.filter(x=> x.nombre.indexOf(filtro.textoBusqueda)>=0);
                }else{
                    this.secciones = response.body.data;
                }

                if(filtro.categoriaSeleccionada  && filtro.categoriaSeleccionada != 0){
                    this.secciones = this.secciones.filter(x=> x.idSeccionPadre==filtro.categoriaSeleccionada);
                }

                this.secciones = _.orderBy(this.secciones, ['nombre'],['asc']);
            }
        },
        response => {
          console.log("Error");
        }
      );
    },

    onBuscar: function() {
      console.log(this.filtro);
      this.loadSeccion(this.filtro);
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
