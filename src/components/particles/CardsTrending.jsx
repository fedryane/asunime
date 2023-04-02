import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";


const CardsTrending = ({ image, title, title2, status, id, placeholder }) => {
  return (
    <div className="group relative cursor-pointer items-center h-[250px] w-[170px] lg:h-[320px] lg:w-[240px] overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-lg ">
      <LazyLoadImage
        className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-150"
        src={image}
        alt="Trending Anime"
        loading="lazy"
        placeholderSrc={placeholder}
        effect={`blur`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 flex translate-y-[120%] lg:translate-y-[45%] flex-col items-center justify-center px-2 lg:px-2 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className="font-dmserif text-[10px] font-bold text-white">{title}</h1>
        <h1 className="font-dmserif text-[10px] font-bold text-gray-400 italic">{title2}</h1>

        <p
          className={`${
            status === "Completed" ? "text-yellow-400" : status === "Ongoing" ? "text-blue-300" : "text-white"
          } hidden lg:block mb-3 text-[10px] font-bold mt-2 italic  opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        >
          {status}
        </p>

        <p className="block lg:hidden mb-3 text-[10px] font-bold text-red-400 italic  opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:underline hover:text-blue-500">
          <Link to={`/anime/detail/${id}`}>Watch Now</Link>
        </p>

        <button className="hidden lg:block rounded-full bg-neutral-900 py-2 px-2 lg:px-3.5 font-com text-[10px] lg:text-sm capitalize text-white shadow shadow-black/60 hover:bg-red-400">
          <Link to={`/anime/detail/${id}`}>See More</Link>
        </button>
      </div>
    </div>
  );
};

export default CardsTrending;
