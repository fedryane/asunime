import React, { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import LoadingComponent from "../particles/LoadingComponent";
import { Latest, Genres, Upcoming } from "../layout/index";

// API Call
import { fetchAnimeDetail } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const AnimeDetails = () => {
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const {
    data: detail,
    isLoading: detailLoading,
    isError: detailError,
  } = useQuery({
    queryKey: ["DetailAnime", id],
    queryFn: () => fetchAnimeDetail(id),
    keepPreviousData: true,
  });

  if (detailLoading) return <LoadingComponent />;
  if (detailError) return <h1>Error...</h1>;

  const shortenedDetails = detail?.description?.slice(0, 200);
  const handleShowMore = () => {
    setShow(true);
  };

  const handleShowLess = () => {
    setShow(false);
  };

  console.log(detail);

  return (
    <div className="w-full h-[500px]">
      <div className="relative">
        <div className="flex flex-wrap justify-between ">
          <div className="w-[100%] lg:w-[70%] h-[500px]  flex flex-col lg:flex-row justify-center items-center lg:items-stretch lg:items-none lg:justify-start p-10 gap-5">
            <img src={detail.image} alt="" className="w-[185px] z-[0] lg:w-[300px] lg:h-[400px] px-5" />
            <div className="flex flex-col text-center lg:text-start px-5">
              <h1 className="text-white font-normal text-[25px] lg:text-[27px]">{detail.title.romaji}</h1>
              <div className="flex text-white gap-2 text-[13px] justify-center lg:justify-start">
                <p className="border px-2">HD</p>
                <p className="border px-2">SUB</p>
                <p>•</p>
                <p>TV Series</p>
                <p>•</p>
                <p>{detail.duration} Min</p>
              </div>
              <div className="flex justify-center lg:justify-start my-5">
                {detail.episodes.length === 0 ? (
                  <p className="text-gray-400 italic">No episodes</p>
                ) : (
                  <Link
                    to={`/watch-now/${id}/${detail?.episodes[0]?.id}`}
                    className="bg-[#EF547A]  hover:bg-[#eb839d] text-white px-8 py-3 lg:px-7 lg:py-3 rounded-full cursor-pointer flex items-center gap-2"
                  >
                    <BsFillPlayFill />
                    Watch Now
                  </Link>
                )}
              </div>

              <div className="hidden lg:block">
                <p className="text-white font-normal text-[12px] lg:text-[13px]">{show ? detail.description : shortenedDetails}</p>

                {detail?.description?.length > 200 && (
                  <>
                    {!show ? (
                      <button onClick={handleShowMore} className="text-gray-200 hover:text-gray-400 underline flex items-center text-[12px] lg:text-[13px]">
                        <AiOutlinePlus />
                        More
                      </button>
                    ) : (
                      <button onClick={handleShowLess} className="text-gray-200 hover:text-gray-400 underline flex items-center text-[12px] lg:text-[13px]">
                        <AiOutlineMinus />
                        Less
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-[100%] h-[570px] lg:w-[25%] lg:h-[550px]  flex  bg-[#5c5d5f] opacity-50">
            <div className="px-7 flex flex-col gap-2 text-[15px] mt-5 lg:mt-16 font-extrabold opacity-100">
              <div className="text-white block lg:hidden">
                Overview :<p className="font-medium text-white overflow-y-auto h-32"> {detail.description}</p>
              </div>

              <p className="text-white">
                Other name :<span className="font-medium"> {detail.synonyms.map((i) => i)}</span>
              </p>
              <p className="text-white">
                Total Episode :<span className="font-medium"> {detail.totalEpisodes}</span>
              </p>
              <p className="text-white">
                Status :<span className="font-medium"> {detail.status}</span>
              </p>
              <p className="text-white">
                Season :
                <span className="font-medium">
                  {" "}
                  {detail?.season?.toLowerCase().charAt(0).toUpperCase() + detail?.season?.toLowerCase().slice(1)} {detail.releaseDate} Anime
                </span>
              </p>
              <p className="text-white">
                Studio :<span className="font-medium"> {detail.studios.map((studio) => studio)}</span>
              </p>
              <p className="text-white">
                Score : <span className="font-medium border p-1">{detail.rating}</span>
              </p>
              <p className="text-white">
                Start Date :{" "}
                <span className="font-medium">
                  {detail.startDate.day}-{detail.startDate.month}-{detail.startDate.year}
                </span>
              </p>
              <p className="text-white">
                End Date :{" "}
                <span className="font-medium">
                  {detail.endDate.day}-{detail.endDate.month}-{detail.endDate.year}
                </span>
              </p>
              <p className="text-white">
                Genre :
                {detail.genres.map((item, index) => (
                  <span className="font-medium text-white" key={index}>
                    {" "}
                    {item} •{" "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        <img src={detail.cover} alt="" className="absolute z-[-1] top-0 left-0 right-0 w-full h-[500px] blur-xl opacity-80" />
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="w-[100%] lg:w-[75%] px-4 lg:px-10 mt-5 h-[350px]">
          {detail.trailer === undefined ? null : (
            <div className="flex flex-col my-5">
              <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Promotion Videos</h1>
              <iframe
                className="mt-5 aspect-video rounded-lg"
                src={`https://www.youtube.com/embed/${detail.trailer.id}`}
                title="YouTube video player"
                frameborder="0"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowfullscreen
              ></iframe>
            </div>
          )}

          {detail.characters.length === 0 ? null : (
            <div className="my-5">
              <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Characters List</h1>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-8 gap-0 lg:gap-5">
                {detail.characters.map((i) => {
                  return (
                    <div className="flex flex-col items-center justify-center mt-5">
                      <img src={i.image} alt="" className="w-32 h-40 lg:w-40 lg:h-56 rounded-lg" />
                      <div className="text-gray-300 text-center mt-3">
                        <p className="font-bold">{i.name.full.length > 12 ? i.name.first : i.name.full}</p>
                        <p className={`${i.role === "MAIN" ? "text-yellow-600" : "text-blue-500"} text-[10px]`}>{i.role.toLowerCase().charAt(0).toUpperCase() + i.role.toLowerCase().slice(1)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <Latest />
          <div className="block lg:hidden w-[100%] my-5">
            <Genres />
            <Upcoming />
          </div>
        </div>
        <div className="w-[100%] h-[500px] lg:w-[25%] lg:h-[550px] mt-10 hidden lg:flex flex-col">
          <Genres />
          <Upcoming />
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
