<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGeodatoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('geodato', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idSeccion');
            $table->integer('idSeccionDetalle')->nullable(); 
            $table->string('idTipoGeodata')->nullable(); 
            $table->string('dataJson')->nullable(); 
            $table->string('jsonFile')->nullable();
            $table->dateTime('fechaCrea');
            $table->string('usuarioCrea');
            $table->string('terminalCrea');
            $table->dateTime('fechaCambio')->nullable();
            $table->string('usuarioCambio')->nullable();
            $table->string('terminalCambio')->nullable();
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
