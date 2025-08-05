import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../apis/categoryService";
import { setCurrentPage, setFilters } from "../features/productSlice";

function CategoryFilter() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  // Get the categoryId from the Redux store
  const { categoryId } = useSelector((state) => state.products.filters);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;

    // Dispatch the setFilters action to update the categoryId in the store
    dispatch(setFilters({ categoryId: selectedCategoryId }));

    // Reset to the first page when the category changes
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="w-full md:max-w-xs lg:max-w-sm">
      {" "}
      <select
        onChange={handleCategoryChange}
        value={categoryId}
        className="
          block w-full p-3 text-sm rounded-lg border
          focus:ring-2 focus:outline-none
          bg-white dark:bg-ebay-dark-card
          text-gray-900 dark:text-ebay-dark-text
          border-gray-300 dark:border-gray-600
          focus:ring-ebay-blue focus:border-ebay-blue
        "
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
