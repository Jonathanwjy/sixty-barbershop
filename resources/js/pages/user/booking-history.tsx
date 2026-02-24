import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import CancelBookingButton from '@/components/user/cancel-booking-button';
import AppLayout from '@/layouts/app-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Service {
    id: number;
    name: string;
}

interface Capster {
    id: number;
    name: string;
}

interface Booking {
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

interface Props {
    unpaidBook: Booking[];
    ongoingBook: Booking[];
    finishedBook: Booking[];
    canceledBook: Booking[];
}

// --- HELPER UNTUK FORMAT RUPIAH ---
const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(angka);
};

// --- KOMPONEN KARTU BERDASARKAN DESAIN KAMU ---
const BookingCard = ({
    booking,
    type,
}: {
    booking: Booking;
    type: 'unpaid' | 'ongoing' | 'finished' | 'canceled';
}) => {
    // Label status untuk ditampilkan di desain kamu
    const statusLabels = {
        unpaid: 'Menunggu Pembayaran',
        ongoing: 'Jadwal Aktif',
        finished: 'Selesai',
        canceled: 'Dibatalkan',
    };

    return (
        <div className="group flex cursor-pointer flex-col justify-between rounded-lg border bg-accent px-8 py-4 text-accent-foreground transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div>
                <div className="flex items-start justify-between">
                    <p className="text-2xl font-semibold transition-colors duration-300">
                        {statusLabels[type]}
                    </p>
                    <div className="text-right text-sm text-accent-foreground">
                        <p>{booking.date}</p>
                        <p>{booking.start_time.substring(0, 5)} WIB</p>
                    </div>
                </div>
                <div className="mt-4 space-y-1">
                    <p className="text-lg font-medium">
                        {booking.service?.name}
                    </p>
                    <p className="text-muted-foreground">
                        {booking.capster?.name}
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
                            Bayar Sekarang
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

// --- KOMPONEN UTAMA ---
export default function BookingHistory({
    unpaidBook = [],
    ongoingBook = [],
    finishedBook = [],
    canceledBook = [],
}: Props) {
    return (
        <>
            <AppLayout>
                <div className="mb-20">
                    <div className="mt-4 mb-10 w-full px-12 text-center">
                        <h1 className="text-2xl font-bold underline underline-offset-8">
                            Booking History
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Perjalanan kamu bersama kami
                        </p>
                    </div>

                    <div className="px-6 md:px-12">
                        <Tabs defaultValue="unpaid" className="w-full">
                            {/* DAFTAR TAB */}
                            <TabsList className="mb-8 grid h-auto w-full grid-cols-2 gap-2 bg-accent lg:grid-cols-4">
                                <TabsTrigger value="unpaid" className="py-2.5">
                                    Belum Bayar ({unpaidBook.length})
                                </TabsTrigger>
                                <TabsTrigger value="ongoing" className="py-2.5">
                                    Berjalan ({ongoingBook.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="finished"
                                    className="py-2.5"
                                >
                                    Selesai ({finishedBook.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="canceled"
                                    className="py-2.5"
                                >
                                    Dibatalkan ({canceledBook.length})
                                </TabsTrigger>
                            </TabsList>

                            {/* KONTEN TAB: BELUM BAYAR */}
                            <TabsContent value="unpaid">
                                {unpaidBook.length === 0 ? (
                                    <div className="rounded-lg border bg-accent/50 py-10 text-center text-muted-foreground">
                                        Tidak ada pesanan belum dibayar.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {unpaidBook.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                booking={booking}
                                                type="unpaid"
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            {/* KONTEN TAB: BERJALAN */}
                            <TabsContent value="ongoing">
                                {ongoingBook.length === 0 ? (
                                    <div className="rounded-lg border bg-accent/50 py-10 text-center text-muted-foreground">
                                        Tidak ada pesanan berjalan.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {ongoingBook.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                booking={booking}
                                                type="ongoing"
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            {/* KONTEN TAB: SELESAI */}
                            <TabsContent value="finished">
                                {finishedBook.length === 0 ? (
                                    <div className="rounded-lg border bg-accent/50 py-10 text-center text-muted-foreground">
                                        Belum ada riwayat pesanan selesai.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {finishedBook.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                booking={booking}
                                                type="finished"
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            {/* KONTEN TAB: DIBATALKAN */}
                            <TabsContent value="canceled">
                                {canceledBook.length === 0 ? (
                                    <div className="rounded-lg border bg-accent/50 py-10 text-center text-muted-foreground">
                                        Tidak ada pesanan dibatalkan.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {canceledBook.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                booking={booking}
                                                type="canceled"
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
