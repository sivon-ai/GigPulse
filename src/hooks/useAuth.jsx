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
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw err;
    }
    const data = await res.json();
    storeTokens(data.tokens, data.user);
    setUser(data.user);
    return data.user;
  }

  async function register(payload) {
    const res = await fetch(`${API_BASE}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw err;
    }
    const data = await res.json();
    storeTokens(data.tokens, data.user);
    setUser(data.user);
    return data.user;
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
