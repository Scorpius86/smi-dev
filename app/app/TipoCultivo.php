<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class TipoCultivo extends Model
{
    protected $table="tipo_cultivo";
    protected $primaryKey="idTipoCultivo";
    protected $fillable=array('nombre');

    public function cultivos(){
        return $this->hasMany(Cultivo::class, 'idTipoCultivo');
    }
}
