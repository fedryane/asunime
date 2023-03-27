import React from "react";
import Header from "../components/common/Header";
import { Trending, Latest, Genres, Upcoming, Popular } from "../components/layout";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Trending />

      <div className="flex flex-col lg:flex-row justify-between items-start gap-5 px-5 lg:px-10 my-10">
        <div className="w-[100%] lg:w-[75%]">
          <Latest />
          <div className="mt-10">
            <Popular />
          </div>
        </div>
        <div className="w-[100%] lg:w-[25%]">
          <Genres />
          <Upcoming />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
