<?php

namespace App\Models;

class LearnRecordItem extends Model
{
    protected $fillable = [
        'record_id', 'bank_id', 'bank_item_id', 'question_id', 'question_type',
        'answer', 'is_right', 'score'
    ];

    protected $casts = [
        'is_right' => 'boolean'
    ];

    public function record()
    {
        return $this->belongsTo(LearnRecord::class, 'record_id');
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function bankItem()
    {
        return $this->belongsTo(bankItem::class, 'bank_item_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }

    public function getAnswerAttribute($value)
    {
        return in_array($this->question_type, [Question::MULTI_SELECT, Question::FILL_BLANK]) ? json_decode($value, true) : $value;
    }

    public function setAnswerAttribute($value)
    {
        $this->attributes['answer'] = is_array($value) ? json_encode($value) : $value;
    }
}
