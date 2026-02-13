import { motion } from 'framer-motion';

export default function CapsterCard({
    name,
    photo,
    price_range,
    description,
}: {
    name: string;
    photo: string;
    price_range: string;
    description: string;
}) {
    return (
        <motion.div
            className="capster-card bg-background-foreground flex rounded-lg border p-4 shadow-lg"
            whileHover={{
                scale: 1.05,
                backgroundColor: 'var(--accent)',
                transition: { duration: 0.5 },
            }}
        >
            <img
                src={photo}
                alt={`${name}'s photo`}
                className="mr-4 mb-4 w-1/2 object-cover p-2"
            />
            <div>
                <h2 className="mb-2 text-2xl font-bold">{name}</h2>
                <p className="mb-4">{description}</p>
                <p className="text-lg font-semibold text-primary">
                    {price_range}
                </p>
            </div>
        </motion.div>
    );
}
