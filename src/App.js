import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage, LatestPage, DubPage, AnimeDetail, Watch, Watchs } from "./pages/index.js";

// const Homepage = lazy(() => import("./pages/Homepage"));
// const LatestPage = lazy(() => import("./pages/LatestPage"));
// const DubPage = lazy(() => import("./pages/DubPage"));
// const AnimeDetail = lazy(() => import("./pages/AnimeDetail"));
// const Watch = lazy(() => import("./pages/Watch"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/anime/detail/:id" element={<AnimeDetail />} />

      {/* Latest Anime Route */}
      <Route path="/latest-update" element={<LatestPage />} />
      <Route path="/latest-update/:page" element={<LatestPage />} />

      {/* Dubbed Anime Route */}
      <Route path="/dub-anime" element={<DubPage />} />

      {/* Play Anime Route */}
      <Route path="/latest-watch/:id/:eps" element={<Watch />} />

      <Route path="/watch-now/:id/:epsId" element={<Watchs />} />
    </Routes>
  );
};

export default App;

// <Suspense fallback={<div>Loading...</div>}>
//       </Suspense>
