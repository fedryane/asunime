export default function Pagination({ nextPage, prevPage, disabledNext, disabledPrev, currentPage }) {
  return (
    <div className="grid grid-cols-1 justify-center">
      <div className="mt-10 mb-10 lg:mb-0 w-full text-white flex items-center justify-between border-t border-gray-600">
        <div className="flex items-center pt-3 text-gray-300 hover:text-indigo-700 cursor-pointer">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <button className="text-sm ml-3 font-medium leading-none text-gray-300 hover:text-indigo-700" onClick={prevPage}>
            Previous
          </button>
        </div>
        <div className="sm:flex ">
          <p className="text-lg  font-medium leading-none cursor-pointer text-gray-300 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">{currentPage}</p>
        </div>
        <div className="flex items-center pt-3 text-gray-300 hover:text-indigo-700 cursor-pointer">
          <button className="text-sm font-medium leading-none mr-3 text-gray-300 hover:text-indigo-700" onClick={nextPage}>
            Next
          </button>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
