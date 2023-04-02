import React, { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cards from "../particles/Cards";
import LatestSkeleton from "../particles/skeleton/LatestSkeleton";
import Pagination from "../particles/Pagination";

// API Call
import { fetchPopular } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const ITEM_PAGE = 30;

const Dub = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const page = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(page);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    navigate(`/popular-anime?page=${currentPage + 1}`);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
    navigate(`/popular-anime?page=${currentPage - 1}`);
  };

  const handleWatch = (animeId, epsNum) => {
    navigate(`/watch/${animeId}/${epsNum}`);
  };

  const {
    data: popular,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useQuery({
    queryKey: ["PopularAnime", currentPage],
    queryFn: () => fetchPopular(currentPage, ITEM_PAGE),
    keepPreviousData: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isPopularLoading) return <LatestSkeleton />;
  if (isPopularError) return <h1>Error...</h1>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Popular Anime</h1>
        <div className="flex items-center gap-2 text-[#EF547A] hover:text-white cursor-pointer">
          {window.location.pathname === "/" ? (
            <>
              <Link to="/popular-anime">View more</Link>
              <BsChevronRight />
            </>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 mt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {popular.results.map((item, index) => (
          <div to={`/anime/detail/${item.id}`} key={index}>
            <Cards
              onClick={() => {
                handleWatch(item.id, item.episodeNumber);
              }}
              image={item.image}
              rating={item.rating}
              title={item.title?.romaji?.length > 30 ? item.title?.romaji.slice(0, 40) + " ..." : item.title.romaji}
              title2={item.title?.native?.length > 30 ? item.title?.native.slice(0, 40) + " ..." : item.title.native}
              type={item.releaseDate}
              episodeNumber={`Episode ${item.totalEpisodes}`}
              status={item.status}
              placeholder={item.image}
            />
          </div>
        ))}
      </div>
      {window.location.pathname === "/popular-anime" ? (
        <Pagination nextPage={nextPage} prevPage={prevPage} disabledNext={popular.results.length < 19} disabledPrev={currentPage === 1} currentPage={currentPage} />
      ) : null}

      {/* {window.location.pathname === "/popular-anime" ? <Pagination 
      onPageChange={handleSwitchPage} 
      pageCount={popular?.totalPages} 
      /> : null} */}
    </div>
  );
};

export default Dub;
