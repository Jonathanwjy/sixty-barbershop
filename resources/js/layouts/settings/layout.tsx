import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react'; // Tambahkan icon panah
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editPassword } from '@/routes/user-password';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Password',
        href: editPassword(),
        icon: null,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentUrl } = useCurrentUrl();

    // Ambil props auth dari Inertia
    const { auth } = usePage().props as any; // Sesuaikan tipe data jika menggunakan TypeScript ketat
    const user = auth?.user;

    // Cek apakah user adalah admin (sesuaikan 'role' dengan nama field di databasemu)
    const isAdmin = user?.role === 'admin';

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-10 md:pt-10 md:pb-16">
            <div className="space-y-0.5">
                <Heading
                    title="Settings"
                    description="Manage your profile and account settings"
                />
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full lg:w-1/4 xl:w-1/5">
                    {/* Navigasi: Horizontal scroll di mobile, Vertikal di Desktop */}
                    <nav
                        className="flex space-x-2 overflow-x-auto pb-2 lg:flex-col lg:space-y-1 lg:space-x-0 lg:pb-0"
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${toUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn(
                                    'justify-start whitespace-nowrap transition-colors',
                                    isCurrentUrl(item.href)
                                        ? 'bg-muted font-medium hover:bg-muted'
                                        : 'lg:hover:underline-none text-muted-foreground hover:bg-transparent hover:text-foreground hover:underline lg:hover:bg-muted',
                                )}
                            >
                                <Link href={item.href}>
                                    {item.icon && (
                                        <item.icon className="mr-2 h-4 w-4" />
                                    )}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}

                        {/* Back Link untuk Desktop */}
                        <div className="hidden pt-6 lg:block">
                            <Link
                                href={isAdmin ? '/admin/dashboard' : '/'}
                                className="flex items-center px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {isAdmin ? 'Back to Dashboard' : 'Back to Home'}
                            </Link>
                        </div>
                    </nav>
                </aside>

                {/* Konten Utama */}
                <div className="flex-1 md:max-w-3xl">
                    <section className="space-y-10">{children}</section>
                </div>
            </div>

            {/* Back Link khusus untuk Mobile (tampil di bawah form agar rapi) */}
            <div className="block pt-8 lg:hidden">
                <Link
                    href={isAdmin ? '/admin/dashboard' : '/'}
                    className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {isAdmin ? 'Back to Dashboard' : 'Back to Home'}
                </Link>
            </div>
        </div>
    );
}
