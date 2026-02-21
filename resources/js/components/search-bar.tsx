import { router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
    routeUrl: string; // URL tujuan (misal: '/admin/services/index')
    initialSearch?: string; // Kata kunci pencarian awal (dari props Inertia)
    placeholder?: string; // Teks placeholder opsional
}

export default function SearchBar({
    routeUrl,
    initialSearch = '',
    placeholder = 'Cari data...',
}: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    // Gunakan useRef untuk mencegah request otomatis saat komponen pertama kali dimuat
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                routeUrl,
                { search: searchTerm },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, routeUrl]);

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-black dark:text-white"
            />
        </div>
    );
}
