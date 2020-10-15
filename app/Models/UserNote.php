<?php

namespace App\Models;

use App\Models\Traits\DateScopeTrait;
use App\Models\Traits\QuestionScopeTrait;
use App\Models\Traits\SubjectScopeTrait;

class UserNote extends Model
{
    use SubjectScopeTrait, QuestionScopeTrait, DateScopeTrait;

    protected $fillable = [
        'user_id', 'subject_id', 'bank_item_id', 'question_id',
        'question_type', 'content', 'upload_ids'
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
