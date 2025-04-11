import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Headset, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full bg-white shadow-md fixed top-0  left-0 z-50'>
      <div className='flex justify-between items-center px-6 py-4 md:px-10'>
        
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <Headset className='h-8 w-8 text-black' />
          <p className='text-2xl font-bold'>Podcast</p>
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-6 text-lg font-bold'>
          <li><Link to='/' className='hover:text-green-800'>Home</Link></li>
          <li><Link to='/categories' className='hover:text-green-800'>Categories</Link></li>
          <li><Link to='/allPodcast' className='hover:text-green-800'>All Podcast</Link></li>
        </ul>

        {/* Desktop Buttons (Styled Like Mobile) */}
        <div className='hidden md:flex gap-4 text-lg font-bold'>
          <Link
            to='/logIn'
            className='bg-black text-white px-4 py-2 rounded-full hover:bg-green-800 transition'
          >
            LogIn
          </Link>
          <Link
            to='/signUp'
            className='bg-green-800 text-white px-4 py-2 rounded-full hover:bg-black transition'
          >
            SignUp
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className='h-7 w-7' /> : <Menu className='h-7 w-7' />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Card */}
      {isOpen && (
        <div className='absolute top-16 right-4 w-64 bg-white shadow-2xl rounded-3xl p-6 flex flex-col items-center gap-4 z-50 transition-all duration-300 animate-fade-in'>
          <ul className='flex flex-col items-center gap-3 text-lg font-semibold'>
            <li><Link to='/' onClick={() => setIsOpen(false)} className='hover:text-green-800'>Home</Link></li>
            <li><Link to='/categories' onClick={() => setIsOpen(false)} className='hover:text-green-800'>Categories</Link></li>
            <li><Link to='/allPodcast' onClick={() => setIsOpen(false)} className='hover:text-green-800'>All Podcast</Link></li>
          </ul>
          <div className='flex flex-col gap-3 w-full mt-2'>
            <Link
              to='/logIn'
              onClick={() => setIsOpen(false)}
              className='bg-black border-2 text-white text-center py-2 rounded-full hover:bg-green-800 transition'
            >
              LogIn
            </Link>
            <Link
              to='/signUp'
              onClick={() => setIsOpen(false)}
              className='bg-green-800 text-white text-center py-2 rounded-full hover:bg-black transition'
            >
              SignUp
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
