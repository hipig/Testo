<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBankItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bank_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('subject_id')->comment('科目ID');
            $table->unsignedBigInteger('bank_id')->comment('题库ID');
            $table->unsignedBigInteger('group_id')->nullable()->comment('题组ID');
            $table->unsignedBigInteger('question_id')->comment('题目ID');
            $table->unsignedTinyInteger('question_type')->default(1)->comment('题目类型');
            $table->unsignedInteger('score')->default(0)->comment('分数');
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
        Schema::dropIfExists('bank_items');
    }
}
