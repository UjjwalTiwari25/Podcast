import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Navbar from './components/Navbar';
import Categories from './pages/Categories';
import AllPodcast from './pages/Allpodcast';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
function App() {
  return (
    <div className='flex flex-col h-screen '>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/allPodcast' element={<AllPodcast />} />
          <Route path='/logIn' element={<LogIn/>} />
          <Route path='/signUp' element={<SignUp/>} />

        </Routes>
   
    </div>
  );
}

export default App;
