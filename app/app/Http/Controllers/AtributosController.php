<?php

namespace smi\Http\Controllers;

use Illuminate\Http\Request;
use smi\Seccion;
use smi\SeccionDetalle;
use smi\SeccionAtributo;
use Carbon\Carbon;

class AtributosController extends Controller
{
    //

    public function getSeccionDetalleAtributoByIdSeccion(Request $request, $idSeccion, $codigoGIS){

        $user='admin';
        $terminal= $request->getHttpHost();
        
        $result= array('status'=> true, 'data'=> array());

        $detalle=SeccionDetalle::where([['idSeccion','=',$idSeccion],['codigoGIS','=',$codigoGIS]])->first();
        if($detalle <> null){
            $idSeccionDetalle=$detalle->id;
            $detalleAtributo=SeccionAtributo::where([['idSeccionDetalle','=',$idSeccionDetalle], ['eliminado','=','0']])->get();
            $data=array('detalle'=>$detalle, 'atributos'=> $detalleAtributo);
            $result= array('status'=> true, 'data'=> $data);
        }else{
            //Crear sección detalle
            $newDetalle= new SeccionDetalle;
            $newDetalle->codigoGIS=$codigoGIS;
            $newDetalle->idSeccion=$idSeccion;
            $newDetalle->codigo='';
            $newDetalle->descripcion='';
            $newDetalle->abreviatura='';
            $newDetalle->nombre='';
            $newDetalle->ubigeo='';
            $newDetalle->activo=1;
            $newDetalle->fechaCrea= Carbon::now();
            $newDetalle->usuarioCrea=$user;
            $newDetalle->terminalCrea=$terminal;
            $newDetalle->fechaCambio=null;
            $newDetalle->usuarioCambio=null;
            $newDetalle->terminalCambio=null;
            $newDetalle->eliminado=0; 

            $newDetalle->save();

            $data=array('detalle'=>$newDetalle, 'atributos'=> null);
            $result= array('status'=> true, 'data'=> $data);

        }
        
        return $result;

    }

    public function saveMultiple(Request $request, $idSeccion){
        $user='admin';
        $terminal= $request->getHttpHost();

        $seccionDetalle = SeccionDetalle::findOrFail( $request->input('idSeccionDetalle'));
        $seccionDetalle->nombre=$request->input('nombre'); 
        $seccionDetalle->abreviatura=$request->input('abreviatura'); 
        $seccionDetalle->descripcion=$request->input('descripcion');         
        $seccionDetalle->fechaCambio=Carbon::now();
        $seccionDetalle->usuarioCambio=$user;
        $seccionDetalle->terminalCambio=$terminal;
        $seccionDetalle->save();

        //Actualizar a eliminado los atributos actuales
        $atributosActuales=SeccionAtributo::where([['idSeccionDetalle','=',$seccionDetalle->id]])->get();
        foreach ($atributosActuales as $key => $atributoActual) {
            $atributoActual->eliminado=1;
            $atributoActual->fechaCambio=Carbon::now();
            $atributoActual->usuarioCambio=$user;
            $atributoActual->terminalCambio=$terminal;
            $atributoActual->save();
        }

        if($request->input('atributos') != null && count($request->input('atributos'))>0){
            foreach($request->input('atributos') as $key => $item)
            {
                if($item['id'] != 0){
                    $atributo= SeccionAtributo::findOrFail($item['id']);
                    $atributo->nombre=$item['nombre'];
                    $atributo->valor=$item['valor'];
                    $atributo->idTipoDato=1;
                    $atributo->fechaCambio=Carbon::now();
                    $atributo->usuarioCambio=$user;
                    $atributo->terminalCambio=$terminal;
                    $atributo->eliminado=0;
                    $atributo->save();
                }
                else{
                    $newAtributo= new SeccionAtributo;
                    $newAtributo->nombre=$item['nombre'];
                    $newAtributo->valor=$item['valor'];
                    $newAtributo->idTipoDato=1;
                    $newAtributo->fechaCrea= Carbon::now();
                    $newAtributo->usuarioCrea=$user;
                    $newAtributo->terminalCrea=$terminal;    
                    $newAtributo->activo=1;
                    $newAtributo->eliminado=0;
                    $newAtributo->idSeccionDetalle=$seccionDetalle->id;
                    $newAtributo->idSeccion=$seccionDetalle->idSeccion;
                    $newAtributo->idAtributo=null;
                    $newAtributo->codigoGIS=null;               
                    $newAtributo->save();
                }                
            }
        }

        $data= array(
            'status'=> true, 
            'data'=> null
        );
        
        $json = json_encode($data); 

        return $data;

    }
}
