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
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Note created");

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
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.removeItem("token");
      navigate("/login");

    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div>
      <h2>Home - Create Note</h2>

      <button onClick={logout}>Logout</button>

      <form onSubmit={createNote}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <input placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />
        <textarea placeholder="Text" onChange={(e) => setText(e.target.value)} />

        <button type="submit">Create Note</button>
      </form>
    </div>
  );
}

export default TodoPage;