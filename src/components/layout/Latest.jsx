import React, { useState, useEffect } from "react";
import { BsChevronRight, BsFillPlayFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";

// API Call
import { fetchLatest } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../particles/Pagination";

const Latest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;

  const [currentPage, setCurrentPage] = useState(page);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    navigate(`/latest-update?page=${currentPage + 1}`);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
    navigate(`/latest-update?page=${currentPage - 1}`);
  };

  const handleWatch = (animeId, epsNum) => {
    navigate(`/latest-watch/${animeId}/${epsNum}`);
  };

  const {
    data: latest,
    isLoading: isLatestLoading,
    isError: isLatestError,
  } = useQuery({
    queryKey: ["latestsAnime", currentPage],
    queryFn: () => fetchLatest(currentPage, 20, "gogoanime"),
    keepPreviousData: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // console.log(latest);

  if (isLatestLoading) return <h1>Loading...</h1>;
  if (isLatestError) return <h1>Error...</h1>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Latest Update</h1>
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
        {latest.results.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleWatch(item.id, item.episodeId);
            }}
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
              <div className="relative sm:mt-0 ">
                <p className="absolute  top-[-40px] left-0  px-1.5 py-1 rounded-lg text-[10px] bg-blue-500">SUB</p>
                <p className="absolute  top-[-40px] right-0 px-1.5 py-1 rounded-lg text-[10px] text-black bg-white">Episode {item.episodeNumber}</p>
                {/* <p className=" px-1.5 py-1.5 rounded-lg text-[10px] bg-red-500">{item.rating === null ? "N/A" : "Score " + item.rating}</p> */}
              </div>

              <p className="font-semibold text-[9px] sm:text-[12px] md:text-[12px] lg:text-[13px]">{item.title.length > 30 ? item.title.slice(0, 40) + " ..." : item.title}</p>

              <div className="flex items-center gap-4 text-[10px] lg:text-[13px] text-gray-500 ">
                <p>Sub</p>
                <p>|</p>
                <p>Latest</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {window.location.pathname === "/latest-update" ? (
        <Pagination nextPage={nextPage} prevPage={prevPage} disabledNext={latest.results.length < 20} disabledPrev={currentPage === 1} currentPage={currentPage} />
      ) : null}
    </div>
  );
};

export default Latest;
