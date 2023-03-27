import React from "react";
import { fetchTopAiring } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "../particles/LoadingComponent";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

const Trending = () => {
  const {
    data: trending,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useQuery({
    queryKey: ["populars"],
    queryFn: () => fetchTopAiring(1, 20),
    keepPreviousData: true,
  });

  if (isPopularLoading) return <Loader />;
  if (isPopularError) return <h1>Error...</h1>;

  return (
    <div className="w-full px-5 lg:px-10 mt-5 ">
      <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Trending Anime</h1>

      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        centeredSlides={false}
        breakpoints={{
          490: {
            slidesPerView: 3,
            spaceBetween: 80,
            // centeredSlides: false,
          },
          503: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
          550: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1240: {
            slidesPerView: 5,
            spaceBetween: 30,
            centeredSlides: false,
          },
          1490: {
            slidesPerView: 6,
            spaceBetween: 20,
            centeredSlides: false,
          },
          1800: {
            slidesPerView: 7,
            spaceBetween: 20,
            centeredSlides: false,
            loop: true,
          },
        }}
        modules={[Pagination, Autoplay]}
        // style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" }}
        className=" overflow-hidden p-0 block relative z-[-10] my-5"
      >
        {trending.results.map((anime, index) => (
          <SwiperSlide className="" key={index}>
            <div className="group relative cursor-pointer items-center h-[250px] w-[170px] lg:h-[320px] lg:w-[240px] overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-lg ">
              <img className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-150" src={anime.image} alt="Trending Anime" />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
              <div className="absolute inset-0 flex translate-y-[120%] lg:translate-y-[45%] flex-col items-center justify-center px-2 lg:px-2 text-center transition-all duration-500 group-hover:translate-y-0">
                <h1 className="font-dmserif text-[10px] font-bold text-white">{anime.title.romaji}</h1>
                <h1 className="font-dmserif text-[10px] font-bold text-gray-400 italic">{anime.title.english}</h1>

                <p
                  className={`${
                    anime.status === "Completed" ? "text-yellow-400" : anime.status === "Ongoing" ? "text-blue-300" : "text-white"
                  } hidden lg:block mb-3 text-[10px] font-bold mt-2 italic  opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                >
                  {anime.status}
                </p>

                <p className="block lg:hidden mb-3 text-[10px] font-bold text-red-400 italic  opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:underline hover:text-blue-500">
                  <Link to={`/anime/detail/${anime.id}`}>Watch Now</Link>
                </p>

                <button className="hidden lg:block rounded-full bg-neutral-900 py-2 px-2 lg:px-3.5 font-com text-[10px] lg:text-sm capitalize text-white shadow shadow-black/60 hover:bg-red-400">
                  <Link to={`/anime/detail/${anime.id}`}>See More</Link>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Trending;
