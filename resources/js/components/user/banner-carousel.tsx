import * as React from 'react';
import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';

import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

const heroImages = [
    '/images/hero/banner-1.jpg',
    '/images/hero/banner-2.jpg',
    '/images/hero/banner-3.jpg',
    '/images/hero/banner-4.jpg',
];

export default function HeroSection() {
    // Konfigurasi Plugin Autoplay
    const plugin = React.useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: false,
        }),
    );

    return (
        <section className="relative w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    align: 'start',
                    loop: true,
                }}
            >
                <CarouselContent>
                    {heroImages.map((src, index) => (
                        <CarouselItem key={index}>
                            <div className="md: relative h-[40vh] w-full overflow-hidden object-fill md:aspect-[16/9] md:h-[89vh]">
                                <img
                                    src={src}
                                    alt={`Barbershop Atmosphere ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-black/40" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 px-4 text-center">
                {/* Opsional: Tambahkan Headline agar lebih menarik */}
                <h1 className="text-2xl font-bold text-white drop-shadow-lg md:text-5xl">
                    Premium Cuts, Classic Vibes.
                </h1>
                <p className="mb-4 hidden text-lg text-gray-200 drop-shadow-md md:block md:text-xl">
                    Pengalaman cukur rambut yang belum anda rasakan sebelumnya.
                </p>

                {/* Tombol Book Now */}
                <Link href="/bookings/create">
                    <Button className="px-8 py-6 text-lg font-bold shadow-xl transition-transform hover:scale-105">
                        BOOK NOW
                    </Button>
                </Link>
            </div>
        </section>
    );
}
