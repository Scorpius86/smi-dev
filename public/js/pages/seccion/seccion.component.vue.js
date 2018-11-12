Vue.component("vue-seccion-component", {
  template: `
        <ul class="bg-light">
            <li v-for="seccion in secciones" class="sidebar-dropdown">
                <a href="#" class="border-2 border-left border-menu-item d-block">
                    <div class="d-inline-flex align-items-center pl-2 bg-white">
                        <template v-if="seccion.logo != null">
                            <i class="mr-2 fas fa-2x">
                                <img v-bind:src="seccion.logo" alt="" width="24px">
                            </i>
                        </template>                        
                        <template v-else>
                            <i class="mr-2 fas fa-2x fa-map-marker-alt"></i>
                        </template>
                        <template v-if="language=='es'">
                            <span>{{seccion.nombre}}</span>
                        </template>
                        <template v-else>
                            <span>{{seccion.nombreIdioma}}</span>
                        </template> 
                    </div>
                </a>

                <template v-if="seccion.hasChildren">
                    <div class="sidebar-submenu">
                        <ul class="py-0">
                            
                            <li v-for="child in seccion.children" class="bg-light">
                                <a class="d-block" href="#">
                                    <div class="d-inline-flex align-items-center">
                                        <template v-if="seccion.logo != null">
                                            <i class="mr-2 fas">
                                                <img v-bind:src="seccion.logo" alt="" width="24px">
                                            </i>
                                        </template>                        
                                        <template v-else>
                                            <i class="mr-2 fas fa-map-marker-alt"></i>
                                        </template>
                                        
                                        
                                        <template v-if="language=='es'">
                                            <input type="checkbox" class="d-none menu-item" :data-id="seccion.id" :data-nombre="seccion.nombre" v-bind:id="child.id">
                                            <label class="mb-0" v-bind:for="child.id">{{child.nombre}}</label>
                                        </template>
                                        <template v-else>
                                            <input type="checkbox" class="d-none menu-item" :data-id="seccion.id" :data-nombre="seccion.nombreIdioma" v-bind:id="child.id">
                                            <label class="mb-0" v-bind:for="child.id">{{child.nombreIdioma}}</label>
                                        </template> 
                                    </div>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </template>

                
            </li>
            
        </ul>
      `,
  data() {
    return {
      secciones: [],
      language: Environment.language
    };
  },

  created() {
    //this.onMostrarMensaje();
  },
  methods: {},
  // props: ['title'],
  $_veeValidate: {
    validator: "new"
  }
});
