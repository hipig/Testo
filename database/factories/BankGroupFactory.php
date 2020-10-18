<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\BankGroup;
use App\Models\Question;
use Faker\Generator as Faker;

$factory->define(BankGroup::class, function (Faker $faker) {
    $bankIds = \App\Models\Bank::query()->whereIn('type', [2, 3])->pluck('id')->toArray();

    $bankId = $faker->randomElement($bankIds);
    $descs = [
        1 => '每小题的备选项中，只有一个符合题意',
        2 => '每小题的备选项中，有两个或两个以上符合题意，多选,少选，错选,不选均不得分',
        3 => '每小题答对得分，错误不得分',
        4 => '有两个或两个以上的空时，少填，错填,不填均不得分',
        5 => '主观题仅提供作答，默认得分。'
    ];
    $type = $faker->randomElement(array_keys(Question::$typeMap));
    $scores = [1 => 2, 2 => 3, 3 => 1, 4 => 5, 5 => 10 ];
    $score = $scores[$type];
    $title = "本类题共%s题,每小题".$score."分,共%s分。".$descs[$type];

    return [
        'bank_id' => $bankId,
        'title' => $title,
        'item_type' => $type,
        'item_count' => 0,
        'item_score' => $score
    ];
});
