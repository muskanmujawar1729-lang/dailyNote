import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Signup() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [errors, setErrors] = useState({})
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()

  const validate = () => {

    let newErrors = {}

    if (!username) {
      newErrors.username = "Name is required"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } 
    else if (!email.includes("@")) {
      newErrors.email = "Enter valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } 
    else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    try {

      const res = await axios.post(
        "https://dailynote-4.onrender.com/user/register",
        {
          username,
          email,
          password
        }
      )

      console.log(res.data)

      //  username store
      localStorage.setItem("username", username)

      toast.success("Account created successfully! Please check your email to verify your account.")

      setUsername("")
      setEmail("")
      setPassword("")
      setError("")
      setErrors({})

      navigate("/login")

    } catch (error) {

      setError(error.response?.data?.message)
      console.log(error)

    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-center text-xl text-green-600 font-semibold">
          Sign up
        </h1>

        <p className="text-center text-gray-600 mt-1">
          create your account to NoteApp
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">

          {error && (
            <p className="bg-red-100 text-center mt-2 text-red-600 p-2 rounded text-sm">
              {error}
            </p>
          )}

          <label className="text-[15px] font-semibold">Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none text-sm"
            onChange={(e) => setUsername(e.target.value)}
          />

          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username}</p>
          )}

          <label className="text-[15px] font-semibold">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          <label className="text-[15px] font-semibold">Password</label>

          <input
            type="password"
            placeholder="create password"
            value={password}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}

          <button
            type="submit"
            className="bg-green-600 h-8 rounded-md text-white mt-2"
          >
            {isLoading ? "Creating account..." : "Signup"}
          </button>

          <p className="mt-2 text-center text-sm cursor-pointer">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Signup