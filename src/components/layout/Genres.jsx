import React, { useState } from "react";
import { GenresData } from "../../data/data";
import { useNavigate } from "react-router-dom";

const Genres = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const visibleGenres = show ? GenresData : GenresData.slice(0, 6);

  const handleShow = () => {
    setShow(!show);
  };

  const handleGenre = (genre) => {
    navigate(`/genre/${JSON.stringify(genre)}`);
  };

  return (
    <div className="w-full">
      <h1 className="text-[#EF547A] font-normal text-[17px] lg:text-[25px]">Genres</h1>
      <div className="bg-[#2a2c31] rounded-lg grid grid-cols-3 mt-5 p-1">
        {visibleGenres.map((genre, index) => (
          <div className="p-3 text-start" key={index}>
            <div
              onClick={() => {
                handleGenre([genre.name]);
              }}
              className={`text-start hover:bg-[#4A4B51] text-[9px] lg:text-[11px] 2xl:text-[15px] font-semibold px-2 py-1 rounded-md cursor-pointer`}
              style={{ color: genre.color }}
            >
              {genre.name.length > 9 ? genre.name.slice(0, 9) + "..." : genre.name}
            </div>
          </div>
        ))}

        <div className="col-span-3 p-3">
          <button className="text-white bg-[#3D3E44] px-5 py-2 w-full rounded-md hover:bg-[#616369]" onClick={handleShow}>
            {show ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Genres;
