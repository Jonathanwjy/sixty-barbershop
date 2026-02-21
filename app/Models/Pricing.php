<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pricing extends Model
{
    protected $fillable = [
        'service_id',
        'capster_id',
        'price',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function capster()
    {
        return $this->belongsTo(Capster::class);
    }
}
