<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class SeccionAtributo extends Model
{
    protected $table="seccion_atributo";
    protected $primaryKey="id";
    protected $fillable=array('codigoGIS','nombre','valor','idTipoDato','idSeccion','idAtributo',
    'fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado');

    public function seccion(){
        $this->belongTo('Seccion');
    }
}
