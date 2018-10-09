<?php

namespace smi\Http\Controllers;

use Illuminate\Http\Request;
use smi\Usuario;
use Carbon\Carbon;

class UsuarioController extends Controller
{
    public function get(){
        $usuarios=Usuario::where([['eliminado','=','0']])->get();        
        $data= array('status'=> true, 'data'=> $usuarios);
        return $data;
    }
    public function getById($id){
        $usuario=Usuario::find($id)->get();
        $data= array('status'=> true, 'data'=> $usuario);
        return $data;
    }
    public function save(Request $request){
        $user='admin';
        $passwordDefault='c@c@operu1234';
        $terminal= $request->getHttpHost();

        $usuario= new Usuario;

        if($request->input('id')==0){            
            $usuario->login=$request->input('login');
            $usuario->password=$passwordDefault;
            $usuario->nombre=$request->input('nombre');
            $usuario->idPerfil=$request->input('idPerfil');
            $usuario->telefono=$request->input('telefono');
            $usuario->email=$request->input('email');
            $usuario->esAdmin=$request->input('esAdmin');           
            $usuario->activo=$request->input('activo');
            $usuario->fechaCrea= Carbon::now();
            $usuario->usuarioCrea=$user;
            $usuario->terminalCrea=$terminal;
            $usuario->fechaCambio=null;
            $usuario->usuarioCambio=null;
            $usuario->terminalCambio=null;
            $usuario->eliminado=0; 
            $usuario->save();
        }
        else{
            $usuario = Usuario::findOrFail($request->input('id'));
            //$usuario->login=$request->input('login');
            //$usuario->password=$request->input('password');
            $usuario->nombre=$request->input('nombre');
            $usuario->idPerfil=$request->input('idPerfil');
            $usuario->telefono=$request->input('telefono');
            $usuario->email=$request->input('email');
            $usuario->esAdmin=$request->input('esAdmin');           
            $usuario->activo=$request->input('activo');
            $usuario->fechaCambio=Carbon::now();
            $usuario->usuarioCambio=$user;
            $usuario->terminalCambio=$terminal;
            $usuario->eliminado=0; 
            $usuario->save();

        }
        
        $data= array('status'=> true, 'data'=> $usuario);
        return $data;
    }

    public function delete($id){
        $usuario = Usuario::findOrFail($id);
        $usuario->eliminado=1;
        $usuario->save();

        $data= array('status'=> true, 'data'=> $usuario);
        return $data;
    }
}
