import { Link, router } from '@inertiajs/react';
import { showConfirm } from '@/alert';
import SearchBar from '@/components/search-bar';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
    status: string;
    photo: string;
}

export default function ServiceIndex({
    services = [],
    filters,
}: {
    services: Service[];
    filters: { search: string };
}) {
    const handleToggleStatus = async (id: number, currentStatus: string) => {
        // Tentukan teks dinamis berdasarkan status saat ini
        const actionText =
            currentStatus === 'active' ? 'menonaktifkan' : 'aktifkan';

        // Tampilkan SweetAlert konfirmasi
        const isConfirmed = await showConfirm(
            'Ubah Status Service?',
            `Apakah Anda yakin ingin ${actionText} service ini?`,
            'Ya, Ubah Status!',
        );

        // Jika user klik "Ya", jalankan request ke backend
        if (isConfirmed) {
            router.patch(
                `/admin/services/toggle-status/${id}`,
                {},
                {
                    preserveScroll: true, // Agar halaman tidak loncat ke atas saat diklik
                },
            );
        }
    };

    return (
        <AppSidebarLayout>
            <div className="flex flex-col gap-6 p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Service Management</h1>

                    <SearchBar
                        routeUrl="/admin/services/index"
                        initialSearch={filters?.search}
                        placeholder="Cari nama service"
                    />
                    <Link
                        href="/admin/services/create"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        + Add Service
                    </Link>
                </div>

                {/* Table Section */}
                <div className="w-full overflow-hidden rounded-md border border-border bg-background shadow-sm">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="border-b px-4 py-3 font-medium">
                                    No
                                </th>
                                <th className="border-b px-4 py-3 font-medium">
                                    Nama Service
                                </th>
                                <th className="border-b px-4 py-3 font-medium">
                                    Deskripsi
                                </th>
                                <th className="border-b px-4 py-3 font-medium">
                                    Durasi
                                </th>
                                <th className="border-b px-4 py-3 font-medium">
                                    Photo
                                </th>
                                <th className="border-b px-4 py-3 text-center font-medium">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 2. Map data services ke dalam baris tabel */}
                            {services.length > 0 ? (
                                services.map((service, index) => (
                                    <tr
                                        key={service.id}
                                        className="border-b transition-colors last:border-0 hover:bg-muted/50"
                                    >
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-muted-foreground">
                                            {service.name}
                                        </td>
                                        <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                                            {service.description}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {service.duration} Menit
                                        </td>
                                        <td>
                                            <img
                                                src={`/storage/${service.photo}`}
                                                alt={service.name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() =>
                                                    handleToggleStatus(
                                                        service.id,
                                                        service.status,
                                                    )
                                                }
                                                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                                                    service.status === 'active'
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}
                                            >
                                                {service.status === 'active'
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </button>
                                            <Link
                                                href={`/admin/services/edit/${service.id}`}
                                                className="ml-2 font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                /* Jika data kosong */
                                <tr>
                                    <td
                                        colSpan={5} // <-- Sesuaikan dengan jumlah kolom (No, Nama, Deskripsi, Durasi, Aksi = 5)
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        {/* Ubah pesan kosong karena searchTerm sudah tidak ada di scope ini */}
                                        {filters?.search
                                            ? `Service dengan nama "${filters.search}" tidak ditemukan.`
                                            : 'Belum ada data service yang ditambahkan.'}
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
