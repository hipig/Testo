<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Query\Builder;

class Article extends Model
{
    const TYPE_SUBJECT = 1;

    public static $typeMap = [
        self::TYPE_SUBJECT => '科目',
    ];

    protected $fillable = [
        'category_id', 'title', 'type', 'labels',
        'content', 'view_count', 'status', 'published_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'status' => 'boolean',
    ];

    protected static function booted()
    {
        static::addGlobalScope('published', function (Builder $builder) {
            $builder->whereNull('published_at')->orWhere('published_at', '>', Carbon::now());
        });
    }

    public function category()
    {
        switch ($this->type) {
            case self::TYPE_SUBJECT:
                return $this->belongsTo(Subject::class, 'category_id');
        }
    }
}
