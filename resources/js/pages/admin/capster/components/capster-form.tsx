// resources/js/components/forms/service-form.tsx

import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Definisikan tipe data Service
interface Capster {
    id: number;
    name: string;
    nickname: string;
    description: string;
    photo: string | null;
}

interface CapsterFormProps {
    capster?: Capster;
}

export default function CapsterForm({ capster }: CapsterFormProps) {
    const isEdit = !!capster;

    const { data, setData, post, processing, errors } = useForm({
        name: capster?.name ?? '',
        description: capster?.description ?? '',
        nickname: capster?.nickname ?? '',
        photo: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            post(`/admin/capsters/update/${capster.id}`);
        } else {
            // Mode Create: Gunakan POST ke URL store
            post('/admin/capsters/store');
        }
    };

    return (
        <form onSubmit={submit} className="h-auto max-w-xl">
            {/* NAME INPUT */}

            <div className="mb-4">
                <Label htmlFor="photo">Foto Profil</Label>
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
                    className="mt-1 text-primary-foreground file:text-primary-foreground"
                />
                <InputError message={errors.photo} className="mt-2" />

                {/* Opsional: Tampilkan teks jika sedang mode edit dan belum mau ganti foto */}
                {isEdit && !data.photo && capster.photo && (
                    <p className="mt-2 text-xs text-muted-foreground">
                        Biarkan kosong jika tidak ingin mengubah foto.
                    </p>
                )}
            </div>
            <div className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Capster Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 text-muted-foreground"
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            {/* DESCRIPTION INPUT */}
            <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="Capster Description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 text-muted-foreground"
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            {/* DURATION INPUT */}
            <div className="mb-4">
                <Label htmlFor="duration">Nickname</Label>
                <Input
                    id="duration"
                    type="text"
                    placeholder="Nickname"
                    value={data.nickname}
                    onChange={(e) => setData('nickname', e.target.value)}
                    className="mt-1 text-muted-foreground"
                />
                <InputError message={errors.nickname} className="mt-2" />
            </div>

            {/* BUTTON */}
            <Button type="submit" className="w-full" disabled={processing}>
                {processing
                    ? 'Saving...'
                    : isEdit
                      ? 'Update Capster'
                      : 'Create Capster'}
            </Button>
        </form>
    );
}
