import { useForm, router } from '@inertiajs/react';
import { useEffect } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

interface Service {
    id: number;
    name: string;
}

interface Capster {
    id: number;
    name: string;
}

interface Pricing {
    id: number;
    service_id: number;
    capster_id: number;
    price: number;
}

export default function BookingForm({
    capsters,
    services,
    pricings,
    bookedTimes = [], // Default kosong jika belum ada data
}: {
    services: Service[];
    capsters: Capster[];
    pricings: Pricing[];
    bookedTimes?: string[]; // Prop baru untuk jam yang sudah di-booking
}) {
    const { data, setData, post, processing, errors } = useForm({
        service_id: '',
        capster_id: '',
        date: '',
        start_time: '',
    });

    // Fungsi untuk men-generate jam dari 10:00 hingga 20:00 dengan interval 30 menit
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 10; hour <= 20; hour++) {
            const formattedHour = hour.toString().padStart(2, '0');
            slots.push(`${formattedHour}:00`);

            if (hour < 20) {
                slots.push(`${formattedHour}:30`);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    // Opsional: Reload data jadwal yang dibooking saat tanggal atau capster berubah
    useEffect(() => {
        if (data.date && data.capster_id) {
            router.reload({
                only: ['bookedTimes'], // Hanya ambil data bookedTimes dari backend
                data: {
                    date: data.date,
                    capster_id: data.capster_id,
                },
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [data.date, data.capster_id]);

    const selectedPricing = pricings.find(
        (p) =>
            p.service_id === Number(data.service_id) &&
            p.capster_id === Number(data.capster_id),
    );

    // 4. Format harga ke Rupiah (opsional tapi disarankan)
    const formatRupiah = (angka: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(angka);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/bookings/store');
    };

    return (
        <AppLayout>
            <div className="mx-auto mt-12 mb-12 flex w-11/12 flex-col rounded-lg border border-gray-300 p-6 shadow-sm md:w-3/4 lg:w-1/2">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Booking Form</h1>
                    <p className="mt-1 text-sm text-muted-foreground md:text-base">
                        Silahkan pilih layanan, capster, dan jadwal booking Anda
                    </p>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* SERVICE DROPDOWN */}
                        <div>
                            <Label htmlFor="service">Service</Label>
                            <Select
                                value={data.service_id}
                                onValueChange={(value) =>
                                    setData('service_id', value)
                                }
                            >
                                <SelectTrigger className="mt-1 text-muted-foreground">
                                    <SelectValue placeholder="Pilih Service" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Services</SelectLabel>
                                        {services.map((service) => (
                                            <SelectItem
                                                key={service.id}
                                                value={String(service.id)}
                                            >
                                                {service.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.service_id}
                                className="mt-2"
                            />
                        </div>

                        {/* CAPSTER DROPDOWN */}
                        <div>
                            <Label htmlFor="capster">Capster</Label>
                            <Select
                                value={data.capster_id}
                                onValueChange={(value) =>
                                    setData('capster_id', value)
                                }
                            >
                                <SelectTrigger className="mt-1 text-muted-foreground">
                                    <SelectValue placeholder="Pilih Capster" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Capsters</SelectLabel>
                                        {capsters.map((capster) => (
                                            <SelectItem
                                                key={capster.id}
                                                value={String(capster.id)}
                                            >
                                                {capster.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.capster_id}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    {data.service_id && data.capster_id && (
                        <div className="mt-2 rounded-md border border-accent bg-accent/50 p-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                Estimasi Harga
                            </p>
                            <p className="text-xl font-bold text-primary">
                                {selectedPricing
                                    ? formatRupiah(selectedPricing.price)
                                    : 'Harga belum diatur'}
                            </p>
                        </div>
                    )}

                    {/* DATE INPUT */}
                    <div>
                        <Label htmlFor="date">Tanggal</Label>
                        <Input
                            id="date"
                            type="date"
                            value={data.date}
                            onChange={(e) => {
                                setData('date', e.target.value);
                                setData('start_time', ''); // Reset jam jika tanggal diubah
                            }}
                            className="mt-1 text-muted-foreground md:w-1/2"
                        />
                        <InputError message={errors.date} className="mt-2" />
                    </div>

                    {/* BOX-BOX PEMILIHAN WAKTU */}
                    <div>
                        <Label className="mb-3 block">Waktu Mulai</Label>
                        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7">
                            {timeSlots.map((time) => {
                                const isBooked = bookedTimes.includes(time);
                                const isSelected = data.start_time === time;

                                return (
                                    <button
                                        key={time}
                                        type="button"
                                        disabled={isBooked} // Disable tombol jika sudah dibooking
                                        onClick={() =>
                                            !isBooked &&
                                            setData('start_time', time)
                                        }
                                        className={`rounded-md border px-2 py-2 text-sm transition-colors ${
                                            isBooked
                                                ? 'cursor-not-allowed border-input bg-muted text-muted-foreground opacity-50' // Style saat di-disable (sudah dibooking)
                                                : isSelected
                                                  ? 'border-primary bg-primary font-medium text-primary-foreground' // Style saat dipilih
                                                  : 'border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground' // Style default
                                        }`}
                                    >
                                        {time}
                                    </button>
                                );
                            })}
                        </div>
                        <InputError
                            message={errors.start_time}
                            className="mt-2"
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    {/* SUBMIT BUTTON */}
                    <Button
                        type="submit"
                        className="mt-4 w-full md:w-auto md:self-end"
                        // Tambahkan !selectedPricing di sini
                        disabled={
                            processing || !data.start_time || !selectedPricing
                        }
                    >
                        {processing ? 'Memproses...' : 'Booking Sekarang'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
