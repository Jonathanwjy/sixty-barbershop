import { PropsWithChildren } from 'react';
import Navbar from './navbar-user';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen antialiased">
            {/* Pasang Navbar di sini */}
            <Navbar />

            <main>{children}</main>
        </div>
    );
}
