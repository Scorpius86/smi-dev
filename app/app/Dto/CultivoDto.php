<?php

namespace smi\Dto;

use smi\Dto\Produccion;
use smi\Dto\TipoCultivo;

class CultivoDto
{
    public $id = 0;
    public $nombre = '';
    public $abreviatura = '';
    public $tasa = '';
    public $precio = '';
    public $idForecast = 0;
    public $eliminado = 0;
    public $idTipoCultivo = 0;

    //public $tasas = [];
    public $producciones = [];
    public $tipoCultivo; 
}
