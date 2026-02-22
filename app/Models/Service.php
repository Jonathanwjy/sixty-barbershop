<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'duration',
        'description',
        'status',
        'photo'
    ];

    public function pricing()
    {
        return $this->hasMany(Pricing::class);
    }
}
