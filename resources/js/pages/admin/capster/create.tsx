import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import CapsterForm from './components/capster-form';

export default function Create() {
    return (
        <AppSidebarLayout>
            <div className="w-full p-4">
                <h1 className="mb-4 text-2xl font-bold">Add Capsters</h1>
                <CapsterForm />
            </div>
        </AppSidebarLayout>
    );
}
