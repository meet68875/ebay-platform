import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlistSlice";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; // Using FaHeart from react-icons for a filled heart

function Product({ productData }) {
  const {
    id,
    title,
    price,
    images: [image],
    category: { name: category },
    description,
  } = productData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const wishlistItems = useSelector((state) => state?.wishlist?.items || []);
  const isProductInWishlist = wishlistItems.some((item) => item.id === id);
  const userId = useSelector((state) => state.auth.user?.id);

  const handleAddToWishlist = () => {
    if (!isAuthenticated || !userId) {
      toast.error("Please log in to add items to your wishlist.");
      navigate("/login");
      return;
    }
    if (isProductInWishlist) {
      dispatch(removeFromWishlist({ productId: id, userId }));
    } else {
      dispatch(addToWishlist({ product: productData, userId }));
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    dispatch(addToCart(productData));
    toast.success(`${title} added to cart!`);
  };

  const shortDescription =
    description.length > 100 ? description.slice(0, 100) + "..." : description;

  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-600 rounded-xl dark:bg-gray-800 shadow-lg transition-transform transform hover:scale-105 duration-300 relative">
      {/* Wishlist Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleAddToWishlist}
          className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-md transition-transform transform hover:scale-110"
          aria-label="Add to wishlist"
        >
          {isProductInWishlist ? (
            <FaHeart className="h-6 w-6 text-red-500" />
          ) : (
            <CiHeart className="h-6 w-6 text-gray-400" />
          )}
        </button>
      </div>

      {/* Product Image */}
      <Link to={`/products/${id}`} className="block overflow-hidden rounded-t-xl">
        <img
          className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
          src={image}
          alt={title}
        />
      </Link>

      {/* Product Details */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="mb-4">
          <Link to={`/products/${id}`}>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white hover:text-purple-600">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {shortDescription}
            {description.length > 100 && (
              <Link
                to={`/products/${id}`}
                className="ml-1 text-blue-500 hover:underline"
              >
                Read more
              </Link>
            )}
          </p>
          <span className="inline-block bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-100 text-xs font-medium px-2 py-1 rounded">
            {category}
          </span>
        </div>

        {/* Price and Add to Cart Button */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
            <p className="font-bold text-xl text-gray-900 dark:text-white">
              ${price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-300 shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;