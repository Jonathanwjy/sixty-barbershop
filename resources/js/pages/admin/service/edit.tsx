import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import ServiceForm from './components/service-form';

// Props 'service' ini dikirim dari Laravel Controller: return Inertia::render('Edit', ['service' => $service]);
export default function Edit({ service }: { service: any }) {
    return (
        <AppSidebarLayout>
            <div className="w-full p-4">
                <h1 className="mb-4 text-2xl font-bold">Edit Service</h1>
                <ServiceForm service={service} />
            </div>
        </AppSidebarLayout>
    );
}
