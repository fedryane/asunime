import React from "react";
import LoadingComponent from "../particles/LoadingComponent";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import Cards from "../particles/Cards";

// API Call
import { fetchPlayAnime, fetchAnimeDetail } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const WatchAnime = () => {
  const { id, eps } = useParams();
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

  const findEpisode = detail?.episodes?.find((ep) => ep.number === parseInt(eps));

  const {
    data: watch,
    isLoading: isWatchLoading,
    isError: isWatchError,
  } = useQuery({
    queryKey: ["currently-watching", findEpisode?.id],
    queryFn: () => fetchPlayAnime(findEpisode.id, "gogoanime"),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });


  const handleJumpEps = async (epsNum) => {
    navigate(`/watch/${id}/${epsNum}`);
  };

  const handleDetail = (animeId) => {
    navigate(`/anime/detail/${animeId}`);
  };

  if (detailLoading) return <LoadingComponent />;
  if (detailError) return <h1 className="text-white">Error...</h1>;

  if (isWatchLoading) return <LoadingComponent />;
  if (isWatchError) return navigate("/");

  return (
    <div className="">
      <div className="bg-[#1A1C22] text-white px-0 lg:px-5 flex flex-wrap">
        <div className="w-[100%] lg:w-[70%]">
          <div className="scrollbar-hide">
            {isWatchError ? (
              <div className="bg-[#2f323b] my-5 aspect-video w-full h-[280px] lg:h-full rounded-lg flex justify-center items-center">
                {/* <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 flex items-center"></div> */}
                <BsFillPlayFill className="text-[#E65176] text-[50px] animate-pulse" onClick={handleJumpEps(detail.episodes[0].id)} />
              </div>
            ) : (
              <iframe
                className="aspect-video w-full h-[280px] md:h-[110%] rounded-lg scrollbar-hide"
                src={watch.headers.Referer}
                title={eps}
                allow="autoplay; picture-in-picture; fullscreen"
                allowFullScreen
              ></iframe>
            )}
          </div>

          {/* <iframe className="aspect-video w-full rounded-lg" src="https://www.youtube.com/embed/nm-GJYOtgxw" allow="autoplay; picture-in-picture; fullscreen" allowFullScreen></iframe> */}
        </div>
        <div className="w-[100%] lg:w-[30%] flex flex-col justify-center px-0 lg:px-10 lg:justify-start text-center lg:text-start">
          <Link to={`/anime/detail/${id}`} className={`${detail.title.romaji.length > 30 ? "text-[17px] px-10 lg:px-0" : "text-[17px] lg:text-[25px]"}   font-bold mt-5 lg:mt-7 hover:text-[#E65176]`}>
            {detail.title.romaji}
          </Link>
          <p className="text-[15px]  italic text-gray-400 mt-1">
            {findEpisode?.title} - Episode {findEpisode?.number}
          </p>
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
                    handleJumpEps(episode.number);
                  }}
                >
                  {episode.number.toString().length > 5 ? episode.number.toString().slice(0, 3) + ".." : episode.number}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-3 lg:px-5 mt-5 cursor-pointer">
        <div className="relative w-full overflow-hidden p-0 lg:p-5 my-5 border border-[#E65176] shadow-md rounded-lg items-center">
          <input type="checkbox" className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer" />
          <div className="h-12 w-full flex items-center">
            <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px] px-4 lg:px-0">Recommendations ⭐</h1>
          </div>
          <div class="absolute top-2.5 lg:top-7 right-10 text-[#E65176] transition-transform duration-500 rotate-0 peer-checked:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
            </svg>
          </div>
          <div className="overflow-hidden transition-all duration-700 max-h-0 peer-checked:max-h-full">
            <div className="grid gap-5 mt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  border border-gray-800 p-4 lg:p-5 rounded-lg shadow-md">
              {detail.recommendations.length === 0 ? (
                <p className="text-white">No recommendations available</p>
              ) : (
                detail.recommendations.map((item, index) => (
                  <div key={index}>
                    <Cards
                      onClick={() => {
                        handleDetail(item.id);
                      }}
                      image={item.image}
                      episodeNumber={`Episode ${item.episodes}`}
                      title={item.title.romaji.length > 30 ? item.title.romaji.slice(0, 40) + " ..." : item.title.romaji}
                      title2={item.title.native.length > 30 ? item.title.native.slice(0, 40) + " ..." : item.title.native}
                      rating={item.rating}
                      type={item.type}
                      status={"Latest"}
                      placeholder={item.image}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchAnime;
