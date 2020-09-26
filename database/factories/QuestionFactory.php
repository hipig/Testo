<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Question;
use Faker\Generator as Faker;

$factory->define(Question::class, function (Faker $faker) {
    $type = $faker->randomElement(array_keys(Question::$typeMap));
    switch ($type) {
        case 1:
            $keys = ['A', 'B', 'C', 'D'];
            for ($i = 0; $i < count($keys); $i++) {
                $options[$keys[$i]] = $faker->sentence;
            }
            $answer = $faker->randomElement($keys);
            break;
        case 3:
            $keys = ['A', 'B'];
            for ($i = 0; $i < count($keys); $i++) {
                $options[$keys[$i]] = $faker->sentence;
            }
            $answer = $faker->randomElement($keys);
            break;
        case 2:
            $keys = ['A', 'B', 'C', 'D', 'E'];
            for ($i = 0; $i < count($keys); $i++) {
                $options[$keys[$i]] = $faker->sentence;
            }
            $answer = $faker->randomElements($keys, $faker->randomElement([2, 3]));
            break;
        case 4:
            $options = [];
            for ($i = 0; $i < $faker->randomElement([1, 2, 3]); $i++) {
                $answer[] = $faker->word;
            }
            break;
        default:
            $options = [];
            $answer = '';
    }

    return [
        'title' => $faker->text,
        'type' => $type,
        'option' => $options,
        'answer' => is_array($answer) ? json_encode($answer) : $answer,
        'material' => $faker->paragraph,
        'parse' => $faker->paragraph,
    ];
});
