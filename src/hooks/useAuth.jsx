import React, { createContext, useContext, useEffect, useState } from "react";
import { getStoredTokens, storeTokens, clearTokens, API_BASE } from "../api";

const AuthContext = createContext(null);

const API_UNAVAILABLE_MESSAGE =
  "Cannot reach the API server. Make sure the Django backend is running on http://localhost:8000 and try again.";

async function readErrorResponse(res) {
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = await res.json().catch(() => null);
    if (data) return data;
  }

  const text = await res.text().catch(() => "");
  if (text.includes("ECONNREFUSED") || text.includes("http proxy error")) {
    return { detail: API_UNAVAILABLE_MESSAGE };
  }
  if (contentType.includes("text/html")) {
    return { detail: `Request failed with status ${res.status}. Check the Django server logs for details.` };
  }

  const message = text.trim();
  return { detail: message ? message.slice(0, 300) : `Request failed with status ${res.status}.` };
}

async function postAuth(path, payload) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw { detail: API_UNAVAILABLE_MESSAGE };
  }

  if (!res.ok) {
    throw await readErrorResponse(res);
  }

  return res.json();
}

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
    const data = await postAuth("/auth/login/", { email, password });
    const userData = data.user || null;
    const accessToken = data?.tokens?.access || data.access || null;
    if (accessToken || userData) {
      storeTokens(accessToken ? { access: accessToken } : null, userData);
    }
    setUser(userData);
    return userData;
  }

  async function register(payload) {
    const data = await postAuth("/auth/register/", payload);
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
