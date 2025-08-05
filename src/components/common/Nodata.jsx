import React from "react";
import { Link } from "react-router-dom";

function NoDataFound({ message, linkText, linkTo }) {
  return (
    <div className="text-center py-20 bg-zinc-100 dark:bg-grayshade-400 rounded-xl shadow-lg">
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
        {message}
      </p>
      <Link
        to={linkTo}
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default NoDataFound;