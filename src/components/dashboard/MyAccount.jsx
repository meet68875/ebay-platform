import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateInfo as validate } from "../../utils/helpers/formValidator";
import UpdatePassword from "./UpdatePassword";
import toast from "react-hot-toast";
import { updateUserProfile } from "../../features/authSlice";

function MyAccount() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const initialFirstName = user?.username?.split(" ")[0] || "";
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
        username: values.firstName,
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
    <div className="min-h-screen flex justify-center items-start px-4 py-10 bg-lightColor-100 dark:bg-ebay-dark-bg">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* === Profile Info Form === */}
        <div className="bg-white dark:bg-ebay-dark-card p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-ebay-blue dark:text-white mb-4">
            Account Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Update your profile details
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                  w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-ebay-blue focus:outline-none
                  ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                `}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.firstName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                  w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-ebay-blue focus:outline-none
                  ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }
                `}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold text-white transition-colors ${
                loading
                  ? "bg-ebay-blue-light cursor-not-allowed"
                  : "bg-ebay-blue hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* === Password Update === */}
        <div className="bg-white dark:bg-ebay-dark-card p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-ebay-blue dark:text-white mb-4">
            Update Password
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Change your account password securely
          </p>
          <UpdatePassword />
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
