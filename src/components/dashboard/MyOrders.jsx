import React from 'react';
import { useSelector } from 'react-redux';
import { FaMapMarkerAlt, FaCreditCard, FaRegClock, FaDollarSign } from 'react-icons/fa';

const MyOrdersPage = () => {
  const { orders } = useSelector((state) => state.order);

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-lightColor-100 dark:bg-grayshade-500 rounded-xl text-center text-lg text-gray-500">
        <p className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">No orders placed yet.</p>
      </div>
    );
  }

  // Calculate the total number of orders
  const orderCount = orders.length;

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-150px)] overflow-y-auto pr-1 custom-scrollbar">
      <div className="flex justify-between items-center mb-6 border-b-2 border-gray-300 dark:border-gray-700 pb-2">
        <h1 className="text-3xl font-extrabold text-ebay-blue dark:text-white">
          Your Orders
        </h1>
        <div className="bg-ebay-blue dark:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
          <span className="text-sm">Total Orders: </span>
          <span className="text-xl">{orderCount}</span>
        </div>
      </div>

      <div className="space-y-8">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white dark:bg-grayshade-400 rounded-xl p-6 shadow-xl space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Order ID: <span className="text-ebay-blue">{order.id || `#${index + 1}`}</span>
            </h2>

            {/* Scrollable items list */}
            <div className="max-h-80 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-lightColor-200 dark:bg-grayshade-500 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-base text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-ebay-blue dark:text-green-400">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      ${item.price.toLocaleString()} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-300 dark:border-gray-600">
              <span className="text-lg font-semibold text-gray-800 dark:text-white">Total:</span>
              <span className="text-xl font-bold text-ebay-blue dark:text-green-400">
                ${order.totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-300 dark:border-gray-600">
              {/* Shipping */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-800 dark:text-white font-semibold text-lg">
                  <FaMapMarkerAlt />
                  <h3>Shipping Address</h3>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              {/* Payment + Date */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-800 dark:text-white font-semibold text-lg">
                  <FaCreditCard />
                  <h3>Payment Details</h3>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p className="flex items-center">
                    <FaDollarSign className="mr-2" />
                    Method: {order.paymentMethod}
                  </p>
                  <p className="flex items-center">
                    <FaRegClock className="mr-2" />
                    Placed On: {new Date(order.date || order.placedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;