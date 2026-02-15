import { Link } from '@inertiajs/react';
import type { AuthLayoutProps } from '@/types';
// import AppLogoIcon from '@/components/app-logo-icon'; // Import jika dibutuhkan

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 md:p-10">
            <div className="w-full max-w-4xl">
                <div className="grid overflow-hidden rounded-xl border bg-accent text-accent-foreground shadow-2xl md:grid-cols-2">
                    <div className="hidden flex-col items-center justify-center bg-muted text-muted-foreground md:block">
                        <img
                            src="/images/hero/banner-1.jpg"
                            alt="Branding Image"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center p-8 md:p-12">
                        <div className="mb-6 flex flex-col space-y-2 text-center md:text-left">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {title}
                            </h1>
                            <p className="text-sm text-accent-foreground">
                                {description}
                            </p>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
