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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

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
    Route::get('/secciones/{id}/detalle/{codigoGIS}/atributos','SeccionesController@getSeccionDetalleAtributoByIdSeccion');
    Route::get('/secciones/{id}/detalle/{codigoGIS}/panel','SeccionesController@getSeccionDetalleInformacionPanel');
    Route::get('/secciones/{id}/atributos/','SeccionesController@getSeccionAtributoByIdSeccion');
    Route::post('/secciones','SeccionesController@save');

    Route::put('/secciones/{id}','SeccionesController@update');
    Route::delete('/secciones/{id}','SeccionesController@delete');

    Route::get('/mapas/regiones','MapasController@getRegiones' );
    Route::get('/mapas/distritos','MapasController@getDistritos' );
 });

Route::get('/status', 'MapasController@test')->name('getStatus');