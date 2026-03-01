import { Link, usePage } from '@inertiajs/react'; // Gunakan usePage dari Inertia
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
// Hapus import useCurrentUrl karena kita tidak memakainya lagi

export function NavMain({ items = [] }: { items: NavItem[] }) {
    // Ambil URL saat ini dari Inertia
    const { url } = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    // 1. Hilangkan '/index' dari href untuk mendapatkan "Base URL"
                    // Contoh: '/admin/services/index' menjadi '/admin/services'
                    const basePath = typeof item.href === 'string' ? item.href.replace('/index', '') : '';

                    // 2. Cek apakah URL browser saat ini diawali dengan basePath tersebut
                    // Ini akan menghasilkan nilai true/false
                    const isActiveMenu = url.startsWith(basePath);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                // 3. Terapkan nilai true/false ke properti isActive
                                isActive={isActiveMenu}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
