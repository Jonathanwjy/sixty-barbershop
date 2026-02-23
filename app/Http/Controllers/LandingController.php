<?php

namespace App\Http\Controllers;

use App\Models\Capster;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $services = Service::limit(3)->with('pricing')->get()->map(function ($service) {
            $minPrice = $service->pricing->min('price');
            $service->min_price = $minPrice ?? 0;
            return $service;
        });

        return Inertia::render('home', [
            'capsters' => Capster::where('status', 'active')->get(),
            'services' => $services,
        ]);
    }

    public function adminDashboard()
    {
        return Inertia::render('admin/dashboard');
    }

    public function allService()
    {

        $services = Service::where('status', 'active')->with('pricing')->get()->map(function ($service) {
            $minPrice = $service->pricing->min('price');
            $service->min_price = $minPrice ?? 0;
            return $service;
        });
        return Inertia::render('user/service-page', [
            'services' => $services,
        ]);
    }

    public function ProfileSetting()
    {
        return Inertia::render('user/settings/profile');
    }
}
