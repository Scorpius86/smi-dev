<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table="usuario";
    protected $primaryKey="id";
    protected $fillable=array('login','password','nombre','idPerfil','telefono','email','esAdministrador',
    'fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado');

    public function perfil(){
        $this->belongTo('Perfil');
    }

}
