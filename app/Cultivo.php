<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Cultivo extends Model
{
    protected $table="cultivo";
    protected $primaryKey="id";
    protected $fillable=array('nombre',
    'abreviatura','tasa','precio','idForecast','eliminado');

    public function forecast(){
        return $this->belongsTo('smi/Forecast','idForecast');
    }
}
