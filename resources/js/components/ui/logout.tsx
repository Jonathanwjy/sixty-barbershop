import { Link } from '@inertiajs/react';

export default function Logout() {


    return (
        <Link
            href="/logout"
            method="post"
            as="button"
            type="button"
            className="w-full text-left px-4 py-2 hover:bg-gray-100" // Styling opsional
        >
            Log Out
        </Link>

    );
}
