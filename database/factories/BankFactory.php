<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Bank;
use Faker\Generator as Faker;

$factory->define(Bank::class, function (Faker $faker) {
    $subjectIds = \App\Models\Subject::query()->where('level', 2)->pluck('id')->toArray();
    $bankIds = Bank::query()->whereNull('parent_id')->pluck('id')->toArray();
    $bankIds[] = null;
    $type = $faker->randomElement(array_keys(Bank::$typeMap));

    return [
        'title' => $faker->sentence,
        'subject_id' => $faker->randomElement($subjectIds),
        'parent_id' => $type === Bank::CHAPTER_STUDY ? $faker->randomElement($bankIds) : null,
        'type' => $type,
        'time_limit' => $type === Bank::CHAPTER_STUDY ? 0 : $faker->randomElement([120, 180]),
        'total_score' => $type === Bank::CHAPTER_STUDY ? 0 : $faker->randomElement([100, 150]),
    ];
});
