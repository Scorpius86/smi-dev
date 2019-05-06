<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;
use smi\Seccion;

class SeccionDetalle extends Model
{
    protected $table="seccion_detalle";
    protected $primaryKey="id";
    protected $fillable=array('codigoGIS','codigo','descripcion','abreviatura','nombre','activo','ubigeo','idSeccion',
    'geoJsonData','fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado');

    public function seccion(){
        return $this->belongTo('smi/Seccion','idSeccion');
    }

    public function seccionAtributo(){
        return $this->hasMany(SeccionAtributo::class, 'idSeccionDetalle');
    }
}
