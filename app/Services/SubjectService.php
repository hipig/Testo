<?php
namespace App\Services;

use App\Models\Subject;

class SubjectService
{
    // 这是一个递归方法
    // $parentId 参数代表要获取子类目的父类目 ID，null 代表获取所有根类目
    // $allCategories 参数代表数据库中所有的类目，如果是 null 代表需要从数据库中查询
    public function getSubjectTree($parentId = null, $allSubjects = null)
    {
        if (is_null($allSubjects)) {
            // 从数据库中一次性取出所有类目
            $allSubjects = Subject::all();
        }

        return $allSubjects
            // 从所有类目中挑选出父类目 ID 为 $parentId 的类目
            ->where('parent_id', $parentId)
            // 遍历这些类目，并用返回值构建一个新的集合
            ->map(function (Subject $subject) use ($allSubjects) {
                // 如果当前类目不是父类目，则直接返回
                if (!$subject->is_directory) {
                    return $subject;
                }
                // 否则递归调用本方法，将返回值放入 children 字段中
                $subject->children = $this->getSubjectTree($subject->id, $allSubjects);

                return $subject;
            });
    }
}
