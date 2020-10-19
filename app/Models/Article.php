<?php

namespace App\Models;

use App\Models\Traits\SubjectScopeTrait;
use App\Models\Traits\StatusScopeTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Article extends Model
{
    use StatusScopeTrait;

    const TYPE_SUBJECT = 1;

    public static $typeMap = [
        self::TYPE_SUBJECT => '科目',
    ];

    protected $fillable = [
        'category_id', 'title', 'cover', 'type', 'labels',
        'content', 'view_count', 'status', 'published_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'status' => 'boolean',
    ];

    protected $appends = [
        'cover_url'
    ];

    protected static function booted()
    {
        static::addGlobalScope('published', function (Builder $builder) {
            $builder->whereNull('published_at')->orWhere('published_at', '>', Carbon::now());
        });
    }

    public function category()
    {
        return $this->belongsTo(Subject::class, 'category_id', 'id');
    }

    public function getCoverUrlAttribute()
    {
        $cover = $this->cover;
        if ($cover && !Str::startsWith($cover, ['http', 'https'])) {
            $cover = Storage::disk(config('api.storage_disk'))->url($cover);
        }

        return $cover;
    }

    public function getPublishedAtAttribute($value)
    {
        return $value ?? $this->attributes['created_at'];
    }

    public function scopeInSubject($query, $subjectPid)
    {
        if ($subjectPid) {
            $subjectIds = Subject::query()->where('parent_id', $subjectPid)->pluck('id');
            $query->whereIn('category_id', $subjectIds);
        }
        return $query;
    }

    public function scopeOnlySubject($query, $subjectId)
    {
        $subjectId && $query->where('category_id', $subjectId);
        return $query;
    }
}
