import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function TodoPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const [responses, setResponses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) setName(username);
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setResponses(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(responses));
  }, [responses]);

  async function getRes() {
    try {
      if (!date || !subject || !text) {
        alert("Please Fill All the Fields");
        return;
      }

      if (editIndex !== null) {
        setResponses((prev) =>
          prev.map((item, index) =>
            index === editIndex
              ? { ...item, data: { name, date, subject, text } }
              : item
          )
        );

        toast.success("Data Updated Successfully");
        setEditIndex(null);
      } else {
        const res = await axios.post(
          "https://dailynote-4.onrender.com/user/note",
          { name, date, subject, text }
        );

        setResponses((prev) => [...prev, res.data]);
        toast.success("Data Sent Successfully");
      }

      setDate("");
      setSubject("");
      setText("");
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (deleteIndex) => {
    setResponses((prev) => prev.filter((_, index) => index !== deleteIndex));
  };

  const handleUpdate = (item, index) => {
    setDate(item.data.date);
    setSubject(item.data.subject);
    setText(item.data.text);
    setEditIndex(index);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-blue-950 flex flex-col items-center py-4">

      {/* FORM CARD */}
      <div className="w-full max-w-4xl bg-blue-950 shadow-md shadow-blue-900 rounded-3xl p-5 sm:p-8">
        <h1 className="text-center mt-2 text-2xl sm:text-3xl text-blue-200 font-bold">
          DaiLy<span className="text-purple-400">NoteS</span>
        </h1>

        <div className="grid gap-4 mt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="border border-slate-300 bg-white/5 text-slate-100 w-full h-12 p-3 text-sm rounded-xl"
              type="text"
              value={name || "Guest"}
              readOnly
            />

            <input
              className="border border-slate-300 bg-white/5 text-slate-100 w-full h-12 p-3 text-sm rounded-xl"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <input
            className="border border-slate-300 bg-white/5 text-slate-100 w-full h-12 p-3 text-sm rounded-xl"
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            className="border border-slate-300 bg-white/5 text-slate-100 w-full min-h-28 p-3 text-sm rounded-xl resize-none"
            placeholder="Text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={getRes}
            className="bg-blue-800 text-white w-full sm:w-auto px-6 py-3 rounded-xl transition hover:bg-blue-700"
          >
            {editIndex !== null ? "Update" : "Send"}
          </button>
        </div>
      </div>

      {/* NOTES SECTION */}
      <div className="w-full max-w-6xl mt-8 px-2 sm:px-0">
        {responses.length === 0 ? (
          <p className="text-center text-slate-300 mt-6">
            No notes yet. Add one using the form above.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {responses.map((item, index) => (
              <div
                key={index}
                className="relative bg-blue-900 rounded-3xl p-5 shadow-lg shadow-blue-900"
              >
                <div className="flex flex-wrap justify-end gap-2 mb-4">
                  <button
                    onClick={() => handleUpdate(item, index)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-xl text-xs sm:text-sm"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-xl text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-sm text-slate-200 mb-2">
                  <span className="font-semibold">Message :</span> {item.message || "-"}
                </p>
                <p className="text-sm text-slate-200 mb-1">
                  <span className="font-semibold">Name :</span> {item.data?.name || "Unknown"}
                </p>
                <p className="text-sm text-slate-200 mb-1">
                  <span className="font-semibold">Date :</span> {item.data?.date || "-"}
                </p>
                <p className="text-sm text-slate-200 mb-1">
                  <span className="font-semibold">Subject :</span> {item.data?.subject || "-"}
                </p>
                <p className="text-sm text-slate-200">
                  <span className="font-semibold">Text :</span> {item.data?.text || "-"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoPage;