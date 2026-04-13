import React from 'react'
import { useNavigate } from 'react-router-dom'
import TodoPage from './TodoPage';


function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-950 text-white px-4 sm:px-6 lg:px-12 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            DaiLy<span className="text-green-500">NoteS</span>
          </h1>

          <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
            <button
              className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition w-full sm:w-auto"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition w-full sm:w-auto"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition w-full sm:w-auto"
              onClick={() => navigate("/logout")}
            >
              Logout
            </button>
          </div>
        </div>

        <TodoPage />
      </div>
    </div>
  );
}

export default Home