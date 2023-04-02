import React from "react";
import ReactPaginate from "react-paginate";

const Paginate = ({ onPageChange, pageCount }) => {
  return (
    <div className="text-white mt-5">
      <ReactPaginate
        previousLabel={
          <span className="flex items-center  text-gray-300 hover:text-indigo-700 cursor-pointer">
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <button className="hidden lg:block text-sm lg:text-lg ml-3 font-medium leading-none ">Previous</button>
          </span>
        }
        nextLabel={
          <span className="flex items-center  text-gray-300 hover:text-indigo-700 cursor-pointer">
            <button className="hidden lg:block text-sm lg:text-lg font-medium leading-none mr-1">Next</button>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        }
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        containerClassName="flex items-center justify-between border-t border-gray-600"
        pageClassName="text-sm lg:text-lg font-medium leading-none cursor-pointer text-gray-300 hover:text-indigo-700 border-y border-transparent hover:border-indigo-400 py-3 px-1 lg:px-5"
        activeClassName="text-indigo-700 border-t border-indigo-400 border-transparent"
      />
    </div>
  );
};

export default Paginate;
