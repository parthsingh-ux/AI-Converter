"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimerRef = useRef(null);

  const scheduleLogout = (token) => {
    try {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000;
      const timeLeft = expiryTime - Date.now();

      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

      if (timeLeft > 0) {
        logoutTimerRef.current = setTimeout(() => {
          logout();
          console.log("Token expired. Logged out automatically.");
        }, timeLeft);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Failed to decode token for auto logout:", err);
      logout();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userInfo");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        scheduleLogout(storedToken);
      } catch {
        console.error("Invalid userInfo in localStorage.");
        localStorage.removeItem("userInfo");
      }
    }

    setLoading(false);
  }, []);

  const saveAuth = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      setToken(token);
      setUser(decodedUser);
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(decodedUser));
      scheduleLogout(token);
    } catch (err) {
      console.error("Invalid token passed to saveAuth:", err);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
  };

  const isAuthenticated = () => !!user && !!token;
  
  const hasRole = (allowedRoles = []) =>
    user && allowedRoles.includes(user.role);
  const getUserInfo = () => user;

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        setUser,
        setToken,
        saveAuth,
        logout,
        isAuthenticated,
        hasRole,
        getUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
