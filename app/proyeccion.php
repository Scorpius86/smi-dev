<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Proyeccion extends Model
{
    protected $table="proyeccion";
    protected $primaryKey="id";
    protected $fillable=array('tipoGrafico',
    'variable','abreviatura','idCultivo','eliminado');
}
