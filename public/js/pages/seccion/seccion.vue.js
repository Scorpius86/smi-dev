var smiSeccion = Vue.component("Seccion", {
  template: `
        <div class="container-fluid">
            <div class="row">
                <b-modal ref="modalMensaje" hide-footer title="Información">
                    <div class="d-block text-center">
                        <h5>{{mensajeAlerta}}</h5>
                    </div>
                    <b-btn class="mt-3" block @click="onOcultarMensaje">Aceptar</b-btn>
                </b-modal>
                <b-modal ref="modalConfirmacion" hide-footer title="Confirmación">
                    <div class="d-block text-center">
                        <h5>{{mensajeAlerta}}</h5>
                    </div>
                    <div class="text-right">
                        <b-btn class="mt-3" variant="primary" @click="onAceptarConfirmacion">Aceptar</b-btn>
                        <b-btn class="mt-3" @click="onOcultarConfirmacion">Cancelar</b-btn>
                    </div>
                </b-modal>
                <b-modal ref="modalUpload" hide-footer title="Upload GeoJson">
                    <div>
                        <form class="p-2 w-100">
                            <div class="form-group row">
                                <div class="col-sm-12">                                    
                                    <label for="">Archivo GeoJson</label>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input">
                                        <label class="custom-file-label">Seleccionar archivo .geojson</label>
                                    </div>
                                </div>                               
                            </div>
                            <div class="form-group row">
                               
                            </div>
                        </form>
                    </div>
                    <div class="text-right">
                        <b-btn class="mt-3" variant="primary" @click="onUploadAceptar">Aceptar</b-btn>
                        <b-btn class="mt-3" @click="onUploadCancelar">Cancelar</b-btn>
                    </div>
                </b-modal>

                <b-modal ref="modalEditar" hide-footer title="Editar Sección" >
                    <template v-if="seccionEditar != null">

                    <div class="row">
                        <form class="p-2 w-100">
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="">C&oacute;digo</label>
                                    <input type="text" v-model="seccionEditar.id" readonly="true" class="form-control">
                                </div>
                                <div class="col-sm-6">                                    
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="">C&oacute;digo GIS</label>
                                    <input type="text" class="form-control" placeholder="Código GIS" v-model="seccionEditar.codigoGIS" >
                                </div>
                                <div class="col-sm-3">
                                    <label for="">Color</label>
                                    <input type="color" class="form-control" placeholder="Color" v-model="seccionEditar.color">
                                </div>
                                <div class="col-sm-3">
                                    <label for="">&nbsp;</label>
                                    <input type="text" class="form-control" placeholder="Color" v-model="seccionEditar.color">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <label for="">Nombre</label>
                                    <input type="text" class="form-control" placeholder="Nombre" v-model="seccionEditar.nombre">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <label for="">Descripcion</label>
                                    <input type="text" class="form-control" placeholder="Nombre" v-model="seccionEditar.descripcion">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <label for="">Categor&iacute;a</label>
                                    <select class="form-control" v-model="seccionEditar.idSeccionPadre" >
                                        <option v-for="categoria in categorias" v-bind:value="categoria.id">{{categoria.nombre}}</option>
                                        
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    <label for="">Tipo GeoData</label>
                                    <select class="form-control" v-model="seccionEditar.idTipoGeoData">
                                        <option value="0">Ninguno</option>
                                        <option value="1">Puntos</option>
                                        <option value="2">Pol&iacute;gonos</option>
                                        <option value="3">L&iacute;neas</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">                                    
                                    <label for="">Logo</label>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input">
                                        <label class="custom-file-label">Seleccionar imagen.png</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <img src="..." class="rounded mx-auto d-block" alt="...">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <b-form-checkbox
                                        v-model="seccionEditar.activoBoolean">
                                        Activo
                                    </b-form-checkbox>
                                </div>
                                <div class="col-sm-6">
                                    
                                </div>
                            </div>
                            
                        </form>
                   
                    </div>
                    <div class="text-right">
                        <b-btn class="mt-3" variant="primary" @click="onAceptarEditar">Aceptar</b-btn>
                        <b-btn class="mt-3" @click="onOcultarEditar">Cancelar</b-btn>
                    </div>

                    </template>

                </b-modal>               
            </div>
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
                <table class="table table-responsive">
                    <tr>
                        <th>Codigo</th>
                        <th>CodigoGIS</th>
                        <th>Nombre</th>
                        <th>GeoJSON</th>
                        <th>Activo</th>
                        <th class="text-center">Acciones</th>
                    </tr>
                    <tr v-for="seccion in secciones">
                        <td>{{seccion.id}}</td>
                        <td>{{seccion.codigoGIS}}</td>
                        <td>{{seccion.nombre}}</td>
                        <td>{{seccion.geoJsonFile}}</td>
                        <td>
                            <div class="checkbox">
                                <label>
                                    <input disabled="disabled" type="checkbox" v-model="seccion.activoBoolean">
                                </label>
                            </div>                            
                        </td>
                        <td>
                            <a class="border-right pr-3 nav-link d-inline-flex button-link-smi" v-on:click="onEditar(seccion)" title="Editar">
                                <span class="mr-2 fa-stack fa-1x">
                                    <i class="fas fa-edit fa-stack-1x "></i>
                                </span>
                            </a>
                            <a class="border-right pr-3 nav-link d-inline-flex button-link-smi" v-on:click="onEliminar(seccion)" title="Eliminar">
                                <span class="mr-2 fa-stack fa-1x">                                        
                                    <i class="fas fa-trash-alt fa-stack-1x "></i>                                
                                </span>                            
                            </a>
                            <a class="pr-3 nav-link d-inline-flex button-link-smi" v-on:click="onUpload(seccion)" title="Upload">
                                <span class="mr-2 fa-stack fa-1x">
                                    <i class="fas fa-upload fa-stack-1x "></i>
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
      seccionEditar: null,
      seccionNuevo: null,
      mensajeAlerta: '',
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

                this.secciones.forEach(element => {
                    element.activoBoolean=false;
                    if(element.activo==1){
                        element.activoBoolean=true;
                    }
                });

                console.log(this.secciones);

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
    onEliminar: function(seccion) {
        this.mensajeAlerta='Va ha eliminar la sección "' + seccion.nombre + '". Desea continuar ?';
        this.onMostrarConfirmacion();
    },
    onAgregar: function(event) {},
    onEditar: function(seccion) {
        this.seccionEditar= seccion;     
        this.$refs.modalEditar.show();
    },
    onGuardar: function(event) {},
    onUpload: function(event) {
        this.$refs.modalUpload.show();
    },
    onUploadAceptar:function(){
        this.$refs.modalUpload.hide();
    },
    onUploadCancelar: function(){
        this.$refs.modalUpload.hide();
    },
    onAceptarEditar: function(){
        console.log(seccionEditar);
        this.seccionEditar=null;
        this.$refs.modalEditar.hide();
    },
    onOcultarEditar: function(){
        
        this.$refs.modalEditar.hide();
    },
    onMostrarMensaje: function(){
        this.$refs.modalMensaje.show();
    },
    onOcultarMensaje: function(){
        this.$refs.modalMensaje.hide();
    },
    onMostrarConfirmacion: function(){
        this.$refs.modalConfirmacion.show();
    },
    onOcultarConfirmacion: function(){
        this.$refs.modalConfirmacion.hide();
    },
    onAceptarConfirmacion: function(){
        this.$refs.modalConfirmacion.hide();
    }
   
  },
  // props: ['title'],
  $_veeValidate: {
    validator: "new"
  }
});
