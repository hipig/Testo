<?php


namespace App\Models\Traits;


trait QuestionScopeTrait
{
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
}
