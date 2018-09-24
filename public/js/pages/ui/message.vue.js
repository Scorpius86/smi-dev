Vue.component("vue-mensaje-modal", {
    template: `
        <b-modal ref="modalMensaje" hide-footer v-bind:title="mensaje.title">
            <div class="d-block text-center">
                <h5>{{mensaje.text}}</h5>
            </div>
            <b-btn class="mt-3" block @click="onOcultarMensaje">Cerrar</b-btn>
        </b-modal>
      `,
    data() {
      return {
        mensaje: {
            title:'Información',
            text:''
        }       
      };
    },
  
    created() {
      //this.onMostrarMensaje();
    },
    methods: {
        onMostrarMensaje: function(){
            this.$refs.modalMensaje.show();
        },
        onOcultarMensaje: function(){
            this.$refs.modalMensaje.hide();
        },
    },
    // props: ['title'],
    $_veeValidate: {
      validator: "new"
    }
  });
  