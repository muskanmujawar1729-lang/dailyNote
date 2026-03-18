import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegStickyNote } from "react-icons/fa";

function Header() {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-950 min-h-screen text-white flex flex-col">

            {/* Navbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center px-6 md:px-10 py-4 gap-4">

                <h1 className="text-xl md:text-2xl font-semibold">
                    DaiLy<span className="text-green-500">NoteS</span>
                </h1>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">

                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 w-full sm:w-auto"
                    >
                        Start Writing
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="border border-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white w-full sm:w-auto"
                    >
                        View Notes
                    </button>

                </div>
            </div>

            {/* Hero Section */}
            <div className="flex flex-1 flex-col justify-center items-center text-center px-6 gap-6">

                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, type: "spring" }}
                    className="text-green-500 text-6xl sm:text-7xl md:text-8xl"
                >
                    <FaRegStickyNote />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
                >
                    Write Your <span className="text-green-500">Daily Notes</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 max-w-xl text-sm sm:text-base"
                >
                    Capture your thoughts, organize your ideas, and keep track of
                    everything that matters to you.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
                >
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
                    >
                        Get Started
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="border border-green-500 px-6 py-3 rounded-lg hover:bg-green-500 hover:text-white transition w-full sm:w-auto"
                    >
                        Login
                    </button>
                </motion.div>

            </div>
        </div>
    );
}

export default Header;