import { motion } from "framer-motion";
import { FileText, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#0f1f4b] min-h-screen">

      {/* ===== Navbar ===== */}
      <header className="flex items-center justify-between px-4 md:px-8 py-4">
        
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          Daily<span className="text-green-400">NoteS</span>
        </motion.h1>

        {/* Desktop Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex gap-4"
        >
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Start Writing
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-green-400 text-white rounded-lg hover:bg-green-500 transition"
          >
            View Notes
          </button>
        </motion.div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white">
          <Menu size={28} onClick={() => setOpen(!open)} />
        </div>
      </header>

      {/* ===== Mobile Menu ===== */}
      {open && (
        <div className="flex flex-col items-center gap-4 pb-4 md:hidden">
          <button
            onClick={() => navigate("/signup")}
            className="w-40 py-2 bg-green-500 text-white rounded-lg"
          >
            Start Writing
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-40 py-2 border border-green-400 text-white rounded-lg"
          >
            View Notes
          </button>
        </div>
      )}

      {/* ===== Hero Section ===== */}
      <section className="flex flex-col items-center justify-center text-center mt-10 md:mt-20 px-4">
        
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="border-2 border-green-400 p-4 md:p-6 rounded-xl mb-6"
        >
          <FileText size={32} className="text-green-400 md:w-10 md:h-10" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4"
        >
          Write Your{" "}
          <span className="text-green-400">Daily Notes</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-300 max-w-md md:max-w-xl text-sm md:text-base mb-8"
        >
          Capture your thoughts, organize your ideas, and keep track of
          everything that matters to you.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 border border-green-400 text-white rounded-lg hover:bg-green-500 transition w-full sm:w-auto"
          >
            Login
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Header;