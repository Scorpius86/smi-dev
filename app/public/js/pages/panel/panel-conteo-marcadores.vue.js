import GeometryLoader  from '../../shared/geometry-loader.js';

export default {
    name: "vue-panel-conteo-marcadores",
    template: `
      <div v-if="display">
        <template>                            
          <div></div>
        </template>
      </div>
        `,
    data() {
      return {
        title: "",
        display: true,
        geometryLoader:GeometryLoader
      };
    },
    props:["id"],
    created() {
      this.geometryLoader = new GeometryLoader();
    },
    methods: {
      hide: function() {
        
      },
      DrawEventCREATED:function(e){
        const me = this;
        const polygon = this.getCoordinates(e.layer.toGeoJSON().geometry);        
        const url = UrlAPI.base + "/secciones/intersectionPoints";
        showLoading();

        this.geometryLoader.removeMarkerAll();

        $.ajax({
          url: url,
          type: "POST",
          dataType: "json",
          data: { "polygon": polygon },
          success: function(res) {
            if (typeof (res !== "undefined") && res !== null) {
              if (res.status) {
                me.getIntersectionPoints(res.data);
              }
            }
          },
          error: function(xhr, status) {},
          complete: function(xhr, status) {
            hideLoading();
          }
        });
      },
      getIntersectionPoints: function(data){
        debugger;
        this.geometryLoader.loadGeometrys(data);
      },
      getCoordinates:function(geometry){
        const coordinates = geometry.coordinates[0];
        const resultCoordinates = new Array();
        for (let i = 0; i < coordinates.length; i++) {
          const coordinate = coordinates[i];
          const x = coordinate[0];
          const y = coordinate[1];
          resultCoordinates.push(x + ' ' + y);
        }
        return resultCoordinates;
      },
      show: function() {
        this.display = true;  
        showLoading();
  
        this.title = "";
        map.addControl(window.drawControl);

        hideLoading();
      }   
    }
  }