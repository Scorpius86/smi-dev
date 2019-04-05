<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;
use smi\SeccionDetalle;

class Seccion extends Model
{
    protected $table="seccion";
    protected $primaryKey="id";
    protected $fillable=array('CodigoSeccion','codigoGIS','nombre' ,'nombreIdioma','idTipoGeoData','menuCategoria',
    'menuAccion','idTipoAccion','idSeccionPadre','activo',
    'geoJsonFile', 'geoJsonData', 'logo','marker','color',
    'fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado','idTipoInfra');

    public function seccionPadre(){
        return $this->belongTo('Seccion');
    }

    public function seccionDetalle(){
        return $this->hasMany(SeccionDetalle::class, 'idSeccion');
    }

    public function setDetalleAttribute($value)
    {
        $this->attributes['detalle'] ='';
    }

}
