<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
            'name' => 'required|string|max:100',
            'duration' => 'required|integer|min:1',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ])->validate();

        $data = [
            'name' => $request->name,
            'duration' => $request->duration,
            'description' => $request->description,
        ];
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('service', 'public');
        }
        Service::create($data);

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
            'name' => 'required|string|max:100',
            'duration' => 'required|integer|min:1',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ])->validate();

        $data = [
            'name' => $request->name,
            'duration' => $request->duration,
            'description' => $request->description,
        ];

        if ($request->hasFile('photo')) {
            // 1. Hapus foto lama dari penyimpanan jika sebelumnya capster sudah punya foto
            if ($service->photo) {
                Storage::disk('public')->delete($service->photo);
            }

            // 2. Simpan foto yang baru dan tambahkan ke array $data
            $data['photo'] = $request->file('photo')->store('service', 'public');
        }


        $service->update($data);

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
