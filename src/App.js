import React from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage, LatestPage, PopularPage, AnimeDetail, Watch, Watchs, AnimeByGenre } from "./pages/index.js";

// const Homepage = lazy(() => import("./pages/Homepage"));
// const LatestPage = lazy(() => import("./pages/LatestPage"));
// const PopularPage = lazy(() => import("./pages/PopularPage"));
// const AnimeDetail = lazy(() => import("./pages/AnimeDetail"));
// const Watch = lazy(() => import("./pages/Watch"));

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
      <Route path="/dub-anime" element={<PopularPage />} />

      {/* Play Anime Route */}
      <Route path="/watch/:id/:eps" element={<Watch />} />
      <Route path="/watch-now/:id/:epsId" element={<Watchs />} />

      {/* Genre Anime Route */}
      <Route path="/genre/:id" element={<AnimeByGenre />} />
      <Route path="/genre/:id/:page" element={<AnimeByGenre />} />
    </Routes>
  );
};

export default App;

// <Suspense fallback={<div>Loading...</div>}>
//       </Suspense>
