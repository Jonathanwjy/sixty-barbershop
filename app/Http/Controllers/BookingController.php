<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function bookingHistory()
    {
        return Inertia::render('user/booking-history');
    }
}
