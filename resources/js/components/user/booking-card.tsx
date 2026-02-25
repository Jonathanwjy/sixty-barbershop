import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import CancelBookingButton from '@/components/user/cancel-booking-button';

// tipe data yang sama seperti di halaman lain
interface Service {
    id: number;
    name: string;
}

interface Capster {
    id: number;
    name: string;
}

export interface Booking {
    id: number;
    service: Service;
    capster: Capster;
    date: string;
    start_time: string;
    end_time: string;
    price: number;
    payment_status: string;
    booking_status: string;
}

const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(angka);
};

interface BookingCardProps {
    booking: Booking;
    type: 'unpaid' | 'ongoing' | 'finished' | 'canceled';
}

export default function BookingCard({ booking, type }: BookingCardProps) {
    // Label status untuk ditampilkan di desain kamu
    const statusLabels = {
        unpaid: 'Menunggu Pembayaran',
        ongoing: 'Booking Aktif',
        finished: 'Selesai',
        canceled: 'Dibatalkan',
    };

    return (
        <div className="group flex cursor-pointer flex-col justify-between rounded-lg border bg-accent px-8 py-4 text-accent-foreground transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div>
                <div className="flex items-start justify-between">
                    <p className="text-xl font-semibold transition-colors duration-300 md:text-2xl">
                        {statusLabels[type]}
                        {type === 'ongoing' && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                Harap datang 10 menit lebih awal dari jadwal
                                booking
                            </p>
                        )}
                    </p>

                    <div className="text-right text-sm text-accent-foreground">
                        <p>Tanggal Booking: {booking.date}</p>
                        <p>Jam: {booking.start_time.substring(0, 5)} WIB</p>
                    </div>
                </div>
                <div className="mt-4 space-y-1">
                    <p className="text-lg font-medium">
                        {booking.service?.name}
                    </p>
                    <p className="text-muted-foreground">
                        Capster: {booking.capster?.name}
                    </p>
                    <p className="font-semibold text-muted-foreground">
                        {formatRupiah(booking.price)}
                    </p>
                </div>
            </div>

            {/* Tombol aksi khusus untuk tab 'Belum Bayar' */}
            {type === 'unpaid' && (
                <div className="mt-6 flex flex-col gap-2 border-t border-accent-foreground/20 pt-4 md:flex-row md:justify-end">
                    <CancelBookingButton
                        bookingId={booking.id}
                        className="w-full md:w-auto"
                    />
                    <Link
                        href={`/booking/checkout/${booking.id}`}
                        className="w-full md:w-auto"
                    >
                        <Button className="w-full bg-primary text-primary-foreground">
                            <Link href={`/bookings/checkout/${booking.id}`}>
                                Bayar Sekarang
                            </Link>
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
