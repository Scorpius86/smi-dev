<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class UsuarioAcceso extends Model
{
    protected $table="usuarioAcceso";
    protected $primaryKey="id";
    protected $fillable=array('idUsuario','fecha',
    'fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado');

    public function perfil(){
        $this->belongTo('Perfil');
    }
}
