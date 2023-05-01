<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('status');
            $table->string('priority')->nullable();
            $table->unsignedBigInteger('assignee')->nullable();
            $table->foreign('assignee')->references('id')->on('users')->onDelete('cascade');
            $table->integer('estimated_hours')->nullable();
            $table->date('due_date')->nullable();
            $table->unsignedBigInteger('userid');
            $table->foreign('userid')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('boardid');
            $table->foreign('boardid')->references('id')->on('boards')->onDelete('cascade');
            $table->unsignedBigInteger('projectid');
            $table->foreign('projectid')->references('id')->on('projects')->onDelete('cascade');
            $table->integer('order');
            $table->string('description')->nullable();
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
        Schema::dropIfExists('tasks');
    }
};
