import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://dailynote-4.onrender.com/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert(res.data.message);

        // remove stored data
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("notes");

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("Logout failed");
    }
  };

  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-white text-2xl">
      Logging out...
    </div>
  );
}
  
export default Logout;