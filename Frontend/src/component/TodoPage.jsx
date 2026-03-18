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
          "http://localhost:4000/user/note",
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
    <div className="h-screen bg-blue-950 overflow-hidden flex flex-col items-center fixed">

      {/* FORM CARD */}
      <div className="bg-blue-950 shadow-md shadow-blue-900 w-96 rounded-lg p-4 mt-6 items-center  ">
        <h1 className="text-center mt-2 text-2xl text-blue-200 font-bold">
          DaiLy<span className="text-purple-400">NoteS</span>
        </h1>

        <div className="flex flex-col gap-4 mt-6 items-center justify-between">
          <div className="flex gap-2 w-64">
            <input
              className="border w-32 h-10 p-1 text-sm rounded-md"
              type="text"
              value={name}
              readOnly
            />

            <input
              className="border w-32 h-10 p-1 text-sm rounded-md"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <input
            className="border w-64 h-10 p-1 text-sm rounded-md"
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <textarea
            className="border w-64 h-20 p-1 text-sm rounded-md"
            placeholder="Text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={getRes}
            className="bg-blue-800 w-64 h-10 rounded-md text-white"
          >
            {editIndex !== null ? "Update" : "Send"}
          </button>
        </div>
      </div>

      {/* NOTES SECTION */}
      <div className="w-full mt-10 px-10 overflow-y-auto">

  <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:justify-between">

    {responses.map((item, index) => (
      <div
        key={index}
        className="relative bg-blue-900 w-80 rounded-lg p-3"
      >
              <div className="flex justify-end gap-2 mb-2">
                <button
                  onClick={() => handleUpdate(item, index)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>

              <p><b>Message :</b> {item.message}</p>
              <p><b>Name :</b> {item.data.name}</p>
              <p><b>Date :</b> {item.data.date}</p>
              <p><b>Subject :</b> {item.data.subject}</p>
              <p><b>Text :</b> {item.data.text}</p>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default TodoPage;