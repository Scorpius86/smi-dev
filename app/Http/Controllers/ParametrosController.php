<?php

namespace smi\Http\Controllers;

use Illuminate\Http\Request;
use smi\Parametro;
use Carbon\Carbon;

class ParametrosController extends Controller
{
    public function get(){
        $parametros=Parametro::where([['activo','=','1'],['eliminado','=','0']])->get();
        $data= array('status'=> true, 'data'=> $parametros);
        return $data;
    }

    public function getById($id){
        $parametro = Parametro::find($id);
      
        $data= array(
            'status'=> true, 
            'data'=> $parametro         
        );
        return $data;
    }

    public function save(Request $request){
        $user='admin';
        $terminal= $request->getHttpHost();
        
        if($request->input('parametros') != null && count($request->input('parametros'))>0){
            foreach($request->input('parametros') as $key => $item)
            {
                if($item['id'] != 0){
                    $parametro= Parametro::findOrFail($item['id']);
                    $parametro->valor=$item['valor'];
                    $parametro->fechaCambio=Carbon::now();
                    $parametro->usuarioCambio=$user;
                    $parametro->terminalCambio=$terminal;
                    $parametro->eliminado=0;
                    $parametro->save();
                }                            
            }
        }

        $data= array(
            'status'=> true, 
            'data'=> null
        );
        
        $json = json_encode($data); 

        return $json;

    }
}
