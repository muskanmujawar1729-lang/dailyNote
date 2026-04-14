import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f1f4b] min-h-screen">
      
      {/* ===== Navbar ===== */}
      <header className="flex items-center justify-between px-8 py-4">
        
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          Daily<span className="text-green-400">NoteS</span>
        </motion.h1>

        {/* Navbar Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex gap-4"
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
      </header>

      {/* ===== Hero Section ===== */}
      <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
        
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border-2 border-green-400 p-6 rounded-xl mb-6"
        >
          <FileText size={40} className="text-green-400" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Write Your{" "}
          <span className="text-green-400">Daily Notes</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-300 max-w-xl mb-8"
        >
          Capture your thoughts, organize your ideas, and keep track of
          everything that matters to you.
        </motion.p>

        {/* Hero Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 border border-green-400 text-white rounded-lg hover:bg-green-500 transition"
          >
            Login
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Header;