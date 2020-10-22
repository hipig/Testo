<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model as BaseModel;

class Model extends BaseModel
{
    protected function serializeDate(\DateTimeInterface $date)
    {
        return $date->format(Carbon::DEFAULT_TO_STRING_FORMAT);
    }
}
