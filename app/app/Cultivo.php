<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;
use smi\TipoCultivo;

class Cultivo extends Model
{
    protected $table="cultivo";
    protected $primaryKey="id";
    protected $fillable=array('nombre','abreviatura','idTipoCultivo','tasa','precio','idForecast','eliminado');

    public function forecast(){
        return $this->belongsTo('smi/Forecast','idForecast');
    }

    public function tipoCultivo(){
        return $this->belongsTo(TipoCultivo::class,'idTipoCultivo');
    }

    public function tasas(){
        return $this->hasMany(Tasa::class,'idCultivo');
    }

    public function producciones(){
        return $this->hasMany(Produccion::class, 'idCultivo');
    }
}
