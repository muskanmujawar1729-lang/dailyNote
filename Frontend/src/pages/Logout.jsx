import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User already logged out");
        navigate("/login");
        return;
      }

      await axios.post(
        "https://dailynote-4.onrender.com/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");

      alert("Logout successful ✅");
      navigate("/login");

    } catch (err) {
      console.log(err.response); // debug

      alert(err.response?.data?.message || "Logout failed ❌");

      // force logout even if API fails
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}

export default Logout;