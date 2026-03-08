import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import PricingForm from './components/pricing-form';

interface Pricing {
    id: number;
    service_id: number;
    capster_id: number;
    price: number;
}

interface Service {
    id: number;
    name: string;
}

interface Capster {
    id: number;
    name: string;
}

interface EditProps {
    pricing: Pricing;
    services: Service[];
    capsters: Capster[];
}

export default function Edit({ pricing, services, capsters }: EditProps) {
    return (
        <AppSidebarLayout>
            <div className="w-full p-4">
                <h1 className="mb-4 text-2xl font-bold">Edit Pricing</h1>

                <PricingForm
                    pricing={pricing}
                    services={services}
                    capsters={capsters}
                />
            </div>
        </AppSidebarLayout>
    );
}
