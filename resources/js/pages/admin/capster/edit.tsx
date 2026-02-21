import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import CapsterForm from './components/capster-form';

export default function Edit({ capster }: { capster: any }) {
    return (
        <AppSidebarLayout>
            <div className="w-full p-4">
                <h1 className="mb-4 text-2xl font-bold">Edit Service</h1>

                {/* Panggil form DENGAN props service (Mode Edit) */}
                <CapsterForm capster={capster} />
            </div>
        </AppSidebarLayout>
    );
}
