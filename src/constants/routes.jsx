// src/routes.jsx
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Product";
import WishlistPage from "../pages/WishlistPage";
import AboutUs from "../pages/AboutUs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/Cart";
import MyOrders from "../components/dashboard/MyOrders";
import OrderSummaryPage from "../pages/CheckoutPage";
import Dashboard from "../pages/Dashbord";
import MyAccount from "../components/dashboard/MyAccount";
import ProtectedCheckout from "../components/ProtectedCheckout";
import ProtectedRoute from "../components/ProtectedRoute";
export const routes = (isAuthenticated) => [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/about", element: <AboutUs /> },
  {
    path: "/wishlist",
    element: (
      <ProtectedRoute>
        <WishlistPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: isAuthenticated ? <Navigate to="/" replace /> : <Login />,
  },
  {
    path: "/sign-up",
    element: isAuthenticated ? <Navigate to="/" replace /> : <Signup />,
  },
  { path: "/home", element: <Navigate to="/" replace /> },
  {
    path: "/products/:id",
    protected: true,
    element: <DetailPage />,
  },
  {
    path: "/cart",
    protected: true,
    element: (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/myorder",
    protected: true,
    element: <MyOrders />,
  },
  {
    path: "/checkout",
    protected: true,
    element: (
      <ProtectedRoute>
        <OrderSummaryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    protected: true,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="my-account" replace /> },
      { path: "my-account", element: <MyAccount /> },
      { path: "my-orders", element: <MyOrders /> },
    ],
  },
  {
    path: "*",
    element: <p className="text-center mt-20 text-xl">404 - Page Not Found</p>,
  },
];
