<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Capster extends Model
{
    protected $fillable = [
        'name',
        'nickname',
        'description',
        'status',
        'photo'
    ];

    public function pricing()
    {
        return $this->hasMany(Pricing::class);
    }

    public function booking()
    {
        return $this->hasMany(Booking::class);
    }
}
