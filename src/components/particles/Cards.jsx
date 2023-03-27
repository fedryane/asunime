import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

const Cards = ({ onClick, key, image, episodeNumber, title, rating, title2, type, year, status }) => {
  return (
    <div>
      <div key={key} onClick={onClick}>
        <div className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-t-lg">
          <img className="w-[330px] h-[180px] lg:w-[350px] lg:h-[250px] object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={image} alt="Latest Anime" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
          <div className="absolute inset-0 flex translate-y-[120%] flex-col items-center justify-center px-2 lg:px-9 text-center transition-all duration-500 group-hover:translate-y-0">
            <BsFillPlayFill className="text-[30px] text-white" />
          </div>
        </div>
        <div className="p-3 text-white bg-[#0C0B0B] rounded-b-lg w-full h-[105px] md:h-[110px] lg:h-[130px]">
          <div className="relative sm:mt-0 ">
            <p className="absolute top-[-180px] md:top-[-180px] lg:top-[-250px] xl:top-[-250px] right-0 px-1.5 py-1 rounded-lg text-[11px] bg-red-600">Score {rating === null ? "N/A" : rating}</p>
            <p className="absolute top-[-40px] left-0  px-1.5 py-1 rounded-lg text-[10px] bg-blue-500">SUB</p>
            <p className="absolute top-[-40px] right-0 px-1.5 py-1 rounded-lg text-[10px] text-black bg-white">{episodeNumber}</p>
            {/* <p className=" px-1.5 py-1.5 rounded-lg text-[10px] bg-red-500">{item.rating === null ? "N/A" : "Score " + item.rating}</p> */}
          </div>

          <p className="font-semibold text-[9px] sm:text-[12px] md:text-[12px] lg:text-[13px]">{title}</p>
          <p className="font-semibold text-[9px] sm:text-[12px] md:text-[12px] lg:text-[11px] text-gray-500">{title2}</p>
          <p className="font-semibold text-[9px] sm:text-[12px] md:text-[12px] lg:text-[11px] text-gray-500">{year}</p>

          <div className="flex flex-wrap items-center gap-4 text-[10px] lg:text-[13px] text-gray-500 ">
            <p>{type}</p>
            <p>{`•`}</p>
            <p>{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
