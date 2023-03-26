import React from "react";
import Navbar from "./Navbar";
import { BsDisplayFill, BsCalendarDateFill, BsPlayCircleFill, BsFillExclamationCircleFill, BsChevronRight } from "react-icons/bs";
import { Hero } from "../../data/data";
import { Link } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

const Header = () => {
  return (
    <div className="w-full h-[300px] lg:h-[450px]">
      <div className="relative w-full h-full bg-cover bg-center bg-no-repeat">
        <div className="absolute top-0 left-0 w-full h-full z-[0]">
          <Swiper
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1,
              },
            }}
            modules={[Pagination, Autoplay]}
          >
            {Hero.map((item, index) => (
              <SwiperSlide className="relative" key={index}>
                <img src={item.image} alt="spotlight-anime" className="w-full h-[300px] lg:h-[450px] object-center object-cover opacity-[0.4] brightness-50" />
                <div className="absolute bottom-0 left-5 lg:left-10 z-10">
                  <h1 className="font-bold text-[12px] lg:text-[20px] text-[#d64663]">#{item.id} Spotlight</h1>
                  <h1 className="text-[15px] md:text-xl lg:text-4xl text-white font-bold mt-3">{item.title}</h1>
                  <div className="flex-wrap mt-3 gap-5 items-center hidden lg:flex">
                    <div className="flex items-center gap-3">
                      <BsDisplayFill className="text-[10px] md:text-sm lg:text-base text-white" />
                      <p className="text-white font-bold">{item.type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <BsCalendarDateFill className="text-[10px] md:text-sm lg:text-base text-white" />
                      <p className="text-white font-bold">{item.date}</p>
                    </div>
                  </div>
                  <div className="my-3 lg:my-5">
                    <p className="hidden lg:block text-[10px] md:text-sm lg:text-base text-white w-[30%]">{item.details.length > 200 ? item.details.slice(0, 300) + " ..." : item.details}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex gap-3 items-center bg-[#EF547A] hover:shadow-lg text-white text-[11px] lg:text-base font-bold py-2 px-4 rounded-full">
                      <BsPlayCircleFill />
                      <button className="">Watch Now</button>
                    </div>
                    <Link to={`/anime/detail/${item.anilistId}`} className="flex gap-3 items-center bg-[#4A4B51] hover:shadow-lg text-white text-[11px] lg:text-base font-bold py-2 px-4 rounded-full">
                      <BsFillExclamationCircleFill />
                      <button className="">
                        <p>More Details</p>
                      </button>
                      <BsChevronRight className="font-semibold" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
