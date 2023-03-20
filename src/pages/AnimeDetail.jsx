import React from "react";
import Navbar2 from "../components/common/Navbar2";
import { AnimeDetails, Latest, Genres, TopAiring } from "../components/layout";

const AnimeDetail = () => {
  return (
    <div>
      <Navbar2 />
      <AnimeDetails />
    </div>
  );
};

export default AnimeDetail;
