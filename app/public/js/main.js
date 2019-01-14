const MARKER_PATH = "img/markers/";
const MAP_MARKER = MARKER_PATH + "if_Marker_1891030.png";
const MAP_MARKER_2 = MARKER_PATH + "if_map-marker_285659.png";
const MAP_MARKER_3 = MARKER_PATH + "if_map-marker_299087.png";
const MAP_MARKER_PIN = MARKER_PATH + "if_Pin_728961.png";
const MAP_MARKER_LOCATION = MARKER_PATH + "if_location_925919.png";
const ANIOS_PRONOSTICO = 5;
const TASA_PRODUCCION = 85;

var map = {};
var layers = [];
var mapFeature = {};

var model = {};
model.multipleSelection = true;
model.selectedLayers = [];

jQuery(function($) {
  showLoading();

  setTimeout(function() {
    $(".logout-button").off("click");
    $(".logout-button").on("click", onLogoutButtonClick);

    $("#nav-panel").hide(); //ocultar panel derecha

    if (!validateAuthentication()) {
      clearCredentials();
      window.location = URL.AUTH_VALIDATE;
      return;
    }

    loadUserInformation();
    const $afterLoadSecciones = settings;
    loadSecciones($afterLoadSecciones);

    hideLoading();
  }, 500);
});

function onLogoutButtonClick() {
  clearCredentials();
  const $redirectUrl = URL_LOGIN;
  window.location = $redirectUrl;
}

function loadUserInformation() {
  const $user = authenticatedUser();
  $("#username").text($user.nombre);
}

function validateAuthentication() {
  return (
    typeof authenticatedUser === "function" && authenticatedUser() !== null
  );
}

function settings() {
  $(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });

  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });
  var themes =
    "chiller-theme ice-theme cool-theme light-theme green-theme spicy-theme purple-theme";
  $("[data-theme]").click(function() {
    $(".page-wrapper").removeClass(themes);
    $(".page-wrapper").addClass($(this).attr("data-theme"));
  });

  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $(".sidebar-content").mCustomScrollbar({
      axis: "y",
      autoHideScrollbar: true,
      theme: "minimal"
    });
    $(".sidebar-content").addClass("desktop");
  }

  $("#btnShowMenu").on("click", function() {
    $("#sidebar").toggle();
  });

  //Cargar eventos menu
  const $onceMapIsLoaded = onceMapIsLoaded;
  initMap([], $onceMapIsLoaded);
}

function initMap($regiones, $afterMapIsLoaded) {
  map = L.map("map-container");
  if (typeof $afterMapIsLoaded === "function" && $afterMapIsLoaded !== null) {
    map.on("load", $afterMapIsLoaded);
  }
  map.setView([-12.046374, -77.042793], 6);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets-basic", //'mapbox.streets',
      accessToken:
        "pk.eyJ1IjoicHNoYXJweCIsImEiOiJjamljbzN0cngwMzAzM3B0ZDZ6aHNiNmRyIn0.2ZAyLQwArDCLoZsT4Ji3EA"
    }
  ).addTo(map);

  var baseballIcon = L.icon({
    iconUrl: "baseball-marker.png",
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
  });

  const onEachFeature = function onEachFeature(feature, layer) {
    var popupContent = null;

    if (feature.properties && feature.properties.NOMBDEP) {
      $template = renderHandlebarsTemplate(
        "#region-popupcontent-template",
        null,
        { properties: feature.properties },
        null,
        true
      );
      popupContent = $template;
    }

    layer.bindPopup(popupContent);
  };

  var myStyle = {
    color: "#ff7800",
    opacity: 0.65
  };

  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);
  var drawControl = new L.Control.Draw({
    draw: {
        polyline:false,
        polygon: false,
        circle:false,
        marker: false,
        circlemarker:false
    }
  });
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;

        overlapCheck(layers[0].layer.getLayers()[0],layer);
 });

 function overlapCheck(baseLayer, drawLayer){
  var baseJson = baseLayer.toGeoJSON(),
      drawJson = drawLayer.toGeoJSON();
     
   var r = turf.booleanOverlap(baseJson,drawJson);
   var rr = turf.intersect(baseJson,drawJson);
   
 }
}

