import { useEffect } from "react"
import axios from "axios"
import { useSearchParams, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function VerifyEmail() {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get("token")

  const verifyEmail = async () => {

    try {

      const res = await axios.post(
        "https://mynoteapp-qr22.onrender.com/user/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success(res.data.message)

      setTimeout(() => {
        navigate("/login")
      }, 3000)

    } catch (error) {

      console.log(error)

      toast.error(
        error?.response?.data?.message || "Verification failed"
      )
    }
  }

  useEffect(() => {
    if (token) verifyEmail()
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white gap-3">
      <h2 className="text-xl font-semibold">Verifying Email...</h2>
      <p className="text-gray-400">Please wait while we verify your account</p>

      <button
        onClick={() => navigate("/login")}
        className="mt-4 bg-green-500 px-5 py-2 rounded-md"
      >
        Login
      </button>
    </div>
  )
}

export default VerifyEmail