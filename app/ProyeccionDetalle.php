<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class ProyeccionDetalle extends Model
{
    protected $table="proyeccion_detalle";
    protected $primaryKey="id";
    protected $fillable=array('dato',
    'valor','idProyeccion','eliminado');

    public function proyeccion(){
        return $this->belongTo(Proyeccion::class, 'idProyeccion');
    }

}
