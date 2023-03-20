import React from "react";
import { BsChevronRight, BsFillPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";

// API Call
import { fetchPopular } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const Dub = () => {
  const {
    data: Dubbed,
    isLoading: isLatestLoading,
    isError: isLatestError,
  } = useQuery({
    queryKey: ["DubbedAnime"],
    queryFn: () => fetchPopular(1, 20),
  });

  if (isLatestLoading) return <h1>Loading...</h1>;
  if (isLatestError) return <h1>Error...</h1>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Popular Anime</h1>
        <div className="flex items-center gap-2 text-[#EF547A] hover:text-white cursor-pointer">
          {window.location.pathname === "/" ? (
            <>
              <Link to="/dub-anime">View more</Link>
              <BsChevronRight />
            </>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 mt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
        {Dubbed.results.map((item, index) => (
          <div key={index}>
            <div className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-t-lg">
              <img
                className="w-[330px] h-[180px] lg:w-[350px] lg:h-[250px] object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                src={item.image}
                alt="Trending Anime"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[120%] flex-col items-center justify-center px-2 lg:px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                <BsFillPlayFill className="text-[30px] text-white" />
              </div>
            </div>
            <div className="px-2 py-2 lg:px-4 lg:py-2 text-white bg-[#0C0B0B] rounded-b-lg w-full h-[105px] md:h-[110px] lg:h-[130px] flex flex-col">
              <div className="flex items-center justify-between">
                <p className={`${item.status === "Completed" ? "bg-green-700 text-white" : "bg-white"} p-1.5  lg:px-2.5 lg:py-1.5 rounded-lg text-[10px] text-black`}>{item.status}</p>

                <p className="p-1.5  lg:px-2.5 lg:py-1.5 rounded-lg text-[10px] bg-red-500">{item.rating === null ? "N/A" : "Score " + item.rating}</p>
              </div>

              <p className="mt-4 font-semibold text-[9px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
                {item.title.romaji.length > 30 ? item.title.romaji.slice(0, 40) + " ..." : item.title.romaji}
              </p>
              <div className="flex flex-col justify-between mt-2">
                <p className="hidden lg:block  text-gray-500 font-semibold text-[9px] sm:text-[10px]  lg:text-[12px]">
                  {item.title.english.length > 30 ? item.title.english.slice(0, 1000) + " ..." : item.title.english}
                </p>
                <p className="text-gray-500 font-semibold text-[9px] sm:text-[12px] md:text-[12px] lg:text-[12px]">{item.releaseDate === null ? "N/A" : item.releaseDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dub;
