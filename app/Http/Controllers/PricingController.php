<?php

namespace App\Http\Controllers;

use App\Models\Capster;
use App\Models\Pricing;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index()
    {
        $pricings = Pricing::with(['service', 'capster'])->latest()->get();
        return Inertia::render('admin/pricing/index', [
            'pricings' => $pricings,
        ]);
    }

    public function create()
    {

        $capters = Capster::where('status', 'active')->get();
        $services = Service::where('status', 'active')->get();
        return Inertia::render('admin/pricing/create', [
            'services' => $services,
            'capsters' => $capters,
        ]);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'service_id' => ['required'],
            'capster_id' => ['required'],
            'price' => ['required', 'min:1', 'integer']
        ]);

        Pricing::create([
            'service_id' => $request->service_id,
            'capster_id' => $request->capster_id,
            'price' => $request->price
        ]);

        return to_route('pricings.index');
    }

    public function edit(Pricing $pricing)
    {
        return Inertia::render('admin/pricing/edit', [
            'pricing' => $pricing,
            'services' => Service::all(),
            'capsters' => Capster::all(),
        ]);
    }

    public function update(Request $request, Pricing $pricing)
    {
        Validator::make($request->all(), [
            'service_id' => ['required'],
            'capster_id' => ['required'],
            'price' => ['required', 'min:1', 'integer']
        ]);

        $pricing->update([
            'service_id' => $request->service_id,
            'capster_id' => $request->capster_id,
            'price' => $request->price
        ]);
        return to_route('pricings.index');
    }
}
