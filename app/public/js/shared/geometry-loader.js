export default class GeometryLoader {
    getStyleColor (seccion) {
        return {
            color: seccion.color,
            weight: 2,
            opacity: 0.7,
            dashArray: "4,2",
            lineJoin: "round"
        };
    }

    getIconMarkerPoint(color) {
        const markerHtmlStyles = `
                          background-color: ${color};
                          width: 2rem;
                          height: 2rem;
                          display: block;
                          left: -1.5rem;
                          top: -1.5rem;
                          position: relative;
                          border-radius: 3rem 3rem 0;
                          transform: rotate(45deg);
                          border: 1px solid #FFFFFF`;
      
        const icon = L.divIcon({
          className: "my-custom-pin",
          iconAnchor: [0, 24],
          labelAnchor: [-6, 0],
          popupAnchor: [0, -36],
          html: `<span style="${markerHtmlStyles}" />`
        });
      
        return icon;
    }

    getIconMarkerCluster(n, color) {
        const markerHtmlStyles = `
                          background-color: ${color};
                          width: 3rem;
                          height: 3rem;
                          display: block;
                          left: 0;
                          top: 0;
                          padding : 0.5rem 0.5rem 0.5rem 0.5rem;
                          position: relative;
                          border-radius: 50%;
                          border: 1px solid #FFFFFF`;
      
        const icon = L.divIcon({
          className: "my-custom-pin",
          iconAnchor: [0, 24],
          labelAnchor: [-6, 0],
          popupAnchor: [0, -36],
          html: `<span style="${markerHtmlStyles}" >${n}</span>`
        });
      
        return icon;
    }

    addNewLayer(id, layer) {
        layers.push({
            id: id,
            layer: layer
        });
    }

    removeMarkerAll() {
        const sidebar = $("#menu-sidebar");
        var menus = sidebar.find("input[type='checkbox'].menu-item");

        for (let i = 0; i < menus.length; i++) {
            const menuItem = menus[i]; 
            const seccionId = $(menuItem).attr("data-id");

            this.removeMarker(seccionId);
        }
    }

    removeMarker(seccionId) {
        const checkedLayer = layers.find(function(layer, index) {
            if (layer.id == seccionId) return layer;
        });
        
        if (checkedLayer) {
            map.removeLayer(checkedLayer.layer);
            _.remove(layers, function(layer) {
            return layer.id == checkedLayer.id;
          });
        }
      
        $("#" + seccionId).prop("checked", false);
        this.removeLegend(seccionId);
    }

    removeLegend(seccionId) {
        const mapLegend = $("#map-legend");
        var seccionItem = mapLegend.find('[seccion-id="SECCION-' + seccionId + '"]');
        seccionItem.remove();
    }

    loadGeometryComponents(seccion,geometryComponents){
        let layerMap = null;

        if(Array.isArray(geometryComponents)){
            let components = new Array();
            for (let i = 0; i < geometryComponents.length; i++) {
                components.push(JSON.parse(geometryComponents[i]));
            }
            layerMap = this.loadComponentGeometry(seccion,components,components.length);
        } else {
            let component = JSON.parse(geometryComponents);
            layerMap = this.loadComponentGeometry(seccion,component,1);
        }

        return layerMap;
    }

    loadComponentGeometry(seccion,components,countComponentGeometry=0){       
        const me = this; 
        const icon = this.getIconMarkerPoint(seccion.color);

        let markers = L.markerClusterGroup({
            maxClusterRadius: 120,
            iconCreateFunction: function(cluster) {
                let n = cluster.getChildCount();
                return me.getIconMarkerCluster(n, seccion.color);
            },
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
        });

        let geoJsonLayer = L.geoJson(components, {
            style: this.getStyleColor(seccion),
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, { icon: icon });
            }
        });

        let layerMap = null;
        if (countComponentGeometry > 5) {
            let count = 0;
            geoJsonLayer = L.geoJson(components, {
                style: this.getStyleColor(seccion),
                pointToLayer: function(feature, latlng) {
                    let pointMarker = L.marker(latlng, {icon: icon});
                    count += 1;
                    pointMarker.number = count;
                    return pointMarker;
                }
            });

            markers.addLayer(geoJsonLayer);
            map.addLayer(markers);
            layerMap = markers;
        } else {
            geoJsonLayer.addTo(map);
            layerMap = geoJsonLayer;
        }

        return layerMap;
    }

    loadGeometrys(data){
        if(Array.isArray(data)){
            for (let i = 0; i < data.length; i++) {
                this.loadGeometry(data[i]);
            }
        } else {
            this.loadGeometry(data);
        }
    }

    loadGeometry(data){
        const seccion = data.seccion;
        mapFeature.styleColorDefault = this.getStyleColor(seccion);
        $("#multiple").prop("disabled", false);
        $("#multiple").prop("checked", false);
      
      if (seccion.geoJsonFile && seccion.geoJsonFile != null) {
        try {
            let layerMap = null;
            layerMap = this.loadGeometryComponents(seccion,data.geoJsonFile);
            this.addNewLayer(seccion.id, layerMap);
        } catch (error) {
            console.log(error);
            this.removeMarker(seccion.id);
            smiMensaje.$refs.message.mensaje.text = "Formato de representación geojson inválido.";
            smiMensaje.$refs.message.onMostrarMensaje();
        }
     } else {
        this.removeMarker(seccion.id);
      }
    }

    addCustomLayer(customLayer){
        if(customLayer && customLayer.layer){
            this.removeCustomLayer();
            map.addLayer(customLayer.layer);
            this.addNewLayer(CONSTANTES.ID_CUSTOM_LAYER,customLayer.layer);
        }
    }

    removeCustomLayer(){
        const customLayer = this.getCustomLayer();
        
        if(customLayer && customLayer.layer){
            map.removeLayer(customLayer.layer);
            _.remove(layers, function(layer) {
            return layer.id === CONSTANTES.ID_CUSTOM_LAYER;
            });
        }
    }

    getCustomLayer(){
        const customLayer = layers.find(function(layer, index) {
            if (layer.id === CONSTANTES.ID_CUSTOM_LAYER) return layer;
        });

        return customLayer;
    }
    
}