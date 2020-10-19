<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Subject;
use App\Models\Article;
use Faker\Generator as Faker;

$factory->define(Article::class, function (Faker $faker) {
    $type = $faker->randomKey(Article::$typeMap);

    $category_id = 0;
    if ($type === Article::TYPE_SUBJECT) {
        $subjectIds = Subject::query()->where('level', 1)->pluck('id')->toArray();
        $category_id = $faker->randomElement($subjectIds);
    }

    return [
        'category_id' => $category_id,
        'title' => $faker->sentence,
        'cover' => $faker->imageUrl(200, 150),
        'type' => $type,
        'description' => $faker->paragraph,
        'content' => $faker->paragraph(10),
        'view_count' => $faker->randomNumber(3)
    ];
});
