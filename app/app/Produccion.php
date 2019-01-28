<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Produccion extends Model
{
    protected $table="produccion";
    protected $primaryKey="idProduccion";
    protected $fillable=array('idCultivo','anio','produccion','productividad','area');

    public function cultivo(){
        return $this-> belongsTo(Cultivo::class, 'idCultivo');
    }
}
