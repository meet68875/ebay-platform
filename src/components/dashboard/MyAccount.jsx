import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateInfo as validate } from "../../utils/helpers/formValidator";
import UpdatePassword from "./UpdatePassword"; // Ensure this path is correct
import toast from "react-hot-toast";
import { updateUserProfile } from "../../features/authSlice";

function MyAccount() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const initialFirstName = user?.name?.split(" ")[0] || "";
  const initialEmail = user?.email || "";

  const formik = useFormik({
    initialValues: {
      firstName: initialFirstName,
      email: initialEmail,
    },
    enableReinitialize: true,
    validate,
    onSubmit: async (values) => {
      if (
        values.firstName === initialFirstName &&
        values.email === initialEmail
      ) {
        toast.error("No changes detected. Nothing to update.");
        return;
      }

      const updatedData = {
        name: values.firstName,
        email: values.email,
      };

      const result = await dispatch(updateUserProfile(updatedData));

      if (updateUserProfile.fulfilled.match(result)) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(
          result.payload || "Failed to update profile. Please try again."
        );
      }
    },
  });

  return (
    // Outer container for centering and max-width, similar to Login/Signup pages
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-ebay-light-gray dark:bg-ebay-dark-bg">
      <div
        className="w-full max-w-md p-6 sm:p-8 md:p-10 bg-white dark:bg-ebay-dark-card rounded-lg shadow-xl
                   border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ebay-blue dark:text-ebay-blue mb-2">
            My Account
          </h1>
          <p className="text-gray-600 dark:text-ebay-dark-text text-lg">
            Manage your profile information
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* First Name Input (now representing the primary name) */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 dark:text-ebay-dark-text mb-2"
            >
              Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className={`
                mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none
                focus:ring-2 focus:ring-ebay-blue focus:border-ebay-blue
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-ebay-dark-text
                ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "border-ebay-red focus:border-ebay-red focus:ring-ebay-red"
                    : "border-gray-300 dark:border-gray-600"
                }
              `}
              aria-invalid={
                formik.touched.firstName && formik.errors.firstName
                  ? "true"
                  : "false"
              }
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="mt-1 text-sm text-ebay-red">
                {formik.errors.firstName}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-ebay-dark-text mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`
                mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none
                focus:ring-2 focus:ring-ebay-blue focus:border-ebay-blue
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-ebay-dark-text
                ${
                  formik.touched.email && formik.errors.email
                    ? "border-ebay-red focus:border-ebay-red focus:ring-ebay-red"
                    : "border-gray-300 dark:border-gray-600"
                }
              `}
              aria-invalid={
                formik.touched.email && formik.errors.email ? "true" : "false"
              }
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-ebay-red">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full flex justify-center items-center px-4 py-2 border border-transparent
                rounded-md shadow-sm text-base font-medium text-white
                ${
                  loading
                    ? "bg-ebay-blue-light cursor-not-allowed" // Use a lighter blue for disabled state
                    : "bg-ebay-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ebay-blue"
                }
                transition-colors duration-200
              `}
            >
              {loading ? (
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
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>

        {/* You can re-introduce UpdatePassword here, styled similarly */}
        {/* <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
             <UpdatePassword />
        </div> */}
      </div>
    </div>
  );
}

export default MyAccount;
