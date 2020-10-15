<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->name) {
                $model->name = substr_replace($model->phone, '****', 3, 4);
            }
        });
    }

    public function records()
    {
        return $this->hasMany(LearnRecord::class);
    }

    public function recordItems()
    {
        return $this->hasManyThrough(LearnRecordItem::class, LearnRecord::class, 'user_id', 'record_id');
    }

    public function errors()
    {
        return $this->hasMany(UserError::class);
    }

    public function collects()
    {
        return $this->hasMany(UserCollect::class);
    }

    public function collectItems()
    {
        return $this->hasManyThrough(BankItem::class, UserCollect::class, 'user_id', 'id', 'id', 'bank_item_id');
    }

    public function uploads()
    {
        return $this->hasMany(Upload::class);
    }

    public function reports()
    {
        return $this->hasMany(UserReport::class);
    }

    public function notes()
    {
        return $this->hasMany(UserNote::class);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = \Hash::make($value);
    }

    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
