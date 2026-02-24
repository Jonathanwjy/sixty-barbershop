<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Capster;
use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pricing;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function create(Request $request)
    {

        $capters = Capster::where('status', 'active')->get();
        $services = Service::where('status', 'active')->get();
        $pricings = Pricing::select('id', 'service_id', 'capster_id', 'price')->get();

        $bookedTimes = [];
        if ($request->has('date') && $request->has('capster_id')) {
            $bookings = Booking::where('date', $request->date)
                ->where('capster_id', $request->capster_id)
                ->get(['start_time', 'end_time']);

            foreach ($bookings as $booking) {
                $start = Carbon::parse($booking->start_time);
                $end = Carbon::parse($booking->end_time);

                // Looping setiap 30 menit dari start_time sampai sebelum end_time
                // Contoh: start 10:00, end 11:00 -> akan mendisable 10:00 dan 10:30
                while ($start < $end) {
                    $bookedTimes[] = $start->format('H:i');
                    $start->addMinutes(30);
                }
            }
        }
        return Inertia::render('user/booking-form', [
            'capsters' => $capters,
            'services' => $services,
            'pricings' => $pricings,
            'bookedTimes' => fn() => array_values(array_unique($bookedTimes)),
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'capster_id' => 'required|exists:capsters,id',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
        ]);

        // 2. Ambil Harga (Price) dari tabel Pricings
        $pricing = Pricing::where('service_id', $request->service_id)
            ->where('capster_id', $request->capster_id)
            ->first();

        // 3. Ambil Durasi dari tabel Services untuk menghitung end_time
        $service = Service::findOrFail($request->service_id);

        // Asumsi: Kamu memiliki kolom 'duration' (dalam satuan menit) di tabel services.
        // Jika belum ada, kamu bisa menyesuaikan baris ini (misalnya default 30 atau 60 menit).
        $durationInMinutes = $service->duration ?? 30;

        // 4. Hitung waktu selesai (end_time)
        $startTime = Carbon::parse($request->start_time);
        $endTime = $startTime->copy()->addMinutes($durationInMinutes);

        // 5. Validasi Bentrok (Double Booking Check) di sisi Backend untuk keamanan ekstra
        $isConflict = Booking::where('date', $request->date)
            ->where('capster_id', $request->capster_id)
            ->where(function ($query) use ($startTime, $endTime) {
                // Mengecek apakah rentang waktu yang dipilih tumpang tindih dengan jadwal yang sudah ada
                $query->where(function ($q) use ($startTime, $endTime) {
                    $q->where('start_time', '<', $endTime->format('H:i:s'))
                        ->where('end_time', '>', $startTime->format('H:i:s'));
                });
            })
            ->exists();

        if ($isConflict) {
            return back()->withErrors([
                'start_time' => 'Maaf, jadwal ini sudah terisi. Silakan pilih waktu lain.'
            ]);
        }

        // 6. Simpan Data Booking
        Booking::create([
            'user_id' => Auth::id(),
            'service_id' => $request->service_id,
            'capster_id' => $request->capster_id,
            'price' => $pricing ? $pricing->price : null,
            'date' => $request->date,
            'start_time' => $startTime->format('H:i:s'),
            'end_time' => $endTime->format('H:i:s'),
        ]);

        // 7. Redirect ke halaman yang diinginkan (contoh: dashboard atau history booking)
        return to_route('home')->with('success', 'Booking berhasil dibuat!');
    }

    public function bookingHistory()
    {
        return Inertia::render('user/booking-history');
    }
}
