import React, { useState } from "react";
import LoadingComponent from "../particles/LoadingComponent";
import { useParams, useNavigate } from "react-router-dom";

// API Call
import { fetchAnimeDetail, fetchPlayAnime } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const WatchAnime = () => {
  const { id, eps } = useParams();

  const episodeNum = parseInt(eps);
  const navigate = useNavigate();

  const {
    data: detail,
    isLoading: detailLoading,
    isError: detailError,
  } = useQuery({
    queryKey: ["data", id],
    queryFn: () => fetchAnimeDetail(id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const detailEps = detail?.episodes[eps - 1];

  const findEps = detail?.episodes.find((episode) => episode?.number === episodeNum)?.id;
  console.log(findEps);

  const {
    data: watch,
    isLoading: isWatchLoading,
    isError: isWatchError,
  } = useQuery({
    queryKey: ["currently-watching", findEps],
    queryFn: () => fetchPlayAnime(findEps),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const handleJumpEps = async (epsID) => {
    navigate(`/watch/${id}/${epsID}`);
  };

  if (detailLoading) return <LoadingComponent />;
  if (detailError) return <h1>Error...</h1>;

  if (isWatchLoading) return <LoadingComponent />;
  if (isWatchError) return <h1 className="text-white">Error...</h1>;

  // console.log(watch);
  // console.log("INI DETAIL", detail);

  return (
    <div className="">
      <div className="bg-[#1A1C22] text-white px-0 lg:px-5 flex flex-wrap">
        <div className="w-[100%] lg:w-[70%]">
          <div className="">
            <iframe className="aspect-video w-full rounded-lg" src={watch.headers.Referer} title="Anime" allow="autoplay; picture-in-picture; fullscreen" allowFullScreen></iframe>
          </div>

          {/* <iframe className="aspect-video w-full rounded-lg" src="https://www.youtube.com/embed/nm-GJYOtgxw" allow="autoplay; picture-in-picture; fullscreen" allowFullScreen></iframe> */}
        </div>
        <div className="w-[100%] lg:w-[30%] flex flex-col justify-center px-0 lg:px-10 lg:justify-start text-center lg:text-start">
          <p className={`${detail.title.romaji.length > 30 ? "text-[17px]" : "text-[17px] lg:text-[25px]"}   font-bold mt-2`}>{detail.title.romaji}</p>
          <p className="text-[15px]  italic text-gray-400 mt-1">
            {detailEps?.title} - Episode {detailEps?.number}
          </p>
          <div className="flex flex-row gap-2 my-3 justify-center lg:justify-start">
            <p className="border px-2 ">HD</p>
            <p className="border px-2 ">SUB</p>
          </div>
          <h1 className="text-[17px] text-[#E65176] mt-5">Episodes</h1>
          <div
            className={`${
              detail.episodes.length > 37 ? "overflow-y-auto w-full h-[500px] lg:h-[325px] 2xl:h-[563px]" : ""
            } grid grid-cols-5 lg:grid-cols-5  text-center gap-4 mt-2 text-[20px] lg:text-[20px] rounded-lg w-full px-5 lg:px-0`}
          >
            {detail.episodes.map((eps) => (
              <button
                className={`${episodeNum === eps.number ? "bg-[#a33450] hover:bg-[#c4657d]" : "bg-[#35373D]"} rounded-md p-2 hover:bg-[#a33450] cursor-pointer`}
                onClick={() => {
                  handleJumpEps(eps.number);
                }}
              >
                {eps.number}
              </button>
            ))}
            {/* {data.animeDetail.episodesList.map((eps, index) => (
              <p className="border">{eps.episodeNum}</p>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchAnime;
