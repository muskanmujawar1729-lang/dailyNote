import { useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

function ChangePassword() {

  const { email } = useParams()
  const navigate = useNavigate()

  const [newPassword,setNewPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [message,setMessage] = useState("")
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e)=>{
    e.preventDefault()

    setLoading(true)

    try {

      const res = await axios.post(
        `https://dailynote-4.onrender.com/user/changePass/${email}`,
        {
          newPassword,
          confirmPassword
        }
      )

      setMessage(res.data.message)

      // success ke baad login page
      setTimeout(()=>{
        navigate("/login")
      },2000)

    } catch (error) {

      setMessage(error.response?.data?.message || "Something went wrong")

    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">

      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">

        <h2 className="text-lg font-semibold text-center">
          Change Password
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          Enter your new password
        </p>

        {message && (
          <p className="text-center text-red-500 text-sm mt-2">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className="border rounded-md px-3 py-2 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="border rounded-md px-3 py-2 outline-none"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded-md"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default ChangePassword

