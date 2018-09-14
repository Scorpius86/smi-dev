<?php

namespace smi\Http\Controllers;

use Illuminate\Http\Request;
use smi\Parametro;
use Carbon\Carbon;

class ParametrosController extends Controller
{
    public function get(){
        $parametros=Seccion::where([['activo','=','1'],['eliminado','=','0']])->get();
        $data= array('status'=> true, 'data'=> $parametros);
        return $data;
    }

    public function getById($id){
        $parametro = Seccion::find($id);
      
        $data= array(
            'status'=> true, 
            'data'=> $parametro         
        );
        return $data;
    }
}
