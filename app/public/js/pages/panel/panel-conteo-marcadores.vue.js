import GeometryLoader  from '../../shared/geometry-loader.js';

export default {
    name: "vue-panel-conteo-marcadores",
    template: `
      <div v-if="display">
        <template>                            
          <div class = "panel-conteo-marcadores">
            <div class="row ">
              <div class="col title">
                Custom Area 1
              </div>               
            </div>
            <div class="row">
              <div class="col infoTitle">
                Area {{ area.toLocaleString('en', {useGrouping:true}) }} Km<sup>2</sup>
              </div>
            </div>
            <div class="row">
              <div class="col subTitle">
                Infraestructura
              </div>
            </div>
            <div v-if="(sections.length > 0)">
              <div class="statisticTable" v-for="parentSection in sections" >
                <div class="row">
                  <div class="col-9 headerTable">
                    {{parentSection.name}}
                  </div>
                  <div class="col-3 headerTable">
                    Cantidad
                  </div>
                </div>
                <div class="bodyTable">
                  <div v-for="section in parentSection.sections">
                    <div class="row">
                      <div class="col-9 cellTextTable">
                        <div class="iconLegend" v-bind:style="{ backgroundColor: section.color}"></div>
                        <div class="padLeft15">
                          {{section.name}}
                        </div>
                      </div>
                      <div class="col-3 cellNumberTable">
                        {{section.count}}
                      </div>
                    </div>
                  </div>
                </div>   
              </div>  
            </div>    
            
            <button type="button" class="btn btn-sm btn-primary" v-on:click="btnExportClick">
              {{labels.button_export}}
            </button>
          </div>
        </template>
      </div>
        `,
    data() {
      return {
        title: "",
        display: true,
        sections:[],
        labels:{},
        area:0,
        geometryLoader:GeometryLoader
      };
    },
    props:["id"],
    created() {
      
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
        this.geometryLoader.addCustomLayer(e);

        this.area = Math.round((L.GeometryUtil.geodesicArea(e.layer.getLatLngs()[0])/1000000) * 100)/100;

        $.ajax({
          url: url,
          type: "POST",
          dataType: "json",
          data: { "polygon": polygon },
          success: function(res) {
            if (typeof (res !== "undefined") && res !== null) {
              if (res.status) {
                me.getIntersectionPoints(res.data);
                me.buildStatistics(res.data);
                me.parentPanel.show();       
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
        this.geometryLoader.loadGeometrys(data);
      },
      buildStatistics: function(data){
        this.sections = [];
        if(Array.isArray(data)){
            for (let i = 0; i < data.length; i++) {
              const section = this.sections.find(item=>item.id == data[i].seccion.idSeccionPadre);
              if(!section){
                this.sections.push({
                  name: data[i].seccion.nombrePadre,
                  id: data[i].seccion.idSeccionPadre,
                  colorPadre: data[i].seccion.colorPadre,
                  sections:[
                    {
                      name: data[i].seccion.nombre,
                      id: data[i].seccion.id,
                      count: data[i].geoJsonFile.length,
                      color: data[i].seccion.color,
                      parentSectionId: data[i].seccion.idSeccionPadre,
                      sections:[]
                    }
                  ]
                });

              } else {
                section.sections.push({
                  name: data[i].seccion.nombre,
                  id: data[i].seccion.id,
                  count: data[i].geoJsonFile.length,
                  color: data[i].seccion.color,
                  parentSectionId: data[i].seccion.idSeccionPadre,
                  sections:[]
                });
              }
            }
        }
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
        this.title = "";
      },
      btnExportClick:function(e){
        const url = UrlAPI.base + "/export/IntersectionPoints";

        showLoading();
        $.ajax({
          url: url,
          type: "POST",
          data: { "sections": this.sections, "area": this.area },
          success: function(fileId, textStatus, request) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.download = "report.xlsx";
            link.href = UrlAPI.base + "/export/"+fileId;
            link.click();
            document.body.removeChild(link);            
          },
          error: function(xhr, status) {},
          complete: function(xhr, status) {
            hideLoading();
          }
        });
      }
    }
  }