import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <NavigationContext.Provider value={{ goToLogin, goToHome }}>
      {children}
    </NavigationContext.Provider>
  );
};
