import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { setCurrentPage, setFilters } from "../features/productSlice";

function Search() {
  const dispatch = useDispatch();

  const { search: reduxSearchQuery } = useSelector((state) => state.products.filters);

  const [searchString, setSearchString] = useState(reduxSearchQuery || "");

  useEffect(() => {
    // Sync internal state with Redux state if it changes externally
    setSearchString(reduxSearchQuery);
  }, [reduxSearchQuery]);

  const searchDataHandler = (e) => {
    setSearchString(e.target.value);
  };

  const searchHandler = () => {
    const trimmed = searchString.trim();
    // Only dispatch if the search string has actually changed
    if (trimmed !== reduxSearchQuery) {
      dispatch(setFilters({ search: trimmed }));
      dispatch(setCurrentPage(1));
    }
  };

  return (
    // Max width adjusted for better visual balance in a row with CategoryFilter
    // Consider if you want this to take full width on small screens
    <div className="w-full md:max-w-md lg:max-w-lg"> {/* Adjusted max-width */}
      <div className="relative">
        <input
          type="text"
          value={searchString}
          onChange={searchDataHandler}
          onKeyDown={(e) => e.key === "Enter" && searchHandler()}
          placeholder="Search products..."
          className="
            w-full py-3 px-4 pr-12 text-sm rounded-lg border
            focus:outline-none focus:ring-2
            text-gray-900 dark:text-ebay-dark-text
            bg-white dark:bg-ebay-dark-card
            border-gray-300 dark:border-gray-600
            focus:ring-ebay-blue focus:border-ebay-blue
            dark:placeholder-gray-400
          "
        />
        <button
          onClick={searchHandler}
          className="
            absolute inset-y-0 right-0 flex items-center justify-center px-3
            text-white bg-ebay-blue rounded-r-lg
            hover:bg-blue-700 transition-colors duration-200
          "
        >
          <CiSearch className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Search;