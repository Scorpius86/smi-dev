<?php

namespace smi\Dto;

use smi\Dto\Cultivo;

class ForecastDto
{
    public $id = 0;
    public $nombre = '';
    public $codigoGIS = '';
    public $eliminado = 0;

    public $cultivos = [];
}
