<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Parametro extends Model
{
    protected $table ='parametro';
    protected $primaryKey='id';
    protected $fillable=array('nombre','codigo','valor','valorJson','referencia',
    'fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado');

}
