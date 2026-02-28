import { motion } from 'framer-motion';

export const Background = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            {/* Geometric Grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Animated Radial Glows */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, 100, -50, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px]"
            />

            <motion.div
                animate={{
                    x: [0, -70, 40, 0],
                    y: [0, -50, 80, 0],
                    scale: [1, 0.8, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px]"
            />

            <motion.div
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -80, 40, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[130px]"
            />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};
