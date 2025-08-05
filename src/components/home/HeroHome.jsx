import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import HorizontalImageSlider from "../HorizontalImageSlider";
import eBayBanner1 from "../../assets/banner3.png";
import eBayBanner2 from "../../assets/Banner.png";
import eBayBanner3 from "../../assets/banner2.png";
const slides = [
  {
    image: eBayBanner1,
    title: "Fresh Finds: Daily Deals on Fashion",
    description:
      "Discover trending apparel and accessories at unbeatable prices.",
    buttonText: "Shop Fashion",
    buttonLink: "/products?category=fashion",
  },
  {
    image: eBayBanner2,
    title: "Tech & Gadgets: Unmissable Offers!",
    description: "Upgrade your gear with incredible discounts on electronics.",
    buttonText: "Explore Tech",
    buttonLink: "/products?category=electronics",
  },
  {
    image: eBayBanner3,
    title: "Unique Collectibles: Find Your Treasure",
    description: "From vintage to rare, explore one-of-a-kind items.",
    buttonText: "Discover Collectibles",
    buttonLink: "/products?category=collectibles",
  },
];

function HeroHome() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <div className="w-full mt-0 md:mt-10 lg:mt-12" data-aos="fade-up">
        <HorizontalImageSlider slides={slides} />
      </div>
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div
          className="absolute inset-0 hidden lg:block overflow-hidden pointer-events-none -z-10"
          aria-hidden="true"
        >
          <svg
            className="absolute transform -translate-x-1/2 bottom-0 xl:left-1/2 lg:left-1/3 opacity-30 dark:opacity-10"
            width="1360"
            height="578"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="ebay-gradient"
              >
                <stop stopColor="#4169E1" offset="0%" />
                <stop stopColor="#FF6347" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#ebay-gradient)" fillRule="evenodd">
              <rect x="0" y="0" width="100%" height="100%" fill="none" />
              <circle cx="200" cy="400" r="80" opacity="0.6" />
              <circle cx="1100" cy="150" r="100" opacity="0.6" />
              <rect
                x="500"
                y="300"
                width="150"
                height="150"
                rx="20"
                opacity="0.4"
              />
            </g>
          </svg>
        </div>

        {/* Hero Text Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-gray-900 dark:text-white"
              data-aos="zoom-y-out"
            >
              Your World, Your Way.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500">
                Shop Anything.
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Explore millions of listings, from daily essentials to unique
                treasures. Buy and sell with confidence.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <Link
                    className="btn px-8 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 transform transition duration-300 hover:scale-105 shadow-lg"
                    to={"/products"}
                  >
                    Start Shopping
                  </Link>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroHome;
