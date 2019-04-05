<?php
namespace smi\Http\Controllers;
use smi\TipoInfraestructura;

class TipoInfraController extends Controller
{
    public function get()
    {
        $tipoInfra = TipoInfraestructura::where([['eliminado', '=', '0']])->get();

        $data = array('status' => true, 'data' => $tipoInfra);
        return $data;
    }
}
?>