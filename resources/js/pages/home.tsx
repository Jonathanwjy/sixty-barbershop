import { Button } from '@/components/ui/button';
import HeroSection from '@/components/user/banner-carousel';
import CapsterCard from '@/components/user/capster-card';
import ServiceCardHome from '@/components/user/service-card-home';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Capster {
    id: number;
    name: string;
    nickname: string;
    description: string;
    photo: string;
}

interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
    min_price: number;
    photo: string;
}

export default function Home({
    capsters = [],
    services = [],
}: {
    capsters: Capster[];
    services: Service[];
}) {
    return (
        <>
            <AppLayout>
                <section className="hero">
                    <HeroSection />
                </section>
                <section className="about-us w-full px-12 py-12 md:px-34">
                    <h1 className="mb-4 text-center text-4xl font-bold underline">
                        About Us
                    </h1>
                    <div className="flex">
                        <p className="text-background-foreground mx-auto max-w-4xl text-justify text-sm leading-relaxed font-medium md:pr-24 md:text-lg">
                            Welcome to Barber Book, your ultimate destination
                            for premium grooming services. Our mission is to
                            provide exceptional haircuts and grooming
                            experiences that leave you looking and feeling your
                            best. With a team of skilled barbers and a
                            commitment to quality, we strive to exceed your
                            expectations every time you visit us. Whether you're
                            looking for a classic cut, a modern style, or a
                            refreshing shave, Barber Book is here to cater to
                            your grooming needs. Join us and experience the art
                            of barbering at its finest.
                        </p>
                        <img
                            className="mx-auto hidden w-1/4 rounded-lg md:block"
                            src="/images/about.jpg"
                            alt="About Us"
                        />
                    </div>
                </section>
                <section className="services w-full px-12 py-12 md:px-32">
                    <h1 className="text-center text-4xl font-bold underline">
                        Main Services
                    </h1>
                    <p className="mb-12 text-center text-xl font-bold">
                        Beberapa layanan utama yang kami tawarkan untuk Anda.
                    </p>
                    <div className="grid justify-between gap-6 md:grid-cols-3 md:gap-18">
                        {/* Konten layanan utama akan ditambahkan di sini */}
                        {services.map((service, index) => (
                            <ServiceCardHome
                                key={index}
                                name={service.name}
                                duration={service.duration}
                                min_price={service.min_price}
                                photo={service.photo}
                                description={service.description}
                            />
                        ))}
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
                        className="hover: mx-auto mt-8 flex cursor-pointer rounded-md border border-primary bg-primary px-4 py-2 text-primary-foreground hover:bg-black hover:text-white"
                    >
                        <Link href="/all-services">Full Services</Link>
                    </motion.button>
                </section>

                <section
                    // 1. Tambah 'w-full' dan 'overflow-hidden'
                    // 2. Hapus 'mx-auto' dari sini (pindahkan logika tengah ke container di dalam)
                    className="capster relative w-full overflow-hidden bg-cover bg-center bg-no-repeat py-12"
                    style={{
                        backgroundImage:
                            "url('/images/capster/capster-bg.jpg')",
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/70"></div>

                    {/* Container ini yang membuat konten ada di tengah */}
                    <div className="relative z-10 container mx-auto px-24">
                        {' '}
                        {/* Tambah px-4 di sini untuk safety margin di HP */}
                        <h1 className="mb-4 text-center text-4xl font-bold text-primary underline">
                            Our Capsters
                        </h1>
                        <p className="mx-auto mb-8 text-center text-sm font-bold text-primary md:text-xl">
                            Capster kami penuh pengalaman dan sangat teliti
                            dalam melayani pelanggan.
                        </p>
                        {/* Grid Container */}
                        {/* Hapus padding horizontal besar di sini, biarkan container yang handle */}
                        <div className="grid justify-center gap-6 md:grid-cols-2 md:gap-12">
                            {capsters.map((capster, index) => (
                                <CapsterCard
                                    key={index}
                                    name={capster.name}
                                    photo={capster.photo}
                                    description={capster.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                <section className="contact-us w-full bg-primary px-12 py-12 text-primary-foreground md:px-32">
                    <div className="flex justify-between">
                        <div>
                            <h1 className="mb-4 text-start text-4xl font-bold underline">
                                Unit Sixty Barbershop
                            </h1>
                            <p>Jl. Borang no. 123, Jakarta</p>
                        </div>
                        <div>
                            <h1>Kontak Kami</h1>
                        </div>
                    </div>
                </section>
            </AppLayout>
        </>
    );
}
