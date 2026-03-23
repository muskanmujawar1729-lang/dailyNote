
import { useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

function VerifyOtp() {

  const { email } = useParams()
  const navigate = useNavigate()

  const [otp, setOtp] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!otp) {
      setMessage("OTP is required")
      return
    }

    setLoading(true)

    try {

      const res = await axios.post(
        `https://mynoteapp-qr22.onrender.com/user/verify-otp/${email}`,
        { otp }
      )

      setMessage(res.data.message)

      // OTP verify hone ke baad password change page
      setTimeout(() => {
        navigate(`/changepassword/${email}`)
      }, 1500)

    } catch (error) {

      setMessage(error.response?.data?.message || "OTP verification failed")

    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg p-6 rounded-lg w-[320px]">

        <h2 className="text-lg font-semibold text-center">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          Enter OTP sent to <span className="font-medium">{email}</span>
        </p>

        {message && (
          <p className="text-center text-red-500 text-sm mt-3">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border rounded-md px-3 py-2 outline-none focus:border-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <p
          className="text-sm text-center mt-3 text-blue-600 cursor-pointer"
          onClick={() => navigate("/forgetpass")}
        >
          Resend OTP
        </p>

      </div>

    </div>
  )
}

export default VerifyOtp
