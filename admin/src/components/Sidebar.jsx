import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 lp-[20%] text-base '>
            <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.addIcon} alt='add-icon' />
                <p className='hidden md:block'>Add items</p>
            </NavLink>

            <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.arrow} alt='list-icon' />
                <p className='hidden md:block'>List items</p>
            </NavLink>

            <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.orderIcon} alt='order-icon' />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar