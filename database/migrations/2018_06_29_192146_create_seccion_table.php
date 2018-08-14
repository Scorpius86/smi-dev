<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeccionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::defaultStringLength(191);
        Schema::create('seccion', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->string('descripcion');            
            $table->string('idTipoGeoData')->nullable();
            $table->integer('menuCategoria');
            $table->integer('menuAccion');
            $table->string('idTipoAccion')->nullable();
            $table->string('idSeccionPadre')->nullable();
            $table->string('geoJsonData')->nullable();
            $table->string('geoJsonFile')->nullable();
            $table->string('logo')->nullable();
            $table->string('marker')->nullable();
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
