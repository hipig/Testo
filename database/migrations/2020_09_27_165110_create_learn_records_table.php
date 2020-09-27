<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearnRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('learn_records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('用户ID');
            $table->unsignedBigInteger('bank_id')->comment('题库ID');
            $table->string('question_ids', 2560)->nullable()->comment('题目集合');
            $table->unsignedTinyInteger('type')->default(1)->comment('类型');
            $table->unsignedInteger('score')->default(0)->comment('得分');
            $table->unsignedInteger('total_count')->default(0)->comment('总题数');
            $table->unsignedInteger('done_count')->default(0)->comment('已做题数');
            $table->unsignedInteger('done_time')->default(0)->comment('已做时间（秒）');
            $table->boolean('is_end')->default(false)->comment('是否交卷');
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
        Schema::dropIfExists('learn_records');
    }
}
