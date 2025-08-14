import React from "react";
import { updatePassword as validate } from "../../utils/helpers/formValidator";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axiosInstance, { authApi } from "../../constants/axiosInstance";

function UpdatePassword() {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validate,

    onSubmit: async (values) => {
      if (values.newPassword === values.currentPassword) {
        toast.error("New password can't be the same as current password", {
          duration: 3000,
        });
        return;
      }

      try {
        const response = await authApi.put("/users/change-password", values, {
          headers: {
            "Content-Type": "application/json",
            // Optional: Add token manually if axiosInstance doesn't include it
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        toast.success("Password changed successfully!", { duration: 3000 });
        formik.resetForm();
      } catch (err) {
        const message =
          err?.response?.data?.message || "Failed to update password";
        toast.error(message, { duration: 3000 });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <h1 className="text-2xl my-12 font-bold text-center xl:text-left">Update Your Password</h1>

      <div className="form-section">
        <label htmlFor="currentPassword">Current Password</label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.currentPassword}
        />
        <span>
          {formik.touched.currentPassword && formik.errors.currentPassword
            ? `*${formik.errors.currentPassword}`
            : null}
        </span>
      </div>

      <div className="form-section">
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
        />
        <span>
          {formik.touched.newPassword && formik.errors.newPassword
            ? `*${formik.errors.newPassword}`
            : null}
        </span>
      </div>

      <div className="form-section items-center md:col-span-2">
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default UpdatePassword;
