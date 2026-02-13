import * as React from 'react';
import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay'; // Import plugin autoplay

import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext, // Opsional: jika ingin tombol panah
    // CarouselPrevious, // Opsional: jika ingin tombol panah
} from '@/components/ui/carousel';

// Daftar path gambar kamu (simpan di folder public/images)
const heroImages = [
    '/images/hero/banner-1.jpg',
    '/images/hero/banner-2.jpg',
    '/images/hero/banner-3.jpg',
    '/images/hero/banner-4.jpg',

    // "https://placehold.co/1920x1080/222/FFF?text=Barber+Scene+1",
    // "https://placehold.co/1920x1080/333/FFF?text=Barber+Scene+2",
    // "https://placehold.co/1920x1080/444/FFF?text=Barber+Scene+3",
];

export default function HeroSection() {
    // Konfigurasi Plugin Autoplay
    const plugin = React.useRef(
        Autoplay({
            delay: 4000, // Ganti slide setiap 4 detik
            stopOnInteraction: false, // Tetap autoplay meskipun user mengklik carousel
        }),
    );

    return (
        // Container relative agar kita bisa menaruh overlay absolut di dalamnya
        <section className="relative w-full">
            {/* === 1. BAGIAN CAROUSEL (BACKGROUND) === */}
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    align: 'start',
                    loop: true, // Agar carousel berputar terus tanpa henti
                }}
            >
                <CarouselContent>
                    {heroImages.map((src, index) => (
                        <CarouselItem key={index}>
                            {/* Aspect Ratio 16/9 untuk landscape.
                                'max-h-[...]' membatasi tinggi di layar besar agar tidak terlalu 'tinggi'.
                            */}
                            <div className="md: relative h-[40vh] w-full overflow-hidden object-fill md:aspect-[16/9] md:h-[89vh]">
                                <img
                                    src={src}
                                    alt={`Barbershop Atmosphere ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                                {/* Overlay Gelap Transparan (PENTING):
                                    Agar tombol dan teks di atasnya lebih mudah dibaca.
                                    Ubah 'bg-black/40' untuk mengatur kegelapan.
                                */}
                                <div className="absolute inset-0 bg-black/40" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Hapus komentar di bawah jika ingin tombol navigasi kiri/kanan */}
                {/* <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" /> */}
            </Carousel>

            {/* === 2. BAGIAN OVERLAY TOMBOL (TENGAH) === */}
            {/* 'absolute inset-0': Memenuhi seluruh area section parent.
                'flex items-center justify-center': Menengahkan konten secara vertikal dan horizontal.
                'z-20': Memastikan layer ini berada DI ATAS carousel.
            */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 px-4 text-center">
                {/* Opsional: Tambahkan Headline agar lebih menarik */}
                <h1 className="text-2xl font-bold text-white drop-shadow-lg md:text-5xl">
                    Premium Cuts, Classic Vibes.
                </h1>
                <p className="mb-4 hidden text-lg text-gray-200 drop-shadow-md md:block md:text-xl">
                    Pengalaman cukur rambut yang belum anda rasakan sebelumnya.
                </p>

                {/* Tombol Book Now */}
                <Link href="/booking">
                    <Button className="px-8 py-6 text-lg font-bold shadow-xl transition-transform hover:scale-105">
                        BOOK NOW
                    </Button>
                </Link>
            </div>
        </section>
    );
}
