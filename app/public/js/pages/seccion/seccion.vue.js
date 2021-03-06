var smiSeccion = Vue.component("Seccion", {
  template: `
        <div class="container-fluid">
            <div class="row">
                <b-modal ref="modalMensaje" hide-footer v-bind:title="mensaje.title">
                    <div class="d-block text-center">
                        <h5>{{mensaje.text}}</h5>
                    </div>
                    <b-btn class="mt-3" block @click="onOcultarMensaje">Aceptar</b-btn>
                </b-modal>
                <b-modal ref="modalConfirmacion" hide-footer v-bind:title="mensaje.title">
                    <div class="d-block text-center">
                        <h5>{{mensaje.text}}</h5>
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
                                        <input type="file" class="custom-file-input" ref="file" v-on:change="onFileUpload()">
                                        <label class="custom-file-label">
                                            <template v-if="fileUpload.file == null">
                                                Seleccionar archivo .geojson
                                            </template>
                                            <template v-else>
                                                {{fileUpload.name}}
                                            </template>
                                        </label>
                                    </div>
                                </div>                               
                            </div>                           
                        </form>
                    </div>
                    <div class="text-right">
                        <b-btn class="mt-3" variant="primary" @click="onUploadAceptar">Aceptar</b-btn>
                        <b-btn class="mt-3" @click="onUploadCancelar">Cancelar</b-btn>
                    </div>
                </b-modal>

                <b-modal ref="modalEditar" hide-footer v-bind:title="title" >
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
                                    <label for="">Nombre Idioma 2</label>
                                    <input type="text" class="form-control" placeholder="Nombre" v-model="seccionEditar.nombreIdioma">
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
                                        <input type="file" class="custom-file-input" accept="image/*" ref="fileLogo" v-on:change="onLogoUpload()">
                                        <label class="custom-file-label">
                                            <template v-if="logoUpload.file == null">
                                                Seleccionar logo
                                            </template>
                                            <template v-else>
                                                {{logoUpload.name}}
                                            </template>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-6">     
                                    <template v-if="logoUpload.valueBase64 != null">
                                        <b-img v-bind:src="logoUpload.valueBase64" width="64px" fluid alt="Fluid image" />
                                    </template>                                    
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
                    <b-alert variant="danger"
                            dismissible
                            fade
                            :show="mensajeValidacion.visible"
                            @dismissed="mensajeValidacion.visible=false">
                            {{mensajeValidacion.text}}
                    </b-alert>
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
                       <input type="text" v-on:blur="onBuscar()" v-model="filtro.textoBusqueda" class="form-control" required="required">                        
                    </div>
                    <div class="form-group">
                        <label for="">Categor&iacute;a</label>                        
                        <select v-on:change="onChangeCategoria" v-model="filtro.categoriaSeleccionada" class="form-control" required="required">
                            <option value="0">- Todas -</option>
                            <option v-for="categoria in categorias" v-bind:value="categoria.id">{{categoria.nombre}}</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary" v-on:click="onBuscar()">Buscar</button>
                    <button type="button" class="btn btn-primary" v-on:click="onAgregar()">Nuevo</button>
                </form>
            </div>
            
            <br>
            
            <div class="row">
                <div class="col-12">
                    <table class="table table-responsive w-100">
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
            
        </div>
    `,
  data() {
    return {
      title: "Mantenimiento de Secciones",
      categorias: [],
      seccionEditar: null,
      seccionNuevo: null,
      fileUpload: {
        file: null,
        name: ""
      },
      logoUpload: {
        file: null,
        name: "",
        valueBase64: null,
        valid: false
      },
      mensaje: {
        title: "",
        text: ""
      },
      mensajeValidacion: {
        visible: false,
        text: ""
      },
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
      this.$http.get(UrlAPI.base + "/secciones").then(
        response => {
          if (response.body.status == true) {
            this.categorias = response.body.data.filter(
              x => x.idSeccionPadre == null
            );
            this.categorias = _.orderBy(this.categorias, ["nombre"], ["asc"]);
          }
        },
        response => {
          this.onMostrarMensajeError();
        }
      );
    },
    loadSeccion: function(filtro) {
      this.$http.get(UrlAPI.base + "/secciones").then(
        response => {
          if (response.body.status == true) {
            this.secciones = response.body.data.filter(
              x => x.idSeccionPadre != null
            );

            if (filtro.textoBusqueda && filtro.textoBusqueda.length > 0) {
              this.secciones = this.secciones.filter(
                x =>
                  _.toUpper(x.nombre).indexOf(
                    _.toUpper(filtro.textoBusqueda)
                  ) >= 0
              );
            }

            if (
              filtro.categoriaSeleccionada &&
              filtro.categoriaSeleccionada != 0
            ) {
              this.secciones = this.secciones.filter(
                x => x.idSeccionPadre == filtro.categoriaSeleccionada
              );
            }

            this.secciones.forEach(element => {
              element.activoBoolean = false;
              if (element.activo == 1) {
                element.activoBoolean = true;
              }
            });

            this.secciones = _.orderBy(this.secciones, ["nombre"], ["asc"]);
          }
        },
        response => {
          this.onMostrarMensajeError();
        }
      );
    },
    onLogoUpload: function() {
      const validFileExtensions = [".jpg", ".jpeg", ".png"];
      const TAMANIO_MAXIMO_LOGO = 200 * 1024;

      if (this.$refs.fileLogo != null && this.$refs.fileLogo.files.length > 0) {
        if (this.$refs.fileLogo.files[0].size > TAMANIO_MAXIMO_LOGO) {
          this.mensajeValidacion.text =
            "Tamaño no permitido. El tamaño máximo es de 250kb.";
          this.mensajeValidacion.visible = true;
          this.logoUpload.file = null;
          this.logoUpload.name = "";
          return;
        }

        this.logoUpload.file = this.$refs.fileLogo.files[0];
        this.logoUpload.name = this.logoUpload.file.name;
        this.readFile(this.logoUpload.file);
      } else {
        this.logoUpload.file = null;
        this.logoUpload.name = "";
        this.logoUpload.valueBase64 = null;
      }
      if (!this.validExtension(this.logoUpload.name, validFileExtensions)) {
        this.mensajeValidacion.text =
          "Formato de imagen no válido. Los formatos válidos son: .jpg, .jpeg, .png";
        this.mensajeValidacion.visible = true;
        this.logoUpload.file = null;
        this.logoUpload.name = "";
      }
    },

    readFile: function(file) {
      const reader = new FileReader();
      const me = this;
      reader.onloadend = function(e) {
        me.logoUpload.valueBase64 = reader.result;
      };

      reader.onerror = function() {
        me.mensajeValidacion.text = "Formato de archivo no válido.";
        me.mensajeValidacion.visible = true;
      };

      reader.readAsDataURL(file);
    },

    validExtension: function(fileName, exts) {
      return true;
      //return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    },

    onFileUpload: function() {
      const validFileExtensions = [".geojson"];

      if (this.$refs.file != null && this.$refs.file.files.length > 0) {
        this.fileUpload.file = this.$refs.file.files[0];
        this.fileUpload.name = this.fileUpload.file.name;
      } else {
        this.fileUpload.file = null;
        this.fileUpload.name = "";
      }
      if (!this.validExtension(this.fileUpload.name, validFileExtensions)) {
        this.mensajeValidacion.text =
          "Formato de archivo no válido. Se aceptan solo formatos .geojson";
        this.mensajeValidacion.visible = true;

        this.fileUpload.file = null;
        this.fileUpload.name = "";
      }
    },
    onChangeCategoria: function() {
      this.loadSeccion(this.filtro);
    },
    onBuscar: function() {
      this.loadSeccion(this.filtro);
    },
    onEliminar: function(seccion) {
      this.seccionEditar = seccion;
      this.mensaje = {};
      this.mensaje.title = "Confirmación";
      this.mensaje.text =
        'Va ha eliminar la sección "' + seccion.nombre + '". Desea continuar ?';
      this.onMostrarConfirmacion();
    },
    onAgregar: function(event) {
      this.mensajeValidacion.visible = false;
      this.seccionEditar = null;
      this.fileUpload.file = null;
      this.fileUpload.name = null;
      this.logoUpload.file = null;
      this.logoUpload.name = null;
      this.logoUpload.valueBase64 = null;

      let seccion = {};
      seccion.id = 0;
      seccion.activo = 1;
      seccion.activoBoolean = true;
      seccion.color = "#ffffff";
      seccion.idTipoGeoData = 0;
      seccion.idSeccionPadre = 0;
      seccion.nombre = null;
      seccion.codigoGIS = null;
      seccion.logo = null;

      this.seccionEditar = seccion;
      this.$refs.modalEditar.show();
    },
    onEditar: function(seccion) {
      if (this.$refs != null && this.$refs.fileLogo != null) {
        this.$refs.fileLogo.type = "text";
        this.$refs.fileLogo.type = "file";
      }

      this.logoUpload.valid = false;
      this.logoUpload.file = null;
      this.logoUpload.name = null;
      this.logoUpload.valueBase64 = null;
      this.seccionEditar = _.cloneDeep(seccion);

      if (seccion.logo != null) {
        this.logoUpload.valid = true;
        this.logoUpload.valueBase64 = seccion.logo;
      }
      this.mensajeValidacion.visible = false;
      this.$refs.modalEditar.show();

      console.log(this.logoUpload);
    },

    onUpload: function(seccion) {
      this.fileUpload.file = null;
      this.fileUpload.name = "";
      this.seccionEditar = seccion;
      this.$refs.modalUpload.show();
    },
    onUploadAceptar: function() {
      const me = this;

      const TAMANIO_MAXIMO_GEOJSON = 10 * 1024 * 1024; //10 mb

      if (this.fileUpload.file.size > TAMANIO_MAXIMO_GEOJSON) {
        me.mensaje.title = "Error";
        me.mensaje.text =
          "El tamaño del archivo supera el máximo permitido : 10 mb";
        me.onMostrarMensaje();
        return false;
      }

      if (this.fileUpload.file.name.indexOf(".geojson") < 0) {
        me.mensaje.title = "Error";
        me.mensaje.text = "El tipo de archivo seleccionado no es válido.";
        me.onMostrarMensaje();
        return false;
      }

      //Validar tamaño y extensión de archivo geojson
      console.log(this.fileUpload.file);

      let formData = new FormData();
      formData.append("file", this.fileUpload.file);

      axios
        .post(
          UrlAPI.base + "/secciones/" + this.seccionEditar.id + "/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(function() {
          me.mensaje.title = "Información";
          me.mensaje.text = "Se cargo el archivo correctamente.";
          me.onMostrarMensaje();
          me.$refs.modalUpload.hide();
          me.seccionEditar = null;
        })
        .catch(function(error) {
          me.mensaje.title = "Error";
          me.mensaje.text =
            "Ha ocurrido un error un error no controlado. Contacte al administrador.";
          me.onMostrarMensaje();
        });
    },
    onUploadCancelar: function() {
      this.seccionEditar = null;
      this.$refs.modalUpload.hide();
    },

    onValidarGuardar: function() {
      if (
        this.seccionEditar.nombre == null ||
        this.seccionEditar.nombre.length == 0
      ) {
        //this.mensaje.title='Datos incompletos !!';
        this.mensajeValidacion.text = "Debe ingresar el nombre";
        this.mensajeValidacion.visible = true;
        return false;
      }
      if (
        this.seccionEditar.nombreIdioma == null ||
        this.seccionEditar.nombreIdioma.length == 0
      ) {
        //this.mensaje.title='Datos incompletos !!';
        this.mensajeValidacion.text = "Debe ingresar el nombre";
        this.mensajeValidacion.visible = true;
        return false;
      }
      if (
        this.seccionEditar.idSeccionPadre == null ||
        this.seccionEditar.idSeccionPadre == 0
      ) {
        //this.mensaje.title='Datos incompletos !!';
        this.mensajeValidacion.text = "Debe seleccionar una categoría";
        this.mensajeValidacion.visible = true;
        //this.onMostrarMensaje();
        return false;
      }

      this.mensajeValidacion.visible = false;
      return true;
    },

    onAceptarEditar: function() {
      if (!this.onValidarGuardar()) {
        console.log("no valido");
        return false;
      }

      this.seccionEditar.menuAccion = 1;
      this.seccionEditar.menuCategoria = 0;
      if (this.logoUpload.file != null) {
        this.seccionEditar.logo = this.logoUpload.valueBase64;
      }
      this.seccionEditar.idTipoAccion = 1;
      this.seccionEditar.activo = this.seccionEditar.activoBoolean ? 1 : 0;

      console.log(this.seccionEditar);

      this.$http.post(UrlAPI.base + "/secciones", this.seccionEditar).then(
        response => {
          if (response.body.status == true) {
            this.mensaje.title = "Info";
            this.mensaje.text = "Se guardó la sección correctamente.";
            this.onMostrarMensaje();
          }

          this.loadSeccion(this.filtro);
        },
        response => {
          console.log(response);
          this.onMostrarMensajeError();
        }
      );

      this.$refs.modalEditar.hide();
    },
    onOcultarEditar: function() {
      this.$refs.modalEditar.hide();
    },
    onMostrarMensaje: function() {
      this.$refs.modalMensaje.show();
    },
    onOcultarMensaje: function() {
      this.$refs.modalMensaje.hide();
    },
    onMostrarConfirmacion: function() {
      this.$refs.modalConfirmacion.show();
    },
    onOcultarConfirmacion: function() {
      this.$refs.modalConfirmacion.hide();
    },
    onAceptarConfirmacion: function() {
      //Eliminar
      this.$http
        .delete(UrlAPI.base + "/secciones/" + this.seccionEditar.id)
        .then(
          response => {
            if (response.body.status == true) {
              this.mensaje.title = "Info";
              this.mensaje.text = "Se eliminó la sección correctamente.";
              this.onMostrarMensaje();
            }
            this.onBuscar();
          },
          response => {
            console.log(response);
            this.onMostrarMensajeError();
          }
        );
      this.$refs.modalConfirmacion.hide();
      this.seccionEditar = null;
    },
    onMostrarMensajeError: function() {
      this.mensaje.title = "OOPS !!";
      this.mensaje.text = "Ha ocurrido un error. Consulte al administrador";
      this.onMostrarMensaje();
    }
  },
  // props: ['title'],
  $_veeValidate: {
    validator: "new"
  }
});
