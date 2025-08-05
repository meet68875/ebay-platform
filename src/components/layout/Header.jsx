import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AbstractDesign from "../../assets/AbstractDesign.svg";
import { FaShoppingCart, FaUserCircle, FaHeart } from "react-icons/fa";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Redux hooks
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  // Assuming a wishlist slice with totalQuantity
  const { totalQuantity: wishlistQuantity } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsNavOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsNavOpen(false);
  };

  const NavLinks = ({ isMobile = false }) => (
    <ul
      className={`flex items-center font-medium ${
        isMobile ? "flex-col space-y-8 text-2xl" : "space-x-8 text-lg"
      } lg:flex-row lg:space-x-8 lg:space-y-0 lg:text-base`}
    >
      <li>
        <Link
          to="/"
          onClick={handleNavLinkClick}
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/products"
          onClick={handleNavLinkClick}
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          onClick={handleNavLinkClick}
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          About
        </Link>
      </li>
      {isAuthenticated && (
        <li>
          <Link
            to="/dashboard"
            onClick={handleNavLinkClick}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Dashboard
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <nav
      className={`
        w-full z-50 transition-all duration-300 ease-in-out
        ${
          isSticky
            ? "fixed top-0 left-0 shadow-md bg-white dark:bg-gray-800 py-3"
            : "relative bg-gray-50 dark:bg-gray-900 py-4"
        }
        border-b border-gray-200 dark:border-gray-700
      `}
    >
      <img
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-10 dark:opacity-5"
        src={AbstractDesign}
        alt="background design"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">
        {/* Logo */}
        <Link to={"/"} className="flex-shrink-0 z-20">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            React<span className="text-red-500 dark:text-red-400">Shop</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-grow justify-center">
          <NavLinks />
        </div>

        {/* Right Section: Cart, Wishlist, User/Auth Buttons */}
        <div className="flex items-center space-x-4 z-20">
          {isAuthenticated ? (
            <>
              {/* Wishlist Icon and Count (visible only to authenticated users) */}
              <Link
                to="/wishlist"
                onClick={handleNavLinkClick}
                className="relative text-2xl text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                aria-label="View wishlist"
              >
                <FaHeart />
                {wishlistQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {wishlistQuantity}
                  </span>
                )}
              </Link>

              {/* Cart Icon and Count */}
              <Link
                to="/cart"
                onClick={handleNavLinkClick}
                className="relative text-2xl text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="View cart"
              >
                <FaShoppingCart />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              <div className="flex items-center space-x-2">
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={handleNavLinkClick}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                  )}
                  <span className="hidden md:inline text-sm font-semibold ml-2 text-gray-700 dark:text-gray-200">
                    {user?.name || "User"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden lg:block px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                onClick={handleNavLinkClick}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                onClick={handleNavLinkClick}
                className="hidden md:block px-4 py-2 rounded-full text-sm font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger/Close Button for Mobile */}
        <div className="lg:hidden z-40">
          <button
            onClick={toggleNav}
            className="p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isNavOpen ? (
              <RiCloseLine className="text-3xl" />
            ) : (
              <RiMenu3Fill className="text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`
          fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900
          flex flex-col items-center justify-center space-y-8 text-xl z-30
          transform transition-transform duration-300 ease-in-out
          ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
          lg:hidden
        `}
      >
        <NavLinks isMobile={true} />
        {/* Mobile Auth Actions */}
        <div className="flex flex-col space-y-4 mt-8">
          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-4">
                 {/* Wishlist icon on mobile */}
                <Link
                  to="/wishlist"
                  onClick={handleNavLinkClick}
                  className="relative text-3xl text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  aria-label="View wishlist"
                >
                  <FaHeart />
                  {wishlistQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {wishlistQuantity}
                    </span>
                  )}
                </Link>
                {/* Cart icon on mobile */}
                <Link
                  to="/cart"
                  onClick={handleNavLinkClick}
                  className="relative text-3xl text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="View cart"
                >
                  <FaShoppingCart />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </div>

              <Link
                to="/dashboard"
                onClick={handleNavLinkClick}
                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-600 dark:text-gray-300" />
                )}
                <span className="ml-3 text-lg font-semibold">
                  {user?.name || "User"}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-full text-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={handleNavLinkClick}
                className="px-6 py-3 rounded-full text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm text-center"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                onClick={handleNavLinkClick}
                className="px-6 py-3 rounded-full text-lg font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors text-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;