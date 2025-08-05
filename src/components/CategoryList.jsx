import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../apis/categoryService";
import { setCurrentPage, setFilters } from "../features/productSlice";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Handle category click with Redux
  const handleCategoryClick = (categoryId) => {
    // Dispatch Redux actions to set the category filter and reset pagination
    dispatch(setFilters({ categoryId: categoryId }));
    dispatch(setCurrentPage(1));

    // Navigate to the products page.
    // The products page will automatically fetch data based on the new Redux state.
    navigate("/products");
  };

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;

  return (
    <section className="py-10 px-5 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-semibold text-left mb-8">
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)} // Use the new handler
            className="group text-center cursor-pointer transition-all duration-300"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-full border shadow-md overflow-hidden mx-auto transform transition-transform duration-300 group-hover:scale-105">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm md:text-base font-medium group-hover:underline group-hover:text-blue-600 transition-colors duration-200">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
