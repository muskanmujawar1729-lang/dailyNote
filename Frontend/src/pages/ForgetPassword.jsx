import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function ForgetPassword() {

  const [email,setEmail] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [message,setMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    setIsLoading(true)

    try {

      const res = await axios.post(
        "https://mynoteapp-qr22.onrender.com/user/forget-pass",
        { email }
      )

      setMessage(res.data.message)

      // OTP send hone ke baad navigate
      navigate(`/verifyotp/${email}`)

    } catch (error) {

      setMessage(error.response?.data?.message || "Something went wrong")

    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-xl font-semibold text-center text-green-700">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 text-sm mt-1">
          Enter your email to receive OTP
        </p>

        {message && (
          <p className="text-center text-sm mt-3 text-red-500">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">

          <label className="text-sm font-medium">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-green-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white rounded-md py-2 mt-2 hover:bg-green-700 transition disabled:opacity-50"
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default ForgetPassword