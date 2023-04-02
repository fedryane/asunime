import React from "react";
import { fetchTopAiring } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";
import CardsTrending from "../particles/CardsTrending";
import TrendingSkeleton from "../particles/skeleton/TrendingSkeleton";

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

  if (isPopularLoading)
    return (
      <>
        <div className="flex lg:hidden gap-5 w-full items-center justify-between px-0">
          <TrendingSkeleton />
          <TrendingSkeleton />
        </div>
        <div className="hidden lg:flex gap-5 w-full items-center justify-between px-0">
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
        </div>
      </>
    );

  if (isPopularError) return <h1>Error...</h1>;

  return (
    <>
      <div className="w-full px-5 lg:px-10 mt-5">
        <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Trending Anime</h1>

        <Swiper
          slidesPerView={2}
          spaceBetween={50}
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
            361: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            420: {
              slidesPerView: 3,
              spaceBetween: 150,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 80,
            },
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
            645: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            888: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1240: {
              slidesPerView: 5,
              spaceBetween: 10,
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
          className=" overflow-hidden p-0 block relative z-[-10] my-5"
        >
          {trending.results.map((anime, index) => (
            <SwiperSlide className="" key={index}>
              <>
                <CardsTrending image={anime.image} title={anime.title.romaji} title2={anime.title.english} status={anime.status} id={anime.id} placeholder={anime.image} />
              </>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Trending;
