import { motion, useScroll } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import Navbar from './navbar-user';

export default function AppLayout({ children }: PropsWithChildren) {
    const { scrollY } = useScroll();

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        return scrollY.on('change', (latest) => {
            const previous = scrollY.getPrevious();

            if (latest > previous && latest > 100) {
                setHidden(true); // scroll ke bawah
            } else {
                setHidden(false); // scroll ke atas
            }
        });
    }, [scrollY]);

    return (
        <div className="min-h-screen scroll-smooth antialiased">
            <motion.nav
                animate={hidden ? 'hidden' : 'visible'}
                variants={{
                    visible: { y: 0 },
                    hidden: { y: '-100%' },
                }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 z-50 w-full bg-white shadow"
            >
                <Navbar />
            </motion.nav>

            <main>{children}</main>
        </div>
    );
}
