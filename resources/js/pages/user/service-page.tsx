import { Button } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '@/layouts/app-layout';

interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
    min_price: number;
    photo: string;
}

export default function ServicePage({
    services = [],
}: {
    services: Service[];
}) {
    return (
        <>
            <AppLayout>
                <div className="md: relative h-[40vh] w-full overflow-hidden object-fill md:aspect-[16/9] md:h-[49vh]">
                    <img
                        src="images/hero/banner-2.jpg"
                        alt="service banner"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="mt-8 flex flex-col px-4 md:px-12">
                    {services.map((service, index) => {
                        // Cek apakah index genap (0, 2, 4) atau ganjil (1, 3, 5)
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={service.id ?? index}
                                // Gunakan flex-row-reverse untuk index ganjil
                                className={`mb-8 flex items-center transition hover:shadow-md ${
                                    isEven ? 'flex-row' : 'flex-row-reverse'
                                }`}
                            >
                                {/* Ubah margin berdasarkan posisi */}
                                <div
                                    className={`w-1/3 ${isEven ? 'mr-8' : 'ml-8'}`}
                                >
                                    {service.photo && (
                                        <img
                                            src={
                                                service.photo
                                                    ? `/storage/${service.photo}`
                                                    : '/images/hero/banner-1.jpg'
                                            }
                                            alt={service.name}
                                            className="mt-3 w-full rounded object-cover"
                                        />
                                    )}
                                </div>

                                {/* Tambahkan w-2/3 atau flex-1 agar teks mengisi sisa ruang */}
                                <div
                                    className={`flex w-1/3 flex-col justify-center ${!isEven ? 'text-right' : 'text-left'}`}
                                >
                                    <h2 className="text-2xl font-semibold text-pretty md:text-4xl">
                                        {service.name}
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground md:text-lg">
                                        {service.description}
                                    </p>
                                    <div className="mt-2 text-sm text-muted-foreground md:text-lg">
                                        Durasi: {service.duration} menit
                                    </div>
                                    <div className="mt-1 text-sm text-muted-foreground md:text-lg">
                                        Mulai dari Rp.
                                        {service.min_price.toLocaleString(
                                            'id-ID',
                                        )}
                                    </div>
                                </div>
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
                                    className="mx-2 h-10 w-24 cursor-pointer rounded-xl bg-primary font-semibold text-primary-foreground shadow-sm duration-300 hover:bg-accent hover:text-accent-foreground md:h-12 md:py-3"
                                >
                                    Book Now
                                </motion.button>
                            </div>
                        );
                    })}
                </div>
            </AppLayout>
        </>
    );
}
