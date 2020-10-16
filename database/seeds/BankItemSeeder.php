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
            $bank = $item->bank;
            if ($item->group_id) {
                $bank = $item->group->bank;
            }

            $bank->increment('total_count');
            $bank->increment('total_score', $item->score);
            if ($bank->parent_id) {
                $bank->parent->increment('total_count');
                $bank->parent->increment('total_score', $item->score);
            }
        });


    }
}
