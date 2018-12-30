<?php

namespace smi\Http\Controllers;

use Illuminate\Http\Request;

class MapasController extends Controller
{
    //
    public function getDistritos(){
        //$path = storage_path() . "/json/${filename}.json";
        $path=base_path() . '/storage/app/public/json/peru_departamental_simple.geojson';

        $jsonData = json_decode(file_get_contents($path), true);
        
        $data= array(
            'status'=> true, 
            'data'=> $jsonData
        );
        return $data;
    }

    public function getRegiones(){
        //$path = storage_path() . "/json/${filename}.json";
        $path=base_path() . '/storage/app/public/json/peru_departamental_simple.geojson';

        $jsonData = json_decode(file_get_contents($path), true);
        
        $data= array(
            'status'=> true, 
            'data'=> $jsonData
        );
        return $data;
    }

    public function test(){
        $json= "{\"status\":true}";
        return $json;
    }
}
