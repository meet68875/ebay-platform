import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { signUpValidator as validate } from "../utils/helpers/formValidator";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/authSlice";
import Transition from "../utils/transitions/Transition";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  // State to control the Transition component's 'show' prop
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Show the form animation when the component mounts
    setShowForm(true);
  }, []);


  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
    },
    validate, // Ensure your validator is updated to exclude lastName
    onSubmit: async (values) => {
      const payload = {
        username: values.firstName, // Use firstName as the name, since lastName is removed
        email: values.email,
        password: values.password,
      };

      const result = await dispatch(signupUser(payload));

      if (signupUser.fulfilled.match(result)) {
        toast.success("Your account has been created!", { duration: 3000 });
        // Trigger exit animation before navigating
        setShowForm(false);
        const timer = setTimeout(() => {
          navigate("/login");
        }, 500); // Wait for a short duration to allow exit animation
        return () => clearTimeout(timer); // Cleanup timeout
      } else if (signupUser.rejected.match(result)) {
        // This handles errors specifically from the thunk payload if it was rejected.
        // The useEffect above for `error` state generally catches global auth errors.
        toast.error(result.payload || "Signup failed. Please try again.", { duration: 5000 });
      }
    },
  });

  return (
    // Outer container for full-height centering
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900">
      <Transition
        show={showForm} // Controls the animation state
        timeout={500} // Matches the duration-500 for enter animation
        // Entrance animation: Fade in and slide up slightly
        transitionEnter="transform ease-out duration-500"
        transitionEnterStart="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        transitionEnterEnd="opacity-100 translate-y-0 sm:scale-100"
        // Exit animation: Fade out and slide down slightly
        transitionLeave="transform ease-in duration-300"
        transitionLeaveStart="opacity-100 translate-y-0 sm:scale-100"
        transitionLeaveEnd="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        unmountOnExit // Important for unmounting after exit animation
      >
        <div
          // This is the actual form container, styled as a card
          className="w-full max-w-md p-6 sm:p-8 md:p-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl
                     border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Join Ebay today!
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* First Name Input */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                className={`
                  mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                  ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                `}
                aria-invalid={formik.touched.firstName && formik.errors.firstName ? "true" : "false"}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className={`
                  mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                  ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                `}
                aria-invalid={formik.touched.email && formik.errors.email ? "true" : "false"}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                className={`
                  mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                  ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                `}
                aria-invalid={formik.touched.password && formik.errors.password ? "true" : "false"}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full flex justify-center items-center px-4 py-2 border border-transparent
                  rounded-md shadow-sm text-base font-medium text-white
                  ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  }
                  transition-colors duration-200
                `}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default Signup;