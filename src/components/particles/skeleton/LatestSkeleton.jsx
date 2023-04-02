import React from "react";
import TrendingSkeleton from "./TrendingSkeleton";

const LatestSkeleton = () => {
  return (
    <div className="w-full ">
      <div role="status" className="rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-20 lg:w-32 mb-2.5"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-16 lg:w-24"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
          <TrendingSkeleton />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LatestSkeleton;
