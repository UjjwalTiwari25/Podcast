import React from 'react';
import { Link } from 'react-router-dom';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { Motion } from 'framer-motion';

const Home = () => {
  return (
    <div className='w-full min-h-screen flex flex-col md:flex-row items-center justify-evenly md:justify-between px-6 md:px-10 pt-28 pb-10 bg-green-200 gap-10'>

      {/* Text Section */}
      <div className='gap-6  w-full md:w-2/3 flex flex-col justify-center md:gap-10 text-center md:text-left'>
        <h1 className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight'>
          Create & Listen to Podcasts
        </h1>
        <p className='text-xl sm:text-2xl md:text-3xl'>
          Listen to the most popular Podcast on just one platform - <span className='font-bold'>Podcaster</span>
        </p>
        <div className='flex justify-center md:justify-start'>
          <Link
            to='/signUp'
            className='text-lg sm:text-xl text-white font-bold rounded-full px-6 py-3 bg-green-800 hover:bg-black transition'
          >
            Register to listen
          </Link>
        </div>
      </div>

      {/* Animated Microphone */}
      <Motion.div
  className='w-full md:w-1/3 flex justify-center items-center'
  initial={{ scale: 1 }}
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ repeat: Infinity, repeatType: "loop", duration: 2, ease: 'easeInOut' }}
>
  <MicrophoneIcon className='h-40 w-40 sm:h-64 sm:w-64 text-green-800' />
</Motion.div>

    </div>
  );
};

export default Home;