function markers() {
  return {
    markerLocationIcon: L.icon({
      iconUrl: MAP_MARKER_LOCATION,
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [0, -28]
    }),
    markerPinIcon: L.icon({
      iconUrl: MAP_MARKER_PIN,
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [0, -28]
    }),
    markerMapIcon: L.icon({
      iconUrl: MAP_MARKER_2,
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [0, -28]
    })
  };
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

function saveSeccionDetalleRequest($idSeccion, $seccionDetalle) {
  const $url = UrlAPI.base + "/secciones/" + $idSeccion + "/detalle";
  showLoading();
  $.ajax({
    url: $url,
    type: "POST",
    dataType: "json",
    data: $seccionDetalle,
    success: function($response) {
      if (typeof ($response !== "undefined") && $response !== null) {
        if ($response.status) {
          alert("guardado");
        }
      }
    },
    error: function(xhr, status) {},
    complete: function(xhr, status) {
      hideLoading();
    }
  });
}

function generarGraficoProduccion($idElement, cultivo) {  
  const elements = $("#" + $idElement).find(".chart");

  if (elements.length == 0) {
    return;
  }

  const dataAniosPronostico = [];
  const dataAnios = cultivo.producciones.map(x => x.anio);
  const primerAnioPronostico = dataAnios[dataAnios.length-1]+1;

  for (let i = 0; i < ANIOS_PRONOSTICO; i++) {    
    dataAniosPronostico.push(primerAnioPronostico+i);
  }

  const dataValues = cultivo.producciones.map(x => x.produccion);
  const dataRegresion = cultivo.producciones.map(function(d){return {x:d.anio,y:d.produccion};} );
  const dataValuesPronostico = obtenerPronosticoRegresionLineal(dataRegresion,dataAniosPronostico);
  const dataValuesPronosticoProduccion = tranformarDatosPronosticoProduccion(dataValuesPronostico,dataAnios,dataValues);
  const dataValuesPronosticoProduccionTasa = dataValuesPronosticoProduccion.map(produccion=>(produccion!=null?produccion*(TASA_PRODUCCION/100.000):produccion));
  let dataLabels = [];

  dataAnios.forEach(d=>dataLabels.push(d));
  dataAniosPronostico.forEach(d=>dataLabels.push(d));

  var ctx = elements[0];
  var charProduccion = new Chart(ctx, {
    responsive: true,
    type: 'line',
    data: {
      labels: dataLabels,
      datasets: [
        {
          label: "Prod.",
          data: dataValues,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false
        },
        {
          label: "Pronóstico",
          data: dataValuesPronosticoProduccion,
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          borderDash: [1,1]
        },
        {
          label: "Tasa",
          data: dataValuesPronosticoProduccionTasa,
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
          borderDash: [1,1]
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Producción'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: false
            }
          }
        ]
      }
    }
  });

  generarSliderAnioTasa(cultivo,charProduccion);
}

function tranformarDatosPronosticoProduccion(dataValuesPronostico,aniosReales,valoresReales){
  let data = [];

  for (let index = 0; index < aniosReales.length-1; index++) {
    data.push(null);
  }

  data.push(valoresReales[valoresReales.length-1]);

  dataValuesPronostico.forEach(function(pronostico){
    data.push(pronostico.y);
  });

  return data;
}

