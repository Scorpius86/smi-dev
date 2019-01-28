<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::group(['middleware' => 'cors'], function() {
//     Route::get('/mapas/distritos','MapasController@getDistritos' ); 
//  });

Route::group(['middleware' => 'cors'], function() {
    Route::post('/validateLogin','AuthController@validarAcceso' ); 
    Route::post('/authenticate','AuthController@autenticar' ); 
 });

 Route::group(['middleware' => 'cors'], function() {
    Route::get('/secciones','SeccionesController@get');
    Route::get('/secciones/{id}','SeccionesController@getById');
    Route::get('/secciones/{id}/detalle/','SeccionesController@getSeccionDetalleByIdSeccion');
    Route::get('/secciones/{id}/detalle/{codigoGIS}/atributos','AtributosController@getSeccionDetalleAtributoByIdSeccion');
    // Route::get('/secciones/{id}/detalle/panel','SeccionesController@getSeccionDetalleInformacionPanel');

    Route::post('/secciones/detalle/panel','SeccionesController@getSeccionDetalleInformacionPanel');

    Route::get('/secciones/{id}/atributos/','SeccionesController@getSeccionAtributoByIdSeccion');
    Route::post('/secciones','SeccionesController@save');
    Route::post('/secciones/{id}/upload','SeccionesController@uploadFile');
    Route::put('/secciones/{id}','SeccionesController@update');
    Route::delete('/secciones/{id}','SeccionesController@delete');
    Route::post('/secciones/{idSeccion}/detalle','AtributosController@saveMultiple');
    
    Route::get('/parametros','ParametrosController@get');
    Route::get('/parametros/{id}','ParametrosController@getById');
    Route::post('/parametros','ParametrosController@save');

    Route::get('/mapas/regiones','MapasController@getRegiones' );
    Route::get('/mapas/distritos','MapasController@getDistritos' );

    Route::get('/usuarios','UsuarioController@get');
    Route::get('/usuarios/{id}','UsuarioController@getById');
    Route::post('/usuarios','UsuarioController@save');
    Route::delete('/usuarios/{id}','UsuarioController@delete');

 });

Route::get('/status', 'MapasController@test')->name('getStatus');