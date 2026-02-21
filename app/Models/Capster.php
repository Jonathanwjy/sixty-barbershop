<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Capster extends Model
{
    protected $fillable = [
        'name',
        'nickname',
        'description',
        'status'
    ];

    public function pricing()
    {
        return $this->hasMany(Pricing::class);
    }
}
