import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
// Import Tabler Icons
import { TbCheck, TbBolt, TbUsers, TbWorld, TbCoin, TbHeadset } from 'react-icons/tb';


// Placeholder images - you'll need to provide actual images for these paths
import teamPhoto from '../assets/about_us_team.png'; // A photo of a diverse team or bustling office
import communityPhoto from '../assets/about_us_community.png'; // Image representing buyers/sellers interacting

function AboutUs() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 md:py-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 text-center">
        <div className="absolute inset-0 hidden lg:block overflow-hidden pointer-events-none -z-10 opacity-20 dark:opacity-10" aria-hidden="true">
          {/* Reusing the eBay-themed SVG background */}
          <svg
            className="absolute transform -translate-x-1/2 bottom-0 xl:left-1/2 lg:left-1/3"
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
                id="ebay-gradient-about"
              >
                <stop stopColor="#4169E1" offset="0%" />
                <stop stopColor="#FF6347" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#ebay-gradient-about)" fillRule="evenodd">
              <circle cx="1232" cy="118" r="128" />
              <circle cx="155" cy="443" r="64" />
              <rect x="700" y="200" width="100" height="100" rx="10" opacity="0.7" />
            </g>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500">Our Story</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Connecting a world of buyers and sellers, one click at a time.
            We're building a vibrant marketplace where everyone can find their unique treasure.
          </p>
        </div>
      </section>

      ---

      {/* Our Mission Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
            <div className="md:w-1/2" data-aos="fade-right">
              <img
                src={teamPhoto}
                alt="Our Diverse Team"
                className="rounded-xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left" data-aos="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Mission: Empowering Connections
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Born from the idea that anything can find its perfect owner, our platform is more than just a marketplace. It's a bustling digital bazaar where passions meet products, and dreams find their deals. We empower individuals and businesses alike to connect, discover, and thrive.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Every day, millions of items change hands, stories unfold, and communities grow. We're committed to fostering a safe, diverse, and exciting environment for every transaction.
              </p>
              <Link
                to="/careers"
                className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Join Our Team
                {/* Replaced generic SVG with TbArrowRight */}
                <TbBolt className="ml-2 -mr-1 h-5 w-5 rotate-90" aria-hidden="true" /> {/* Using bolt rotated for arrow effect */}
              </Link>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* Key Facts / Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-red-500 py-16 md:py-24 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Numbers That Define Us
            </h2>
            <p className="text-lg text-blue-100">
              A glimpse into the scale and impact of our vibrant community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div data-aos="zoom-in" data-aos-delay="100">
              {/* Replaced factIcon1 with TbWorld */}
              <TbWorld className="h-16 w-16 mx-auto mb-4 filter drop-shadow-lg" />
              <div className="text-5xl font-extrabold mb-2">190+</div>
              <p className="text-lg font-medium text-blue-100">Countries Served</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              {/* Replaced factIcon2 with TbCoin (represents deals/transactions) */}
              <TbCoin className="h-16 w-16 mx-auto mb-4 filter drop-shadow-lg" />
              <div className="text-5xl font-extrabold mb-2">500M+</div>
              <p className="text-lg font-medium text-blue-100">Listings Active Daily</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="300">
              {/* Replaced factIcon3 with TbHeadset (represents support) */}
              <TbHeadset className="h-16 w-16 mx-auto mb-4 filter drop-shadow-lg" />
              <div className="text-5xl font-extrabold mb-2">24/7</div>
              <p className="text-lg font-medium text-blue-100">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* Our Values / How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="md:w-1/2 order-2 md:order-1 text-center md:text-left" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Promise: Trust, Value, Community
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We believe in fair trade, transparent dealings, and the power of a global community. Our platform is built on principles of security, innovation, and constant evolution to serve you better.
              </p>
              <ul className="list-none space-y-3 mb-6">
                <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                  {/* Replaced generic SVG with TbCheck */}
                  <TbCheck className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" />
                  Verified Sellers & Buyer Protection
                </li>
                <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                  {/* Replaced generic SVG with TbBolt (for speed/deals) */}
                  <TbBolt className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" />
                  Competitive Pricing & Exclusive Deals
                </li>
                <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                  {/* Replaced generic SVG with TbUsers (for community) */}
                  <TbUsers className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  Global Community & Local Connections
                </li>
              </ul>
              {/* <Link
                to="/help"
                className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
              >
                Need Help? Visit Our Help Center
              </Link> */}
            </div>
            <div className="md:w-1/2 order-1 md:order-2" data-aos="fade-left">
              <img
                src={communityPhoto}
                alt="Community Interaction"
                className="rounded-xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>

      ---

      {/* Random Fact/Quote Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-semibold italic text-gray-800 dark:text-gray-200 leading-relaxed" data-aos="fade-up">
            "Every item has a story, and every bid is a new chapter. We're just here to make sure they find their perfect ending."
          </blockquote>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-delay="100">
            — A wise seller from eBay's early days (probably)
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;