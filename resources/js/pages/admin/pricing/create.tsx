import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import PricingForm from './components/pricing-form'; // Pastikan path import ini sudah benar sesuai folder kamu

// 1. Definisikan bentuk datanya (bisa di-copy dari yang sebelumnya)
interface Service {
    id: number;
    name: string;
}

interface Capster {
    id: number;
    name: string;
}

// 2. Tangkap 'services' dan 'capsters' dari Controller melalui parameter (Props)
export default function Create({
    services,
    capsters,
}: {
    services: Service[];
    capsters: Capster[];
}) {
    return (
        <AppSidebarLayout>
            <div className="w-full p-4">
                {/* Judulnya saya sesuaikan jadi Create Pricing */}
                <h1 className="mb-4 text-2xl font-bold">Create Pricing</h1>

                {/* 3. Sekarang data siap dilempar ke komponen form */}
                <PricingForm services={services} capsters={capsters} />
            </div>
        </AppSidebarLayout>
    );
}
