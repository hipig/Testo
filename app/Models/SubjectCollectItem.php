<?php

namespace App\Models;

class SubjectCollectItem extends Model
{
    protected $fillable = [
        'user_id', 'subject_id', 'bank_item_id', 'question_id'
    ];

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
}
