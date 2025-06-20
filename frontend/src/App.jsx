import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login.jsx";
import Categories from "./pages/Categories.jsx";
import Profile from "./pages/Profile.jsx";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth.js";
import AddPodcast from "./pages/AddPodcast.jsx";
import AllPodcasts from "./pages/AllPodcasts.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import DescriptionPage from "./pages/DescriptionPage.jsx";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/check-cookie`,
          { withCredentials: true }
        );
        if (res.data.message == true) {
          dispatch(authActions.login());
        }
      } catch (error) {
        //console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="">
 <Router>
  <Routes>
    {/* Routes under MainLayout */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-podcast" element={<AddPodcast />} />
      <Route path="/all-podcasts" element={<AllPodcasts />} />
      <Route path="/categories/:cat" element={<CategoriesPage />} />
      <Route path="/description/:id" element={<DescriptionPage />} />
    </Route>

    {/* Routes under AuthLayout */}
    <Route element={<AuthLayout />}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Route>
  </Routes>
</Router>

    </div>
  );
};

export default App;
