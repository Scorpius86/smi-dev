<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    protected $table="perfil";
    protected $primaryKey="id";
    protected $fillable=array('nombre',
    'fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado');

    public function perfil(){
        $this->belongTo('Perfil');
    }
}
