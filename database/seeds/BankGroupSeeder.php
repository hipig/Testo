<?php

use App\Models\BankGroup;
use Illuminate\Database\Seeder;

class BankGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(BankGroup::class, 100)->create()->each(function ($item) {
            if (!$item->bank->is_group) {
                $item->bank->is_group = true;
                $item->bank->save();
            }
        });
    }
}
