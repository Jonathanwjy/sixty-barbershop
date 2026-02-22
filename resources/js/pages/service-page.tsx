interface Service {
    id: number;
    name: string;
    description: string;
    duration: number;
    min_price: number;
    photo: string;
}

export default function ServicePage({
    services = [],
}: {
    services: Service[];
}) {
    return (
        <>
            <div>ini adalah halaman seluruh service</div>
        </>
    );
}
