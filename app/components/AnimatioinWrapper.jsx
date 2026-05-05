"use client";

import { motion } from "framer-motion";

export default function AnimationWrapper({ children, index }) {
    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                y: 24 
            }}
            whileInView={{ 
                opacity: 1, 
                y: 0 
            }}
            transition={{ 
                delay:index*0.2,
                duration: 0.5,
                ease: "linear",
            }}
        >
            {children}
        </motion.div>
    );
}
