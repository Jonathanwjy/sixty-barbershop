import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface CancelBookingButtonProps {
    bookingId: number;
    className?: string;
}

export default function CancelBookingButton({
    bookingId,
    className,
}: CancelBookingButtonProps) {
    // 1. Tambahkan { message: '' } agar TypeScript mengenali properti ini
    const { post, processing, errors } = useForm({
        message: '',
    });

    const handleCancel = () => {
        if (
            window.confirm(
                'Apakah Anda yakin ingin membatalkan pesanan ini? Jadwal Anda akan dilepas.',
            )
        ) {
            post(`/bookings/cancel/${bookingId}`, {
                preserveScroll: true,
                onSuccess: () => alert('Pesanan berhasil dibatalkan.'),
            });
        }
    };

    return (
        <div className={className}>
            {/* 2. Sekarang kamu bisa kembali menggunakan errors.message dengan aman */}
            {errors.message && (
                <div className="mb-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
                    {errors.message}
                </div>
            )}

            <Button
                className="w-full cursor-pointer rounded-xl bg-red-500 text-white hover:bg-red-700"
                onClick={handleCancel}
                disabled={processing}
            >
                {processing ? 'Membatalkan...' : 'Batalkan Booking'}
            </Button>
        </div>
    );
}
