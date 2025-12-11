import { createContext, useContext } from "react";

const ValidateContext = createContext();

export const ValidateProvider = ({ children }) => {
  const validate = (values) => {
    let errors = {};
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
    return errors;
  };

  return (
    <ValidateContext.Provider value={{ validate }}>
      {children}
    </ValidateContext.Provider>
  );
};

export const useValidate = () => useContext(ValidateContext);
