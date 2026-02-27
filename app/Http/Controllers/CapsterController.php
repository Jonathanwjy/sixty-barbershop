<?php

namespace App\Http\Controllers;

use App\Models\Capster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
            'name' => 'string|max:60|required',
            'description' => 'required|string',
            'nickname' => 'string|max:30|required',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ])->validate();

        // Siapkan data dasar
        $data = [
            'name' => $request->name,
            'nickname' => $request->nickname,
            'description' => $request->description
        ];

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('capster', 'public');
        }

        Capster::create($data);

        return to_route('capsters.index')->with('success', 'Capster baru berhasil ditambahkan');
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
            'name' => 'required|string|max:60|',
            'description' => 'required|string',
            'nickname' => 'required|string|max:30|',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ])->validate();

        $data = [
            'name' => $request->name,
            'nickname' => $request->nickname,
            'description' => $request->description,
        ];

        if ($request->hasFile('photo')) {
            if ($capster->photo) {
                Storage::disk('public')->delete($capster->photo);
            }
            $data['photo'] = $request->file('photo')->store('capster', 'public');
        }

        $capster->update($data);

        return to_route('capsters.index')->with('success', 'Data capster berhasil diperbarui');
    }
    public function toggleStatus(Capster $capster)
    {
        $newStatus = $capster->status === 'active' ? 'inactive' : 'active';

        $capster->update([
            'status' => $newStatus
        ]);

        // Kembalikan ke halaman index tanpa reload penuh
        return back()->with('success', 'Capster berhasil di' . $newStatus);
    }
}
