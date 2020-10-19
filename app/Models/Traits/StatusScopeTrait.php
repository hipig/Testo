<?php


namespace App\Models\Traits;


trait StatusScopeTrait
{
    public function scopeStatus($query, $status = true)
    {
        $query->where('status', $status);
        return $query;
    }
}
