// utils/helpers/formValidator.js
const signUpValidator = (values) => {
  const errors = {};

  // First Name validation
  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  } else if (values.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters long";
  }

  // Email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
  }

  return errors;
};

const loginValidator = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 characters or more";
  }
  return errors;
};

const updateInfo = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};
const updatePassword = (values) => {
  const errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Required";
  } else if (values.currentPassword.length < 8) {
    errors.currentPassword = "Must be 8 characters or more";
  }

  if (!values.newPassword) {
    errors.newPassword = "Required";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "Must be 8 characters or more";
  } else if (values.newPassword === values.password) {
    errors.newPassword =
      "The current password and new password can't be the same";
  }

  return errors;
};

export { signUpValidator, loginValidator, updateInfo, updatePassword };
