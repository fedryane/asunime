import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Link, useNavigate } from "react-router-dom";

// API Call
import { fetchSearch } from "../../config/FetchData";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    debounced(e.target.value);
  };

  const debounced = useDebouncedCallback((value) => {
    setSearch(value);
  }, 1000);

  const handleNavigate = (id) => {
    navigate(`/anime/detail/${id}`);
    window.location.reload();
    setSearch("");
  };

  useEffect(() => {
    if (search === "") {
      setSearchResult([]);
    } else {
      const handlingSearch = async () => {
        const res = await fetchSearch(search, 1);
        setSearchResult(res.results);
      };
      handlingSearch();
    }
  }, [search]);

  return (
    <div className="p-0 lg:p-4 ">
      <label htmlFor="table-search" className=""></label>
      <div className="relative mt-1 ">
        <button className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
          </svg>
        </button>
        <input
          type="text"
          id="table-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search anime"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      {searchResult.length > 0 && (
        <div className="relative z-40">
          <div className="absolute bg-white text-black w-[200px] h-[200px] opacity-80 mt-2 rounded-lg p-3 overflow-y-auto cursor-pointer scrollbar-hide">
            {searchResult.map((item, index) => {
              return (
                <button onClick={() => handleNavigate(item.id)} to={`/anime/detail/${item.id}`} className="flex gap-2 hover:bg-slate-200" key={index}>
                  <img src={item?.image} alt="" className="w-10 rounded-lg mt-2" />
                  <p className="text-[13px] mt-2">{item?.title?.romaji?.length > 25 ? item?.title?.romaji?.slice(0, 50) + " ..." : item.title.romaji}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