function actualizarGraficoProduccion(cultivo,charProduccion,rangoAnios,tasa){
  const min = rangoAnios[0];
  const max = rangoAnios[1];
  const ultimoAnioReal = cultivo.producciones[cultivo.producciones.length-1].anio;
  const minProduccionReal = cultivo.producciones.find(produccion=>produccion.anio==min);
  const minReal = minProduccionReal?minProduccionReal.anio:undefined;
  const maxProduccionReal = cultivo.producciones.find(produccion=>produccion.anio==max);
  let maxReal = maxProduccionReal?maxProduccionReal.anio:undefined;
  const minPronostico = (min - ultimoAnioReal)<=0?(ultimoAnioReal+1):min;
  const maxPronostico = (max - ultimoAnioReal)<=0?undefined:max;

  maxReal = maxReal||ultimoAnioReal;

  if(minReal){
    if(maxPronostico){
      let dataAniosPronostico = [];
      const aniosPronostico = (maxPronostico-minPronostico)+1;
      for (let i = 0; i < aniosPronostico; i++) {
        dataAniosPronostico.push(minPronostico+i);
      }
      const dataRegresion =  cultivo.producciones.filter(x => x.anio >= minReal && x.anio <= maxReal).map(function(d){return {x:d.anio,y:d.produccion};} );
      const dataValuesPronostico = obtenerPronosticoRegresionLineal(dataRegresion,dataAniosPronostico);
      const dataValues = cultivo.producciones.map(x => (x.anio >= minReal && x.anio <= maxReal) ?x.produccion:null);
      const dataAnios = cultivo.producciones.map(x=>x.anio);
      const dataValuesPronosticoProduccion = tranformarDatosPronosticoProduccion(dataValuesPronostico,dataAnios,dataValues);
      const dataValuesPronosticoProduccionTasa = dataValuesPronosticoProduccion.map(produccion=>(produccion!=null?produccion*(tasa/100.000):produccion));
      charProduccion.config.data.datasets[0].data = dataValues;
      charProduccion.config.data.datasets[1].data = dataValuesPronosticoProduccion;
      charProduccion.config.data.datasets[2].data = dataValuesPronosticoProduccionTasa;
    }else{
      const dataValues = cultivo.producciones.map(x => (x.anio >= minReal && x.anio <= maxReal) ?x.produccion:null);
      charProduccion.config.data.datasets[0].data = dataValues;
      charProduccion.config.data.datasets[1].data = [];
      charProduccion.config.data.datasets[2].data = [];
    }
  }else{
    charProduccion.config.data.datasets[0].data =[];
    charProduccion.config.data.datasets[1].data = [];
    charProduccion.config.data.datasets[2].data = [];
  }
  charProduccion.update();
}

function generarSliderAnioTasa(cultivo,charProduccion){
  const sliderAnio = $("#sliderAnio");
  const sliderAnioTexto = $("#sliderAnioVal");
  const sliderTasa = $("#sliderTasa");
  const sliderTasaTexto = $("#sliderTasaVal");
  const min = Math.min.apply(Math, cultivo.producciones.map(function(produccion){return produccion.anio}));
  const max = Math.max.apply(Math, cultivo.producciones.map(function(produccion){return produccion.anio}));

  sliderAnio.bootstrapSlider();
  sliderTasa.bootstrapSlider();

  sliderAnio[0].charProduccion = charProduccion;
  sliderAnio[0].cultivo = cultivo;
  sliderAnio.off("change");

  sliderTasa[0].charProduccion = charProduccion;
  sliderTasa[0].cultivo = cultivo;
  sliderTasa.off("change");

  sliderAnio.on("change", function(slideEvt) {
    sliderAnioTexto.text(slideEvt.value.newValue);
    const sliderTasa = $("#sliderTasa");
    actualizarGraficoProduccion(cultivo,charProduccion,slideEvt.value.newValue,sliderTasa.bootstrapSlider('getAttribute','value'));
  });
  sliderTasa.on("change", function(slideEvt) {
    sliderTasaTexto.text(slideEvt.value.newValue);
    const sliderAnio = $("#sliderAnio");
    actualizarGraficoProduccion(cultivo,charProduccion,sliderAnio.bootstrapSlider('getAttribute','value'),slideEvt.value.newValue);
  });

  sliderAnio.bootstrapSlider('setAttribute','min', min);
  sliderAnio.bootstrapSlider('setAttribute', 'max', max +ANIOS_PRONOSTICO);
  sliderAnio.bootstrapSlider('setAttribute','value', [min,max+ANIOS_PRONOSTICO]);
  sliderAnioTexto.text(sliderAnio.bootstrapSlider('getAttribute','value'));
  sliderAnio.bootstrapSlider('refresh');

  sliderTasa.bootstrapSlider('setAttribute','value', TASA_PRODUCCION);
  sliderTasaTexto.text(sliderTasa.bootstrapSlider('getAttribute','value'));
  sliderTasa.bootstrapSlider('refresh');
}

