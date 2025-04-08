import React from 'react'

const Home = () => {
  return (
    <div className=' h-full flex justify-between px-10 bg-green-200 w-full'>
      <div className=' h-full w-full flex flex-col justify-center gap-10'>
        <h1 className='md:text-9xl text-6xl font-bold'>Create & Listen the PodCast</h1>
        <p className='text-3xl'>Listeen to the most popular Podcast on just one platform - <span className='font-bold'>Podcaster</span></p>      
        <button className='text-xl text-white w-fit font-bold rounded-4xl p-4 bg-green-800'>Login to listen</button>
      </div>
      <div className=' h-full w-1/3 flex flex-col justify-center items-center'>
        <button className='md:block hidden text-3xl font-bold border-2 rounded-4xl p-4 rotate-270 bg-white'>Scroll Down</button>
      </div>
      
    </div>
  )
}

export default Home
