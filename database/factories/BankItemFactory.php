<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\BankItem;
use Faker\Generator as Faker;

$factory->define(BankItem::class, function (Faker $faker) {
    $banks = \App\Models\Bank::query()->get();

    $bankId = $faker->randomElement($banks->pluck('id')->toArray());
    $type = $banks->find($bankId)->type;

    $groupId = null;
    $score = 0;
    $questionQuery = \App\Models\Question::query();
    if ($type === 3) {
        $groups = \App\Models\BankGroup::query()->where('bank_id', $bankId)->get();
        $groupId = $faker->randomElement($groups->pluck('id')->toArray());
        $group = $groups->find($groupId);
        $score = $group->item_score ?? 0;
        $questionQuery->where('type', $group->item_type ?? 1);
    }

    $questionIds = $questionQuery->pluck('id')->toArray();

    return [
        'bank_id' => $bankId,
        'group_id' => $groupId,
        'question_id' => $faker->randomElement($questionIds),
        'score' => $score
    ];
});
