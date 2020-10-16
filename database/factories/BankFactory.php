<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Bank;
use Faker\Generator as Faker;

$factory->define(Bank::class, function (Faker $faker) {
    $subjectIds = \App\Models\Subject::query()->where('level', 2)->pluck('id')->toArray();
    $banks = Bank::query()->whereNull('parent_id')->get();
    $bankIds = $banks->pluck('id')->toArray();
    $bankIds[] = null;
    $parentId = $faker->randomElement($bankIds);
    $subjectId = $faker->randomElement($subjectIds);
    if ($parentId) {
        $subjectId = $banks->find($parentId)->subject_id;
    }
    $type = $faker->randomElement(array_keys(Bank::$typeMap));

    return [
        'title' => $faker->sentence,
        'subject_id' => $subjectId,
        'parent_id' => $type === Bank::CHAPTER_TEST ? $parentId : null,
        'type' => $type,
        'is_group' => in_array($type, [2, 3]) ? $faker->randomElement([0, 1]) : 0,
        'time_limit' => $type === Bank::CHAPTER_TEST ? 0 : $faker->randomElement([120, 180]),
        'total_score' => $type === Bank::CHAPTER_TEST ? 0 : $faker->randomElement([100, 150]),
    ];
});
