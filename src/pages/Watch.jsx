import React from "react";
import Navbar2 from "../components/common/Navbar2";
import { WatchAnime, Latest, Genres, TopAiring } from "../components/layout";

const Watch = () => {
  return (
    <div>
      <Navbar2 />
      <WatchAnime />
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5 px-5 lg:px-10 my-10">
        <div className="w-[100%] lg:w-[75%]">
          <Latest />
        </div>
        <div className="w-[100%] lg:w-[25%]">
          <Genres />
          <TopAiring />
        </div>
      </div>
    </div>
  );
};

export default Watch;
