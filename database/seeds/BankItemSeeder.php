<?php

use App\Models\BankItem;
use Illuminate\Database\Seeder;

class BankItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(BankItem::class, 2000)->create()->each(function ($item) {
            if (is_null($item->group_id)) {
                $item->bank()->increment('total_count');
                $item->bank()->increment('total_score', $item->score);
            } else {
                $item->group()->increment('item_count');
            }
        });


    }
}
