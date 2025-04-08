import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-25 px-10 w-full'>
        <div className=''>
          <img src="" alt="" />
          <h1 className='text-3xl font-bold'>Podcast</h1>
        </div>
        <ul className='md:flex gap-3 text-xl hidden '>
              <li className=''>
                <Link to='/'>Home</Link>
              </li>
              <li className='' >
                <Link to='/categories'> Categories</Link>
               </li>
              <li className='' > 
                <Link to='/allPodcast'>All Podcast</Link>
              </li>
        </ul>
        <div className='flex gap-3 text-xl font-bold'>
          <Link to='/logIn' className='border-2 rounded-4xl p-3'>LogIn</Link>
          <Link to='/signUp' className='border-2 rounded-4xl p-3 text-white bg-black'>SignUp</Link>
        </div>

    </div>
  )
}

export default Navbar
