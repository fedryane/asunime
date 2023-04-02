import React, { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Paginate from "../particles/Paginate";
import Cards from "../particles/Cards";
import LatestSkeleton from "../particles/skeleton/LatestSkeleton";

// API Call
import { fetchLatest } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const ITEM_PAGE = 35;
const PROVIDER = "gogoanime";

const Latest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const page = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(page);

  const handleSwitchPage = (pages) => {
    setCurrentPage(pages.selected + 1);
    navigate(`/latest-update?page=${pages.selected + 1}`);
  };

  const handleWatch = (animeId, epsNum) => {
    navigate(`/watch/${animeId}/${epsNum}`);
  };

  const {
    data: latest,
    isLoading: isLatestLoading,
    isError: isLatestError,
  } = useQuery({
    queryKey: ["latestsAnime", currentPage],
    queryFn: () => fetchLatest(currentPage, ITEM_PAGE, PROVIDER),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  console.log(latest);

  if (isLatestLoading) return <LatestSkeleton />;
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
        {latest.results
          .filter((item) => item.type === "TV")
          .map((item, index) => (
            <div key={index}>
              <Cards
                onClick={() => {
                  handleWatch(item.id, item.episodeNumber);
                }}
                image={item.image}
                episodeNumber={`Episode ${item.episodeNumber}`}
                title={item.title.romaji.length > 30 ? item.title.romaji.slice(0, 40) + " ..." : item.title.romaji}
                title2={item.title.native.length > 30 ? item.title.native.slice(0, 40) + " ..." : item.title.native}
                rating={item.rating}
                type={item.type}
                status={"Latest"}
                placeholder={item.image}
              />
            </div>
          ))}
      </div>
      {window.location.pathname === "/latest-update" ? <Paginate onPageChange={handleSwitchPage} pageCount={latest?.totalPages} /> : null}
    </div>
  );
};

export default Latest;
