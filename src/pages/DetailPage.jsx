import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../apis/product";
import ImageSlider from "../components/ImageSlider";
import { IoIosArrowBack } from "react-icons/io";
import { Triangle } from "react-loader-spinner";
import AddToCart from "../components/AddToCart"; // Assuming you have this component now

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Triangle
          visible
          height="200"
          width="200"
          color="#703BF7"
          ariaLabel="triangle-loading"
        />
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-10 text-lg">Product not found.</p>;
  }

  return (
    <div className="wrapper py-10 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          className="inline-flex items-center text-sm md:text-base text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          to={"/products"}
        >
          <IoIosArrowBack className="mr-2" />
          Back to Products
        </Link>
      </div>

      {/* Main Product Detail Card */}
      <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-8 lg:p-10 gap-8 lg:gap-12 shadow-lg">
        {/* Image Slider Section */}
        <div className="lg:w-1/2 flex justify-center items-start">
          <div className="w-full max-w-md lg:max-w-none">
            <ImageSlider
              imageList={product.images}
              setImgIndex={setImgIndex}
              imgIndex={imgIndex}
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              {product.title}
            </h1>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-purple-600 bg-purple-100 dark:text-purple-300 dark:bg-purple-800">
              {product.category.name}
            </span>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 my-6">
              {product.description}
            </p>
          </div>

          {/* Price and Add to Cart Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">Price</p>
              <p className="font-bold text-gray-900 dark:text-white text-3xl">
                ${product.price.toLocaleString()}
              </p>
            </div>
            <AddToCart
              product={product}
            />
          </div>
        </div>
      </div>
    </div>
  );
}