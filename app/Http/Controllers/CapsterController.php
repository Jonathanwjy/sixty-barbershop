<?php

namespace App\Http\Controllers;

use App\Models\Capster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CapsterController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $capsters = Capster::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })

            ->get();

        return Inertia::render('admin/capster/index', [
            'capsters' => $capsters,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/capster/create');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'name' => ['string', 'max:60', 'required'],
            'description' => ['required', 'string'],
            'nickname' => ['string', 'max:30', 'required'],
        ])->validate();

        Capster::create([
            'name' => $request->name,
            'nickname' => $request->nickname,
            'description' => $request->description
        ]);

        return to_route('capsters.index');
    }

    public function edit(Capster $capster)
    {
        return Inertia::render('admin/capster/edit', [
            'capster' => $capster,
        ]);
    }

    public function update(Request $request, Capster $capster)
    {
        Validator::make($request->all(), [
            'name' => ['string', 'max:60', 'required'],
            'description' => ['required', 'string'],
            'nickname' => ['string', 'max:30', 'required'],
        ])->validate();

        $capster->update([
            'name' => $request->name,
            'nickname' => $request->nickname,
            'description' => $request->description,
        ]);

        return to_route('capsters.index');
    }

    public function toggleStatus(Capster $capster)
    {
        // Jika status saat ini 'active', ubah jadi 'inactive', dan sebaliknya
        $newStatus = $capster->status === 'active' ? 'inactive' : 'active';

        $capster->update([
            'status' => $newStatus
        ]);

        // Kembalikan ke halaman index tanpa reload penuh
        return back();
    }
}
