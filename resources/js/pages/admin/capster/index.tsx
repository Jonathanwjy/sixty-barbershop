import { Link, router } from '@inertiajs/react';
import SearchBar from '@/components/search-bar';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

interface Capster {
    id: number;
    name: string;
    description: string;
    nickname: string;
    status: string;
}

export default function CapsterIndex({
    capsters = [],
    filters,
}: {
    capsters: Capster[];
    filters: { search: string };
}) {
    const handleToggleStatus = (id: number) => {
        router.patch(
            `/admin/capsters/toggle-status/${id}`,
            {},
            {
                preserveScroll: true, // Agar halaman tidak loncat ke atas saat diklik
            },
        );
    };
    return (
        <>
            <AppSidebarLayout>
                <div className="flex flex-col gap-6 p-6">
                    {/* Header Section */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Capster Management
                        </h1>

                        <SearchBar
                            routeUrl="/admin/capsters/index"
                            initialSearch={filters?.search}
                            placeholder="Cari nama capster"
                        />

                        <Link
                            href="/admin/capsters/create"
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            + Add Capster
                        </Link>
                    </div>

                    <div className="w-full overflow-hidden rounded-md border border-border bg-background shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted text-muted-foreground">
                                <tr>
                                    {/* Beri sedikit batasan lebar (w-16) agar kolom No tidak terlalu lebar */}
                                    <th className="w-16 border-b px-4 py-3 font-medium">
                                        No
                                    </th>
                                    <th className="border-b px-4 py-3 font-medium">
                                        Nama Capster
                                    </th>
                                    <th className="border-b px-4 py-3 font-medium">
                                        Nickname
                                    </th>

                                    <th className="border-b px-4 py-3 text-center font-medium">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {capsters.length > 0 ? (
                                    capsters.map((capster, index) => (
                                        <tr
                                            key={capster.id}
                                            className="border-b transition-colors last:border-0 hover:bg-muted/50"
                                        >
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-muted-foreground">
                                                {capster.name}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {capster.nickname}
                                            </td>

                                            {/* Ini sudah benar text-center, sekarang sejajar dengan headernya */}
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() =>
                                                        handleToggleStatus(
                                                            capster.id,
                                                        )
                                                    }
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                                                        capster.status ===
                                                        'active'
                                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                                >
                                                    {capster.status === 'active'
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </button>
                                                <Link
                                                    href={`/admin/capsters/edit/${capster.id}`}
                                                    className="ml-2 font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5} // <-- Sesuaikan dengan jumlah kolom (No, Nama, Deskripsi, Durasi, Aksi = 5)
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            {/* Ubah pesan kosong karena searchTerm sudah tidak ada di scope ini */}
                                            {filters?.search
                                                ? `Capster dengan nama "${filters.search}" tidak ditemukan.`
                                                : 'Belum ada data capster yang ditambahkan.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AppSidebarLayout>
        </>
    );
}
