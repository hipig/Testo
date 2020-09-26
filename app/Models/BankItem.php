<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BankItem extends Model
{
    protected $fillable = [
        'bank_id', 'group_id', 'score', 'status', 'index'
    ];

    protected $casts = [
        'status' => 'boolean'
    ];

    protected $with = [
        'question'
    ];

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function group()
    {
        return $this->belongsTo(BankGroup::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
