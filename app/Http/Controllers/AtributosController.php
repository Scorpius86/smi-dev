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

    public function getSeccionDetalleAtributoByIdSeccion($idSeccion, $codigoGIS){
        $result= array('status'=> true, 'data'=> array());

        $detalle=SeccionDetalle::where([['idSeccion','=',$idSeccion],['codigoGIS','=',$codigoGIS]])->first();
        if($detalle <> null){
            $idSeccionDetalle=$detalle->id;
            $detalleAtributo=SeccionAtributo::where([['idSeccionDetalle','=',$idSeccionDetalle]])->get();
            $data=array('detalle'=>$detalle, 'atributos'=> $detalleAtributo);
            $result= array('status'=> true, 'data'=> $data);
        }else{
            //Crear sección detalle
            $newDetalle= new SeccionDetalle;

            error_log(Carbon::now());

            $newDetalle->codigoGIS=$codigoGIS;
            $newDetalle->idSeccion=$idSeccion;
            $newDetalle->codigo='';
            $newDetalle->descripcion='';
            $newDetalle->abreviatura='';
            $newDetalle->nombre='';
            $newDetalle->ubigeo='';
            $newDetalle->activo=1;
            $newDetalle->fechaCrea= Carbon::now();
            $newDetalle->usuarioCrea='admin';
            $newDetalle->terminalCrea='local';
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
        $values= $request->all();
        error_log($request->getHttpHost());        

        error_log($values['codigoGIS']);

        // $seccionDetalle = SeccionDetalle::findOrFail($id);
        // $seccion->activo=0;
        // $seccion->update($request->all());



        $data= array(
            'status'=> true, 
            'data'=> null
        );
        
        $json = json_encode($data); 

        return $data;

    }
}
