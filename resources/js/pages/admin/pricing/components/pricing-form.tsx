// resources/js/components/forms/service-form.tsx

import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// Definisikan tipe data Service
interface Pricing {
    id: number;
    service_id: number;
    capster_id: number;
    price: number;
}

interface Service {
    id: number;
    name: string;
}

interface Capster {
    id: number;
    name: string;
}

interface PricingFormProps {
    pricing?: Pricing;
    services: Service[];
    capsters: Capster[];
}

export default function PricingForm({
    pricing,
    services,
    capsters,
}: PricingFormProps) {
    const isEdit = !!pricing;

    const { data, setData, post, put, processing, errors } = useForm({
        service_id: pricing?.service_id ? String(pricing.service_id) : '',
        capster_id: pricing?.capster_id ? String(pricing.capster_id) : '',
        price: pricing?.price ? pricing.price : '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(`/admin/pricings/update/${pricing.id}`);
        } else {
            // Mode Create: Gunakan POST ke URL store
            post('/admin/pricings/store');
        }
    };

    return (
        <form onSubmit={submit} className="h-auto max-w-xl">
            {/* NAME INPUT */}
            <div className="mb-4">
                <Label htmlFor="service">Service</Label>
                <Select
                    value={data.service_id}
                    onValueChange={(value) => setData('service_id', value)}
                    disabled={isEdit}
                >
                    <SelectTrigger className="text-muted-foreground">
                        <SelectValue placeholder="Pilih Service"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Services</SelectLabel>
                            {services.map((service) => (
                                <SelectItem
                                    key={service.id}
                                    value={String(service.id)}
                                >
                                    {service.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <InputError message={errors.service_id} className="mt-2" />
            </div>

            {/* DESCRIPTION INPUT */}
            <div className="mb-4">
                <Label htmlFor="Capster">Capster</Label>
                <Select
                    value={data.capster_id}
                    onValueChange={(value) => setData('capster_id', value)}
                    disabled={isEdit}
                >
                    <SelectTrigger className="text-muted-foreground">
                        <SelectValue placeholder="Pilih Capster"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Capster</SelectLabel>
                            {capsters.map((capster) => (
                                <SelectItem
                                    key={capster.id}
                                    value={String(capster.id)}
                                >
                                    {capster.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <InputError message={errors.capster_id} className="mt-2" />
            </div>

            <div className="mb-4">
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    placeholder="Price"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    className="mt-1 text-muted-foreground"
                />
                <InputError message={errors.price} className="mt-2" />
            </div>

            {/* BUTTON */}
            <Button type="submit" className="w-full" disabled={processing}>
                {processing
                    ? 'Saving...'
                    : isEdit
                      ? 'Update Pricing'
                      : 'Create Pricing'}
            </Button>
        </form>
    );
}
