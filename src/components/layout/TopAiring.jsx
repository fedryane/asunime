import React, { useState } from "react";
import { Link } from "react-router-dom";
// API Call
import { fetchTopAiring } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const currentPage = 1;

const TopAiring = () => {
  const {
    data: topAiring,
    isLoading: topAiringLoading,
    isError: topAiringError,
  } = useQuery({
    queryKey: ["topAiring", currentPage],
    queryFn: () => fetchTopAiring(1, 10, 6),
    keepPreviousData: true,
  });

  if (topAiringLoading) return <h1>Loading...</h1>;
  if (topAiringError) return <h1>Error...</h1>;

  return (
    <div className="w-full mt-3">
      <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Schedule Anime</h1>
      <div className="bg-[#2a2c31] rounded-lg  mt-5 p-0 lg:p-3">
        {topAiring.results.map((anime, index) => (
          <Link to={`/anime/detail/${anime.id}`} className="flex flex-row items-center gap-3 p-2 lg:pl-3 hover:bg-gray-700 cursor-pointer rounded-xl" key={index}>
            <p className="text-[#EF547A]">{index + 1}</p>
            <img src={anime.image} alt="" className="w-[72.4px] my-2 rounded-lg" />
            <div className="flex flex-col">
              <p className="text-white mt-2 text-[14px] p-2">{anime.title.romaji.length > 25 ? anime.title.romaji.slice(0, 40) + " ..." : anime.title.romaji}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopAiring;
