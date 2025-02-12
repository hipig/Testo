<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(SubjectSeeder::class);
        $this->call(QuestionSeeder::class);
        $this->call(BankSeeder::class);
        $this->call(BankSeeder::class);
        $this->call(BankGroupSeeder::class);
        $this->call(BankItemSeeder::class);
        $this->call(BankItemSeeder::class);
        $this->call(ArticleSeeder::class);
        $this->call(AboutSeeder::class);
    }
}
