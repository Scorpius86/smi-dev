<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeccionDetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Schema::defaultStringLength(191);
        Schema::create('seccion_detalle', function (Blueprint $table) {
            $table->increments('id');
            $table->string('codigoGIS');
            $table->string('codigo');
            $table->string('descripcion'); 
            $table->string('abreviatura'); 
            $table->string('nombre'); 
            $table->string('idSeccion')->nullable();
            $table->string('ubigeo');
            $table->string('geoJsonData')->nullable();
            $table->dateTime('fechaCrea');
            $table->string('usuarioCrea');
            $table->string('terminalCrea');
            $table->dateTime('fechaCambio')->nullable();
            $table->string('usuarioCambio')->nullable();
            $table->string('terminalCambio')->nullable();
            $table->integer('activo');
            $table->integer('eliminado');            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
