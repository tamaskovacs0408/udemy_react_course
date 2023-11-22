import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const storedUserLogin = localStorage.getItem("isLoggedIn");

    if (storedUserLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    // localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler
  }}>
    {props.children}
    </AuthContext.Provider>;
};

export default AuthContext;
