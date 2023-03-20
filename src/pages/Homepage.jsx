import React from "react";
import Header from "../components/common/Header";
import { Trending, Latest, Genres, TopAiring, Dub } from "../components/layout";


const Homepage = () => {
  return (
    <div>
      <Header />
      <Trending />

      <div className="flex flex-col lg:flex-row justify-between items-start gap-5 px-5 lg:px-10 my-10">
        <div className="w-[100%] lg:w-[75%]">
          <Latest />
          <div className="mt-10">
            <Dub />
          </div>
        </div>
        <div className="w-[100%] lg:w-[25%]">
          <Genres />
          <TopAiring />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