function obtenerPronosticoRegresionLineal(datos,consulta){
  const data = datos.filter(f=>f.x!= null);
  const xs = data.map(d => d.x);
  const ys = data.map(d => d.y);
  const xys = data.map(d => d.x*d.y);
  const xxs = data.map(d => d.x*d.x);
  const yys = data.map(d => d.y*d.y);
  const n = data.length;
  let xsum = 0;
  let ysum = 0;
  let xprom = 0;
  let yprom = 0;
  let xxsum = 0;
  let yysum = 0;
  let xysum = 0;
  let b = 0;
  let a = 0;
  let result = [];

  xs.forEach(function(x){xsum = xsum+x;});
  ys.forEach(function(y){ysum = ysum+parseFloat(y);});
  xprom = xsum/n;
  yprom = ysum/n
  xxs.forEach(function(xx){xxsum = xxsum+xx;});
  yys.forEach(function(yy){yysum = yysum+yy;});
  xys.forEach(function(xy){xysum = xysum+xy;});
  b = (xysum - (n*xprom*yprom))/(xxsum - (n*(xprom*xprom)));
  a = yprom - (b*xprom);

  consulta.forEach(function(x){
    const y = a + (b*x);
    result.push({x:x,y:y});
  });

  return result;
}

function generarGrafico($idElement, data) {
  console.log(data);
  const elements = $("#" + $idElement).find(".chart");

  if (elements.length == 0) {
    return;
  }

  data.grafico = data.tipoGrafico == undefined ? "line" : data.grafico;

  data.grafico = data.tipoGrafico == "lineal" ? "line" : data.grafico;
  data.grafico = data.tipoGrafico == "barras" ? "bar" : data.grafico;

  data.detalle.filter(function(y) {
    return y.eliminado === 0;
  });

  const dataLabels = data.detalle
    .filter(y => y.eliminado === 0)
    .map(x => x.dato);
  const dataValues = data.detalle
    .filter(y => y.eliminado === 0)
    .map(x => x.valor);

  var ctx = elements[0];
  var myChart = new Chart(ctx, {
    responsive: true,
    type: data.grafico,
    data: {
      labels: dataLabels,
      datasets: [
        {
          label: "# " + data.variable,
          data: dataValues,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgb(54, 162, 235)',
          fill: false,
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

function loadRegiones($afterLoadRegiones) {
  $.ajax({
    url: API_REGIONES,
    type: "GET",
    dataType: "json",
    success: function($response) {
      if (typeof ($response !== "undefined") && $response !== null) {
        if ($response.status) {
          const $onceMapIsLoaded = onceMapIsLoaded;
          $afterLoadRegiones($response.data, $onceMapIsLoaded);
        }
      }
    },
    error: function(xhr, status) {},
    complete: function(xhr, status) {}
  });
}

function addLegend($idElement, $seccion) {
  const $map_legend = $("#map-legend");

  //`background-color: ${$myCustomColour};`;

  let seccionHtmlIcon = `<i class="mr-2 fas fa-map-marker-alt" />`;

  console.log($seccion);

  if ($seccion.logo && $seccion.logo != null && $seccion.logo != "") {
    seccionHtmlIcon = `<i class="mr-2 fas"><img v-bind: src="${
      $seccion.logo
    }" alt="" width="24px"></i> `;
  }

  $map_legend.append(
    '&nbsp;<button type="button" class="btn btn-sm btn-light" onClick="removeMarker(' +
      $idElement +
      "," +
      $seccion.id +
      ');" seccion-id="SECCION-' +
      $seccion.id +
      '"> ' +
      seccionHtmlIcon +
      $seccion.nombre +
      ' <span class="badge badge-light"> X </span></button>'
  );
}

function removeLegend($seccionId) {
  const $map_legend = $("#map-legend");
  var $seccionItem = $map_legend.find(
    '[seccion-id="SECCION-' + $seccionId + '"]'
  );
  $seccionItem.remove();
}

function removeMarker($id, $seccionId) {
  const $checkedLayer = layers.find(function($item, $index) {
    if ($item.id === $id) return $item;
  });

  if ($checkedLayer) {
    console.log($checkedLayer);
    console.log(layers);
    console.log(map);
    map.removeLayer($checkedLayer.layer);

    _.remove(layers, function($item) {
      return $item.id === $checkedLayer.id;
    });
  }

  $("#" + $id).prop("checked", false);
  removeLegend($seccionId);
}

function onceMapIsLoaded() {
  mapFeature = new SMIMapFeature(map);

  const $menu_container = $("#menu-sidebar");
  var $items = $menu_container.find("input[type='checkbox'].menu-item");
  const $whenMenuItemIsChecked = function() {
    const $isChecked = $(this).prop("checked");
    const $id = parseInt($(this).prop("id"));

    const $seccion = {};
    $seccion.id = $(this).attr("data-id");
    $seccion.nombre = $(this).attr("data-nombre");
    $seccion.color = $(this).attr("data-color");
    $seccion.logo = $(this).attr("data-logo");
    //const $parent = $(this).data("parent");

    if (!$isChecked) {
      removeMarker($id, $seccion.id);
      return;
    }
    showLoading();
    addLegend($id, $seccion);

    const $addNewLayer = function($id, $layer) {
      layers.push({
        id: $id,
        layer: $layer
      });
    };

    const $styleColor = function($seccion) {
      return {
        color: $seccion.seccion.color,
        weight: 2,
        opacity: 0.7,
        dashArray: "4,2",
        lineJoin: "round"
      };
    };

    const $afterLoadPuntos = function($seccion, $cacheLayer) {
      mapFeature.styleColorDefault = $styleColor($seccion);

      //mapFeature.selectedFeature.removeAllArea();
      //mapFeature.selectedFeature.enable();

      $("#multiple").prop("disabled", false);
      $("#multiple").prop("checked", false);

      const $idSeccion = $seccion.seccion.id;
      const $seccionCodigoGIS = $seccion.seccion.codigoGIS;

      if ($seccion.geoJsonFile && $seccion.geoJsonFile != null) {
        const $onEachFeature = function(feature, layer) {
          var popupContent =
            "<p>I started out as a GeoJSON " +
            feature.geometry.type +
            ", but now I'm a Leaflet vector!</p>";

          layer.on({
            mouseover: function(e) {
              mapFeature.highlightFeature(e, $seccion, $cacheLayer);
            },
            mouseout: function(e) {
              mapFeature.resetHighlightFeature(e, $seccion, $cacheLayer);
            },
            click: function(e) {
              mapFeature.selectLayer(e, $seccion, $cacheLayer);
            }
            //dblclick : selectFeature
          });
        };

        const divIcon = L.divIcon({
          className: "custom-marker",
          html: '<div><i class="fas 3x fa-map-marker-alt"></i></div>',
          iconSize: [128, 128]
        });

        try {
          let $points = JSON.parse($seccion.geoJsonFile);
          const $myCustomColour = $seccion.seccion.color;

          const icon = getIconMarkerPoint($myCustomColour);

          let markers = L.markerClusterGroup({
            maxClusterRadius: 120,
            iconCreateFunction: function(cluster) {
              let childMarkers = cluster.getAllChildMarkers();
              let n = cluster.getChildCount();

              return getIconMarkerCluster(n, $myCustomColour);
            },
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false
          });

          let $geoJsonLayer = L.geoJson($points, {
            style: $styleColor($seccion),
            onEachFeature: $onEachFeature,
            pointToLayer: function(feature, latlng) {
              return L.marker(latlng, { icon: icon });
            }
          });

          let layerMap = null;
          if ($points.features.length > CONSTANTES.MAXIMO_PUNTO_CLUSTER) {
            let contador = 0;
            $geoJsonLayer = L.geoJson($points, {
              style: $styleColor($seccion),
              onEachFeature: $onEachFeature,
              pointToLayer: function(feature, latlng) {
                let pointMarker = L.marker(latlng, {
                  icon: icon
                });

                contador += 1;

                pointMarker.number = contador;

                return pointMarker;
              }
            });

            markers.addLayer($geoJsonLayer);
            map.addLayer(markers);
            layerMap = markers;
          } else {
            $geoJsonLayer.addTo(map);
            layerMap = $geoJsonLayer;
          }

          $cacheLayer($id, layerMap);
          hideLoading();
        } catch (error) {
          console.log(error);
          removeMarker($id, $seccion.seccion.id);
          hideLoading();
          smiMensaje.$refs.message.mensaje.text =
            "Formato de representación geojson inválido.";
          smiMensaje.$refs.message.onMostrarMensaje();
        }
      } else {
        removeMarker($id, $seccion.seccion.id);
        hideLoading();
        smiMensaje.$refs.message.mensaje.text =
          "No se encontró representación para esta opción.";
        smiMensaje.$refs.message.onMostrarMensaje();
      }
    };

    loadSeccion($afterLoadPuntos, $seccion, $addNewLayer);
  };
  $items.on("change", $whenMenuItemIsChecked);
}

function getIconMarkerPoint($myCustomColour) {
  const $markerHtmlStyles = `
                    background-color: ${$myCustomColour};
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
    html: `<span style="${$markerHtmlStyles}" />`
  });

  return icon;
}

function getIconMarkerCluster($n, $myCustomColour) {
  const $markerHtmlStyles = `
                    background-color: ${$myCustomColour};
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
    html: `<span style="${$markerHtmlStyles}" >${$n}</span>`
  });

  return icon;
}

function loadSeccion($afterLoadPuntos, $seccion, $cacheLayer) {
  $.ajax({
    url: API_SECCIONES + "/" + $seccion.id,
    type: "GET",
    dataType: "json",
    success: function($response) {
      if (typeof ($response !== "undefined") && $response !== null) {
        if ($response.status) {
          $afterLoadPuntos($response.data, $cacheLayer);
        }
      }
    },
    error: function(xhr, status) {
      hideLoading();
      smiMensaje.$refs.message.mensaje.text =
        "Ha ocurrido un error no controlado. Consulte al administrador.";
      smiMensaje.$refs.message.onMostrarMensaje();
    },
    complete: function(xhr, status) {}
  });
}

function loadSecciones($afterLoadSecciones) {
  const $urlSecciones = API_SECCIONES;

  $.ajax({
    url: API_SECCIONES,
    type: "GET",
    dataType: "json",
    success: function($response) {
      if (typeof ($response !== "undefined") && $response !== null) {
        if ($response.status) {
          buildSecciones($response.data, $afterLoadSecciones);
        }
      }
    },
    error: function(xhr, status) {},
    complete: function(xhr, status) {}
  });
}

function buildSecciones($secciones, $afterBuildSecciones) {
  $secciones = $secciones.filter(x => x.activo == 1);

  if (typeof $secciones == "undefined" || $secciones === null) return false;
  if (typeof _ == "undefined") throw Exception("No lodash object found");
  $secciones = _.groupBy($secciones, function($item) {
    let key = $item.idSeccionPadre;
    if ($item.idSeccionPadre == null) key = "0";
    return key;
  });

  $cabecera = _.find($secciones, function($item, $key) {
    if ($key === "" || $key == null || $key === "0") return $item;
  });

  $cabecera = _.map($cabecera, function($item, $key) {
    $children = _.filter($secciones, function($children, $subKey) {
      return $item.id == $subKey;
    });
    $item["children"] =
      $children !== null && $children.length > 0 ? $children[0] : [];
    $item["hasChildren"] = $children !== null && $children.length > 0;

    return $item;
  });
  $secciones = _.filter($secciones, function($item, $key) {
    if ($key !== "" || $key !== null) return true;
  });

  // renderHandlebarsTemplate(
  //   "#secciones-template",
  //   "#menu-sidebar",
  //   { secciones: $cabecera },
  //   $afterBuildSecciones,
  //   true
  // );

  Environment.global.secciones = $cabecera;

  smiSeccion.$refs.param.secciones = $cabecera;
  smiSeccion.$refs.param.language = getLanguage();

  setTimeout($afterBuildSecciones, 1000);
}

function getTemplateAjax(path, callback) {
  var source, template;
  $.ajax({
    url: path,
    dataType: "html",
    success: function(data) {
      source = data;
      template = Handlebars.compile(source);
      if (callback) callback(template);
    }
  });
}

function renderHandlebarsTemplate(
  withTemplate,
  inElement,
  withData,
  callback,
  inlineTemplate
) {
  if (typeof inlineTemplate !== "undefined" && inlineTemplate) {
    var targetTemplate =
      typeof withTemplate == "string"
        ? $(withTemplate).html()
        : withTemplate.html();
    template = Handlebars.compile(targetTemplate);
    if (inElement === null || inElement === "") return template(withData);
    var targetDiv = typeof inElement == "string" ? $(inElement) : inElement;
    targetDiv.html(template(withData));
    if (callback) {
      callback();
    }
    return;
  }

  getTemplateAjax(withTemplate, function(template) {
    if (inElement === null || inElement === "") return template(withData);
    var targetDiv = typeof inElement == "string" ? $(inElement) : inElement;
    targetDiv.html(template(withData));
    if (callback) {
      callback();
    }
  });
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

function onSeleccionarPanelFeature(value) {
  console.log(value);
}

function agregarAtributo() {
  let table = $("#table-atributo");

  let $guid = guid();

  let rowTemplate =
    '<tr data-id="' +
    $guid +
    '"><td><input type="text" data-field-id="0" class="atributo-nombre" value=""></td><td><input type="text" data-field-id="0" class="atributo-valor" value=""></td><td><a class="nav-link" style="cursor: pointer;" onClick="quitarAtributo(\'' +
    $guid +
    '\');"><i class="fas fa-trash-alt" ></i></a></td></tr>;';

  table.append(rowTemplate);
}

function quitarAtributo($id) {
  let row = $("#table-atributo").find("[data-id=" + $id + "]");
  row.remove();
}

function saveSeccionDetalleClick() {
  let $seccionDetalle = {};
  let $atributos = [];

  let atributosNombre = $("#modal-content-atributos").find(".atributo-nombre");
  let atributosValor = $("#modal-content-atributos").find(".atributo-valor");

  for (let index = 0; index < atributosNombre.length; index++) {
    let row = {};
    row.id = $(atributosNombre[index]).attr("data-field-id");
    row.nombre = $(atributosNombre[index]).val();
    row.valor = $(atributosValor[index]).val();
    $atributos.push(row);
  }

  let $fields = $("#modal-content-atributos").find(
    "input[data-validate = 'true']"
  );

  $($fields).each(function() {
    $seccionDetalle[$(this).attr("data-field")] = $(this).val();
  });

  $seccionDetalle.atributos = $atributos;

  saveSeccionDetalleRequest($seccionDetalle.idSeccion, $seccionDetalle);
}
