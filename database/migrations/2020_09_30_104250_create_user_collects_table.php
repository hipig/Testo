<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserCollectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_collects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('用户ID');
            $table->unsignedBigInteger('subject_id')->comment('科目ID');
            $table->unsignedBigInteger('bank_item_id')->comment('题库题目ID');
            $table->unsignedBigInteger('question_id')->comment('题目ID');
            $table->unsignedTinyInteger('question_type')->default(1)->comment('题目类型');
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
        Schema::dropIfExists('user_collects');
    }
}
