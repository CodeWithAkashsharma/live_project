import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on initial load
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Login user and update context
  const loginUser = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // Logout user
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Update user info in context (like after requesting admin)
  const updateUserInfo = (data) => setUser((prev) => ({ ...prev, ...data }));

  return (
    <AuthContext.Provider
      value={{ user, loading, loginUser, logoutUser, updateUserInfo, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
