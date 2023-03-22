import React, { lazy, Suspense } from "react";
import Navbar2 from "../components/common/Navbar2";
// import { AnimeDetails } from "../components/layout";

const AnimeDetails = lazy(() => import("../components/layout/AnimeDetails"));

const AnimeDetail = () => {
  return (
    <div>
      <Navbar2 />
      <Suspense fallback={<div>Loading...</div>}>
        <AnimeDetails />
      </Suspense>
    </div>
  );
};

export default AnimeDetail;
