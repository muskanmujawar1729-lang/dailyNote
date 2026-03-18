import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [errors, setErrors] = useState({})
    const [isLoading, setLoading] = useState(false)

    const navigate = useNavigate()

    // validation
    const validate = () => {

        let newErrors = {}

        if (!email) {
            newErrors.email = "Email is required"
        } else if (!email.includes("@")) {
            newErrors.email = "Enter valid email"
        }

        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
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
                "https://dailynote-4.onrender.com/user/login",
                {
                    email,
                    password
                }
            )

            console.log(res.data)

            // token store
            localStorage.setItem("token", res.data.accessToken)

            // ⭐ username store
            localStorage.setItem("username", res.data.user.username)

            toast.success(res.data.message)

            // navigate to home
            navigate("/home")

        } catch (error) {

            setError(error.response?.data?.message || "Something went wrong")

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-[300px] bg-white shadow-lg rounded-xl p-4">

                <h1 className="text-center text-xl text-green-600 font-semibold">
                    Login
                </h1>

                <p className="text-center text-gray-600 mt-1">
                    Login to your NoteApp account
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">

                    {error && (
                        <p className="bg-red-100 text-center mt-2 text-red-600 p-2 rounded text-sm">
                            {error}
                        </p>
                    )}

                    <label className="text-[15px] font-semibold">Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 rounded-lg px-4 py-2 outline-none text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                    )}

                    <label className="text-[15px] font-semibold">Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errors.password && (
                        <p className="text-red-500 text-xs">{errors.password}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-green-600 h-8 rounded-md text-white mt-2"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    <p className="mt-2 text-center text-sm">
                        Don't have an account?
                        <span
                            className="text-blue-600 cursor-pointer"
                            onClick={() => navigate("/signup")}
                        >
                            signup
                        </span>
                    </p>

                    <p
                        className="text-[12px] mt-2 text-red-500 cursor-pointer"
                        onClick={() => navigate("/forgetpass")}
                    >
                        Forget Password
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login
