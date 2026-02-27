// resources/js/utils/alert.ts
import Swal from 'sweetalert2';

// 1. Alert Sukses
export const showSuccess = (title: string, text?: string) => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 2000, // Hilang dalam 2 detik
    });
};

// 2. Alert Error/Gagal
export const showError = (title: string, text?: string) => {
    return Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        confirmButtonColor: '#ea580c', // Sesuaikan dengan warna primary (oranye) kamu
    });
};

// 3. Alert Konfirmasi (Mengembalikan Promise boolean)
export const showConfirm = async (
    title: string,
    text: string,
    confirmText: string = 'Ya, konfirmasi',
) => {
    const result = await Swal.fire({
        icon: 'warning',
        title: title,
        text: text,
        showCancelButton: true,
        confirmButtonColor: '#ea580c', // Warna primary (Oranye)
        cancelButtonColor: '#334155', // Warna sekunder/abu-abu
        confirmButtonText: confirmText,
        cancelButtonText: 'Batal',
        reverseButtons: true, // Menukar posisi tombol konfirmasi dan batal
    });

    return result.isConfirmed; // Akan return true jika ditekan "Ya"
};
