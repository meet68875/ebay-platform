import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 border-t border-gray-200 dark:border-gray-600">
          {/* 1st block: Legal Links */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="text-sm text-gray-500 dark:text-gray-300">
              <a
                href="https://pages.ebay.com/help/policies/user-agreement.html"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                User Agreement
              </a>{" "}
              ·{" "}
              <a
                href="https://pages.ebay.com/help/policies/privacy-policy.html"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              ·{" "}
              <a
                href="https://pages.ebay.com/sitemap.html"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Site Map
              </a>
            </div>
          </div>

          {/* 2nd block: Categories */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-blue-600 font-bold mb-2">Categories</h6>
            <ul className="text-sm text-gray-500 dark:text-gray-300">
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/b/Electronics/bn_7000259124"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Electronics
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/b/Clothing-Shoes-Accessories/bn_7000259856"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Fashion
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/b/Collectibles-Art/bn_7000259852"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Collectibles & Art
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/b/Home-Garden/bn_7000259853"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Home & Garden
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/b/Motors/bn_7000259851"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Motors
                </a>
              </li>
            </ul>
          </div>

          {/* 3rd block: My eBay */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-blue-600 font-bold mb-2">My eBay</h6>
            <ul className="text-sm text-gray-500 dark:text-gray-300">
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/myb/Summary"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Summary
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/myb/WatchList"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Watchlist
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/myb/PurchaseHistory"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Purchase History
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/b/Selling/bn_7117942457"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Selling
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/help/account"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Account Settings
                </a>
              </li>
            </ul>
          </div>

          {/* 4th block: Help & Community */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-blue-600 font-bold mb-2">Help & Community</h6>
            <ul className="text-sm text-gray-500 dark:text-gray-300">
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/help/home"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Help & Contact
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://community.ebay.com/"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  eBay Community
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebayinc.com/stories/news/"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  News
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/help/buying"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Buying Help
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.ebay.com/help/selling"
                  className="hover:underline"
                  target="_blank" rel="noopener noreferrer"
                >
                  Selling Help
                </a>
              </li>
            </ul>
          </div>

          {/* 5th block: Subscribe */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-blue-600 font-bold mb-2">Subscribe</h6>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
              Get the latest deals and updates from eBay.
            </p>
            <form>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label htmlFor="newsletter" className="sr-only">Email</label>
                  <div className="relative flex items-center max-w-xs">
                    <input
                      id="newsletter"
                      type="email"
                      className="form-input w-full p-4 pr-12 text-sm bg-gray-200 dark:bg-gray-700 focus:outline-none"
                      placeholder="Your email"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 px-4 flex items-center"
                      aria-label="Subscribe"
                    >
                      <svg
                        className="w-4 h-4 fill-current text-blue-600"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom area: Copyright */}
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          &copy; 1995–2025 eBay Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
