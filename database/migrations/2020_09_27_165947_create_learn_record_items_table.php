<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearnRecordItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('learn_record_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('record_id')->comment('记录ID');
            $table->unsignedBigInteger('bank_item_id')->comment('题目ID');
            $table->unsignedBigInteger('question_id')->comment('题库关联题目ID');
            $table->string('answer', 2560)->nullable()->comment('答案');
            $table->boolean('is_right')->nullable()->comment('是否答对');
            $table->unsignedInteger('score')->default(0)->comment('得分');
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
        Schema::dropIfExists('learn_record_items');
    }
}
