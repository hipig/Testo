<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BankItem extends Model
{
    protected $fillable = [
        'bank_id', 'score', 'status', 'index'
    ];

    protected $casts = [
        'status' => 'boolean'
    ];

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }
}
