import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Cards from "../particles/Cards";

// API Call
import { fetchPopular } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";

const Dub = () => {
  const {
    data: popular,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useQuery({
    queryKey: ["PopularAnime"],
    queryFn: () => fetchPopular(1, 20),
  });

  if (isPopularLoading) return <h1>Loading...</h1>;
  if (isPopularError) return <h1>Error...</h1>;

  console.log(popular);

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
        {popular.results.map((item, index) => (
          <Link to={`/anime/detail/${item.id}`} key={index}>
            <Cards
              image={item.image}
              rating={item.rating}
              title={item.title.romaji.length > 30 ? item.title.romaji.slice(0, 40) + " ..." : item.title.romaji}
              title2={item.title.native.length > 30 ? item.title.native.slice(0, 40) + " ..." : item.title.native}
              type={item.releaseDate}
              episodeNumber={`Episode ${item.totalEpisodes}`}
              status={item.status}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dub;
