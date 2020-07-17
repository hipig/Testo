<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('标题');
            $table->string('name')->comment('标识');
            $table->unsignedBigInteger('parent_id')->nullable()->comment('上级ID');
            $table->string('thumb')->nullable()->comment('封面');
            $table->boolean('is_special')->default(true)->comment('是否专业科目');
            $table->boolean('is_directory')->default(false)->comment('是否拥有子科目');
            $table->unsignedInteger('level')->default(0)->comment('当前科目层级');
            $table->string('path')->comment('当前科目所有上级ID');
            $table->boolean('status')->default(true)->comment('状态');
            $table->unsignedInteger('index')->default(99)->comment('排序');
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
        Schema::dropIfExists('subjects');
    }
}
