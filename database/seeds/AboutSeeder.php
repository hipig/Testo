<?php

use App\Models\About;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $abouts = [
            [
                'title' => '关于我们',
                'name' => 'about',
                'content' => '这是关于我们'
            ],
            [
                'title' => '用户协议',
                'name' => 'agreement',
                'content' => '这是用户协议'
            ],
            [
                'title' => '隐私政策',
                'name' => 'privacy',
                'content' => '这是隐私政策'
            ],
            [
                'title' => '帮助中心',
                'name' => 'help',
                'content' => '这是帮助中心'
            ],
            [
                'title' => '联系我们',
                'name' => 'contact',
                'content' => '这是联系我们'
            ]
        ];

        foreach ($abouts as $item) {
            About::create($item);
        }
    }
}
