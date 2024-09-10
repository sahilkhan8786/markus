
export const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.05, // Stagger the appearance of children

        },
    },
};

export const childVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1, y: 20, transition: {
            type: 'spring',       // Use spring animation
            stiffness: 100,       // Adjust stiffness for spring tension
            damping: 20,          // Control spring damping
            duration: 0.5,        // Duration of the spring effect
        },
    },
};