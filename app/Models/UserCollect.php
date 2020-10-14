<?php

namespace App\Models;

class UserCollect extends Model
{
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

    public function scopeInSubject($query, $subjectPid)
    {
        if ($subjectPid) {
            $subjectIds = Subject::query()->where('parent_id', $subjectPid)->pluck('id');
            $query->whereIn('subject_id', $subjectIds);
        }
        return $query;
    }

    public function scopeOnlySubject($query, $subjectId)
    {
        $subjectId && $query->where('subject_id', $subjectId);
        return $query;
    }

    public function scopeOnlyBankItem($query, $bankItemId)
    {
        $bankItemId && $query->where('bank_item_id', $bankItemId);
        return $query;
    }

    public function scopeOnlyQuestionType($query, $questionType)
    {
        $questionType && $query->where('question_type', $questionType);
        return $query;
    }

    public function scopeBetweenDate($query, $date)
    {
        if ($date) {
            !is_array($date) && $date = explode('-', $date);
            $query->whereBetween('updated_at', $date);
        }
        return $query;
    }
}
