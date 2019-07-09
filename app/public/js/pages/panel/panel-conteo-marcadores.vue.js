import GeometryLoader from '../../shared/geometry-loader.js';

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
                  <div v-if="(!isCircle)" class="col-9 headerTable">
                    {{parentSection.name}}
                  </div>
                  <div v-if="(isCircle)" class="col-6 headerTable">
                    {{parentSection.name}}
                  </div>
                  <div class="col-3 headerTable">
                    Cantidad
                  </div>
                  <div v-if="(isCircle)" class="col-3 headerTable">
                    Distancia
                  </div>
                </div>
                <div class="bodyTable">
                  <div v-for="section in parentSection.sections">
                    <div class="row">
                      <div v-if="(!isCircle)" class="col-9 cellTextTable">
                        <div class="iconLegend" v-bind:style="{ backgroundColor: section.color}"></div>
                        <div class="padLeft15">
                          {{section.name}}
                        </div>
                      </div>
                      <div v-if="(isCircle)" class="col-6 cellTextTable">
                        <div class="iconLegend" v-bind:style="{ backgroundColor: section.color}"></div>
                        <div class="padLeft15">
                          {{section.name}}
                        </div>
                      </div>
                      <div class="col-3 cellNumberTable">
                        {{section.count}}
                      </div>
                      
                      <div v-if="(isCircle)" class="col-3 cellNumberTable">
                      {{section.distancia}}km
                    </div>
                    </div>
                  </div>
                </div>   
              </div>  
            </div>    
            
            <button v-if="(!isCircle)" type="button" class="btn btn-sm btn-primary" v-on:click="btnExportClick">
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
            sections: [],
            labels: {},
            area: 0,
            isCircle: false,
            geometryLoader: GeometryLoader
        };
    },
    props: ["id"],
    created() {

    },
    methods: {
        hide: function() {

        },
        DrawEventCREATED: function(e) {
            let radius = null;
            let isPolygon = -1;
            const me = this;
            let polygon = this.getCoordinates(e.layer.toGeoJSON().geometry);
            const url = UrlAPI.base + "/secciones/intersectionPoints";
            showLoading();

            //this.geometryLoader.removeMarkerAll();
            this.geometryLoader.addCustomLayer(e);
            if (e.layerType === 'polygon') {
                this.isCircle = false;
                isPolygon = 1;
                this.area = Math.round((L.GeometryUtil.geodesicArea(e.layer.getLatLngs()[0]) / 1000000) * 100) / 100;
            } else if (e.layerType === 'circle') {
                this.isCircle = true;
                isPolygon = 0;
                radius = e.layer.getRadius();
                polygon = e.layer.toGeoJSON().geometry;
                let radioKm = Number(e.layer.getRadius()) / 1000; // km
                this.area = Math.round(radioKm * radioKm * Math.PI);

            }
            let listaSecciones = [];
            layers.forEach(obj => {
                if (obj.id !== 'customLayer') {
                    listaSecciones.push(obj.id);
                }
            });

            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                data: { "polygon": polygon, "listaSecciones": listaSecciones, "isPolygon": isPolygon, "radius": radius },
                success: function(res) {
                    if (typeof(res !== "undefined") && res !== null) {
                        if (res.status) {
                            if (e.layerType === 'polygon') {
                                me.buildStatistics(res.data);
                            } else if (e.layerType === 'circle') {
                                me.buildStatisticsCircle(res.tipos, res.dataCircle);
                            }
                            //me.getIntersectionPoints(res.data);

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
        getIntersectionPoints: function(data) {
            this.geometryLoader.loadGeometrys(data);
        },
        buildStatistics: function(data) {
            this.sections = [];
            if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    const section = this.sections.find(item => item.id == data[i].seccion.idSeccionPadre);
                    if (!section) {
                        this.sections.push({
                            name: data[i].seccion.nombrePadre,
                            id: data[i].seccion.idSeccionPadre,
                            colorPadre: data[i].seccion.colorPadre,
                            sections: [{
                                name: data[i].seccion.nombre,
                                id: data[i].seccion.id,
                                count: data[i].geoJsonFile.length,
                                color: data[i].seccion.color,
                                parentSectionId: data[i].seccion.idSeccionPadre,
                                sections: []
                            }]
                        });

                    } else {
                        section.sections.push({
                            name: data[i].seccion.nombre,
                            id: data[i].seccion.id,
                            count: data[i].geoJsonFile.length,
                            color: data[i].seccion.color,
                            parentSectionId: data[i].seccion.idSeccionPadre,
                            sections: []
                        });
                    }
                }
            }
        },
        buildStatisticsCircle: function(tipos, arrayTipoData) {
            this.sections = [];

            for (var dataTmp in arrayTipoData) {
                for (var i in arrayTipoData[dataTmp]) {
                    let tipo = tipos.find(item => item.id == dataTmp)
                    let section;
                    if (this.sections != undefined) {
                        section = this.sections.find(item => item.id == tipo.id);
                    }
                    if (tipo != undefined && tipo != null) {
                        if (!section) {
                            this.sections.push({
                                name: tipo.descripcion,
                                id: tipo.id,
                                colorPadre: 0,
                                sections: [{
                                    name: arrayTipoData[dataTmp][i].seccion,
                                    id: i,
                                    count: arrayTipoData[dataTmp][i].cantidad,
                                    color: arrayTipoData[dataTmp][i].color,
                                    parentSectionId: 0,
                                    distancia: arrayTipoData[dataTmp][i].distancia
                                }]
                            });
                        } else {
                            section.sections.push({
                                name: arrayTipoData[dataTmp][i].seccion,
                                id: i,
                                count: arrayTipoData[dataTmp][i].cantidad,
                                color: arrayTipoData[dataTmp][i].color,
                                parentSectionId: 0,
                                distancia: arrayTipoData[dataTmp][i].distancia
                            });
                        }
                    }
                }
            }
        },
        getCoordinates: function(geometry) {
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
        btnExportClick: function(e) {
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
                    link.href = UrlAPI.base + "/export/" + fileId;
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