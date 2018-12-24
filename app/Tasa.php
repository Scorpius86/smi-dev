<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Tasa extends Model
{
    protected $table="tasa";
    protected $primaryKey="id";
    protected $fillable=array('idCultivo','tasa','tasaValor','eliminado');

    public function cultivo(){
        return $this->belongsTo('smi/Cultivo','idCultivo');
    }

    public function proyecciones(){
        return $this->hasMany(Proyeccion::class,'idTasa');
    }
}
