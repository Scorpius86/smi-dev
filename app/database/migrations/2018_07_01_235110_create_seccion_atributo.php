<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeccionAtributo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seccion_atributo', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->string('valor'); 
            $table->string('idTipoDato');
            $table->string('idSeccion')->nullable();
            $table->string('idAtributo')->nullable();
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
