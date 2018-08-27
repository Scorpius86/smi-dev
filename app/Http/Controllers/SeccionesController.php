<?php

namespace smi\Http\Controllers;

use Illuminate\Http\Request;
use smi\Seccion;
use smi\SeccionDetalle;
use smi\SeccionAtributo;

class SeccionesController extends Controller
{
    public function get(){
        $secciones=Seccion::where([['activo','=','1'],['eliminado','=','0']])->get();
        $data= array('status'=> true, 'data'=> $secciones);
        return $data;
    }

    public function getById($idSeccion){
        $baseLogoUrl='/img/seccion/logo/';
        $baseMarkerUrl='/img/seccion/marker/';


        $seccion = Seccion::find($idSeccion);

        $dataGeoJson=null;

        if($seccion->geoJsonFile <> null ){
            $fileName= $seccion->geoJsonFile;
            $baseSrc='/storage/app/public/json//';
            $file= base_path().$baseSrc.($fileName);
            $dataGeoJson = file_get_contents($file);
        }

        $logoUrl=null;
        $fullLogoUrl=null;
        if($seccion->logo <> null){
            $fullLogoUrl= url('/').$baseLogoUrl.($seccion->logo);
            $logoUrl= $baseLogoUrl.($seccion->logo);
        }else{
            $fullLogoUrl= url('/').$baseLogoUrl.('logo-default.png');
            $logoUrl= $baseLogoUrl.('logo-default.png');
        }

        $markerUrl=null;
        $fullMarkerUrl=null;
        if($seccion->marker <> null){
            $fullMarkerUrl= url('/').$baseMarkerUrl.($seccion->marker);
            $markerUrl= $baseMarkerUrl.($seccion->marker);
        }else{
            $fullMarkerUrl= url('/').$baseMarkerUrl.('marker-default.svg');
            $markerUrl= $baseMarkerUrl.('marker-default.svg');
        }

        $data= array(
            'status'=> true, 
            'data'=> array(
                'seccion' => $seccion,
                'geoJsonFile'=> $dataGeoJson,
                'fullLogoUrl'=> $fullLogoUrl,
                'logoUrl'=> $logoUrl,
                'fullMarkerUrl'=> $fullMarkerUrl,
                'markerUrl'=> $markerUrl
            )            
        );
        return $data;
    }

    public function getSeccionDetalleByIdSeccion($idSeccion){
        $detalleSeccion=SeccionDetalle::where([['idSeccion','=',$idSeccion]])->get();

        $data= array(
            'status'=> true, 
            'data'=> $detalleSeccion            
        );
        
        $json = json_encode($data); 

        return $data;
    }

    public function getSeccionAtributoByIdSeccion($idSeccion){
        $detalleAtributo=SeccionAtributo::where([['idSeccion','=',$idSeccion]])->get();
        $data= array('status'=> true, 'data'=> $detalleAtributo);
        return $data;
    }

    public function save(Request $request){

        error_log('save');
        error_log($request);

        return Seccion::create($request->all());
    }

    public function update(Request $request, $id){

        error_log('update');    
        error_log($request);

        $seccion = Seccion::findOrFail($id);
        $seccion->update($request->all());

        return $seccion;
    }

    public function delete(Request $request, $id){
        $seccion = Seccion::findOrFail($id);
        $seccion->activo=0;
        $seccion->update($request->all());

        return $seccion;
    }

    public function uploadFile(Request $request){
        $seccion = Seccion::findOrFail($id);
        $seccion->activo=0;
        $seccion->update($request->all());

        return $seccion;
    }

    
}
