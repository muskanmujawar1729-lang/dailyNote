import React from 'react'
import { useNavigate } from 'react-router-dom'
import TodoPage from './TodoPage';


function Home() {
  const navigate = useNavigate();

  return (
     <div className='text-white'>
        <div className='flex justify-between py-2'>
            <h1 className='text-white text-2xl font-semibold'>DaiLy<span className='text-green-500'>NoteS</span></h1>
            <div className='flex gap-x-4 text-sm font-medium '>
                <button className='bg-green-500 p-2 rounded-md cursor-pointer' onClick={()=>navigate("/signup")}>Sign Up</button>
                <button className='bg-green-500 p-2 rounded-md cursor-pointer' onClick={()=>navigate("/login")}>Login</button>
                <button className='bg-green-500 p-2 rounded-md cursor-pointer' onClick={()=>navigate("/logout")}>Logout</button>


            </div>
        </div>
        <div className=''>
            <TodoPage/>

        </div>

    </div>
  )
}

export default Home