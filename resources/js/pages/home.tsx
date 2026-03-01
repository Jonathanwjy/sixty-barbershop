import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/user/banner-carousel';
import CapsterCard from '@/components/user/capster-card';
import ServiceCardHome from '@/components/user/service-card-home';
import AppLayout from '@/layouts/app-layout';

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
    // Variabel konfigurasi animasi dasar agar kode lebih bersih
    const fadeUpVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <>
            <AppLayout>
                {/* Hero Section (Tanpa scroll animation karena ini paling atas) */}
                <section className="hero">
                    <HeroSection />
                </section>

                {/* About Us Section */}
                <motion.section
                    className="about-us w-full py-12 pt-36 pb-12 md:px-34"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Animasi jalan saat 20% elemen masuk layar, dan hanya sekali
                    variants={fadeUpVariant}
                    id="about"
                >
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
                </motion.section>

                {/* Services Section */}
                <motion.section
                    className="services w-full py-12 pt-36 pb-12 md:px-32"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeUpVariant}
                    id="service"
                >
                    <h1 className="text-center text-4xl font-bold underline">
                        Main Services
                    </h1>
                    <p className="mb-12 text-center text-xl font-bold">
                        Beberapa layanan utama yang kami tawarkan untuk Anda.
                    </p>
                    <div className="grid justify-between gap-6 md:grid-cols-3 md:gap-18">
                        {services.map((service, index) => (
                            // Membungkus card dengan motion.div untuk animasi individual + stagger
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                }} // Delay bertingkat berdasarkan index
                            >
                                <ServiceCardHome
                                    name={service.name}
                                    duration={service.duration}
                                    min_price={service.min_price}
                                    photo={service.photo}
                                    description={service.description}
                                />
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        onClick={() => router.get('/all-services')}
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
                        All Services
                    </motion.button>
                </motion.section>

                {/* Capsters Section */}
                <motion.section
                    className="capster relative w-full overflow-hidden py-12 pt-36"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeUpVariant}
                    id="capster"
                >
                    <div className="absolute"></div>
                    <div className="relative z-10 container mx-auto px-24">
                        <h1 className="mb-4 text-center text-4xl font-bold text-primary underline">
                            Our Capsters
                        </h1>
                        <p className="mx-auto mb-8 text-center text-sm font-bold text-primary md:text-xl">
                            Capster kami penuh pengalaman dan sangat teliti
                            dalam melayani pelanggan.
                        </p>
                        <div className="grid justify-center gap-6 md:grid-cols-2 md:gap-12">
                            {capsters.map((capster, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.2,
                                    }} // Efek muncul membesar
                                >
                                    <CapsterCard
                                        name={capster.name}
                                        photo={capster.photo}
                                        nickname={capster.nickname}
                                        description={capster.description}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Contact Us Section */}
                <footer className="bg-primary text-primary-foreground">
                    <div className="mx-auto max-w-7xl px-8 py-16">
                        <div className="grid gap-12 md:grid-cols-3">
                            {/* Brand Section */}
                            <div>
                                <h2 className="mb-4 text-2xl font-bold underline">
                                    Unit Sixty Barbershop
                                </h2>
                                <p className="mb-4 text-sm opacity-80">
                                    Keluar langsung ganteng? Langsung saja ke
                                    Sixty Barbershop
                                </p>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="hover:text-secondary"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                    <a
                                        href="#"
                                        className="hover:text-secondary"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                    <a href="">
                                        <Mail size={20}></Mail>
                                    </a>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">
                                    Kontak Kami
                                </h3>
                                <ul className="space-y-3 text-sm opacity-80">
                                    <li className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        Jl. Borang No. 123, Jakarta
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Phone size={16} />
                                        +62 812-3456-7890
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Mail size={16} />
                                        info@unitsixty.com
                                    </li>
                                </ul>
                            </div>

                            {/* Opening Hours */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">
                                    Jam Operasional
                                </h3>
                                <ul className="space-y-2 text-sm opacity-80">
                                    <li>Senin - Jumat : 10.00 - 20.00</li>
                                    <li>Sabtu : 10.00 - 22.00</li>
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-8 h-px bg-primary-foreground/20" />

                        {/* Bottom Footer */}
                        <div className="flex flex-col items-center justify-between gap-4 text-sm opacity-70 md:flex-row">
                            <p>
                                ©2026 Unit Sixty Barbershop. All rights
                                reserved.
                            </p>
                            <p>Designed with ✂️ by Unit Sixty Team</p>
                        </div>
                    </div>
                </footer>
            </AppLayout>
        </>
    );
}
