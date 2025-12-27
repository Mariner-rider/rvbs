import { useState } from "react";
import { motion } from "framer-motion";

export default function Hamburger() {
    const [open, setOpen] = useState(false);

    return (
        <button
            onClick={() => setOpen(!open)}
            className="relative w-8 h-6 flex flex-col justify-between items-center group"
        >

            {/* Top line */}
            <motion.span
                animate={{
                rotate: open ? 45 : 0,
                y: open ? 10 : 0,
                }}
                className="block h-1 w-7 bg-gray-500 rounded"
            />

            {/* Middle line */}
            <motion.span
                animate={{
                opacity: open ? 0 : 1,
                }}
                className="block h-1 w-7 bg-gray-500 rounded"
            />

            {/* Bottom line */}
            <motion.span
                animate={{
                rotate: open ? -45 : 0,
                y: open ? -10 : 0,
                }}
                className="block h-1 w-7 bg-gray-500 rounded"
            />

        </button>
    );

}