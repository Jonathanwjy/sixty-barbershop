<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function capster()
    {
        return $this->hasOne(Capster::class);
    }

    public function service()
    {
        return $this->hasOne(Service::class);
    }
}
