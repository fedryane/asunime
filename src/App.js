import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Homepage,
  LatestPage,
  PopularPage,
  AnimeDetail,
  Watch,
  AnimeByGenre,
  MoviePage,
} from "./pages/index.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {/* Detail Anime Route */}
      <Route path="/anime/detail/:id" element={<AnimeDetail />} />

      {/* Latest Anime Route */}
      <Route path="/latest-update" element={<LatestPage />} />
      <Route path="/latest-update/:page" element={<LatestPage />} />

      {/* Dubbed Anime Route */}
      <Route path="/popular-anime" element={<PopularPage />} />
      <Route path="/popular-anime/:page" element={<PopularPage />} />

      {/* Play Anime Route */}
      <Route path="/watch/:id/:eps" element={<Watch />} />

      {/* Genre Anime Route */}
      <Route path="/genre/:id" element={<AnimeByGenre />} />
      <Route path="/genre/:id/:page" element={<AnimeByGenre />} />

      {/* Movie Anime Route */}
      <Route path="/movie" element={<MoviePage />} />
      <Route path="/movie/:page" element={<MoviePage />} />
    </Routes>
  );
};

export default App;
