import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { assets } from '@/assets/assets'
import { ShopContext } from '@/context/ShopContext'
import { toast } from 'sonner'

const Navbar = () => {

const [visible, setVisible] = useState(false)
const { showSearch, setShowSearch, getCartCount, navigate, token, setToken } = useContext(ShopContext)
    
const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/')  
    toast.success("Succesfully logged out") 
}
const location = useLocation();


  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/' className='cursor-pointer'>
            <img src={assets.logo} alt='logo' className='w-36'/>
        </Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1 group'>
                <p>HOME</p>
                <hr className='w-3/4 border-none h-[2px] bg-gray-700 scale-0 transistion-all duration-500 group-hover:scale-100 group-[.active]:scale-100'/>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1 group'>
                <p>COLLECTION</p>
                <hr className='w-3/4 border-none h-[2px] bg-gray-700 scale-0 transistion-all duration-500 group-hover:scale-100 group-[.active]:scale-100'/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1 group'>
                <p>ABOUT</p>
                <hr className='w-3/4 border-none h-[2px] bg-gray-700 scale-0 transistion-all duration-500 group-hover:scale-100 group-[.active]:scale-100'/>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1 group'>
                <p>CONTACT</p>
                <hr className='w-3/4 border-none h-[2px] bg-gray-700 scale-0 transistion-all duration-500 group-hover:scale-100 group-[.active]:scale-100'/>
            </NavLink> 
        </ul>

        <div className='flex items-center gap-6'>
            <img src={assets.search} alt='search-icon' 
            className='w-5 cursor-pointer transistion-all duration-300 hover:scale-[125%]' 
            onClick={()=> {
                if (!location.pathname.includes('collection')) {
                    navigate('/collection')
                }
                showSearch ? setShowSearch(!showSearch) : setTimeout(() => setShowSearch(!showSearch),200)}
                }/>
            <div className='group relative'>
                <img onClick={()=> token ? null : navigate('/login')} src={assets.profile} alt='profileIcon' 
                className='w-5 cursor-pointer transistion-all duration-300 group-hover:scale-[125%]'/>
                {/* Dropdown Menu */}
                {token && 
                    <div className="absolute right-0 pt-4 
                    transition-all duration-300 ease-in-out 
                    opacity-0 group-hover:opacity-100 
                    translate-y-[-10px] group-hover:translate-y-0 z-10
                    invisible group-hover:visible">
                        <div className='flex flex-col w-32 border bg-white
                        text-gray-600'>
                            <p onClick={()=> toast.info("Sorry, this page was not yet implemented!")}
                            className='cursor-pointer hover:text-black hover:bg-gray-100 duration-300 py-2 px-5'>
                                My profile
                            </p>
                            <p onClick={()=>navigate('/orders')} 
                            className='cursor-pointer hover:text-black hover:bg-gray-100 duration-300 py-2 px-5'>
                                Orders
                            </p>
                            <p className='cursor-pointer hover:text-black py-2 px-5 hover:bg-gray-100 duration-300'
                            onClick={logout}>Logout</p>
                        </div>
                    </div>
                }
            </div>
            <button onClick={()=> token ? navigate('/cart') : navigate('/login')} className='relative transistion-all duration-300 hover:scale-[125%]'>
                <img src={assets.cart} alt='cartIcon' className='w-5 min-w-5 '/>
                <p className='absolute -right-[5px] -bottom-[5px] w-4 text-center 
                leading-4 bg-black text-white  sqpect-square rounded-full text-[10px]'>{getCartCount()}</p>
            </button>
            <img src={assets.burger} onClick={() => setVisible(true)} alt='menu-icon' className='w-5 cursor-pointer sm:hidden'/>
        </div>

        {/* Sidebar menu for smaller screen */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden z-10 
            bg-white transistiton-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='cursor-pointer flex items-center gap-4 p-3'>
                    <img src={assets.left} alt='dropdown-icon' className='h-4'/>
                    <p>Go back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-t' to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-t' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-t' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-y' to='/contact'>CONTACT</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar