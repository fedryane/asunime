import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsChevronRight, BsFillPlayFill } from "react-icons/bs";
import Cards from "../particles/Cards";

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
          <Link to={`/anime/detail/${item.id}`} key={index}>
            <Cards
              image={item.image}
              title={item.title.romaji.length > 30 ? item.title.romaji.slice(0, 40) + " ..." : item.title.romaji}
              episodeNumber={`Episode ${item.totalEpisodes}`}
              type={item.type}
              title2={item.title.native.length > 30 ? item.title.native.slice(0, 40) + " ..." : item.title.native}
              status={item.status}
              rating={item.rating}
            />
          </Link>
        ))}
      </div>

      <Pagination nextPage={nextPage} prevPage={prevPage} disabledNext={genre.results.length < 20} disabledPrev={currentPage === 1} currentPage={currentPage} />
    </div>
  );
};

export default FilterAnime;
