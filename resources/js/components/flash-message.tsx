// resources/js/components/FlashMessage.tsx
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { showSuccess, showError } from '@/alert';

export default function FlashMessage() {
    // Tangkap data flash dari Laravel
    const { flash } = usePage<any>().props;

    useEffect(() => {
        if (flash?.success) {
            showSuccess('Berhasil!', flash.success);
        }

        if (flash?.error) {
            showError('Oops...', flash.error);
        }
    }, [flash]);

    // Komponen ini tidak merender elemen HTML apapun di layar
    return null;
}
