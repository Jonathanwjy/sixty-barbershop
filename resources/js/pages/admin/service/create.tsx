// resources/js/pages/admin/services/create.tsx

import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import ServiceForm from './components/service-form';

export default function Create() {
    return (
        <AppSidebarLayout>
            <div className="w-full p-4">
                <h1 className="mb-4 text-2xl font-bold">Create Service</h1>

                {/* Panggil form tanpa props service (Mode Create) */}
                <ServiceForm />
            </div>
        </AppSidebarLayout>
    );
}
