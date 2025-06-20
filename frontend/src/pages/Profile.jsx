import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import Header from "../components/Profile/Header";
import YourPodcasts from "../components/Profile/YourPodcasts";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <ErrorPage />;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <YourPodcasts />
    </main>
  );
};

export default Profile;
