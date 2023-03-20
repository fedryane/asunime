import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage, LatestPage, DubPage, AnimeDetail, Watch } from "./pages/index.js";

// const Homepage = lazy(() => import("./pages/index.js"));

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
      <Route path="/watch/:id/:eps" element={<Watch />} />
    </Routes>
  );
};

export default App;
