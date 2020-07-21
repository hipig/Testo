<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('标题');
            $table->unsignedTinyInteger('type')->default(1)->comment('类型');
            $table->string('option', 2560)->nullable()->comment('选项');
            $table->string('answer', 2560)->nullable()->comment('答案');
            $table->text('material')->nullable()->comment('材料');
            $table->text('parse')->nullable()->comment('解析');
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
        Schema::dropIfExists('questions');
    }
}
