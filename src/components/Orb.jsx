import React from "react";
import { motion } from "framer-motion";

export default function Orb({ active }) {
    return (
        <motion.div
            className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-500 shadow-lg"
            animate={
                active
                    ? { scale: [1, 1.1, 1] } // pulsing effect when active
                    : { scale: 1 } // stay still when idle
            }
            transition={
                active
                    ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.3 }
            }
        />
    );
}
