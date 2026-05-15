const API_BASE = "/api/v1";

function getStoredTokens() {
  try {
    const raw = localStorage.getItem("gp_auth");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function storeTokens(tokens, user) {
  const payload = { tokens, user };
  localStorage.setItem("gp_auth", JSON.stringify(payload));
}

function clearTokens() {
  localStorage.removeItem("gp_auth");
}

async function refreshToken(refresh) {
  // try to refresh using cookie (HttpOnly) when available
  const init = { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include" };
  if (refresh) init.body = JSON.stringify({ refresh });
  const res = await fetch(`${API_BASE}/auth/refresh/`, init);
  if (!res.ok) throw new Error("refresh_failed");
  return res.json();
}

async function authFetch(input, init = {}) {
  const stored = getStoredTokens();
  const headers = new Headers(init.headers || {});
  if (stored?.tokens?.access) {
    headers.set("Authorization", `Bearer ${stored.tokens.access}`);
  }

  const res = await fetch(input.startsWith("/") ? input : input, { ...init, headers });

  if (res.status === 401 && stored?.tokens?.refresh) {
    try {
      const data = await refreshToken(stored.tokens.refresh);
      // update tokens
      storeTokens({ access: data.access, refresh: stored.tokens.refresh }, stored.user);
      headers.set("Authorization", `Bearer ${data.access}`);
      return fetch(input, { ...init, headers });
    } catch (e) {
      clearTokens();
      throw e;
    }
  }

  return res;
}

export { API_BASE, getStoredTokens, storeTokens, clearTokens, authFetch };
