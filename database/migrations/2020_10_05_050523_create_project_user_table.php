<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_user', function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->index();
            $table->foreign("user_id")->on("users")->references("id")->onDelete("cascade");
            $table->unsignedBigInteger("project_id")->index();
            $table->foreign("project_id")->on("projects")->references("id")->onDelete("cascade");
            $table->boolean("master")->default(false);
            $table->index(["user_id", "project_id"]);
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
        Schema::dropIfExists('project_user');
    }
}
