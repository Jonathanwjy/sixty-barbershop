import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';

export default function Dashboard() {
    return (
        <AppSidebarLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p>Welcome to the admin dashboard!</p>
            </div>
        </AppSidebarLayout>
    );
}
