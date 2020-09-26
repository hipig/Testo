<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBankGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bank_groups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bank_id')->comment('题库ID');
            $table->string('title')->comment('标题');
            $table->unsignedTinyInteger('item_type')->default(1)->comment('小题类型');
            $table->unsignedInteger('item_score')->default(0)->comment('小题分数');
            $table->unsignedInteger('item_count')->default(0)->comment('小题总数');
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
        Schema::dropIfExists('bank_groups');
    }
}
