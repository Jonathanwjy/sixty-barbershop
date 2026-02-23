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
                    className="about-us w-full px-12 py-12 md:px-34"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Animasi jalan saat 20% elemen masuk layar, dan hanya sekali
                    variants={fadeUpVariant}
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
                    className="services w-full px-12 py-12 md:px-32"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeUpVariant}
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
                </motion.section>

                {/* Capsters Section */}
                <motion.section
                    className="capster relative w-full overflow-hidden py-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeUpVariant}
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
                                        description={capster.description}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Contact Us Section */}
                <motion.section
                    className="contact-us w-full bg-primary px-12 py-12 text-primary-foreground md:px-32"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUpVariant}
                >
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
                </motion.section>
            </AppLayout>
        </>
    );
}
