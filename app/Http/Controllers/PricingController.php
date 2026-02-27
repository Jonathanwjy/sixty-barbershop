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
    public function index(Request $request)
    {
        // 1. Tangkap request filter
        $serviceId = $request->input('service_id');
        $capsterId = $request->input('capster_id');

        // 2. Query Pricing dengan filter
        $pricings = Pricing::with(['service', 'capster'])
            ->when($serviceId && $serviceId !== 'all', function ($query) use ($serviceId) {
                // Hanya filter jika $serviceId ada nilainya DAN bukan teks 'all'
                $query->where('service_id', $serviceId);
            })
            ->when($capsterId && $capsterId !== 'all', function ($query) use ($capsterId) {
                // Hanya filter jika $capsterId ada nilainya DAN bukan teks 'all'
                $query->where('capster_id', $capsterId);
            })
            ->latest()
            ->get();

        // 3. Kirim data ke React
        return Inertia::render('admin/pricing/index', [
            'pricings' => $pricings,
            'services' => Service::all(), // Untuk opsi Dropdown Service
            'capsters' => Capster::all(), // Untuk opsi Dropdown Capster
            'filters' => [
                'service_id' => $serviceId ?? 'all',
                'capster_id' => $capsterId ?? 'all',
            ]
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
        // 1. Validasi input dasar
        $request->validate([
            'service_id' => ['required'],
            'capster_id' => ['required'],
            'price'      => ['required', 'min:1', 'integer']
        ]);

        // 2. Cek apakah kombinasi service dan capster tersebut sudah ada di database
        $isDuplicate = Pricing::where('service_id', $request->service_id)
            ->where('capster_id', $request->capster_id)
            ->exists();

        // 3. Jika sudah ada, kembalikan ke halaman sebelumnya dengan pesan error
        if ($isDuplicate) {
            return back()->with('error', 'Data harga untuk Service dan Capster ini sudah ada!');
        }

        // 4. Jika aman (belum ada), lanjutkan proses simpan
        Pricing::create([
            'service_id' => $request->service_id,
            'capster_id' => $request->capster_id,
            'price'      => $request->price
        ]);

        // 5. Kembali ke index dengan pesan sukses
        return to_route('pricings.index')->with('success', 'Harga service berhasil ditambahkan');
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
        return to_route('pricings.index')->with('success', 'Harga service berhasil diperbarui');
    }

    public function remove(Pricing $pricing)
    {
        $pricing->delete();
        return to_route('pricings.index')->with('success', 'Harga sevice berhasil dihapus');
    }
}
