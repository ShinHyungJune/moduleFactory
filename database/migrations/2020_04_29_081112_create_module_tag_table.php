<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModuleTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('module_tag', function (Blueprint $table) {
            $table->unsignedBigInteger("module_id")->index();
            $table->foreign("module_id")->on("modules")->references("id")->onDelete("cascade");
            $table->unsignedBigInteger("tag_id")->index();
            $table->foreign("tag_id")->on("tags")->references("id")->onDelete("cascade");
            $table->index(["module_id", "tag_id"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('module_tag');
    }
}
