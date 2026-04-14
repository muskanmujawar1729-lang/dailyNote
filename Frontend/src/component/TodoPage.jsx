import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TodoPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const createNote = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://dailynote-4.onrender.com/note/create",
        { name, date, subject, text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Note created ✅");

      // clear form
      setName("");
      setDate("");
      setSubject("");
      setText("");

    } catch (err) {
      alert(err.response?.data?.message || "Error creating note");
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://dailynote-4.onrender.com/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/login");

    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1f4b] flex flex-col items-center px-4 py-6">

      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h2 className="text-white text-xl md:text-2xl font-bold">
          Create Note
        </h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm md:text-base"
        >
          Logout
        </button>
      </div>

      {/* Form Card */}
      <form
        onSubmit={createNote}
        className="w-full max-w-3xl bg-white p-5 md:p-8 rounded-xl shadow-lg space-y-4"
      >
        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        {/* Subject */}
        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        {/* Text */}
        <textarea
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border rounded-lg resize-none"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Create Note
        </button>
      </form>
    </div>
  );
}

export default TodoPage;