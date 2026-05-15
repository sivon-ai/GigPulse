import React, { createContext, useContext, useEffect, useState } from "react";
import { getStoredTokens, storeTokens, clearTokens, API_BASE } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredTokens();
    if (stored?.user) {
      setUser(stored.user);
    }
    setLoading(false);
  }, []);

  async function login({ email, password }) {
    const res = await fetch(`${API_BASE}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw err;
    }
    const data = await res.json();
    const userData = data.user || null;
    const accessToken = data?.tokens?.access || data.access || null;
    if (accessToken || userData) {
      storeTokens(accessToken ? { access: accessToken } : null, userData);
    }
    setUser(userData);
    return userData;
  }

  async function register(payload) {
    const res = await fetch(`${API_BASE}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw err;
    }
    const data = await res.json();
    const userData = data.user || null;
    const accessToken = data?.tokens?.access || data.access || null;
    if (accessToken || userData) {
      storeTokens(accessToken ? { access: accessToken } : null, userData);
    }
    setUser(userData);
    return userData;
  }

  function isClient() {
    return user?.role === "client";
  }

  function isFreelancer() {
    return user?.role === "freelancer";
  }

  function logout() {
    clearTokens();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
