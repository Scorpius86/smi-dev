Vue.component("vue-seccion-component", {
  template: `
        <ul class="bg-light">
            <li v-for="seccion in secciones" class="sidebar-dropdown" v-bind:class="{ 'siderbar-no-menu': !seccion.hasChildren }">
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
                            <input type="checkbox" class="d-none menu-item" 
                                :data-id="seccion.id" 
                                :data-nombre="seccion.nombre" 
                                :data-color="seccion.color" 
                                :data-logo="seccion.logo" 
                                :data-codigoseccion = "seccion.codigoSeccion"
                                v-bind:id="seccion.id"/>
                            <template v-if="!seccion.hasChildren">
                                <label class="mb-0" v-bind:for="seccion.id">{{seccion.nombre}}</label>
                            </template>
                            <template v-else>
                                <span>{{seccion.nombre}}</span>
                            </template>
                        </template>
                        <template v-else>
                            <input type="checkbox" class="d-none menu-item" 
                                :data-id="seccion.id" 
                                :data-nombre="seccion.nombreIdioma" 
                                :data-color="seccion.color" 
                                :data-logo="seccion.logo" 
                                :data-codigoseccion = "seccion.codigoSeccion"
                                v-bind:id="seccion.id"/>
                            <template v-if="!seccion.hasChildren">
                               <label class="mb-0" v-bind:for="child.id">{{child.nombreIdioma}}</label>
                            </template>
                            <template v-else>
                                <span>{{seccion.nombreIdioma}}</span>
                            </template>
                        </template> 
                    </div>
                </a>

                <template v-if="seccion.hasChildren">
                    <div class="sidebar-submenu">
                        <ul class="py-0">
                            
                            <li v-for="child in seccion.children" class="bg-light">
                                <a class="d-block" href="#">
                                    <div class="d-inline-flex align-items-center">
                                        <template v-if="child.logo != null">
                                            <i class="mr-2 fas">
                                                <img v-bind:src="child.logo" alt="" width="24px">
                                            </i>
                                        </template>                        
                                        <template v-else>
                                            <i class="mr-2 fas fa-map-marker-alt"></i>
                                        </template>
                                        
                                        
                                        <template v-if="language=='es'">
                                            <input type="checkbox" class="d-none menu-item" 
                                                :data-id="child.id" 
                                                :data-nombre="child.nombre" 
                                                :data-color="child.color" 
                                                :data-logo="child.logo"
                                                :data-codigoseccion = "seccion.codigoSeccion"
                                                v-bind:id="child.id"/>
                                            <label class="mb-0" v-bind:for="child.id">{{child.nombre}}</label>
                                        </template>
                                        <template v-else>
                                            <input type="checkbox" class="d-none menu-item" 
                                                :data-id="child.id" 
                                                :data-nombre="child.nombreIdioma" 
                                                :data-color="child.color" 
                                                :data-logo="child.logo"
                                                :data-codigoseccion = "seccion.codigoSeccion"
                                                v-bind:id="child.id"/>
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
