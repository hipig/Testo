<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->comment('分类ID');
            $table->string('title')->comment('标题');
            $table->string('cover')->nullable()->comment('封面');
            $table->unsignedTinyInteger('type')->default(1)->comment('类型');
            $table->json('labels')->nullable()->comment('标签');
            $table->string('description')->nullable()->comment('描述');
            $table->text('content')->comment('内容');
            $table->string('view_count')->comment('浏览量');
            $table->boolean('status')->default(true)->comment('状态');
            $table->timestamp('published_at')->nullable()->comment('发布时间');
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
        Schema::dropIfExists('articles');
    }
}
