import React from "react";
import Navbar2 from "../components/common/Navbar2";
import { Latest, Genres, Upcoming } from "../components/layout";

const LatestPage = () => {
  return (
    <div>
      <Navbar2 />
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5 px-5 lg:px-10 my-10">
        <div className="w-[100%] lg:w-[75%] rounded-lg shadow-md border border-[#2A2C31]  p-3 md:p-7">
          <Latest />
        </div>
        <div className="w-[100%] lg:w-[25%] rounded-lg shadow-md border border-[#2A2C31]  p-3 md:p-7">
          <Genres />
          <Upcoming />
        </div>
      </div>
    </div>
  );
};

export default LatestPage;
