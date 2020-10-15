<?php


namespace App\Models\Traits;


trait DateScopeTrait
{
    public function scopeBetweenDate($query, $date)
    {
        if ($date) {
            !is_array($date) && $date = explode('-', $date);
            $query->whereBetween('updated_at', $date);
        }
        return $query;
    }
}
