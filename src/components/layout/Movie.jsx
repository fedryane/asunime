import React, { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Paginate from "../particles/Paginate";
import Cards from "../particles/Cards";
import LatestSkeleton from "../particles/skeleton/LatestSkeleton";

// API Call
import { fetchMovie } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const ITEM_PAGE = 30;
const FORMAT = "MOVIE";

const Movie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const page = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(page);

  const handleSwitchPage = (pages) => {
    setCurrentPage(pages.selected + 1);
    navigate(`/movie?page=${pages.selected + 1}`);
  };

  const handleWatch = (animeId, epsNum) => {
    navigate(`/watch/${animeId}/${epsNum}`);
  };

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["moviesAnime", FORMAT, currentPage],
    queryFn: () => fetchMovie(currentPage, ITEM_PAGE, FORMAT),
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isMovieLoading) return <LatestSkeleton />;
  if (isMovieError) return <h1>Error...</h1>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Movie Anime</h1>

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
        {movie.results.map((item, index) => (
          <div key={index}>
            <Cards
              onClick={() => {
                handleWatch(item.id, item.totalEpisodes);
              }}
              image={item.image}
              episodeNumber={`Episode ${item.totalEpisodes}`}
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
      {window.location.pathname === "/movie" ? <Paginate onPageChange={handleSwitchPage} pageCount={movie?.totalPages} /> : null}
    </div>
  );
};

export default Movie;
