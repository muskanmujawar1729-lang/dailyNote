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
        "https://dailynote-4.onrender.com/user/note",
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
  <div className="min-h-screen bg-gradient-to-br from-[#0f1f4b] to-[#1e3a8a] flex items-center justify-center px-4">

    <div className="w-full max-w-2xl">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-2xl md:text-3xl font-bold">
          📝 Create Note
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow-md transition"
        >
          Logout
        </button>
      </div>

      {/* Card */}
      <form
        onSubmit={createNote}
        className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl space-y-5"
      >

        {/* Name + Date Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-800  rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-800  rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        {/* Subject */}
        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2 border border-gray-800  rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        {/* Textarea */}
        <textarea
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="5"
          className="w-full px-4 py-2 border border-gray-800 rounded-lg resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-lg font-semibold hover:scale-[1.02] transition"
        >
          Create Note 🚀
        </button>

      </form>
    </div>
  </div>
);
}

export default TodoPage;