import { motion } from 'framer-motion';

export default function CapsterCard({
    name,
    photo,
    nickname,
    description,
}: {
    name: string;
    photo: string;
    nickname: string;
    description: string;
}) {
    return (
        <motion.div
            className="capster-card bg-background-foreground flex flex-col rounded-lg border shadow-lg"
            whileHover={{
                scale: 1.05,
                backgroundColor: 'var(--accent)',
                transition: { duration: 0.5 },
            }}
        >
            <img
                src={`/storage/${photo}`}
                alt={`${name}'s photo`}
                className="mr-4 mb-4 aspect-square w-full object-cover object-center md:w-full"
            />
            <div className="px-4">
                <h2 className="mb-2 text-2xl font-bold">{name}</h2>
                <h4>Biasa dipanggil: {nickname}</h4>
                <p className="mb-4 text-sm text-muted-foreground md:text-lg">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
