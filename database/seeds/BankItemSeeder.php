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
                $group = $item->group;
                $group->increment('item_count');
                $group->title = sprintf($group->title, $group->item_count, $group->item_count * $group->item_score);
                $group->save();
            }

            $bank->increment('total_count');
            in_array($bank->type, [2, 3]) && $bank->increment('total_score', $item->score);
            if ($bank->parent_id) {
                $bank->parent->increment('total_count');
            }
        });


    }
}
