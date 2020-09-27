<?php

namespace App\Models;

class LearnRecordItem extends Model
{
    protected $fillable = [
        'record_id', 'question_id', 'answer',
        'is_right', 'score'
    ];

    protected $casts = [
        'is_right' => 'boolean'
    ];

    public function record()
    {
        return $this->belongsTo(LearnRecord::class, 'record_id');
    }
}
