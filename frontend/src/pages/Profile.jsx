import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import Header from "../components/Profile/Header";
import YourPodcasts from "../components/Profile/YourPodcasts";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Header />
          <YourPodcasts />
        </>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

export default Profile;
