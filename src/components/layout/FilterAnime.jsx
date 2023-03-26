import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsChevronRight, BsFillPlayFill } from "react-icons/bs";

// API Call
import { fetchGenre } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../particles/Pagination";

const FilterAnime = () => {
  const { id } = useParams();

  console.log(id);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(page);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    navigate(`/genre/${id}?page=${currentPage + 1}`);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
    navigate(`/genre/${id}?page=${currentPage - 1}`);
  };

  const {
    data: genre,
    isLoading: isGenreLoading,
    isError: isGenreError,
  } = useQuery({
    queryKey: ["Genre", currentPage, id],
    queryFn: () => fetchGenre(currentPage, 20, id),
    keepPreviousData: true,
  });

  console.log(genre);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isGenreLoading) return <h1>Loading...</h1>;
  if (isGenreError) return <h1>Error...</h1>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Genre : {id}</h1>
        <div className="flex items-center gap-2 text-[#EF547A] hover:text-white cursor-pointer">
          {window.location.pathname === "/" ? (
            <>
              <Link to="/latest-update">View more</Link>
              <BsChevronRight />
            </>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 mt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {genre.results.map((item, index) => (
          <div
            key={index}
            // onClick={() => {
            //   handleWatch(item.id, item.episodeId);
            // }}
          >
            <div className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-t-lg">
              <img
                className="w-[330px] h-[180px] lg:w-[350px] lg:h-[250px] object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                src={item.image}
                alt="Latest Anime"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[120%] flex-col items-center justify-center px-2 lg:px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                <BsFillPlayFill className="text-[30px] text-white" />
              </div>
            </div>
            <div className="p-3 text-white bg-[#0C0B0B] rounded-b-lg w-full h-[105px] md:h-[110px] lg:h-[130px]">
              <div className="relative mt-2 sm:mt-0">
                {/* <p className={`${item.title.endsWith("(Dub)") ? "bg-red-500 text-white" : ""} px-1.5 py-1 rounded-lg text-[10px] bg-blue-500 absolute top-[-40px] left-0`}>
                  {item.title.endsWith("(Dub)") ? "Dub" : "Sub"}
                </p> */}
                {/* <p className="px-1.5 py-1 rounded-lg text-[10px] text-black bg-white">Release {item.released}</p> */}
                {/* <p className=" px-1.5 py-1.5 rounded-lg text-[10px] bg-red-500">{item.rating === null ? "N/A" : "Score " + item.rating}</p> */}
              </div>
              <div className="flex flex-col justify-between">
                <p className="mt-2.5 font-semibold text-[9px] sm:text-[12px] md:text-[12px] lg:text-[13px]">
                  {item.title.romaji.length > 30 ? item.title.romaji.slice(0, 40) + " ..." : item.title.romaji}
                </p>

                <p className="text-[9px] sm:text-[12px] md:text-[12px] lg:text-[13px] mt-1 text-gray-500">Released : {item.releaseDate}</p>
              </div>

              {/* <div className="flex flex-col justify-between text-[10px] gap-4 lg:text-[13px] text-gray-500 ">
                <p></p>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      <Pagination nextPage={nextPage} prevPage={prevPage} disabledNext={genre.results.length < 20} disabledPrev={currentPage === 1} currentPage={currentPage} />
    </div>
  );
};

export default FilterAnime;
