import { useState } from 'react'; // Tambahkan import useState
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'; // Tambahkan import Select
import type { Booking } from '@/components/user/booking-card';
import BookingCard from '@/components/user/booking-card';
import AppLayout from '@/layouts/app-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
    unpaidBook: Booking[];
    ongoingBook: Booking[];
    finishedBook: Booking[];
    canceledBook: Booking[];
}

// --- KOMPONEN UTAMA ---
export default function BookingHistory({
    unpaidBook = [],
    ongoingBook = [],
    finishedBook = [],
    canceledBook = [],
}: Props) {
    // State untuk mengontrol tab mana yang sedang aktif
    const [activeTab, setActiveTab] = useState('unpaid');

    return (
        <>
            <AppLayout>
                <div className="mb-20">
                    <div className="mt-4 mb-10 w-full px-12 text-center">
                        <h1 className="text-2xl font-bold underline underline-offset-8">
                            Booking History
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Perjalanan kamu bersama kami
                        </p>
                    </div>

                    <div className="px-6 md:px-12">
                        {/* Tambahkan value dan onValueChange ke komponen Tabs */}
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="w-full"
                        >
                            {/* --- TAMPILAN MOBILE: DROPDOWN MENU --- */}
                            <div className="mb-8 block md:hidden">
                                <Select
                                    value={activeTab}
                                    onValueChange={setActiveTab}
                                >
                                    <SelectTrigger className="h-12 w-full rounded-xl border-primary bg-accent font-medium text-accent-foreground">
                                        <SelectValue placeholder="Pilih status booking" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unpaid">
                                            Belum Bayar ({unpaidBook.length})
                                        </SelectItem>
                                        <SelectItem value="ongoing">
                                            Aktif ({ongoingBook.length})
                                        </SelectItem>
                                        <SelectItem value="finished">
                                            Selesai ({finishedBook.length})
                                        </SelectItem>
                                        <SelectItem value="canceled">
                                            Dibatalkan ({canceledBook.length})
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* --- TAMPILAN DESKTOP: TABS PILL/KAPSUL --- */}
                            {/* Tambahkan 'hidden md:flex' agar tidak muncul di HP */}
                            <TabsList className="mb-8 hidden h-auto w-full items-center justify-between gap-1 rounded-full border border-primary bg-accent p-5 shadow-2xl md:flex">
                                <TabsTrigger
                                    value="unpaid"
                                    className="flex-1 rounded-full px-2 py-3 text-sm text-accent-foreground transition-all data-[state=active]:bg-primary data-[state=active]:font-bold data-[state=active]:text-primary-foreground"
                                >
                                    Belum Bayar ({unpaidBook.length})
                                </TabsTrigger>

                                <TabsTrigger
                                    value="ongoing"
                                    className="flex-1 rounded-full px-2 py-3 text-sm text-accent-foreground transition-all data-[state=active]:bg-primary data-[state=active]:font-bold data-[state=active]:text-primary-foreground"
                                >
                                    Aktif ({ongoingBook.length})
                                </TabsTrigger>

                                <TabsTrigger
                                    value="finished"
                                    className="flex-1 rounded-full px-2 py-3 text-sm text-accent-foreground transition-all data-[state=active]:bg-primary data-[state=active]:font-bold data-[state=active]:text-primary-foreground"
                                >
                                    Selesai ({finishedBook.length})
                                </TabsTrigger>

                                <TabsTrigger
                                    value="canceled"
                                    className="flex-1 rounded-full px-2 py-3 text-sm text-accent-foreground transition-all data-[state=active]:bg-primary data-[state=active]:font-bold data-[state=active]:text-primary-foreground"
                                >
                                    Dibatalkan ({canceledBook.length})
                                </TabsTrigger>
                            </TabsList>

                            {/* KONTEN TAB: BELUM BAYAR */}
                            <TabsContent value="unpaid">
                                {unpaidBook.length === 0 ? (
                                    <div className="rounded-lg border bg-accent/50 py-10 text-center text-muted-foreground">
                                        Tidak ada booking belum dibayar.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {unpaidBook.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                booking={booking}
                                                type="unpaid"
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            {/* KONTEN TAB: BERJALAN */}
                            <TabsContent value="ongoing">
                                {ongoingBook.length === 0 ? (
                                    <div className="rounded-lg border bg-accent/50 py-10 text-center text-muted-foreground">
                                        Tidak ada booking aktif.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {ongoingBook.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                booking={booking}
                                                type="ongoing"
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            {/* KONTEN TAB: SELESAI */}
                            <TabsContent value="finished">
                                {finishedBook.length === 0 ? (
                                    <div className="rounded-lg border bg-accent/50 py-10 text-center text-muted-foreground">
                                        Belum ada riwayat booking selesai.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {finishedBook.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                booking={booking}
                                                type="finished"
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            {/* KONTEN TAB: DIBATALKAN */}
                            <TabsContent value="canceled">
                                {canceledBook.length === 0 ? (
                                    <div className="rounded-lg border bg-accent/50 py-10 text-center text-muted-foreground">
                                        Tidak ada booking dibatalkan.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {canceledBook.map((booking) => (
                                            <BookingCard
                                                key={booking.id}
                                                booking={booking}
                                                type="canceled"
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
