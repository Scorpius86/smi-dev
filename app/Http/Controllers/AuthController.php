<?php

namespace smi\Http\Controllers;

use Illuminate\Http\Request;
use smi\Parametro;
use smi\Usuario;
use smi\config\enums;

class AuthController extends Controller
{
    public function validarAcceso(){
        $resultado=false;
        try{

            $codigoParametro='ACTIVAR_AUTENTICACION_PUBLICA'; //Config::get('enums.parametroEmuns.ActivarAutenticacionPublica');
            $parametroAutenticacion= $this->getByCodigo($codigoParametro);

            if($parametroAutenticacion->valor=='1'){
                $resultado= true;
            }

            $data= array('status'=> true, 'showLogin'=> $resultado);

            $json = json_encode($data); 
            return $json;
            
       }catch(Exception $e){
            report($e);
            return $resultado;
        }
        
    }

    public function autenticar(Request $request){
        $usuario= $this->getAutenticatedUser($request->input('username'), $request->input('password'));

        if($usuario != null ){

            $json = json_encode($usuario); 
    
            $data= array(
                'status'=> true, 
                'data'=> array(
                    'id'=>$usuario->id,
                    'nombre'=>$usuario->nombre,
                    'login'=>$usuario->email
                )
            );
    
        }
        else{
            $data= array(
                'status'=> false, 
                'data'=> null,
                'error'=>'Usuario o clave inválidos'
            );

        }

        return $data;
    }

    public function get($id){
        $parametro=Parametro::find($id);
        return $parametro;
    }

    public function getByCodigo($codigo){
        $parametro=Parametro::where('codigo','=',$codigo)->first();
        return $parametro;
    }

    public function getAutenticatedUser($login, $password){
        $user= Usuario::where([['login','=',$login],['password','=',$password]])->first();
        return $user;
    }
}
