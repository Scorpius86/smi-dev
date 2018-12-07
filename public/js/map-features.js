function SMIMapFeature(map) {
  const me = this;
  this.styleColorDefault = {
    color: "red",
    opacity: 1,
    fillcolor: "red",
    fillOpacity: 0.1,
    weight: 0.5
  };
  this.styleLayer = {
    default: function() {
      console.log(me.styleColorDefault);
      return me.styleColorDefault;
    },
    highlight: {
      weight: 5,
      color: "#0D8BE7",
      dashArray: "",
      fillOpacity: 0.7
    },
    selected: {
      color: "blue",
      opacity: 0.3,
      weight: 2
    }
  };

  this.map = map;
  this.multipleSelection = false;
  this.selectedLayers = [];

  this.highlightFeature = function(event, $seccion, $cacheLayer) {
    var layer = event.target;

    // layer.setStyle(stylelayer.highlight);
    // info.update(layer.feature.properties);
  };
  this.resetHighlightFeature = function(event) {
    var layer = event.target;
    var feature = event.target.feature;

    // if (this.checkSelectedLayers(feature)) {
    //   setStyleLayer(layer, stylelayer.highlight);
    // } else {
    //   setStyleLayer(layer, stylelayer.default);
    // }
  };
  this.selectLayer = function(event, $seccion, $cacheLayer) {
    const me = this;
    var layer = event.target;
    var feature = event.target.feature;

    let $detalleCodigoGIS = feature.properties["ID_SEC"];
    if ($detalleCodigoGIS == undefined) {
      $detalleCodigoGIS = feature.properties["ID__SEC"];
    }

    console.log(feature);

    if (this.multipleSelection) {
      let keyFeature = feature.properties["ID_SEC"];
      if (keyFeature == undefined) {
        keyFeature = feature.properties["ID__SEC"];
      }

      if (this.checkSelectedLayers(keyFeature)) {
        // removerlayers(feature, setStyleLayer, layer, stylelayer.default);
        // removeBounds(layer);
        this.removeSelectedLayer(keyFeature, layer);
      } else {
        // addLayers(feature, setStyleLayer, layer, stylelayer.highlight);
        // addBounds(layer);
        this.addSelectedLayer(keyFeature, layer);

        me.showInfoMultiple($detalleCodigoGIS, $seccion);
      }
      //   map.fitBounds(arrayBounds);
      //   detailsselected.update(featuresSelected);
    } else {
      //Marcar como seleccionado
      me.showInfo($detalleCodigoGIS, $seccion);
    }

    console.log(this.selectedLayers);
  };

  this.checkSelectedLayers = function(key) {
    return _.some(this.selectedLayers, { key: key });
  };

  this.addSelectedLayer = function(key, layer) {
    if (!_.some(this.selectedLayers, { key: key })) {
      this.selectedLayers.push({ key: key, layer: layer });
      layer.setStyle(this.styleLayer.selected);
    }
  };

  this.removeAllSelection = function() {
    console.log("removeAllSelection");
    this.selectedLayers.forEach(x => {
      console.log(x);
      x.layer.setStyle(me.styleLayer.default);
    });
    _.remove(this.selectedLayers, function(x) {
      return x.key != null;
    });
  };

  this.removeSelectedLayer = function(key, layer) {
    _.remove(this.selectedLayers, function(x) {
      return x.key == key;
    });
    layer.setStyle(this.styleLayer.default());
  };

  function loadSeccionDetalle($idSeccion, $afterLoadSeccionDetalle) {
    const $url = UrlAPI.base + "/secciones/" + $idSeccion;
    showLoading();
    $.ajax({
      url: $url,
      type: "GET",
      dataType: "json",
      success: function($response) {
        if (typeof ($response !== "undefined") && $response !== null) {
          if ($response.status) {
            $afterLoadSeccionDetalle($response.data);
          }
        }
      },
      error: function(xhr, status) {},
      complete: function(xhr, status) {
        hideLoading();
      }
    });
  }

  function loadAtributosSeccionDetalle(
    $idSeccion,
    $codigoGIS,
    $afterLoadAtributosSeccionDetalle
  ) {
    const $url =
      UrlAPI.base +
      "/secciones/" +
      $idSeccion +
      "/detalle/" +
      $codigoGIS +
      "/atributos";
    showLoading();
    $.ajax({
      url: $url,
      type: "GET",
      dataType: "json",
      success: function($response) {
        if (typeof ($response !== "undefined") && $response !== null) {
          if ($response.status) {
            $afterLoadAtributosSeccionDetalle($response.data);
          }
        }
      },
      error: function(xhr, status) {},
      complete: function(xhr, status) {
        hideLoading();
      }
    });
  }

  function loadPanel(
    $idSeccion,
    $detalleCodigoGIS,
    $idCultivo,
    $afterLoadPanel
  ) {
    const $url =
      UrlAPI.base +
      "/secciones/" +
      $idSeccion +
      "/detalle/" +
      $detalleCodigoGIS +
      "/panel/" +
      $idCultivo;
    showLoading();
    $.ajax({
      url: $url,
      type: "GET",
      dataType: "json",
      success: function($response) {
        if (typeof ($response !== "undefined") && $response !== null) {
          if ($response.status) {
            $afterLoadPanel($response.data);
          }
        }
      },
      error: function(xhr, status) {},
      complete: function(xhr, status) {
        hideLoading();
      }
    });
  }

  function loadDefaultProperties() {
    var propiedades = [];
    propiedades.push({
      id: "1",
      nombre: "Población",
      valor: "1 500 000"
    });
    propiedades.push({
      id: "2",
      nombre: "Ubigeo",
      valor: "130101"
    });
    propiedades.push({
      id: "3",
      nombre: "N° Familias Cacao",
      valor: "54"
    });
    propiedades.push({
      id: "4",
      nombre: "N° hectáreas Prod",
      valor: "92,200"
    });
    propiedades.push({
      id: "5",
      nombre: "Productividad Promedio",
      valor: "9500 toneladas"
    });
    propiedades.push({
      id: "6",
      nombre: "Edad promedio",
      valor: "5 años"
    });

    return propiedades;
  }

  this.showInfo = function($detalleCodigoGIS, $seccion) {
    const $idSeccion = $seccion.seccion.id;
    const $seccionCodigoGIS = $seccion.seccion.codigoGIS;

    const $idCultivo = 0;
    if ($detalleCodigoGIS == undefined) {
      smiMensaje.$refs.message.mensaje.text =
        "No se puede leer el atributo ID_SEC, ID__SEC del archivo geojson.";
      smiMensaje.$refs.message.onMostrarMensaje();
      return;
    }
    const $listaLimitesSeccionGIS = ["M004", "M005", "M006"];
    if ($listaLimitesSeccionGIS.indexOf($seccionCodigoGIS) >= 0) {
      loadPanel($idSeccion, $detalleCodigoGIS, $idCultivo, function(data) {
        let $titulo = data.nombre || $detalleCodigoGIS;
        data.permiteEditar = false;
        let authenticate = authenticatedUser();
        if (authenticate != null && authenticate.id > 0) {
          data.permiteEditar = true;
        }
        let language = getLanguage();
        if (language == null || language.length == 0) {
          language = "es";
        }
        data.label = messages[language].label;
        data.multipleSelection = false;

        let selectedElements = [];
        me.selectedLayers.forEach(l => {
          let filtro = $seccion.seccion.seccion_detalle.filter(x => {
            return x.codigoGIS == l.key;
          });

          if (filtro.length > 0) {
            selectedElements.push({
              key: filtro[0].codigoGIS,
              nombre: filtro[0].nombre
            });
          }
        });

        data.selectedFeatures = [];
        if (selectedElements.length > 1) {
          data.selectedFeatures = selectedElements;
          data.multipleSelection = true;
        }

        const $template = renderHandlebarsTemplate(
          "#panel-popupcontent-template",
          null,
          { detalle: data },
          null,
          true
        );
        $("#dialog-panel .dialog-content").html($template);
        $("#dialog-panel").dialog({
          autoOpen: false,
          closeText: "",
          title: $titulo,
          position: { my: "right", at: "right", of: window },
          width: 400
        });
        if (data.cultivos && data.cultivos.length > 0) {
          data.cultivos.forEach(function(cultivo) {
            if (cultivo.proyecciones && cultivo.proyecciones.length > 0) {
              cultivo.proyecciones.forEach(function(x) {
                const $idElement = "proyeccion-tabs-" + x.id;
                generarGrafico($idElement, x);
              });
            }
          });
        }
        $(".panel-tabs").tabs();
        $("#dialog-panel").dialog("open");
      });
    } else {
      loadAtributosSeccionDetalle($id, $detalleCodigoGIS, function(data) {
        if (data == undefined || data.length == 0) {
          const propiedades = loadDefaultProperties();
          data = propiedades;
        }
        data.titulo = $detalleCodigoGIS;
        if (data.detalle != null && data.detalle.nombre != null) {
          data.titulo = data.detalle.nombre;
        }
        data.permiteEditar = false;
        let authenticate = authenticatedUser();
        if (authenticate != null && authenticate.id > 0) {
          data.permiteEditar = true;
        }
        let language = getLanguage();
        if (language == null || language.length == 0) {
          language = "es";
        }
        data.label = messages[language].label;
        const $template = renderHandlebarsTemplate(
          "#punto-popupcontent-template",
          null,
          { data: data },
          null,
          true
        );
        const $templateAtributos = renderHandlebarsTemplate(
          "#secciones-editar-atributos",
          null,
          { data: data },
          null,
          true
        );
        $("#dialog-panel .dialog-content").html($template);
        $("#dialog-panel").dialog({
          autoOpen: false,
          closeText: "",
          title: data.titulo,
          position: { my: "right", at: "right", of: window }
        });
        $("#dialog-panel").dialog("open");
        $("#modal-content-atributos").html($templateAtributos);
      });
    }
  };

  this.showInfoMultiple = function($detalleCodigoGIS, $seccion) {
    this.showInfo($detalleCodigoGIS, $seccion);
    console.log(this.selectedLayers);
  };
}
