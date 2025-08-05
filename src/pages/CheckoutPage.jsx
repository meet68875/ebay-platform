/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/OrderSummaryPage.jsx (or CheckoutPage.jsx)
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { clearCart } from "../features/cartSlice";
import { addOrder } from "../features/orderSlice";

function OrderSummaryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );
  // Assuming you have user info in auth slice for pre-filling address
  const { user } = useSelector((state) => state.auth);
  const {
    loading: orderLoading,
    success: orderSuccess,
    error: orderError,
  } = useSelector((state) => state.order);

  const [shippingAddress, setShippingAddress] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
    country: user?.address?.country || "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");

  useEffect(() => {
    if (cartItems.length === 0 && !orderSuccess) {
      toast.error(
        "Your cart is empty. Please add items to proceed to checkout."
      );
      navigate("/cart");
    }
  }, [cartItems, navigate, orderSuccess]);

  // New validation function
  const validateAddress = () => {
    const { street, city, state, zipCode, country } = shippingAddress;
    if (!street.trim() || !city.trim() || !state.trim() || !zipCode.trim() || !country.trim()) {
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!validateAddress()) {
      toast.error("Please fill in all shipping address fields.");
      return;
    }

    const orderData = {
      items: cartItems,
      totalAmount,
      totalQuantity,
      shippingAddress,
      paymentMethod,
      placedAt: new Date().toISOString(), // Optional: for timestamp
    };

    // Assuming addOrder is a thunk that handles the API call
    dispatch(addOrder(orderData));
    
    // The navigation and toast should only happen on a successful order
    // In a real app, this logic would be inside an useEffect that watches for `orderSuccess`
    // For this example, we'll keep it here for simplicity
    dispatch(clearCart());
    toast.success("Order placed successfully!");
    navigate("/dashboard/my-orders");
  };

  return (
    <div className="wrapper py-10 px-5 max-w-7xl mx-auto min-h-[calc(100vh-8rem)]">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-ebay-blue dark:text-ebay-blue">
        Order Summary
      </h1>

      {cartItems.length === 0 && !orderSuccess ? (
        <div className="text-center py-20 bg-ebay-light-gray dark:bg-grayshade-400 rounded-xl shadow-lg">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            No items to summarize.
          </p>
          <Link
            to="/products"
            className="inline-block bg-ebay-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-ebay-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700 dark:text-ebay-dark-text mb-1"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    value={shippingAddress.street}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        street: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-ebay-blue focus:border-ebay-blue dark:bg-gray-700 dark:text-white"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 dark:text-ebay-dark-text mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-ebay-blue focus:border-ebay-blue dark:bg-gray-700 dark:text-white"
                    placeholder="City Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 dark:text-ebay-dark-text mb-1"
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={shippingAddress.state}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        state: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-ebay-blue focus:border-ebay-blue dark:bg-gray-700 dark:text-white"
                    placeholder="State Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 dark:text-ebay-dark-text mb-1"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        zipCode: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-ebay-blue focus:border-ebay-blue dark:bg-gray-700 dark:text-white"
                    placeholder="12345"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 dark:text-ebay-dark-text mb-1"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-ebay-blue focus:border-ebay-blue dark:bg-gray-700 dark:text-white"
                    placeholder="India"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white dark:bg-ebay-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center text-gray-700 dark:text-ebay-dark-text cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={paymentMethod === "cash_on_delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio h-4 w-4 text-ebay-blue border-gray-300 focus:ring-ebay-blue dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-ebay-blue"
                  />
                  <span className="ml-2 text-lg">Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center text-gray-700 dark:text-ebay-dark-text cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card_payment"
                    checked={paymentMethod === "card_payment"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio h-4 w-4 text-ebay-blue border-gray-300 focus:ring-ebay-blue dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-ebay-blue"
                    disabled // Disable for now as full integration is complex
                  />
                  <span className="ml-2 text-lg">
                    Pay with Card (Stripe/Razorpay - Coming Soon)
                  </span>
                </label>
              </div>
            </div>

            {/* Items Review Section */}
            <div className="bg-white dark:bg-ebay-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Items in Order
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0 mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        ${item.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Column (Right/Bottom) */}
          <div className="lg:col-span-1 bg-white dark:bg-ebay-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg h-max sticky top-5">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-lg">Subtotal ({totalQuantity} items):</p>
                <p className="text-xl font-semibold">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg">Shipping:</p>
                <p className="text-xl font-semibold">Free</p>{" "}
                {/* Example: You might add logic for shipping cost */}
              </div>
              <div className="flex justify-between items-center border-t border-gray-300 dark:border-gray-600 pt-4">
                <p className="text-xl font-bold">Total Payable:</p>
                <p className="text-2xl font-extrabold text-ebay-blue dark:text-ebay-blue">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={handlePlaceOrder}
                disabled={orderLoading || cartItems.length === 0}
                className={`
                  w-full flex justify-center items-center px-4 py-3 border border-transparent
                  rounded-lg shadow-sm text-lg font-semibold text-white
                  ${
                    orderLoading || cartItems.length === 0
                      ? "bg-ebay-blue/70 cursor-not-allowed" // Lighter blue for disabled
                      : "bg-ebay-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ebay-blue"
                  }
                  transition-colors duration-200
                `}
              >
                {orderLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Placing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummaryPage;