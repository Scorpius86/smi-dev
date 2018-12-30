Vue.component("vue-home-menu", {
  template: `
        
        <div id="menu-sidebar" class="sidebar-menu mt-4">
            <template v-if="mostrarMenu">
                <ul class="bg-light">
                    <li class="sidebar-dropdown">
                        <a href="./admin#/seccion" class="border-2 border-left border-menu-item d-block">
                            <div class="d-inline-flex align-items-center pl-2 bg-white">
                                <i class="mr-2 fas fa-2x fa-map-marker-alt"></i>
                                <span>Secciones</span>
                            </div>
                        </a>
                    </li>
                    <li class="sidebar-dropdown">
                        <a href="./admin#/categoria" class="border-2 border-left border-menu-item d-block">
                            <div class="d-inline-flex align-items-center pl-2 bg-white">
                                <i class="mr-2 fas fa-2x fa-map-marker-alt"></i>
                                <span>Categor&iacute;as</span>
                            </div>
                        </a>
                    </li>
                    <li class="sidebar-dropdown">
                        <a href="./admin#/usuario" class="border-2 border-left border-menu-item d-block">
                            <div class="d-inline-flex align-items-center pl-2 bg-white">
                                <i class="mr-2 fas fa-2x fa-map-marker-alt"></i>
                                <span>Usuarios</span>
                            </div>
                        </a>
                    </li>
                    <li class="sidebar-dropdown">
                        <a href="./admin#/parametro" class="border-2 border-left border-menu-item d-block">
                            <div class="d-inline-flex align-items-center pl-2 bg-white">
                                <i class="mr-2 fas fa-2x fa-map-marker-alt"></i>
                                <span>Parámetros</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </template>
        </div>
        
      `,
  data() {
    return {
      mostrarMenu: false
    };
  },

  created() {
    //this.onMostrarMensaje();
  },
  methods: {
    show: function() {
      this.mostrarMenu = true;
    }
  },
  // props: ['title'],
  $_veeValidate: {
    validator: "new"
  }
});
