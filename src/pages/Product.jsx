import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import { Triangle } from "react-loader-spinner";
import Search from "../components/Search";
import CategoryFilter from "../components/FilterCategory";
import Pagination from "../components/Pagination";
import {
  fetchProductsAsync,
  setCurrentPage,
  setFilters,
} from "../features/productSlice";
import ProductFilter from "../components/FilterCategory";
import FilterCategory from "../components/FilterCategory";

function Products() {
  const dispatch = useDispatch();

  const { products, loading, error, totalCount, filters, pagination } =
    useSelector((state) => state.products);
  const { currentPage, limit } = pagination;
  const offset = (currentPage - 1) * limit;
  useEffect(() => {
    dispatch(
      fetchProductsAsync({
        url: "/products",
        offset,
        limit,
        filters,
      })
    );
  }, [dispatch, offset, limit, filters]);
  const handleSearch = (newSearch) => {
    dispatch(setFilters({ search: newSearch }));
    dispatch(setCurrentPage(1));
  };

  const handleCategoryChange = (newCategoryId) => {
    dispatch(setFilters({ categoryId: newCategoryId }));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="wrapper py-10 px-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <FilterCategory query={filters} setQuery={handleCategoryChange} />
        <Search query={filters} setQuery={handleSearch} />
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-auto">
          {loading ? (
            <div className="w-full col-span-full flex justify-center py-20">
              <Triangle
                visible
                height="200"
                width="200"
                color="#703BF7"
                ariaLabel="triangle-loading"
              />
            </div>
          ) : error ? (
            <p className="text-center col-span-full text-lg text-red-500 py-20">
              Error: {error}
            </p>
          ) : products.length === 0 ? (
            <p className="text-center col-span-full text-lg text-gray-500 py-20">
              No Products Found
            </p>
          ) : (
            products.map((product) => (
              <Product key={product.id} productData={product} />
            ))
          )}
        </div>
      </div>

      {!loading && totalCount > limit && (
        <div className="flex justify-center mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / limit)}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </div>
      )}
    </div>
  );
}

export default Products;
