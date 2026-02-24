<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function callback(Request $request)
    {
        Log::info('MIDTRANS CALLBACK:', $request->all());

        $serverKey = config('midtrans.server_key');

        $signature = hash(
            'sha512',
            $request->order_id .
                $request->status_code .
                $request->gross_amount .
                $serverKey
        );

        if ($signature !== $request->signature_key) {
            Log::error('INVALID SIGNATURE');
            abort(403);
        }

        // --- BAGIAN YANG DIUBAH ---
        // Pecah string 'BOOK-15-1708123456' menjadi array
        $parts = explode('-', $request->order_id);

        // Ambil index ke-1 (yaitu ID booking-nya, dalam contoh di atas adalah '15')
        $bookingId = $parts[1] ?? null;

        // Cari berdasarkan ID utama (Primary Key)
        $booking = Booking::find($bookingId);
        // --------------------------

        if (!$booking) {
            Log::error('BOOKING NOT FOUND');
            abort(404);
        }

        switch ($request->transaction_status) {

            case 'settlement':
            case 'capture':
                $booking->update([
                    'payment_status' => 'paid'
                ]);
                break;

            case 'pending':
                $booking->update([
                    'payment_status' => 'pending'
                ]);
                break;

            case 'expire':
            case 'cancel':
            case 'deny':
                $booking->update([
                    'payment_status' => 'failed'
                ]);
                break;
        }

        return response()->json(['status' => 'ok']);
    }
}
