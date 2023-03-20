import React from "react";

const LoadingComponent = () => {
  return (
    // <div className="w-full transform translate-x-1/2 translate-y-1/2">
    <div className="w-full flex justify-center items-center my-[300px]">
      <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-32 w-32 mb-20"></div>
    </div>
  );
};

export default LoadingComponent;
