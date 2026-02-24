<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'service_id',
        'capster_id',
        'price',
        'date',
        'start_time',
        'end_time',
        'payment_status',
        'booking_status',
        'snap_token',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function capster()
    {
        return $this->belongsTo(Capster::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
