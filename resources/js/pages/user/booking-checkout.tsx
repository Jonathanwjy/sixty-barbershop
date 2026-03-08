import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CancelBookingButton from '@/components/user/cancel-booking-button';
import AppLayout from '@/layouts/app-layout';

interface Booking {
    id: number;
    snap_token: string;
    price: number;
    date: string;
    start_time: string;
    end_time: string;
    service?: { name: string };
    capster?: { name: string };
}

interface Props {
    booking: Booking;
    midtransClientKey: string;
    isProduction: boolean;
    errors: Record<string, string>;
}

export default function BookingCheckout({
    booking,
    midtransClientKey,
    isProduction,
}: Props) {
    useEffect(() => {
        const scriptUrl = isProduction
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js';

        const scriptTag = document.createElement('script');
        scriptTag.src = scriptUrl;
        scriptTag.setAttribute('data-client-key', midtransClientKey);
        scriptTag.async = true;

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, [midtransClientKey, isProduction]);

    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(angka);
    };

    const handlePay = () => {
        const snap = (window as any).snap;

        if (snap && booking.snap_token) {
            snap.pay(booking.snap_token, {
                onSuccess: function (result: any) {
                    console.log('Success:', result);
                    router.visit('/', {
                        onSuccess: () => alert('Pembayaran berhasil!'),
                    });
                },
                onPending: function (result: any) {
                    console.log('Pending:', result);
                    router.visit('/', {
                        onSuccess: () => alert('Menunggu pembayaran Anda.'),
                    });
                },
                onError: function (result: any) {
                    console.log('Error:', result);
                    alert('Pembayaran gagal, silakan coba lagi.');
                },
                onClose: function () {
                    console.log(
                        'Customer closed the popup without finishing the payment',
                    );
                    alert('Anda menutup halaman pembayaran.');
                },
            });
        } else {
            alert(
                'Sistem pembayaran sedang memuat, silakan coba beberapa saat lagi.',
            );
        }
    };

    return (
        <AppLayout>
            <div className="mx-auto mt-12 mb-12 flex w-11/12 flex-col rounded-lg border border-gray-300 p-6 shadow-sm md:w-1/2 lg:w-1/3">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Booking Sumary</h1>
                    <p className="mt-1 text-sm text-muted-foreground md:text-base">
                        Silahkan cek kembali kesesuaian service, capster serta
                        waktu booking anda. Jika sudah sesuai semua, jangan lupa
                        melakukan pembayaran.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="rounded-md border border-accent bg-accent/30 p-4">
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">
                                    Service:
                                </span>
                                <span className="font-medium">
                                    {booking.service?.name}
                                </span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">
                                    Capster:
                                </span>
                                <span className="font-medium">
                                    {booking.capster?.name}
                                </span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">
                                    Tanggal:
                                </span>
                                <span className="font-medium">
                                    {booking.date}
                                </span>
                            </li>
                            <li className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">
                                    Jam:
                                </span>
                                <span className="font-medium">
                                    {booking.start_time.substring(0, 5)} -{' '}
                                    {booking.end_time.substring(0, 5)}
                                </span>
                            </li>
                            <li className="flex justify-between pt-2">
                                <span className="font-bold">
                                    Total Pembayaran:
                                </span>
                                <span className="text-lg font-bold text-primary">
                                    {formatRupiah(booking.price)}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <Button
                        onClick={handlePay}
                        className="text-md mt-4 h-12 w-full cursor-pointer font-bold"
                    >
                        Bayar Sekarang
                    </Button>

                    <CancelBookingButton
                        bookingId={booking.id}
                        className="mt-2"
                    />
                </div>
            </div>
        </AppLayout>
    );
}
