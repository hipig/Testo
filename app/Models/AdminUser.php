<?php

namespace App\Models;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminUser extends Model
{
    protected $fillable = [
        'username', 'password', 'name', 'avatar'
    ];

    protected $hidden = [
        'password'
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = \Hash::make($value);
    }

    public function getAvatarAttribute($value)
    {
        if ($value && !Str::startsWith($value, ['http', 'https'])) {
            $value = Storage::disk(config('api.storage_disk'))->url($value);
        }

        return $value;
    }
}
