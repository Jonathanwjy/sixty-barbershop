<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('snap_token')->nullable()->after('end_time');

            // Status Pembayaran (default: pending)
            $table->enum('payment_status', ['pending', 'paid', 'expired', 'failed'])
                ->default('pending')
                ->after('snap_token');

            // Status Operasional (default: pending)
            $table->enum('booking_status', ['pending', 'confirmed', 'completed', 'canceled'])
                ->default('pending')
                ->after('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            //
        });
    }
};
