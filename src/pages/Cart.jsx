// src/pages/CartPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/cartSlice";
import NoDataFound from "../components/common/Nodata";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    toast.success(`${title} removed from cart!`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared successfully!");
  };

   const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    // Changed navigation to the new OrderSummaryPage (or CheckoutPage)
    navigate("/checkout"); // Or "/order-summary" if that's your route
    toast("Redirecting to checkout...", { icon: '🛒' }); // Optional: provide user feedback
  };


  return (
    <div className="wrapper py-10 px-5 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-purpleshade-400 dark:text-purpleshade-300">
         Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <NoDataFound
          message="Your cart is empty. Start shopping now!"
          linkText="Browse Products"
          linkTo="/products"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center bg-zinc-100 dark:bg-grayshade-400 border border-grayshade-300 rounded-xl p-4 shadow-sm"
              >
                <Link
                  to={`/products/${item.id}`}
                  className="flex-shrink-0 mr-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-grow text-center sm:text-left mt-4 sm:mt-0">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Price: ${item.price.toLocaleString()}
                  </p>
                  <p className="font-bold text-gray-900 dark:text-white mt-1">
                    Total: $
                    {(
                      item.totalPrice || item.price * item.quantity
                    ).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center mt-4 sm:mt-0 sm:ml-auto space-x-2">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus size={14} />
                  </button>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FaPlus size={14} />
                  </button>
                  <button
                    onClick={() => handleRemove(item.id, item.title)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors ml-4"
                    aria-label="Remove item"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-zinc-100 dark:bg-grayshade-400 border border-grayshade-300 rounded-xl p-6 shadow-lg h-max">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-lg">Total Items:</p>
                <p className="text-xl font-semibold">{totalQuantity}</p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-300 dark:border-gray-600 pt-4">
                <p className="text-xl font-bold">Total Amount:</p>
                <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-4 mt-8">
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 shadow-md"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleClearCart}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 shadow-md"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
