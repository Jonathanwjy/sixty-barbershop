import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react'; // Icon Hamburger
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logout from '@/components/ui/logout';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

export default function Navbar() {
    // Mengambil data user dari global props
    const { auth } = usePage().props as any;

    // State untuk mengontrol buka/tutup menu mobile secara manual
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Service', href: '/service' },
        { name: 'Capster', href: '/capster' },
        { name: 'About', href: '/about' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-sidebar-primary text-sidebar-primary-foreground backdrop-blur">
            <div className="container mx-auto flex h-12 items-center justify-between px-4 md:h-20">
                {/* --- 1. LOGO (KIRI) --- */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-md bg-primary" />
                        <span className="text-xl font-bold tracking-tight">
                            BrandName
                        </span>
                    </Link>
                </div>

                {/* --- 2. DESKTOP MENU (TENGAH & KANAN) --- */}
                {/* Hidden di mobile, muncul di md */}
                <div className="hidden items-center gap-6 md:flex">
                    {/* Links */}
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-md rounded-md p-2 font-medium transition-colors hover:bg-accent-foreground hover:text-accent"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Auth Buttons Desktop */}
                    <div className="ml-4 flex items-center gap-4">
                        {auth.user ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost">Menu</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <Link href="/settings">
                                                    Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Booking
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="/booking-history">
                                                    History
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Logout />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button className="hover:bg-accent-foreground hover:text-accent">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="text-white hover:bg-accent-foreground hover:text-accent">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- 3. MOBILE MENU (HAMBURGER) --- */}
                {/* Muncul di mobile, hidden di md */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-sidebar-foreground"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>

                        {/* Isi Menu Mobile (Slide dari Kanan) */}
                        <SheetContent
                            side="right"
                            className="bg-sidebar-primary text-sidebar-foreground"
                        >
                            <div className="mt-8 flex flex-col gap-6 pl-4">
                                {/* Mobile Links */}
                                <div className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)} // Tutup menu saat link diklik
                                            className="text-md rounded-md p-2 font-medium transition-colors hover:bg-accent-foreground hover:text-accent"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                {/* Garis Pemisah */}
                                <div className="h-[1px] w-full bg-border" />

                                {/* Mobile Auth Buttons */}
                                <div className="flex flex-col gap-3">
                                    {auth.user ? (
                                        <>
                                            <Link
                                                href="/setting"
                                                onClick={() => setIsOpen(false)} // Tutup menu saat link diklik
                                                className="text-md rounded-md p-2 font-medium transition-colors hover:bg-accent-foreground hover:text-accent"
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                href=""
                                                onClick={() => setIsOpen(false)} // Tutup menu saat link diklik
                                                className="text-md rounded-md p-2 font-medium transition-colors hover:bg-accent-foreground hover:text-accent"
                                            >
                                                Booking
                                            </Link>
                                            <Link
                                                href=""
                                                onClick={() => setIsOpen(false)} // Tutup menu saat link diklik
                                                className="text-md rounded-md p-2 font-medium transition-colors hover:bg-accent-foreground hover:text-accent"
                                            >
                                                History
                                            </Link>
                                            <Logout />
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start bg-transparent"
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link
                                                href="/register"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start"
                                                >
                                                    Register
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
