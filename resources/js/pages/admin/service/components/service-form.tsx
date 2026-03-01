// resources/js/components/forms/service-form.tsx

import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Definisikan tipe data Service
interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
    photo: string | null;
}

interface ServiceFormProps {
    service?: Service;
}

export default function ServiceForm({ service }: ServiceFormProps) {
    const isEdit = !!service;

    const { data, setData, post, processing, errors } = useForm({
        name: service?.name ?? '',
        description: service?.description ?? '',
        duration: service?.duration ?? '',
        photo: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            post(`/admin/services/update/${service.id}`);
        } else {
            // Mode Create: Gunakan POST ke URL store
            post('/admin/services/store');
        }
    };

    return (
        <form onSubmit={submit} className="h-auto max-w-xl">
            {/* NAME INPUT */}
            <div className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Service Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 text-muted-foreground"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            {/* PHOTO INPUT */}
            <div className="mb-4">
                <Label htmlFor="photo">Photo</Label>

                {/* TAMPILKAN FOTO LAMA JIKA ADA (MODE EDIT) */}
                {isEdit && service?.photo && (
                    <div className="mt-2 mb-3">
                        <p className="mb-2 text-sm text-muted-foreground">
                            Current Photo:
                        </p>
                        <img
                            src={`/storage/${service.photo}`} // Sesuaikan path ini jika penyimpanan path fotomu berbeda
                            alt="Current Service Photo"
                            className="h-32 w-32 rounded-md border border-gray-200 object-cover"
                        />
                    </div>
                )}

                <Input
                    id="photo"
                    type="file"
                    accept="image/*" // Hanya izinkan file gambar
                    onChange={(e) => {
                        // Ambil file pertama yang dipilih user
                        setData(
                            'photo',
                            e.target.files ? e.target.files[0] : null,
                        );
                    }}
                    className="mt-1 text-muted-foreground file:text-muted-foreground"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                    {isEdit
                        ? 'Biarkan kosong jika tidak ingin mengubah foto.'
                        : 'Upload foto untuk service ini.'}
                </p>
                <InputError message={errors.photo} className="mt-2" />
            </div>

            {/* DESCRIPTION INPUT */}
            <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="Service Description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 text-muted-foreground"
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            {/* DURATION INPUT */}
            <div className="mb-4">
                <Label htmlFor="duration">Duration</Label>
                <Input
                    id="duration"
                    type="number"
                    placeholder="Duration in minutes"
                    value={data.duration}
                    onChange={(e) => setData('duration', e.target.value)}
                    className="mt-1 text-muted-foreground"
                />
                <InputError message={errors.duration} className="mt-2" />
            </div>

            {/* BUTTON */}
            <Button type="submit" className="w-full" disabled={processing}>
                {processing
                    ? 'Saving...'
                    : isEdit
                      ? 'Update Service'
                      : 'Create Service'}
            </Button>
        </form>
    );
}
