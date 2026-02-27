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
                // --- TAMBAHKAN BARIS INI ---
                // Abaikan jadwal yang statusnya dibatalkan, gagal, atau kadaluarsa
                ->whereNotIn('booking_status', ['canceled'])
                // ---------------------------
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

    /**
     * Menyimpan data booking dan generate Snap Token Midtrans.
     */
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'capster_id' => 'required|exists:capsters,id',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
        ], [
            'date.after_or_equal' => 'Tanggal booking tidak boleh kurang dari hari ini.',
        ]);

        // 2. Ambil Harga (Price) dari tabel Pricings
        $pricing = Pricing::where('service_id', $request->service_id)
            ->where('capster_id', $request->capster_id)
            ->first();

        // 3. Ambil Durasi dari tabel Services
        $service = Service::findOrFail($request->service_id);
        $durationInMinutes = $service->duration ?? 30; // Default 30 menit jika kosong

        // 4. Hitung Waktu Selesai (End Time)
        $startTime = Carbon::parse($request->start_time);
        $endTime = $startTime->copy()->addMinutes($durationInMinutes);

        // 5. Validasi Bentrok Jadwal (Double Booking Check)
        $isConflict = Booking::where('date', $request->date)
            ->where('capster_id', $request->capster_id)
            ->whereNotIn('booking_status', ['canceled'])
            ->where(function ($query) use ($startTime, $endTime) {
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

        // 6. Simpan Data Booking ke Database dengan Status Awal
        $booking = Booking::create([
            'user_id' => Auth::id(),
            'service_id' => $request->service_id,
            'capster_id' => $request->capster_id,
            'price' => $pricing ? $pricing->price : 0,
            'date' => $request->date,
            'start_time' => $startTime->format('H:i:s'),
            'end_time' => $endTime->format('H:i:s'),
            'payment_status' => 'pending', // Menunggu pembayaran
            'booking_status' => 'pending', // Menunggu konfirmasi
        ]);

        // 7. Konfigurasi Midtrans dari file config/midtrans.php
        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $grossAmount = $booking->price > 0 ? $booking->price : 10000;

        $params = array(
            'transaction_details' => array(
                // Buat Order ID unik (Contoh: BOOK-1-1708123456)
                'order_id' => 'BOOK-' . $booking->id . '-' . time(),
                'gross_amount' => $grossAmount,
            ),
            'customer_details' => array(
                'first_name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ),
            'callbacks' => [
                'finish' => route('home'),
                'unfinish' => route('home'),
                'error' => route('home'),
            ],
            'expiry' => array(
                'duration' => 15,
                'unit' => 'minute',
            ),
        );

        try {
            $snapToken = \Midtrans\Snap::getSnapToken($params);

            $booking->update(['snap_token' => $snapToken]);

            return to_route('bookings.checkout', $booking->id)->with('success', 'Booking berhasil dibuat, silahkan lanjut ke pembayaran');
        } catch (\Exception $e) {

            $booking->delete();

            dd($e->getMessage());
        }
    }

    public function checkout(Booking $booking)
    {
        // Keamanan: Pastikan user hanya bisa melihat halaman checkout miliknya sendiri
        if ($booking->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        // Load data service dan capster agar bisa ditampilkan di ringkasan pesanan
        $booking->load(['service', 'capster']);

        return Inertia::render('user/booking-checkout', [
            'booking' => $booking,

            'midtransClientKey' => config('midtrans.client_key'),

            'isProduction' => config('midtrans.is_production'),
        ]);
    }

    public function userIndex()
    {
        $userId = Auth::id();

        // 1. Belum Dibayar (Menunggu Pembayaran)
        $unpaidBook = Booking::with(['service', 'capster'])
            ->where('user_id', $userId)
            ->where('payment_status', 'pending')
            ->where('booking_status', 'pending')
            ->latest()
            ->get();

        // 2. Berjalan (Sudah Dibayar & Dikonfirmasi)
        $ongoingBook = Booking::with(['service', 'capster'])
            ->where('user_id', $userId)
            ->where('payment_status', 'paid')
            ->where('booking_status', 'confirmed')
            ->latest()
            ->get();

        // 3. Selesai
        $finishedBook = Booking::with(['service', 'capster'])
            ->where('user_id', $userId)
            ->where('booking_status', 'completed')
            ->latest()
            ->get();

        // 4. Batal / Gagal / Kadaluarsa
        $canceledBook = Booking::with(['service', 'capster'])
            ->where('user_id', $userId)
            ->where(function ($query) {
                // Menggabungkan kondisi: jika payment gagal/expired ATAU booking dicancel
                $query->whereIn('payment_status', ['expired', 'failed'])
                    ->orWhere('booking_status', 'canceled');
            })
            ->latest()
            ->get();

        return Inertia::render('user/booking-history', [
            'unpaidBook' => $unpaidBook,
            'ongoingBook' => $ongoingBook,
            'finishedBook' => $finishedBook,
            'canceledBook' => $canceledBook,
        ]);
    }

    public function adminIndex(Request $request)
    {
        $selectedDate = $request->input('date', Carbon::today()->toDateString());

        $query = Booking::with(['user:id,name,email', 'service:id,name', 'capster:id,name'])
            ->where('date', $selectedDate);

        if ($request->has('search') && $request->search != '') {
            $searchTerm = $request->search;
            $query->whereHas('user', function ($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%');
            });
        }

        // --- TAMBAHAN FILTER STATUS ---
        if ($request->has('payment_status') && $request->payment_status != '') {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->has('booking_status') && $request->booking_status != '') {
            $query->where('booking_status', $request->booking_status);
        }
        // ------------------------------

        $bookings = $query
            ->orderByRaw("FIELD(booking_status, 'confirmed', 'completed', 'pending', 'canceled')")
            ->orderBy('start_time', 'asc')
            ->get();

        // Kirim data dan filter ke React
        return Inertia::render('admin/booking/index', [
            'bookings' => $bookings,
            'filters' => [
                'search' => $request->search,
                'date' => $selectedDate,
                'payment_status' => $request->payment_status,
                'booking_status' => $request->booking_status,
            ],
        ]);
    }

    public function markAsCompleted(Booking $booking)
    {
        // Pastikan hanya booking dengan status 'confirmed' yang bisa diubah menjadi 'completed'
        if ($booking->booking_status !== 'confirmed') {
            return back()->with('error', 'Status tidak valid untuk diselesaikan.');
        }

        $booking->update([
            'booking_status' => 'completed',
        ]);

        return redirect()->back()->with('success', 'Booking berhasil diselesaikan.');
    }

    public function adminCancel(Booking $booking)
    {

        if ($booking->payment_status !== 'pending') {
            return back()->with('error', 'Booking tidak dapat dibatalkan karena statusnya sudah ' . $booking->payment_status);
        }


        $booking->update([
            'payment_status' => 'failed',
            'booking_status' => 'canceled',
        ]);


        try {
            \Midtrans\Config::$serverKey = config('midtrans.server_key');
            \Midtrans\Config::$isProduction = config('midtrans.is_production');
        } catch (\Exception $e) {
        }


        return redirect()->back()->with('success', 'Booking berhasil dibatalkan.');
    }

    public function cancel(Booking $booking)
    {
        // 1. Keamanan: Pastikan yang membatalkan adalah pemilik booking
        if ($booking->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        // 2. Pastikan booking masih dalam status pending sebelum dibatalkan
        if ($booking->payment_status !== 'pending') {
            return back()->with('error', 'Booking tidak dapat dibatalkan karena statusnya sudah ' . $booking->payment_status);
        }

        // 3. Update status di database sesuai permintaanmu
        $booking->update([
            'payment_status' => 'failed',
            'booking_status' => 'canceled',
        ]);

        /* * Opsional: Batalkan juga tagihan di sisi Midtrans
         * agar token Snap-nya benar-benar mati dan tidak bisa dibayar lagi.
         */
        try {
            \Midtrans\Config::$serverKey = config('midtrans.server_key');
            \Midtrans\Config::$isProduction = config('midtrans.is_production');

            // Format order_id harus sama persis dengan yang kamu kirim saat method store()
            // Contoh format kita sebelumnya: 'BOOK-' . $booking->id . '-' . waktu_tertentu
            // Karena Midtrans butuh Order ID asli, cara paling aman untuk aplikasi produksi
            // adalah menyimpan 'order_id' (contoh: BOOK-15-1708123456) ke tabel database.
            // Namun jika kamu belum menyimpannya, membatalkan di sisi database lokal seperti #3 di atas sudah cukup aman untuk mencegah double-booking.

        } catch (\Exception $e) {
            // Abaikan error midtrans jika transaksi belum tercatat di sisi mereka
        }

        // 4. Redirect kembali ke dashboard dengan pesan sukses
        // Sesuaikan 'dashboard' dengan route halaman utamamu
        return to_route('bookings.history')->with('success', 'Booking berhasil dibatalkan.');
    }
}
