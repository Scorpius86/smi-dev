<?php

namespace smi\Dto;

class SeccionDto
{
    public $idSeccion = 0;
    public $codigoSeccion = '';
    public $nombre = '';
    public $idTipoGeoData = 0;
    public $idSeccionPadre = 0;
    public $geoJsonFile = '';
    public $eliminado = 0;

    public $detalles = [];
    public $forecast;
}
