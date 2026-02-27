import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import React from 'react';
import SearchBar from '@/components/search-bar';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { showConfirm } from '@/alert';

// --- INTERFACES ---
interface User {
    name: string;
    email: string;
    phone?: string;
}

interface Service {
    name: string;
}

interface Capster {
    name: string;
}

interface Booking {
    id: number;
    user: User;
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
    bookings: Booking[];
    filters: {
        search?: string;
        date: string;
        payment_status?: string;
        booking_status?: string;
    };
}

// --- HELPER UNTUK FORMAT RUPIAH ---
const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(angka);
};

export default function BookingIndex({ bookings = [], filters }: Props) {
    // State untuk melacak ID baris mana yang sedang di-expand (terbuka)
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Fungsi untuk membuka/menutup baris detail
    const toggleRow = (id: number) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }
    };

    // --- FUNGSI FILTER UNIVERSAL ---
    const handleFilterChange = (field: string, value: string) => {
        router.get(
            '/admin/bookings/index',
            {
                ...filters, // Bawa semua filter yang ada saat ini
                [field]: value, // Timpa dengan filter yang baru diubah
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    // Helper untuk membuat URL SearchBar agar membawa filter tanggal & status
    const getSearchUrl = () => {
        const params = new URLSearchParams();
        if (filters.date) params.append('date', filters.date);
        if (filters.payment_status)
            params.append('payment_status', filters.payment_status);
        if (filters.booking_status)
            params.append('booking_status', filters.booking_status);
        return `/admin/bookings/index?${params.toString()}`;
    };

    const handleComplete = async (id: number) => {
        const isConfirmed = await showConfirm(
            'Complete booking',
            'Selesaikan booking ini?',
            'Ya, Selesaikan!',
        );

        if (isConfirmed) {
            router.patch(
                `/admin/bookings/${id}/completed`,
                {},
                {
                    preserveScroll: true,
                },
            );
        }
    };

    const handleCancel = async (id: number) => {
        const isConfirmed = await showConfirm(
            'cancel booking',
            'Apakah Anda yakin ingin membatalkan booking ini?',
            'Ya, Batalkan!',
        );

        if (isConfirmed) {
            router.post(
                `/admin/bookings/${id}/cancel`,
                {},
                {
                    preserveScroll: true,
                },
            );
        }
    };

    // --- HELPER WARNA BADGE ---
    const getPaymentBadge = (status: string) => {
        switch (status) {
            case 'paid':
            case 'settlement':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default:
                return 'bg-red-100 text-red-700 border-red-200';
        }
    };

    const getBookingBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'confirmed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default:
                return 'bg-red-100 text-red-700 border-red-200';
        }
    };

    // Helper untuk format tanggal
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <AppSidebarLayout>
            <div className="flex flex-col gap-6 p-6">
                {/* --- HEADER & FILTER SECTION --- */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Booking Management
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Jadwal tanggal:{' '}
                            <span className="font-semibold text-foreground">
                                {formatDate(filters.date)}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Filter Tanggal */}
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="date-filter"
                                    className="hidden text-sm font-medium text-muted-foreground sm:block"
                                >
                                    Tanggal:
                                </label>
                                <input
                                    id="date-filter"
                                    type="date"
                                    value={filters.date}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            'date',
                                            e.target.value,
                                        )
                                    }
                                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
                                />
                            </div>

                            {/* Filter Status Pembayaran */}
                            <select
                                value={filters.payment_status || ''}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'payment_status',
                                        e.target.value,
                                    )
                                }
                                className="h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:flex-none"
                            >
                                <option value="">Semua Pembayaran</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="settlement">Settlement</option>
                                <option value="expired">Expired</option>
                                <option value="failed">Failed</option>
                            </select>

                            {/* Filter Status Booking */}
                            <select
                                value={filters.booking_status || ''}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'booking_status',
                                        e.target.value,
                                    )
                                }
                                className="h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:flex-none"
                            >
                                <option value="">Semua Status Booking</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full self-end sm:w-80">
                            <SearchBar
                                routeUrl={getSearchUrl()}
                                initialSearch={filters?.search}
                                placeholder="Cari nama pelanggan..."
                            />
                        </div>
                    </div>
                </div>

                {/* --- TABLE SECTION --- */}
                <div className="w-full overflow-hidden rounded-md border border-border bg-background shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="border-b px-4 py-3 font-medium">
                                    No
                                </th>
                                <th className="border-b px-4 py-3 font-medium">
                                    Nama
                                </th>
                                <th className="border-b px-4 py-3 font-medium">
                                    Service & Capster
                                </th>
                                <th className="border-b px-4 py-3 font-medium">
                                    Jam
                                </th>
                                <th className="border-b px-4 py-3 font-medium">
                                    Status Pembayaran
                                </th>
                                <th className="border-b px-4 py-3 font-medium">
                                    Status Booking
                                </th>
                                <th className="border-b px-4 py-3 text-center font-medium">
                                    Detail
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? (
                                bookings.map((booking, index) => (
                                    <React.Fragment key={booking.id}>
                                        {/* BARIS UTAMA */}
                                        <tr
                                            onClick={() =>
                                                toggleRow(booking.id)
                                            }
                                            className={`cursor-pointer border-b transition-colors hover:bg-muted/50 ${
                                                expandedId === booking.id
                                                    ? 'bg-muted/30'
                                                    : ''
                                            }`}
                                        >
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-foreground">
                                                {booking.user?.name}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                <div className="font-medium">
                                                    {booking.service?.name}
                                                </div>
                                                <div className="text-xs">
                                                    by {booking.capster?.name}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-foreground text-muted-foreground">
                                                {booking.start_time.substring(
                                                    0,
                                                    5,
                                                )}{' '}
                                                -{' '}
                                                {booking.end_time.substring(
                                                    0,
                                                    5,
                                                )}{' '}
                                                WIB
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${getPaymentBadge(booking.payment_status)}`}
                                                >
                                                    {booking.payment_status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${getBookingBadge(booking.booking_status)}`}
                                                >
                                                    {booking.booking_status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center font-medium text-primary">
                                                {expandedId === booking.id
                                                    ? 'Tutup'
                                                    : 'Lihat'}
                                            </td>
                                        </tr>

                                        {/* BARIS DETAIL */}
                                        {expandedId === booking.id && (
                                            <tr className="border-b bg-muted/10">
                                                <td
                                                    colSpan={7}
                                                    className="px-0 py-0"
                                                >
                                                    <div className="grid grid-cols-1 gap-4 border-l-4 border-primary px-6 py-4 md:grid-cols-3">
                                                        {/* Kolom Info Pelanggan */}
                                                        <div>
                                                            <h4 className="mb-2 text-sm font-semibold">
                                                                Informasi
                                                                Pelanggan
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Email:{' '}
                                                                {
                                                                    booking.user
                                                                        ?.email
                                                                }
                                                            </p>
                                                            {booking.user
                                                                ?.phone && (
                                                                <p className="text-sm text-muted-foreground">
                                                                    No. HP:{' '}
                                                                    {
                                                                        booking
                                                                            .user
                                                                            .phone
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Kolom Info Layanan */}
                                                        <div>
                                                            <h4 className="mb-2 text-sm font-semibold">
                                                                Layanan
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                Service:{' '}
                                                                {
                                                                    booking
                                                                        .service
                                                                        ?.name
                                                                }
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Capster:{' '}
                                                                {
                                                                    booking
                                                                        .capster
                                                                        ?.name
                                                                }
                                                            </p>
                                                        </div>

                                                        {/* Kolom Harga & Aksi */}
                                                        <div className="flex flex-col justify-between md:items-end">
                                                            <div className="w-full text-left md:text-right">
                                                                <h4 className="mb-1 text-sm font-semibold">
                                                                    Total
                                                                    Tagihan
                                                                </h4>
                                                                <p className="text-lg font-bold text-primary">
                                                                    {formatRupiah(
                                                                        booking.price,
                                                                    )}
                                                                </p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Order ID:
                                                                    {booking.id}
                                                                </p>
                                                            </div>

                                                            <div className="mt-4 flex gap-2">
                                                                {booking.booking_status ===
                                                                    'confirmed' && (
                                                                    <button
                                                                        onClick={() =>
                                                                            handleComplete(
                                                                                booking.id,
                                                                            )
                                                                        }
                                                                        className="cursor-pointer rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                                                                    >
                                                                        Tandai
                                                                        Selesai
                                                                    </button>
                                                                )}
                                                                {booking.payment_status ===
                                                                    'pending' && (
                                                                    <button
                                                                        onClick={() =>
                                                                            handleCancel(
                                                                                booking.id,
                                                                            )
                                                                        }
                                                                        className="cursor-pointer rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-800"
                                                                    >
                                                                        Batalkan
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                /* State Kosong */
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-12 text-center text-muted-foreground"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-lg font-medium">
                                                Tidak ada jadwal
                                            </span>
                                            <span>
                                                {filters?.search ||
                                                filters?.payment_status ||
                                                filters?.booking_status
                                                    ? `Booking dengan filter yang dipilih tidak ditemukan pada tanggal ini.`
                                                    : `Belum ada data booking untuk tanggal ${formatDate(filters.date)}.`}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
