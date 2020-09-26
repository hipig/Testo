<?php

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subjects = [
            [
                'title' => '自考',
                'name' => 'zikao',
                'children' => [
                    [
                        'title' => '行政管理专科',
                        'name' => 'xzglzk',
                        'children' => [
                            [
                                'title' => '行政法学',
                                'name' => 'xzfx',
                                'is_special' => true,
                            ],
                            [
                                'title' => '中国文化概论',
                                'name' => 'zgwhgl',
                                'is_special' => true,
                            ],
                            [
                                'title' => '政治学概论',
                                'name' => 'zzxgl',
                                'is_special' => true,
                            ],
                            [
                                'title' => '现代管理学',
                                'name' => 'xdglx',
                                'is_special' => true,
                            ],
                            [
                                'title' => '市政学',
                                'name' => 'szx',
                                'is_special' => true,
                            ],
                            [
                                'title' => '社会研究方法',
                                'name' => 'shyjff',
                                'is_special' => true,
                            ],
                            [
                                'title' => '思想道德修养与法律基础',
                                'name' => 'sxddxyyfljc',
                                'is_special' => false,
                            ],
                            [
                                'title' => '毛概',
                                'name' => 'mg',
                                'is_special' => false,
                            ],
                            [
                                'title' => '英语（一）',
                                'name' => 'yy1',
                                'is_special' => false,
                            ],
                            [
                                'title' => '英语（二）',
                                'name' => 'yy2',
                                'is_special' => false,
                            ],
                            [
                                'title' => '大学语文',
                                'name' => 'dxyw',
                                'is_special' => false,
                            ],
                            [
                                'title' => '经济法概论（财经类）',
                                'name' => 'jjfglcjl',
                                'is_special' => false,
                            ],
                            [
                                'title' => '计算机应用基础',
                                'name' => 'jsjyyjc',
                                'is_special' => false,
                            ],
                        ]
                    ],
                    [
                        'title' => '行政管理本科',
                        'name' => 'xzglbk',
                        'children' => [
                            [
                                'title' => '中国行政史',
                                'name' => 'zgxzs',
                                'is_special' => true,
                            ],
                            [
                                'title' => '西方政治制度',
                                'name' => 'xfzzzd',
                                'is_special' => true,
                            ],
                            [
                                'title' => '西方行政学说史',
                                'name' => 'xfxzxss',
                                'is_special' => true,
                            ],
                            [
                                'title' => '社会学概论',
                                'name' => 'shxgl',
                                'is_special' => true,
                            ],
                            [
                                'title' => '普通逻辑',
                                'name' => 'ptlj',
                                'is_special' => true,
                            ],
                            [
                                'title' => '领导科学',
                                'name' => 'ldkx',
                                'is_special' => true,
                            ],
                            [
                                'title' => '中国近代史纲要',
                                'name' => 'zgjdsgy',
                                'is_special' => false,
                            ],
                            [
                                'title' => '马原',
                                'name' => 'my',
                                'is_special' => false,
                            ],
                            [
                                'title' => '政治经济学（财经类）',
                                'name' => 'zzjjxcjl',
                                'is_special' => false,
                            ],
                            [
                                'title' => '英语（二）',
                                'name' => 'bkyy2',
                                'is_special' => false,
                            ],
                            [
                                'title' => '计算机应用基础',
                                'name' => 'bkjsjyyjc',
                                'is_special' => false,
                            ],
                        ]
                    ]
                ]
            ]
        ];

        foreach ($subjects as $data) {
            $this->createSubject($data);
        }
    }

    protected function createSubject($data, $parent = null)
    {
        // 创建一个新的类目对象
        $subject = new Subject(['title' => $data['title'], 'name' => $data['name'], 'is_special' => $data['is_special'] ?? true]);
        // 如果有 children 字段则代表这是一个父类目
        $subject->is_directory = isset($data['children']);
        // 如果有传入 $parent 参数，代表有父类目
        if (!is_null($parent)) {
            $subject->parent()->associate($parent);
        }
        //  保存到数据库
        $subject->save();
        // 如果有 children 字段并且 children 字段是一个数组
        if (isset($data['children']) && is_array($data['children'])) {
            // 遍历 children 字段
            foreach ($data['children'] as $child) {
                // 递归调用 createCategory 方法，第二个参数即为刚刚创建的类目
                $this->createSubject($child, $subject);
            }
        }
    }
}
