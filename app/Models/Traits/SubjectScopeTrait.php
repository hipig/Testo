<?php

namespace App\Models\Traits;

use App\Models\Subject;

trait SubjectScopeTrait
{
    public function scopeInSubject($query, $subjectPid)
    {
        if ($subjectPid) {
            $subjectIds = Subject::query()->where('parent_id', $subjectPid)->pluck('id');
            $query->whereIn('subject_id', $subjectIds);
        }
        return $query;
    }

    public function scopeOnlySubject($query, $subjectId)
    {
        $subjectId && $query->where('subject_id', $subjectId);
        return $query;
    }
}
