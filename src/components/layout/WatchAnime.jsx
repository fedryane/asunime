import React from "react";
import LoadingComponent from "../particles/LoadingComponent";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";

// API Call
import { fetchPlayAnime, fetchAnimeDetail } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const WatchAnime = () => {
  const { id, eps } = useParams();
  const navigate = useNavigate();

  console.log(eps);

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

  console.log(detail);
  const findEpisode = detail?.episodes?.find((ep) => ep.number === parseInt(eps)).id;

  console.log(findEpisode);

  const {
    data: watch,
    isLoading: isWatchLoading,
    isError: isWatchError,
  } = useQuery({
    queryKey: ["currently-watching", findEpisode],
    queryFn: () => fetchPlayAnime(findEpisode, "gogoanime"),
    keepPreviousData: true,
    refetchOnWindowFocus: false,

    onError: (error) => {
      console.log(error);
    },
  });

  // console.log(watch);

  const handleJumpEps = async (epsID) => {
    navigate(`/latest-watch/${id}/${epsID}`);
  };

  if (detailLoading) return <LoadingComponent />;
  if (detailError) return <h1 className="text-white">Error...</h1>;

  if (isWatchLoading) return <LoadingComponent />;
  if (isWatchError) return <h1 className="text-white">Error...</h1>;

  console.log(watch);

  return (
    <div className="">
      <div className="bg-[#1A1C22] text-white px-0 lg:px-5 flex flex-wrap">
        <div className="w-[100%] lg:w-[70%]">
          <div className="">
            {isWatchError ? (
              <div className="bg-[#2f323b] my-5 aspect-video w-full h-[280px] lg:h-full rounded-lg flex justify-center items-center">
                {/* <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 flex items-center"></div> */}
                <BsFillPlayFill className="text-[#E65176] text-[50px] animate-pulse" onClick={handleJumpEps(detail.episodes[0].id)} />
              </div>
            ) : (
              <iframe className="aspect-video w-full h-[280px] lg:h-full rounded-lg" src={watch.headers.Referer} title={eps} allow="autoplay; picture-in-picture; fullscreen" allowFullScreen></iframe>
            )}
          </div>

          {/* <iframe className="aspect-video w-full rounded-lg" src="https://www.youtube.com/embed/nm-GJYOtgxw" allow="autoplay; picture-in-picture; fullscreen" allowFullScreen></iframe> */}
        </div>
        <div className="w-[100%] lg:w-[30%] flex flex-col justify-center px-0 lg:px-10 lg:justify-start text-center lg:text-start">
          <p className={`${detail.title.romaji.length > 30 ? "text-[17px] px-10 lg:px-0" : "text-[17px] lg:text-[25px]"}   font-bold mt-5 lg:mt-7`}>{detail.title.romaji}</p>
          {/* <p className="text-[15px]  italic text-gray-400 mt-1">
            {detailEps?.title} - Episode {detailEps?.number}
          </p> */}
          <div className="flex flex-row gap-2 my-3 justify-center lg:justify-start">
            <p className="border px-2 ">HD</p>
            <p className="border px-2 ">SUB</p>
          </div>
          <h1 className="text-[17px] text-[#E65176] mt-5">Episodes</h1>
          <div
            className={`${
              detail.episodes.length > 37 ? "overflow-y-auto w-full h-[500px] lg:h-[325px] 2xl:h-[540px]" : ""
            } grid grid-cols-5 lg:grid-cols-5 text-center gap-4 mt-2 text-[20px] lg:text-[20px] rounded-lg w-full px-5 lg:px-0 pb-5 lg:pb-0`}
          >
            {detail.episodes.map((episode) => {
              return (
                <button
                  className={`${findEpisode === episode.id ? "bg-[#a33450] hover:bg-[#c4657d]" : "bg-[#35373D]"} rounded-md p-2 hover:bg-[#a33450] cursor-pointer`}
                  onClick={() => {
                    handleJumpEps(episode.id);
                  }}
                >
                  {episode.number.toString().length > 5 ? episode.number.toString().slice(0, 3) + ".." : episode.number}
                </button>
              );
            })}
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
