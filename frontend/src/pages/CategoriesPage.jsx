import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PodcastCard from "../components/PodcastCard/PodcastCard";
const CategoriesPage = () => {
  const { cat } = useParams();
  const [Podcasts, setPodcasts] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/${cat}`,
        { withCredentials: true }
      );
      setPodcasts(res.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="px-4 py-4 lg:px-12">
      <h1 className="text-xl font-semibold">{cat} </h1>
      <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Podcasts &&
          Podcasts.length >= 0 &&
          Podcasts.map((items, i) => (
            <div key={i}>
              <PodcastCard items={items} />{" "}
            </div>
          ))}
      </div>
      {Podcasts && Podcasts.length === 0 && (
        <div className="text-3xl font-bold h-screen text-zinc-700 flex items-center justify-center">
          {" "}
          No Podcasts Right Now{" "}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
