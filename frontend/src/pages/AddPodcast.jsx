import React from "react";
import { useSelector } from "react-redux";
import InputPodcast from "../components/AddPodcast/InputPodcast";
import ErrorPage from "./ErrorPage";
const AddPodcast = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return <div>{isLoggedIn ? <InputPodcast /> : <ErrorPage />}</div>;
};

export default AddPodcast;
