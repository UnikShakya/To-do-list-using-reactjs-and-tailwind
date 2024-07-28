import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-blue-600 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl ms-4'>MyTask</span>
        </div>
        <ul className='flex gap-9 mx-10 cursor-pointer'>
            <li>Home</li>
            <li>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
