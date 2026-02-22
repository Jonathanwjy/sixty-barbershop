import { motion } from 'framer-motion';
import { Clock } from 'lucide-react'; // Opsional: Icon untuk durasi
import { Button } from '@/components/ui/button'; // Pastikan path sesuai
import service from '@/routes/admin/service';

interface ServiceCardProps {
    name?: string;
    duration?: number;
    price?: number;
    min_price?: number;
    description?: string;
    photo?: string; // Menambahkan prop photo agar dinamis
    index?: number; // Untuk efek delay berurutan (stagger)
}

export default function ServiceCardHome({
    name,
    duration,
    min_price,
    description,
    photo,
    index = 0,
}: ServiceCardProps) {
    return (
        <motion.div
            // --- 1. ANIMASI SCROLL (Masuk dari bawah) ---
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }} // Delay bertingkat jika ada banyak card
            // --- 2. CONTAINER STYLING ---
            className="group relative flex flex-col overflow-hidden rounded-xl bg-accent text-accent-foreground shadow-sm shadow-primary transition-all duration-300 hover:-translate-y-8 hover:shadow-2xl"
        >
            {/* --- 3. GAMBAR DENGAN EFEK ZOOM --- */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={
                        photo
                            ? `/storage/${photo}`
                            : '/images/hero/banner-1.jpg'
                    }
                    alt={name || 'Service Image'}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay gradient agar teks putih nanti terbaca jika ditaruh di atas gambar (opsional) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* --- 4. KONTEN --- */}
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight text-primary-foreground">
                            {name || 'Fresh Cut'}
                        </h3>
                        <div className="mt-1 flex items-center gap-1 text-xs font-medium text-primary-foreground">
                            {min_price
                                ? `Mulai dari Rp ${min_price.toLocaleString('id-ID')}`
                                : 'Rp 40.000'}
                        </div>
                    </div>
                    {/* Harga dengan Badge Style */}

                    <div className="rounded-full px-3 py-1 text-sm font-bold text-accent-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{duration || '20 min'} menit</span>
                    </div>
                </div>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-accent-foreground">
                    {description ||
                        'Get a stylish and modern haircut from our expert barbers. Detailed styling included.'}
                </p>

                {/* --- 5. BUTTON ACTION --- */}
                <motion.button
                    whileHover={{
                        scale: 1.1,
                        x: [0, -3, 3, -3, 3, 0],
                        transition: {
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: 'loop',
                        },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-sm duration-300 hover:bg-black hover:text-white"
                >
                    Book Appointment
                </motion.button>
            </div>
        </motion.div>
    );
}
