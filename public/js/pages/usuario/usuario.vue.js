var smiUsuario = Vue.component("Usuario", {
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
                    
                  <b-modal ref="modalEditar" hide-footer v-bind:title="title" >
                      <template v-if="usuarioEditar != null">
  
                      <div class="row">
                          <form class="p-2 w-100">
                              <div class="form-group row">
                                  <div class="col-sm-6">
                                      <label for="">C&oacute;digo</label>
                                      <input type="text" v-model="usuarioEditar.id" readonly="true" class="form-control">
                                  </div>
                                  <div class="col-sm-6">                                    
                                  </div>
                              </div>
                             
                              <div class="form-group row">
                                  <div class="col-sm-12">
                                      <label for="">Nombre</label>
                                      <input type="text" class="form-control" placeholder="Nombre" v-model="usuarioEditar.nombre">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-12">
                                      <label for="">Email</label>
                                      <input type="text" class="form-control" placeholder="Email" v-model="usuarioEditar.email">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-6">
                                      <label for="">Usuario</label>
                                      <input type="text" class="form-control" placeholder="Usuario" v-model="usuarioEditar.login">
                                  </div>
                                  <div class="col-sm-6">
                                    
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-6">
                                    <label for="">Tel&eacute;fono</label>
                                    <input type="text" class="form-control" placeholder="Teléfono" v-model="usuarioEditar.telefono">
                                  </div>
                                  <div class="col-sm-6">
                                    
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-6">
                                    <b-form-checkbox
                                      v-model="usuarioEditar.esAdminBoolean">
                                      Es Administrador
                                    </b-form-checkbox>                                    
                                  </div>
                                  <div class="col-sm-6">
                                    <b-form-checkbox
                                      v-model="usuarioEditar.activoBoolean">
                                      Activo
                                    </b-form-checkbox>
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
                              <th>Nombre</th>
                              <th>Login</th>
                              <th>Email</th>
                              <th>Activo</th>
                              <th class="text-center">Acciones</th>
                          </tr>
                          <tr v-for="usuario in usuarios">
                              <td>{{usuario.id}}</td>
                              <td>{{usuario.nombre}}</td>
                              <td>{{usuario.login}}</td>
                              <td>{{usuario.email}}</td>
                              <td>
                                  <div class="checkbox">
                                      <label>
                                          <input disabled="disabled" type="checkbox" v-model="usuario.activoBoolean">
                                      </label>
                                  </div>                            
                              </td>
                              <td>
                                  <a class="border-right pr-3 nav-link d-inline-flex button-link-smi" v-on:click="onEditar(usuario)" title="Editar">
                                      <span class="mr-2 fa-stack fa-1x">
                                          <i class="fas fa-edit fa-stack-1x "></i>
                                      </span>
                                  </a>
                                  <a class="border-right pr-3 nav-link d-inline-flex button-link-smi" v-on:click="onEliminar(usuario)" title="Eliminar">
                                      <span class="mr-2 fa-stack fa-1x">                                        
                                          <i class="fas fa-trash-alt fa-stack-1x "></i>                                
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
      title: "Mantenimiento de Usuario",
      usuarioEditar: null,
      usuarioNuevo: null,
      mensaje: {
        title: "",
        text: ""
      },
      mensajeValidacion: {
        visible: false,
        text: ""
      },
      filtro: {
        textoBusqueda: ""
      },
      usuarios: []
    };
  },

  created() {
    this.loadUsuario(this.filtro);
  },
  methods: {
    loadUsuario: function(filtro) {
      this.$http.get(UrlAPI.base + "/usuarios").then(
        response => {
          if (response.body.status == true) {
            console.log(response);
            this.usuarios = response.body.data;
            this.usuarios.forEach(x => {
              x.activoBoolean = x.activo == 1 ? true : false;
              x.esAdminBoolean = x.esAdmin == 1 ? true : false;
            });
          }
        },
        response => {
          this.onMostrarMensajeError();
        }
      );
    },

    onBuscar: function() {
      this.loadUsuario(this.filtro);
    },
    onEliminar: function(usuario) {
      this.usuarioEditar = usuario;
      this.mensaje = {};
      this.mensaje.title = "Confirmación";
      this.mensaje.text =
        'Va ha dar de baja al usuario "' +
        usuario.nombre +
        '". Desea continuar ?';
      this.onMostrarConfirmacion();
    },
    onAgregar: function(event) {
      let usuario = {};
      usuario.nombre = null;
      usuario.email = null;
      usuario.login = null;
      //usuario.password = null;
      //usuario.passwordConfirmar = null;
      usuario.idPerfil = null;
      usuario.telefono = null;
      usuario.esAdmin = 0;
      usuario.esAdminBoolean = false;
      usuario.activo = 1;
      usuario.activoBoolean = false;

      this.usuarioEditar = usuario;
      this.$refs.modalEditar.show();
    },
    onEditar: function(usuario) {
      this.usuarioEditar = usuario;

      this.mensajeValidacion.visible = false;
      this.$refs.modalEditar.show();
    },

    onValidarGuardar: function() {
      if (
        this.usuarioEditar.nombre == null ||
        this.usuarioEditar.nombre.length == 0
      ) {
        this.mensajeValidacion.text = "Debe ingresar el nombre";
        this.mensajeValidacion.visible = true;
        return false;
      }

      if (
        this.usuarioEditar.email == null ||
        this.usuarioEditar.email.length == 0
      ) {
        this.mensajeValidacion.text = "Debe ingresar el email";
        this.mensajeValidacion.visible = true;
        return false;
      }

      if (
        this.usuarioEditar.login == null ||
        this.usuarioEditar.login.length == 0
      ) {
        this.mensajeValidacion.text = "Debe ingresar el usuario";
        this.mensajeValidacion.visible = true;
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

      this.usuarioEditar.activo = this.usuarioEditar.activoBoolean ? 1 : 0;
      this.usuarioEditar.esAdmin = this.usuarioEditar.esAdminBoolean ? 1 : 0;

      this.$http.post(UrlAPI.base + "/usuarios", this.usuarioEditar).then(
        response => {
          if (response.body.status == true) {
            this.mensaje.title = "Info";
            this.mensaje.text = "Se guardó la sección correctamente.";
            this.onMostrarMensaje();

            this.loadUsuario(this.filtro);
          }
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
        .delete(UrlAPI.base + "/usuarios/" + this.usuarioEditar.id)
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
      this.usuarioEditar = null;
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
