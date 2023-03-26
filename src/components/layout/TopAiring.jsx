import React from "react";
import { useNavigate } from "react-router-dom";

// API Call
import { fetchTopAiring } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const CURRENT_PAGE = 1;

const TopAiring = () => {
  const navigate = useNavigate();

  const {
    data: topAiring,
    isLoading: topAiringLoading,
    isError: topAiringError,
  } = useQuery({
    queryKey: ["topAiring", CURRENT_PAGE],
    queryFn: () => fetchTopAiring(1, 10, 6),
    keepPreviousData: true,
  });

  if (topAiringLoading) return <h1>Loading...</h1>;
  if (topAiringError) return <h1>Error...</h1>;

  console.log(topAiring);

  const handleWatch = (animeId) => {
    navigate(`/watch-top-airing/${animeId}`);
  };

  return (
    <div className="w-full mt-3">
      <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Top Airing</h1>
      <div className="bg-[#2a2c31] rounded-lg  mt-5 p-0 lg:p-3">
        {topAiring.results.map((anime, index) => (
          <div
            onClick={() => {
              handleWatch(anime.id === "itai-no-wa-iya-nano-de-bougyoryoku-ni-kyokufuri-shitai-to-omoimasu-2" ? "itai-no-wa-iya-nano-de-bougyoryoku-ni-kyokufuri-shitai-to-omoimasu-ii" : anime.id);
            }}
            className="flex flex-row items-center gap-3 p-2 lg:pl-3 hover:bg-gray-700 cursor-pointer rounded-xl"
            key={index}
          >
            <p className="text-[#EF547A]">{index + 1}</p>
            <img src={anime.image} alt="" className="w-[72.4px] my-2 rounded-lg" />
            <div className="flex flex-col">
              <p className="text-white mt-2 text-[14px] p-2">{anime.title.length > 25 ? anime.title.slice(0, 40) + " ..." : anime.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAiring;
