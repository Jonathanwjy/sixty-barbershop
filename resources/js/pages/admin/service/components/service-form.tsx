// resources/js/components/forms/service-form.tsx

import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

// Definisikan tipe data Service
interface Service {
    id: number;
    name: string;
    description: string;
    duration: string | number;
}

interface ServiceFormProps {
    service?: Service; // Optional: Jika ada berarti Edit, jika null berarti Create
}

export default function ServiceForm({ service }: ServiceFormProps) {
    const isEdit = !!service;

    const { data, setData, post, put, processing, errors } = useForm({
        name: service?.name ?? '',
        description: service?.description ?? '',
        duration: service?.duration ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(`/admin/services/update/${service.id}`);
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
                    className="mt-1 text-primary-foreground"
                />
                <InputError message={errors.name} className="mt-2" />
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
                    className="mt-1 text-primary-foreground"
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
                    className="mt-1 text-primary-foreground"
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
