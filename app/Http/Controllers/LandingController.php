<?php

namespace App\Http\Controllers;

use App\Models\Capster;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        return Inertia::render('home', [
            'capsters' => Capster::all(),
        ]);
    }

    public function adminDashboard()
    {
        return Inertia::render('admin/dashboard');
    }
}
