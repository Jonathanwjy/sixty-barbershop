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
}

interface CapsterFormProps {
    capster?: Capster;
}

export default function CapsterForm({ capster }: CapsterFormProps) {
    const isEdit = !!capster;

    const { data, setData, post, put, processing, errors } = useForm({
        name: capster?.name ?? '',
        description: capster?.description ?? '',
        nickname: capster?.nickname ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(`/admin/capsters/update/${capster.id}`);
        } else {
            // Mode Create: Gunakan POST ke URL store
            post('/admin/capsters/store');
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
