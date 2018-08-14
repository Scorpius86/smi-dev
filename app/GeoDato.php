<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class GeoDato extends Model
{
    protected $table="geodato";
    protected $primaryKey="id";
    protected $fillable=array('idSeccion','idSeccionDetalle'.'idTipoGeoData','dataJson','jsonFile',
    'fechaCrea','usuarioCrea','terminalCrea','fechaCambio','usuarioCambio','terminalCambio','eliminado');
}
