<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParametroTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::defaultStringLength(191);
        Schema::create('parametro', function (Blueprint $table) {
            $table->increments('id');
            $table->string('codigo')->unique();
            $table->string('nombre');            
            $table->string('valor');
            $table->string('valorJson');
            $table->string('referencia');
            $table->dateTime('fechaCrea');
            $table->string('usuarioCrea');
            $table->string('terminalCrea');
            $table->dateTime('fechaCambio');
            $table->string('usuarioCambio');
            $table->string('terminalCambio');
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
