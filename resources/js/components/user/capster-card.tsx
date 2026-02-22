import { motion } from 'framer-motion';

export default function CapsterCard({
    name,
    photo,

    description,
}: {
    name: string;
    photo: string;

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
                src={`/storage/${photo}`}
                alt={`${name}'s photo`}
                className="mr-4 mb-4 aspect-square w-[128px] object-cover object-center md:w-[350px]"
            />
            <div>
                <h2 className="mb-2 text-2xl font-bold">{name}</h2>
                <p className="mb-4 text-sm md:text-lg">{description}</p>
            </div>
        </motion.div>
    );
}
