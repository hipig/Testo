<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class Upload extends Model
{
    protected $fillable = [
        'disk', 'path'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            !$model->disk &&  $model->disk = config('api.storage_disk');
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getUrlAttribute()
    {
        return Storage::disk($this->disk)->url($this->path);
    }
}
