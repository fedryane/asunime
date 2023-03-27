import React from "react";
import { fetchTopAiring } from "../../config/FetchData";
import { useQuery } from "@tanstack/react-query";
import CardsTrending from "../particles/CardsTrending";
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

  console.log(trending);

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
            <>
              <CardsTrending image={anime.image} title={anime.title.romaji} title2={anime.title.english} status={anime.status} id={anime.id} placeholder={anime.image} />
            </>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Trending;
