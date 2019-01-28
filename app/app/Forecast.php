<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Forecast extends Model
{
    protected $table="forecast";
    protected $primaryKey="id";
    protected $fillable=array('nombre','codigoGIS','eliminado');

    public function cultivos(){
        return $this->hasMany(Cultivo::class,'idForecast');
    }
}
