import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { ArrowRight, Mail, ShieldCheck, UserRound } from "lucide-react";
import gigpulseLogo from "../assets/gigpulse-logo.svg";

function flattenErrors(err) {
  const details = err?.detail || err?.non_field_errors || err;
  if (!details) return "Authentication failed. Please check your details.";
  if (typeof details === "string") return details;
  if (Array.isArray(details)) return details.join(" ");
  return Object.values(details)
    .flat()
    .filter(Boolean)
    .join(" ") || "Authentication failed. Please check your details.";
}

export default function AuthModal({ open, onClose, type = "login", variant = "modal" }) {
  const { login, register } = useAuth();
  const [role, setRole] = useState("freelancer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isPage = variant === "page";

  if (!open && !isPage) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (type === "login") {
        await login({ email, password });
      } else {
        await register({ email, password, username, full_name: fullName, role });
      }
      onClose();
    } catch (err) {
      setError(flattenErrors(err));
    } finally {
      setLoading(false);
    }
  }

  const containerClass = isPage
    ? "min-h-screen w-full bg-slate-950 px-4 pb-10 pt-20"
    : "fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 backdrop-blur-md";
  const cardClass = isPage
    ? "mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/95 shadow-2xl shadow-blue-950/50"
    : "w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/95 shadow-2xl shadow-blue-950/50";

  return (
    <div className={containerClass}>
      {isPage && (
        <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-3 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/10">
                <img src={gigpulseLogo} alt="GigPulse" className="h-7 w-7" />
              </span>
              <span className="font-display text-lg font-bold">GigPulse</span>
            </a>
            <button type="button" onClick={onClose} className="btn-ghost">
              Back to home
            </button>
          </div>
        </div>
      )}
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className={cardClass}
      >
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.26),transparent_36%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(8,15,31,0.98))] p-8 lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 opacity-40 animated-grid" />
            <div className="relative">
              <span className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                Secure access
              </span>
              <h3 className="text-3xl font-bold text-white">
                {type === "login" ? "Welcome back." : "Create your GigPulse account."}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                {type === "login"
                  ? "Sign in to continue tracking projects, managing proposals, and reading live market signals."
                  : "Join GigPulse to discover demand, save work, and move faster on the right freelance opportunities."}
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Protected sessions",
                    copy: "JWT auth with refresh cookies keeps sessions stable across devices."
                  },
                  {
                    icon: UserRound,
                    title: "Role-aware onboarding",
                    copy: "Choose freelancer or client so the dashboard matches your workflow."
                  },
                  {
                    icon: ArrowRight,
                    title: "Fast onboarding",
                    copy: "Account creation is lightweight and does not block on verification email delivery."
                  }
                ].map(({ icon: Icon, title, copy }) => (
                  <div key={title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">{type === "login" ? "Login" : "Sign up"}</p>
                <h3 className="mt-1 text-2xl font-bold text-white">{type === "login" ? "Access your dashboard" : "Set up your profile"}</h3>
              </div>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className={isPage ? "btn-ghost" : "icon-button"}
                  aria-label="Close auth"
                >
                  {isPage ? "Back to home" : "×"}
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              {type === "register" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-300">
                    Full name
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="input h-12 w-full"
                      autoComplete="name"
                    />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    Username
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="your-handle"
                      className="input h-12 w-full"
                      autoComplete="username"
                    />
                  </label>
                </div>
              )}

              <label className="grid gap-2 text-sm text-slate-300">
                Email address
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="input h-12 w-full pl-11"
                    type="email"
                    autoComplete="email"
                  />
                </div>
              </label>

              <label className="grid gap-2 text-sm text-slate-300">
                Password
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a secure password"
                  type="password"
                  className="input h-12 w-full"
                  autoComplete={type === "login" ? "current-password" : "new-password"}
                />
              </label>

              {type === "register" && (
                <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-white">Account type</p>
                  <div className="flex flex-wrap gap-3">
                    <label className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${role === "freelancer" ? "border-cyan-300/40 bg-cyan-300/10 text-white" : "border-white/10 bg-white/5 text-slate-300"}`}>
                      <input type="radio" name="role" value="freelancer" checked={role === "freelancer"} onChange={() => setRole("freelancer")} />
                      Freelancer
                    </label>
                    <label className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${role === "client" ? "border-cyan-300/40 bg-cyan-300/10 text-white" : "border-white/10 bg-white/5 text-slate-300"}`}>
                      <input type="radio" name="role" value="client" checked={role === "client"} onChange={() => setRole("client")} />
                      Client
                    </label>
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm leading-6 text-rose-200">
                  {error}
                </div>
              )}

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={onClose} className="btn-ghost justify-center sm:min-w-28">
                  Cancel
                </button>
                <button type="submit" className="btn-primary justify-center sm:min-w-32" disabled={loading}>
                  {loading ? "Please wait" : type === "login" ? "Login" : "Create account"}
                </button>
              </div>

              <p className="text-xs leading-6 text-slate-400">
                By continuing, you agree to use GigPulse responsibly. We only use your details to create and secure your account.
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
