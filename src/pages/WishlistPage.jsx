// src/pages/WishlistPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { BsCartPlusFill } from "react-icons/bs";
import {
  removeFromWishlist,
  loadUserWishlist,
} from "../features/wishlistSlice";
import { addToCart } from "../features/cartSlice";
import NoDataFound from "../components/common/Nodata";

function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const userId = useSelector((state) => state.auth.user?.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Load the user's wishlist from localStorage when the component mounts
  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(loadUserWishlist(userId));
    }
  }, [isAuthenticated, userId, dispatch]);

  const handleRemoveFromWishlist = (productId, productTitle) => {
    if (!isAuthenticated || !userId) {
      toast.error("You must be logged in to manage your wishlist.");
      navigate("/login");
      return;
    }
    dispatch(removeFromWishlist({ productId, userId }));
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated || !userId) {
      toast.error("You must be logged in to add items to your cart.");
      navigate("/login");
      return;
    }
    // Add to cart
    dispatch(addToCart(product));
    
    // Remove the item from the wishlist after adding it to the cart
    dispatch(removeFromWishlist({ productId: product.id, userId }));
  };

  return (
    <div className="wrapper py-10 px-5 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-purpleshade-400 dark:text-purpleshade-300">
        Your Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <NoDataFound
          message="Your wishlist is empty. Start adding some products you love!"
          linkText="Browse Products"
          linkTo="/products"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row items-center bg-zinc-100 dark:bg-grayshade-400 border border-grayshade-300 rounded-xl p-4 shadow-sm"
            >
              <Link
                to={`/products/${product.id}`}
                className="flex-shrink-0 mr-4"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </Link>
              <div className="flex-grow text-center sm:text-left mt-4 sm:mt-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Category: {product.category.name}
                </p>
                <p className="font-bold text-gray-900 dark:text-white mt-1">
                  Price: ${product.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center mt-4 sm:mt-0 sm:ml-auto space-x-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                  aria-label="Add to cart"
                >
                  <BsCartPlusFill size={18} />
                </button>
                <button
                  onClick={() =>
                    handleRemoveFromWishlist(product.id, product.title)
                  }
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  aria-label="Remove item"
                >
                  <MdDelete size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;