import React from 'react'
import { assets } from '../assets/assets'


const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <a href='/' className='block w-[max(10%,80px)]'>
          <img className='w-full' src={assets.logo} alt='' />
        </a>
        <div className='text-xl'>Admin Panel</div>
        <button 
        onClick={()=>setToken('')}
        className='cursor-pointer bg-gray-700 duration-200 hover:bg-gray-900 text-white px-5 py-2 sm:px-7 sm:py-3 rounded-lg text-xs sm:text-sm'>
            Logout
        </button>
    </div>
  )
}

export default Navbar