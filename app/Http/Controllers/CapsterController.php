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
            'name' => 'string|max:60|required',
            'description' => 'required|string',
            'nickname' => 'string|max:30|required',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // <-- Tambahkan validasi foto juga di sini
        ])->validate();

        // Siapkan data yang akan diupdate
        $data = [
            'name' => $request->name,
            'nickname' => $request->nickname,
            'description' => $request->description,
        ];

        // Cek jika user mengupload foto baru
        if ($request->hasFile('photo')) {
            // 1. Hapus foto lama dari penyimpanan jika sebelumnya capster sudah punya foto
            if ($capster->photo) {
                Storage::disk('public')->delete($capster->photo);
            }

            // 2. Simpan foto yang baru dan tambahkan ke array $data
            $data['photo'] = $request->file('photo')->store('capster', 'public');
        }

        // Update data di database
        $capster->update($data);

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
