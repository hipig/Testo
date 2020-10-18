<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Bank;
use App\Models\Subject;
use Faker\Generator as Faker;

$factory->define(Bank::class, function (Faker $faker) {
    $type = $faker->randomElement(array_keys(Bank::$typeMap));
    $subjectIds = Subject::query()->where('level', 2)->pluck('id')->toArray();

    $parentId = null;
    $subjectId = $faker->randomElement($subjectIds);
    if ($type === 1) {
        $banks = Bank::query()->whereNull('parent_id')->where('type', 1)->get();
        $bankIds = $banks->pluck('id')->toArray();
        $bankIds[] = null;
        $parentId = $faker->randomElement($bankIds);
        if ($parentId) {
            $subjectId = $banks->find($parentId)->subject_id;
        }
    }

    return [
        'title' => $faker->sentence,
        'subject_id' => $subjectId,
        'parent_id' => $type === 1 ? $parentId : null,
        'type' => $type,
        'is_group' => 0,
        'time_limit' => in_array($type, [2, 3]) ? $faker->randomElement([90, 120, 180]) : 0,
        'total_score' => 0
    ];
});
