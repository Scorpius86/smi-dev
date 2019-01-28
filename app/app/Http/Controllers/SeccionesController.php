<?php

namespace smi\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use smi\Seccion;
use smi\SeccionDetalle;
use smi\SeccionAtributo;
use smi\Forecast;
use smi\Dto\ForecastDto;
use smi\Dto\CultivoDto;
use smi\Dto\TipoCultivoDto;
use smi\Dto\ProduccionDto;
use Carbon\Carbon;

class SeccionesController extends Controller
{
    public function get(){
        $secciones=Seccion::where([['eliminado','=','0']])->get();

        $data= array('status'=> true, 'data'=> $secciones);
        return $data;
    }

    public function getById($idSeccion){
        $baseLogoUrl='/img/seccion/logo/';
        $baseMarkerUrl='/img/seccion/marker/';

        $seccion = Seccion::where([['id','=',$idSeccion]])->with('seccionDetalle')->first();

        $dataGeoJson=null;

        if($seccion->geoJsonFile <> null ){
            $fileName= $seccion->geoJsonFile;
            $baseSrc='/storage/app/public/json//';
            $file= base_path().$baseSrc.($fileName);
            $geoFile = @file_get_contents($file);

            if ($geoFile != false) {
                $dataGeoJson = file_get_contents($file);
            }
            
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

    public function save(Request $request){
        $user='admin';
        $terminal= $request->getHttpHost();

        error_log($request->input('id'));

        $seccion= new Seccion;

        if($request->input('id')==0){            
            $seccion->codigoGIS=$request->input('codigoGIS');
            $seccion->nombre=$request->input('nombre');
            $seccion->nombreIdioma=$request->input('nombreIdioma');
            $seccion->idSeccionPadre=$request->input('idSeccionPadre');
            $seccion->idTipoGeoData=$request->input('idTipoGeoData');
            $seccion->menuCategoria=$request->input('menuCategoria');
            $seccion->menuAccion=$request->input('menuAccion');
            $seccion->idTipoAccion=$request->input('idTipoAccion');
            $seccion->color=$request->input('color');
            $seccion->logo=$request->input('logo');
            $seccion->marker='';
            $seccion->activo=$request->input('activo');
            $seccion->fechaCrea= Carbon::now();
            $seccion->usuarioCrea=$user;
            $seccion->terminalCrea=$terminal;
            $seccion->fechaCambio=null;
            $seccion->usuarioCambio=null;
            $seccion->terminalCambio=null;
            $seccion->eliminado=0; 
            $seccion->save();
        }
        else{
            $seccion = Seccion::find($request->input('id'));
            $seccion->codigoGIS=$request->input('codigoGIS');
            $seccion->nombre=$request->input('nombre');
            $seccion->nombreIdioma=$request->input('nombreIdioma');
            $seccion->idSeccionPadre=$request->input('idSeccionPadre');
            $seccion->idTipoGeoData=$request->input('idTipoGeoData');
            $seccion->menuCategoria=$request->input('menuCategoria');
            $seccion->menuAccion=$request->input('menuAccion');
            $seccion->idTipoAccion=$request->input('idTipoAccion');
            $seccion->color=$request->input('color');
            $seccion->logo=$request->input('logo');
            $seccion->marker='';
            $seccion->activo=$request->input('activo');
            $seccion->fechaCambio=Carbon::now();
            $seccion->usuarioCambio=$user;
            $seccion->terminalCambio=$terminal;
            $seccion->eliminado=0; 
            $seccion->save();

        }
        
        $data= array('status'=> true, 'data'=> $seccion);
        return $data;
    }

    public function update(Request $request, $id){

        $seccion = Seccion::findOrFail($id);
        $seccion->update($request->all());

        $data= array('status'=> true, 'data'=> $seccion);
        return $data;
    }

    public function delete(Request $request, $id){
        error_log($id);
        $seccion = Seccion::findOrFail($id);
        $seccion->eliminado=1;
        $seccion->save();

        $data= array('status'=> true, 'data'=> $seccion);
        return $data;
    }

    public function uploadFile(Request $request, $id){

        $pathBase= 'public/json/';

        $seccion = Seccion::findOrFail($id);
        $fileName= "Seccion-".$id."-file.geojson";

        error_log(Storage::exists($pathBase.$fileName));

        if(Storage::exists($pathBase.$fileName)){
           //Eliminar
           Storage::delete($pathBase.$fileName); 
        }
        
        $path = $request->file('file')->storeAs($pathBase, $fileName);
        $seccion->activo=0;
        $seccion->geoJsonFile=$fileName;
        $seccion->save();

        $data= array('status'=> true, 'data'=> $seccion);

        return $data;
    }

    public function getSeccionDetalleInformacionPanel(Request $request){
        $forecastDto = new ForecastDto();

        $listCodigoGIS=$request->input('listCodigoGIS');

        $path=base_path() . '/storage/app/public/json/data-panel.json';

        $jsonData = json_decode(file_get_contents($path), true);       
        
        if( count($listCodigoGIS)>1){            
            $tipoCultivos=Forecast::where([['forecast.eliminado','=','0'] ])
                ->join('cultivo','cultivo.idForecast','forecast.id')
                ->join('tipo_cultivo','tipo_cultivo.idTipoCultivo','cultivo.idTipoCultivo')
                ->select('tipo_cultivo.idTipoCultivo','tipo_cultivo.nombre')
                ->whereIn('forecast.codigoGIS',$listCodigoGIS)
                ->groupBy('tipo_cultivo.idTipoCultivo','tipo_cultivo.nombre')
                ->get();

            $producciones=Forecast::where([['forecast.eliminado','=','0'] ])
                ->join('cultivo','cultivo.idForecast','forecast.id')
                ->join('tipo_cultivo','tipo_cultivo.idTipoCultivo','cultivo.idTipoCultivo')
                ->join('produccion','produccion.idCultivo','cultivo.id')
                ->select('tipo_cultivo.idTipoCultivo','tipo_cultivo.nombre','produccion.anio')
                ->selectRaw('sum(produccion.produccion) as produccion,sum(produccion.productividad) as productividad,sum(produccion.area) area')
                ->whereIn('forecast.codigoGIS',$listCodigoGIS)
                ->groupBy('tipo_cultivo.idTipoCultivo','tipo_cultivo.nombre','produccion.anio')
                ->get();
            
            $forecastDto->cultivos = $tipoCultivos->map(function($tipoCultivo) use($producciones){
                $tipoCultivoDto = new TipoCultivoDto();
                $tipoCultivoDto->idTipoCultivo = $tipoCultivo->idTipoCultivo;
                $tipoCultivoDto->nombre = $tipoCultivo->nombre;

                $cultivoDto = new CultivoDto();
                $cultivoDto->nombre = $tipoCultivo->nombre;
                $cultivoDto->abreviatura = $tipoCultivo->nombre;
                $cultivoDto->idTipoCultivo = $tipoCultivo->idTipoCultivo;
                $cultivoDto->tipoCultivo = $tipoCultivoDto;

                $cultivoDto->producciones = $producciones->filter(function ($produccion) use($tipoCultivo) {
                    return $produccion->idTipoCultivo == $tipoCultivo->idTipoCultivo;
                })->map(function($produccion){
                    $produccionDto = new ProduccionDto();
                    $produccionDto->anio = $produccion->anio;
                    $produccionDto->produccion = $produccion->produccion;
                    $produccionDto->productividad = $produccion->productividad;
                    $produccionDto->area = $produccion->area;
                    return $produccionDto;
                });
                return $cultivoDto;
            });

            $forecast = $forecastDto;
        }else{
            $forecast=Forecast::where([['forecast.eliminado','=','0'] ]);
            $forecast=$forecast -> whereIn('forecast.codigoGIS',$listCodigoGIS);
            $forecast=$forecast -> with(
                [
                    'cultivos.tipoCultivo',
                    'cultivos.producciones'
                ]
            )->first();

            if($forecast){
                $forecastDto->id = $forecast->id;
                $forecastDto->nombre = $forecast->nombre;
                $forecastDto->codigoGIS = $forecast->codigoGIS;
                $forecastDto->eliminado = $forecast->eliminado;

                $forecastDto->cultivos = $forecast->cultivos->map(function($cultivo){
                    $tipoCultivoDto = new TipoCultivoDto();
                    $tipoCultivoDto->idTipoCultivo = $cultivo->tipoCultivo->idTipoCultivo;
                    $tipoCultivoDto->nombre = $cultivo->tipoCultivo->nombre;

                    $cultivoDto = new CultivoDto();
                    $cultivoDto->id = $cultivo->id;
                    $cultivoDto->nombre = $cultivo->nombre;
                    $cultivoDto->abreviatura = $cultivo->abreviatura;
                    $cultivoDto->idForecast = $cultivo->idForecast;
                    $cultivoDto->eliminado = $cultivo->eliminado;
                    $cultivoDto->idTipoCultivo = $cultivo->idTipoCultivo;
                    $cultivoDto->tipoCultivo = $tipoCultivoDto;

                    $cultivoDto->producciones = $cultivo->producciones->map(function($produccion){
                        $produccionDto = new ProduccionDto();
                        $produccionDto->idProduccion = $produccion->idProduccion;
                        $produccionDto->idCultivo = $produccion->idCultivo;
                        $produccionDto->anio = $produccion->anio;
                        $produccionDto->produccion = $produccion->produccion;
                        $produccionDto->productividad = $produccion->productividad;
                        $produccionDto->area = $produccion->area;
                        return $produccionDto;
                    });
                    return $cultivoDto;
                });

                $forecast = $forecastDto;
            }
        }

        $jsonData=$forecast;
        
        $data= array(
            'status'=> true, 
            'data'=> $jsonData
        );
        return $data;
    }

    
}
