<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Proyeccion extends Model
{
    protected $table="proyeccion";
    protected $primaryKey="id";
    protected $fillable=array('tipoGrafico',
    'variable','abreviatura','idTasa','eliminado');

    public function tasa(){
        return $this-> belongsTo(Tasa::class, 'idTasa');
    }

    public function detalle(){
        return $this-> hasMany(ProyeccionDetalle::class, 'idProyeccion');
    }
}
