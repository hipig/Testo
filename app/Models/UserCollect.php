<?php

namespace App\Models;

use App\Models\Traits\DateScopeTrait;
use App\Models\Traits\QuestionScopeTrait;
use App\Models\Traits\SubjectScopeTrait;

class UserCollect extends Model
{
    use SubjectScopeTrait, QuestionScopeTrait, DateScopeTrait;

    protected $fillable = [
        'user_id', 'subject_id', 'bank_item_id', 'question_id', 'question_type'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function bankItem()
    {
        return $this->belongsTo(bankItem::class, 'bank_item_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
