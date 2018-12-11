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
    console.log($seccion);
    const me = this;
    var layer = event.target;
    var feature = event.target.feature;

    let $detalleCodigoGIS = feature.properties["ID_SEC"];
    if ($detalleCodigoGIS == undefined) {
      $detalleCodigoGIS = feature.properties["ID__SEC"];
    }
    let keyFeature = feature.properties["ID_SEC"];
    if (keyFeature == undefined) {
      keyFeature = feature.properties["ID__SEC"];
    }

    if (this.multipleSelection && $seccion.seccion.idTipoGeoData != "1") {
      if (this.checkSelectedLayers(keyFeature)) {
        // removerlayers(feature, setStyleLayer, layer, stylelayer.default);
        // removeBounds(layer);
        this.removeSelectedLayer(keyFeature, layer);
        me.showInfoMultiple($detalleCodigoGIS, $seccion);
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
      //this.removeAllSelection();
      //this.addSelectedLayer(keyFeature, layer);
      me.showInfo($detalleCodigoGIS, $seccion);
    }
  };

  this.checkSelectedLayers = function(key) {
    return _.some(this.selectedLayers, { key: key });
  };

  this.addSelectedLayer = function(key, layer) {
    if (!_.some(this.selectedLayers, { key: key })) {
      this.selectedLayers.push({ key: key, layer: layer });
      if (layer) layer.setStyle(this.styleLayer.selected);
    }
  };

  this.removeAllSelection = function() {
    this.selectedLayers.forEach(x => {
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

  this.loadPanel = function(
    $idSeccion,
    $listCodigoGIS,
    $idCultivo,
    $afterLoadPanel
  ) {
    const $url = UrlAPI.base + "/secciones/detalle/panel/";

    showLoading();
    let paramPanel = {};
    paramPanel.idSeccion = $idSeccion;
    paramPanel.listCodigoGIS = $listCodigoGIS;

    $.ajax({
      url: $url,
      type: "POST",
      data: paramPanel,
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
  };

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
      let paramLista = [];
      paramLista.push($detalleCodigoGIS);

      this.loadPanel($idSeccion, paramLista, $idCultivo, function(data) {
        $("#nav-panel").show();

        smiPanel.$refs.param.input = {};
        smiPanel.$refs.param.input.seccion = $seccion.seccion;
        smiPanel.$refs.param.tipo = "grafico";
        smiPanel.$refs.param.detalle = data;
        smiPanel.$refs.param.show();
      });
    } else {
      loadAtributosSeccionDetalle($idSeccion, $detalleCodigoGIS, function(
        data
      ) {
        if (data == undefined || data.length == 0) {
          const propiedades = loadDefaultProperties();
          data = propiedades;
        }
        data.nombre = $detalleCodigoGIS;
        if (data.detalle != null && data.detalle.nombre != null) {
          data.nombre = data.detalle.nombre;
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
        // const $template = renderHandlebarsTemplate(
        //   "#punto-popupcontent-template",
        //   null,
        //   { data: data },
        //   null,
        //   true
        // );
        const $templateAtributos = renderHandlebarsTemplate(
          "#secciones-editar-atributos",
          null,
          { data: data },
          null,
          true
        );

        console.log(data);

        $("#nav-panel").show();
        smiPanel.$refs.param.tipo = "edicion";
        smiPanel.$refs.param.detalle = data;
        smiPanel.$refs.param.show();

        // $("#dialog-panel .dialog-content").html($template);
        // $("#dialog-panel").dialog({
        //   autoOpen: false,
        //   closeText: "",
        //   title: data.titulo,
        //   position: { my: "right", at: "right", of: window }
        // });
        // $("#dialog-panel").dialog("open");

        $("#modal-content-atributos").html($templateAtributos);
      });
    }
  };

  this.showInfoMultiple = function($detalleCodigoGIS, $seccion) {
    this.showInfo($detalleCodigoGIS, $seccion);
    console.log(this.selectedLayers);
  };
}
