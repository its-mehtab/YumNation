import { createContext, useContext } from "react";

const ValidateContext = createContext();

export const ValidateProvider = ({ children }) => {
  const validateSignup = (values) => {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be 6 characters or more";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password does not match";
    }
    return errors;
  };

  const validateLogin = (values = {}) => {
    const errors = {};
    if (!values.email || !values.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email.trim())) {
      errors.email = "Email address is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const validate = (values = {}) => validateSignup(values);

  return (
    <ValidateContext.Provider
      value={{ validate, validateLogin, validateSignup }}
    >
      {children}
    </ValidateContext.Provider>
  );
};

export const useValidate = () => useContext(ValidateContext);
