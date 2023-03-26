import React from "react";
import { useNavigate } from "react-router-dom";

// API Call
import { fetchUpcoming } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const CURRENT_PAGE = 1;

const TopAiring = () => {
  const navigate = useNavigate();

  const {
    data: upComing,
    isLoading: upComingLoading,
    isError: upComingError,
  } = useQuery({
    queryKey: ["upComing", CURRENT_PAGE],
    queryFn: () => fetchUpcoming(1, 20, "NOT_YET_RELEASED"),
    keepPreviousData: true,
  });

  if (upComingLoading) return <h1>Loading...</h1>;
  if (upComingError) return <h1>Error...</h1>;

  // console.log(upComing);

  const handleWatch = (animeId) => {
    navigate(`/anime/detail/${animeId}`);
  };

  return (
    <div className="w-full mt-3">
      <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Upcoming Anime</h1>
      <div className="bg-[#2a2c31] rounded-lg  mt-5 p-0 lg:p-3">
        {upComing.results.map((anime, index) => (
          <div
            onClick={() => {
              handleWatch(anime.id);
            }}
            className="flex flex-row items-center gap-3 p-2 lg:pl-3 hover:bg-gray-700 cursor-pointer rounded-xl"
            key={index}
          >
            <p className="text-[#EF547A]">{index + 1}</p>
            <img src={anime.image} alt="" className="w-[72.4px] my-2 rounded-lg" />
            <div className="flex flex-col">
              <p className="text-white mt-2 text-[14px] p-2">{anime.title.romaji.length > 25 ? anime.title.romaji.slice(0, 40) + " ..." : anime.title.romaji}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAiring;
