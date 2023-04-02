import React from "react";

const LoadingComponent = () => {
  return (
    <div className="w-full flex justify-center items-center my-[200px]">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
    </div>
  );
};

export default LoadingComponent;
