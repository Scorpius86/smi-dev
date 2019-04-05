<?php

namespace smi;

use Illuminate\Database\Eloquent\Model;

class TipoInfraestructura extends Model
{
    protected $table="tipo_infraestructura";
    protected $primaryKey="id";
    protected $fillable=array('descripcion','eliminado');
}
