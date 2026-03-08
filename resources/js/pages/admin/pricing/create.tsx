import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import PricingForm from './components/pricing-form';

interface Service {
    id: number;
    name: string;
}

interface Capster {
    id: number;
    name: string;
}

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
                <h1 className="mb-4 text-2xl font-bold">Create Pricing</h1>

                <PricingForm services={services} capsters={capsters} />
            </div>
        </AppSidebarLayout>
    );
}
