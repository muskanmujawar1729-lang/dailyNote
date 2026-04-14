import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log({ username, email, password }); // 🔍 debug

    try {
      const res = await axios.post(
        "https://dailynote-4.onrender.com/user/register",
        {
          username,
          email,
          password,
        }
      );

      alert("Signup successful ✅");
      navigate("/login");

    } catch (err) {
      console.log(err.response?.data); // 🔍 error check
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f1f4b]">
      <form
        onSubmit={handleSignup}
        className="bg-gray-100 p-8 rounded-xl shadow-lg w-[350px]"
      >
        <h2 className="text-2xl font-semibold text-green-600 text-center mb-2">
          Sign up
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Signup
        </button>

        <p className="text-center mt-3">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;