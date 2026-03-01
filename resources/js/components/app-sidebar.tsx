import { Link, usePage } from '@inertiajs/react'; // 1. Tambahkan usePage
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { NavItem } from '@/types';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Bookings',
        href: '/admin/bookings/index',
        icon: BookOpen,
    },
    {
        title: 'Services',
        href: '/admin/services/index',
        icon: Folder,
    },
    {
        title: 'Capster',
        href: '/admin/capsters/index',
        icon: Folder,
    },
    {
        title: 'Pricing',
        href: '/admin/pricings/index',
        icon: Folder,
    },
];

export function AppSidebar() {
    // 2. Ambil informasi URL saat ini dari Inertia
    const { url } = usePage();

    // 3. Petakan ulang mainNavItems untuk menentukan status aktif secara dinamis
    const activeNavItems = mainNavItems.map((item) => {
        // Hilangkan '/index' untuk mendapatkan "Base URL" dari menu tersebut
        // Contoh: '/admin/services/index' menjadi '/admin/services'
        const basePath = item.href.replace('/index', '');

        return {
            ...item,
            // Menu akan aktif jika URL browser saat ini diawali dengan basePath
            // Jadi '/admin/services/edit/1' akan tetap membuat menu 'Services' menyala
            isActive: url.startsWith(basePath),
        };
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={activeNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
