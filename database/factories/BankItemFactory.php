<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Bank;
use App\Models\BankItem;
use App\Models\BankGroup;
use App\Models\Question;
use Faker\Generator as Faker;

$factory->define(BankItem::class, function (Faker $faker) {
    $banks = Bank::query()->get();

    $bankId = $faker->randomElement($banks->pluck('id')->toArray());
    $bank = $banks->find($bankId);
    $isGroup = $bank->is_group ?? 0;

    $groupId = null;
    $questionType = $faker->randomElement(array_keys(Question::$typeMap));
    $scores = [1 => 2, 2 => 3, 3 => 1, 4 => 5, 5 => 10 ];
    $score = $scores[$questionType];
    if ($isGroup) {
        $groups = BankGroup::query()->where('bank_id', $bankId)->get();
        $groupId = $faker->randomElement($groups->pluck('id')->toArray());
        $group = $groups->find($groupId);
        $score = $group->item_score ?? 0;
        $questionType = $group->item_type ?? 1;
    }

    $questionIds = Question::query()->where('type', $questionType)->pluck('id')->toArray();
    $questionId = $faker->randomElement($questionIds);

    return [
        'subject_id' => $bank->subject_id,
        'bank_id' => $bankId,
        'group_id' => $groupId,
        'question_id' => $questionId,
        'type' => $questionType,
        'score' => $score
    ];
});
