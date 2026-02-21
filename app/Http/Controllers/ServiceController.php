<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\In;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $search = $request->input('search');

        $services = Service::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })

            ->get();

        return Inertia::render('admin/service/index', [
            'services' => $services,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/service/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:100'],
            'duration' => ['required', 'integer', 'min:1'],
            'description' => ['required', 'string'],
        ])->validate();

        Service::create([
            'name' => $request->name,
            'duration' => $request->duration,
            'description' => $request->description,
        ]);

        return to_route('services.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        return Inertia::render('admin/service/edit', [
            'service' => $service,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:100'],
            'duration' => ['required', 'integer', 'min:1'],
            'description' => ['required', 'string'],
        ])->validate();

        $service->update([
            'name' => $request->name,
            'duration' => $request->duration,
            'description' => $request->description,
        ]);

        return to_route('services.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }

    public function toggleStatus(Service $service)
    {
        // Jika status saat ini 'active', ubah jadi 'inactive', dan sebaliknya
        $newStatus = $service->status === 'active' ? 'inactive' : 'active';

        $service->update([
            'status' => $newStatus
        ]);

        // Kembalikan ke halaman index tanpa reload penuh
        return back();
    }
}
