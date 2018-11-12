<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;
use smi\SeccionDetalle;

class Seccion extends Model
{
    protected $table="seccion";
    protected $primaryKey="id";
    protected $fillable=array('codigoGIS','nombre' ,'nombreIdioma','idTipoGeoData','menuCategoria',
    'menuAccion','idTipoAccion','idSeccionPadre','activo',
    'geoJsonFile', 'geoJsonData', 'logo','marker','color',
    'fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado');

    public function seccionPadre(){
        $this->belongTo('Seccion');
    }

    public function seccionDetalle(){
        $this->hasMany('SeccionDetalle');
    }

    public function setDetalleAttribute($value)
    {
        $this->attributes['detalle'] ='';
    }

}
