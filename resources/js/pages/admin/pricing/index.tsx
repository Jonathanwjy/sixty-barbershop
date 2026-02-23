import { Link, router } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

interface Pricing {
    id: number;
    service_id: number;
    capster_id: number;
    price: number;

    service?: {
        id: number;
        name: string;
    };
    capster?: {
        id: number;
        name: string;
    };
}

interface DropdownOption {
    id: number;
    name: string;
}

interface PricingIndexProps {
    pricings: Pricing[];
    services: DropdownOption[];
    capsters: DropdownOption[];
    filters: {
        service_id: string;
        capster_id: string;
    };
}

export default function PricingIndex({
    pricings = [],
    services = [],
    capsters = [],
    filters,
}: PricingIndexProps) {
    const handleFilterChange = (
        key: 'service_id' | 'capster_id',
        value: string,
    ) => {
        router.get(
            '/admin/pricings/index', // <-- HAPUS /index DI SINI
            {
                ...filters,
                [key]: value, // Kirim apa adanya, biar Laravel yang filter kata "all"-nya
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
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
                            Pricing Management
                        </h1>
                        <Select
                            value={filters?.service_id || 'all'}
                            onValueChange={(val) =>
                                handleFilterChange('service_id', val)
                            }
                        >
                            <SelectTrigger className="w-1/4 text-black dark:text-white">
                                <SelectValue placeholder="Filter Service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Service
                                </SelectItem>
                                {services.map((service) => (
                                    <SelectItem
                                        key={service.id}
                                        value={String(service.id)}
                                    >
                                        {service.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* 2. FILTER CAPSTER */}
                        <Select
                            value={filters?.capster_id || 'all'}
                            onValueChange={(val) =>
                                handleFilterChange('capster_id', val)
                            }
                        >
                            <SelectTrigger className="w-1/4 text-black dark:text-white">
                                <SelectValue placeholder="Filter Capster" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Capster
                                </SelectItem>
                                {capsters.map((capster) => (
                                    <SelectItem
                                        key={capster.id}
                                        value={String(capster.id)}
                                    >
                                        {capster.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Link
                            href="/admin/pricings/create"
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            + Add Pricing
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
                                        Nama Service
                                    </th>
                                    <th className="border-b px-4 py-3 font-medium">
                                        Nama Capster
                                    </th>
                                    {/* Tambahkan text-center agar sejajar dengan tombol */}
                                    <th className="border-b px-4 py-3 font-medium">
                                        Harga
                                    </th>
                                    {/* Pastikan ini juga text-center */}
                                    <th className="border-b px-4 py-3 text-center font-medium">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pricings.length > 0 ? (
                                    pricings.map((pricing, index) => (
                                        <tr
                                            key={pricing.id}
                                            className="border-b transition-colors last:border-0 hover:bg-muted/50"
                                        >
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-muted-foreground">
                                                {pricing.service?.name}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {pricing.capster?.name}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {pricing.price}
                                            </td>

                                            <td className="px-4 py-3">
                                                {/* justify-center akan menengahkan tombol Edit & Delete */}
                                                <div className="flex justify-center gap-3">
                                                    <Link
                                                        href={`/admin/pricings/edit/${pricing.id}`}
                                                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={`/admin/pricings/delete/${pricing.id}`}
                                                        method="delete"
                                                        as="button"
                                                        className="font-medium text-red-600 hover:text-red-800 hover:underline"
                                                        onClick={(e) => {
                                                            if (
                                                                !confirm(
                                                                    'Yakin ingin menghapus service ini?',
                                                                )
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-8 text-center text-muted-foreground"
                                        >
                                            Belum ada data Pricing yang
                                            ditambahkan.
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
