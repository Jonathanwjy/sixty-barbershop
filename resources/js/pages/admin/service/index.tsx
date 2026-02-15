import { Link, usePage } from '@inertiajs/react';

import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import services from '@/routes/services';

interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
}

export default function ServiceIndex() {
    const { services } = usePage().props as { services: Service[] };
    return (
        <AppSidebarLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Service Management</h1>
            </div>
            <Link
                href="/admin/services/create"
                className="md:text-md mb-4 ml-4 w-32 rounded-md bg-primary p-1 text-center text-sm text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
            >
                Add Service
            </Link>

            <div className="mb-1 flex px-8">
                <div className="flex w-screen justify-between rounded-md border border-primary p-2">
                    <div className="flex gap-8">
                        <p className="border-r border-primary pr-2">No</p>
                        <p>Nama</p>
                        <p>Durasi</p>
                    </div>

                    <div>action</div>
                </div>
            </div>

            <div>
                {services.map((service, index) => (
                    <div key={service.id} className="mb-1 flex px-8">
                        <div className="flex w-screen justify-between rounded-md border border-primary p-2">
                            <div className="flex gap-8">
                                <p className="border-r border-primary pr-2">
                                    {index + 1}
                                </p>
                                <p>{service.name}</p>
                                <p>{service.duration} minutes</p>
                            </div>

                            <div>
                                {' '}
                                <Link
                                    href={`/admin/services/edit/${service.id}`}
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AppSidebarLayout>
    );
}
