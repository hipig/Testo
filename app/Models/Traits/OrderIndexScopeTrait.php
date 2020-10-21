<?php


namespace App\Models\Traits;


trait OrderIndexScopeTrait
{
    public function scopeOrderIndex($query, $direction = 'desc')
    {
        $query->orderBy('index', $direction);
        return $query;
    }
}
