<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Proyeccion extends Model
{
    protected $table="proyeccion";
    protected $primaryKey="id";
    protected $fillable=array('tipoGrafico',
    'variable','abreviatura','idCultivo','eliminado');

    public function cultivo(){
        return $this-> belongsTo(Cultivo::class, 'idCultivo');
    }

    public function detalle(){
        return $this-> hasMany(ProyeccionDetalle::class, 'idProyeccion');
    }
}
