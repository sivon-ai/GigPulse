import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

export default function AuthModal({ open, onClose, type = "login" }) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (type === "login") {
        await login({ email, password });
      } else {
        await register({ email, password, username, full_name: fullName });
      }
      onClose();
    } catch (err) {
      setError(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md rounded-2xl bg-slate-950/95 p-6"
      >
        <h3 className="mb-4 text-xl font-bold text-white">{type === "login" ? "Login" : "Create account"}</h3>
        <form onSubmit={handleSubmit} className="grid gap-3">
          {type === "register" && (
            <>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className="input" />
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="input" />
            </>
          )}
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="input" />
          {error && <div className="text-sm text-rose-400">{error}</div>}
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? "..." : type === "login" ? "Login" : "Create"}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
