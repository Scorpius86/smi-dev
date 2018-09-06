<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;
use smi\Seccion;

class SeccionDetalle extends Model
{
    protected $table="seccion_detalle";
    protected $primaryKey="id";
    protected $fillable=array('codigoGIS','codigo','descripcion'.'abreviatura','nombre','activo','ubigeo',
    'geoJsonData',
    'fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado');

    public function seccion(){
        $this->belongTo('Seccion');
    }
}
