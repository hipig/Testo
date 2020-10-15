<?php

namespace App\Models;

use App\Models\Traits\DateScopeTrait;
use App\Models\Traits\QuestionScopeTrait;
use App\Models\Traits\SubjectScopeTrait;

class UserReport extends Model
{
    use SubjectScopeTrait, QuestionScopeTrait, DateScopeTrait;

    public static $typeMap = [
        1 => '错别字',
        2 => '答案有误',
        3 => '排版错误',
        4 => '图片模糊',
        5 => '答案有异议',
        6 => '其他错误'
    ];

    protected $fillable = [
        'user_id', 'subject_id', 'bank_item_id', 'question_id',
        'question_type', 'type', 'content', 'upload_ids'
    ];

    protected $casts = [
        'upload_ids' => 'json'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function bankItem()
    {
        return $this->belongsTo(bankItem::class, 'bank_item_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }

    public function getUploadItemsAttribute()
    {
        return Upload::query()->whereIn('id', $this->upload_ids)->get();
    }
}
