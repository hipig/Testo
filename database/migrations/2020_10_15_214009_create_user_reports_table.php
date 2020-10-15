<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('用户ID');
            $table->unsignedBigInteger('subject_id')->comment('科目ID');
            $table->unsignedBigInteger('bank_item_id')->comment('题库题目ID');
            $table->unsignedBigInteger('question_id')->comment('题目ID');
            $table->unsignedTinyInteger('question_type')->default(1)->comment('题目类型');
            $table->unsignedTinyInteger('type')->default(1)->comment('纠错类型');
            $table->text('content')->nullable()->comment('内容');
            $table->json('upload_ids')->nullable()->comment('上传附件');
            $table->boolean('is_handle')->nullable()->comment('是否处理');
            $table->text('handle_remark')->nullable()->comment('处理备注');
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
        Schema::dropIfExists('user_reports');
    }
}
