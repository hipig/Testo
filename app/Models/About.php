<?php

namespace App\Models;

use App\Models\Traits\OrderIndexScopeTrait;
use App\Models\Traits\StatusScopeTrait;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use StatusScopeTrait, OrderIndexScopeTrait;

    protected $fillable = [
        'title', 'name', 'content', 'status', 'index'
    ];

    protected $casts = [
        'status' => 'boolean'
    ];
}
