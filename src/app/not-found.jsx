"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center">
            <motion.h1
                className="text-9xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                404
            </motion.h1>
            <motion.p
                className="text-xl mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                Oops! The page you are looking for doesn’t exist.
            </motion.p>

            <motion.div
                className="mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <Link
                    href="/"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
}
