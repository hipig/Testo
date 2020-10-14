<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBanksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('banks', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('标题');
            $table->unsignedBigInteger('subject_id')->comment('科目ID');
            $table->unsignedBigInteger('parent_id')->nullable()->comment('上级ID');
            $table->unsignedTinyInteger('type')->default(1)->comment('类型');
            $table->boolean('is_free')->default(true)->comment('是否免费');
            $table->unsignedDecimal('price')->nullable()->comment('题库价格');
            $table->boolean('is_group')->default(false)->comment('是否存在题组');
            $table->unsignedInteger('time_limit')->default(0)->comment('时间限制');
            $table->unsignedInteger('total_score')->default(0)->comment('总分');
            $table->unsignedInteger('total_count')->default(0)->comment('总题数');
            $table->string('source')->nullable()->comment('来源');
            $table->text('remark')->nullable()->comment('备注');
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
        Schema::dropIfExists('banks');
    }
}
