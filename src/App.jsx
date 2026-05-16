import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Bookmark,
  Bot,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Code,
  DollarSign,
  Eye,
  FileText,
  Filter,
  Folder,
  Github,
  Globe,
  Home,
  LayoutDashboard,
  LineChart,
  Linkedin,
  Menu,
  MessageSquare,
  Moon,
  PanelLeft,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Twitter,
  UserRound,
  Users,
  Wallet,
  X,
  Zap
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import heroVisual from "./assets/gigpulse-hero.png";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import AuthModal from "./components/AuthModal";

const navItems = [
  ["Home", "#home"],
  ["Explore Projects", "#projects"],
  ["Market Trends", "#trends"],
  ["Freelancers", "#freelancers"],
  ["Dashboard", "#dashboard"],
  ["Pricing", "#pricing"]
];

const stats = [];
const tickerItems = [];
const skills = [];
const projects = [];
const freelancers = [];
const testimonials = [];
const dashboardMetrics = [];

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Projects", icon: Folder },
  { label: "Messages", icon: MessageSquare },
  { label: "Portfolio", icon: UserRound },
  { label: "Analytics", icon: LineChart },
  { label: "Earnings", icon: Wallet },
  { label: "Saved Jobs", icon: Bookmark },
  { label: "Settings", icon: Settings }
];

const clientNavItems = [
  { label: "Dashboard", href: "#client-dashboard", icon: LayoutDashboard },
  { label: "Post Project", href: "#client-post", icon: FileText },
  { label: "Proposals", href: "#client-proposals", icon: Folder },
  { label: "Compare Talent", href: "#client-compare", icon: Users },
  { label: "Messaging", href: "#client-messaging", icon: MessageSquare },
  { label: "Payments", href: "#client-payments", icon: Wallet },
  { label: "Analytics", href: "#client-analytics", icon: LineChart },
];

const freelancerNavItems = [
  { label: "Dashboard", href: "#freelancer-dashboard", icon: LayoutDashboard },
  { label: "Portfolio", href: "#freelancer-portfolio", icon: UserRound },
  { label: "Jobs", href: "#freelancer-jobs", icon: Search },
  { label: "Proposals", href: "#freelancer-proposals", icon: FileText },
  { label: "Earnings", href: "#freelancer-earnings", icon: Wallet },
  { label: "Messages", href: "#freelancer-messages", icon: MessageSquare },
  { label: "Skill Growth", href: "#freelancer-skills", icon: Sparkles }
];

function AnimatedNumber({ value, prefix = "", suffix = "" }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 18 });
  const rounded = useTransform(spring, (latest) =>
    `${prefix}${Math.round(latest).toLocaleString()}${suffix}`
  );

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return <motion.span>{rounded}</motion.span>;
}

function SectionHeading({ eyebrow, title, copy, align = "center" }) {
  return (
    <div
      className={`mx-auto mb-10 max-w-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy && <p className="mt-4 text-base leading-7 text-slate-300">{copy}</p>}
    </div>
  );
}

function ClientSectionHeading({ title, subtitle, copy }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        {subtitle}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {copy && <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{copy}</p>}
    </div>
  );
}

function FreelancerSectionHeading({ title, subtitle, copy }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        {subtitle}
      </p>
      <h2 className="freelancer-heading mt-2 text-2xl font-semibold text-white sm:text-3xl">
        {title}
      </h2>
      {copy && <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{copy}</p>}
    </div>
  );
}

function LineSpark({ points, color = "#3B82F6", className = "" }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * 100;
    const y = 70 - ((point - min) / (max - min || 1)) * 54;
    return `${x},${y}`;
  });
  const path = `M ${coords.join(" L ")}`;

  return (
    <svg className={className} viewBox="0 0 100 80" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`line-${color.replace("#", "")}`} x1="0" x2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${path} L 100,80 L 0,80 Z`}
        fill={`url(#line-${color.replace("#", "")})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

function BarStack({ values }) {
  return (
    <div className="flex h-44 items-end gap-3 rounded-2xl bg-slate-950/40 p-4">
      {values.map((value, index) => (
        <motion.div
          key={`${value}-${index}`}
          className="flex flex-1 items-end overflow-hidden rounded-full bg-white/5"
          initial={{ height: 28 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.7 }}
        >
          <motion.div
            className="w-full rounded-full bg-gradient-to-t from-cyan-400 via-blue-500 to-violet-500"
            initial={{ height: "10%" }}
            whileInView={{ height: `${value}%` }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.8 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function RadialMeter({ value, label }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="grid h-24 w-24 place-items-center rounded-full"
        style={{
          background: `conic-gradient(#06B6D4 ${value}%, rgba(255,255,255,0.08) 0)`
        }}
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-slate-950 text-lg font-bold text-white">
          {value}%
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-1 text-xl font-semibold text-white">Market fit</p>
      </div>
    </div>
  );
}

function Navbar({ isLight, onToggleTheme, onLoginClick, onSignUpClick }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 shadow-glow">
            <Zap className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-xl font-bold text-white">GigPulse</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </div>

          <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              className="h-10 w-64 rounded-full border border-white/10 bg-white/5 pl-9 pr-10 text-sm text-white outline-none transition focus:border-cyan-300/70 focus:bg-white/10"
              placeholder="Search skills or projects"
            />
            <Filter className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={() => setNotificationsOpen((current) => !current)}
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-300" />
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          {user ? (
            <>
              {user.role === "client" ? (
                <a href="#post" className="btn-primary">Post project</a>
              ) : (
                <a href="#dashboard" className="btn-primary">Dashboard</a>
              )}
              <button onClick={() => logout()} className="btn-ghost">Logout</button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="btn-ghost">Login</button>
              <button onClick={onSignUpClick} className="btn-primary">Sign Up</button>
            </>
          )}
        </div>

        <button
          type="button"
          className="icon-button lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Open mobile menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {notificationsOpen && (
        <motion.div
          className="absolute right-6 top-16 hidden w-80 rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl lg:block"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {["React jobs spiked 22% today", "New client reply from MeterStack", "AI agents added to your watchlist"].map(
            (item) => (
              <div key={item} className="mb-3 flex items-start gap-3 last:mb-0">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            )
          )}
        </motion.div>
      )}

      {open && (
        <motion.div
          className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <div className="grid gap-2">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="btn-ghost" type="button" onClick={onToggleTheme}>
              {isLight ? "Dark" : "Light"}
            </button>
            <button className="btn-primary text-center" onClick={onSignUpClick}>
              Sign Up
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[92vh] overflow-hidden pt-24">
      <div className="absolute inset-0 -z-20">
        <img
          src={heroVisual}
          alt="Freelancers working with market analytics overlays"
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(59,130,246,0.18),transparent_34%),linear-gradient(90deg,rgba(11,17,32,0.98)_0%,rgba(11,17,32,0.88)_42%,rgba(11,17,32,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,17,32,0.2),#0B1120_96%)]" />
      </div>
      <div className="absolute inset-0 -z-10 animated-grid opacity-40" />
      <div className="pointer-events-none absolute left-[8%] top-28 h-36 w-36 rounded-full bg-blue-500/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-[10%] h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 shadow-cyan">
            <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse-soft" />
            Real-time demand intelligence for freelancers
          </div>
          <h1 className="max-w-5xl font-display text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Find freelance work aligned with market demand.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            GigPulse helps freelancers discover opportunities, track trending
            skills, and grow careers with real-time market intelligence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => window.dispatchEvent(new CustomEvent('openAuth', { detail: { type: 'register' } }))} className="btn-primary h-12 justify-center px-6 text-base">
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <a href="#trends" className="btn-ghost h-12 justify-center px-6 text-base">
              Explore Trends
              <BarChart3 className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
            Connect the backend to surface live skills, projects, and market signals.
          </div>
        </motion.div>

        <div className="relative min-h-[360px] lg:min-h-[560px]">
          <motion.div
            className="glass-panel absolute right-0 top-4 w-72 p-4 sm:w-80"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Live data
                </p>
                <p className="mt-1 text-2xl font-bold text-white">Connect account</p>
              </div>
              <span className="rounded-full bg-violet-400/15 px-3 py-1 text-sm font-semibold text-violet-200">
                Empty
              </span>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-sm text-slate-400">
              Sample market charts are removed until you connect real project data.
            </div>
          </motion.div>

          <motion.div
            className="glass-panel absolute bottom-16 left-0 w-72 p-4 sm:w-80"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.38 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Workspaces
                </p>
                <p className="mt-1 text-xl font-bold text-white">Connected workspaces</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-slate-300">
                Live data only
              </span>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                Role-specific dashboards load after sign-in and backend sync.
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-panel absolute bottom-2 right-8 hidden w-56 p-4 sm:block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-500/20 text-blue-200">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Next step</p>
                <p className="font-semibold text-white">Connect your account</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
            {stats.length > 0 ? stats.map(({ label, value, suffix, icon: Icon }) => (
            <motion.div
              key={label}
              className="glass-panel flex items-center gap-4 p-4"
              whileHover={{ y: -4 }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-cyan-200">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  <AnimatedNumber value={value} suffix={suffix} />
                </p>
                <p className="text-sm text-slate-400">{label}</p>
              </div>
            </motion.div>
          )) : (
            <div className="glass-panel md:col-span-3 p-6 text-center text-slate-300">
              Live statistics appear here after the backend is connected.
            </div>
          )}
        </div>
      </div>

      <div className="border-y border-white/10 bg-white/[0.03] py-3 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
          Live trend ticker removed until real market data is connected.
        </div>
      </div>
    </section>
  );
}

function TrendingSkills() {
  return (
    <section id="trends" className="section-shell">
      <SectionHeading
        eyebrow="Market trends"
        title="A demand dashboard for every skill decision."
        copy="Track growth, freelance rates, hiring momentum, and saturation signals before you update your portfolio or proposal strategy."
      />

      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/40 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-300/70"
            placeholder="Search React, AI/ML, AWS, Django..."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["Remote", "High rate", "Fast growth", "Low competition"].map((item) => (
            <button key={item} className="category-pill" type="button">
              {item}
            </button>
          ))}
          <button className="btn-ghost h-12" type="button">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="glass-card p-8 text-center text-slate-300">
        Skill trend cards were removed until real marketplace data is connected.
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Explore projects"
        title="High-signal freelance work, ranked by fit and demand."
        copy="Every project card blends client quality, required skills, competition, budget, and timing so freelancers can act faster."
      />
      <div className="glass-card p-8 text-center text-slate-300">
        Client project samples were removed until live listings are available.
      </div>
    </section>
  );
}

function FreelancerProfiles() {
  return (
    <section id="freelancers" className="section-shell">
      <SectionHeading
        eyebrow="Freelancers"
        title="Profiles that convert demand into credibility."
        copy="Verification, portfolio previews, earnings proof, and skill tags help clients understand fit in seconds."
      />
      <div className="glass-card p-8 text-center text-slate-300">
        Freelancer profile samples were removed until real accounts are available.
      </div>
    </section>
  );
}

function AIRecommendation() {
  return (
    <section className="section-shell">
      <div className="glass-card relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.22),transparent_55%)]" />
        <div className="data-line left-[18%]" />
        <div className="data-line left-[41%] animation-delay-700" />
        <div className="data-line left-[67%] animation-delay-1000" />
        <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              AI recommendation engine
            </p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">
              Turn market signals into your next career move.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              GigPulse compares your portfolio, proposal history, and market demand
              to recommend skills to learn, technologies to watch, and projects to prioritize.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-5 shadow-cyan backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-400">GigPulse AI</p>
                <h3 className="text-xl font-bold text-white">Career intelligence</h3>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-300">
              AI recommendations will appear here after live account and marketplace data are connected.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatPreview() {
  return (
    <section className="section-shell">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Client chat"
          title="Real-time conversations beside project intelligence."
          copy="A focused messaging experience keeps briefs, files, milestones, and proposal context in the same orbit."
        />
        <motion.div
          className="glass-card overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500">
                <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-emerald-300" />
              </div>
              <div>
                <h3 className="font-bold text-white">Nora at Cloudlane</h3>
                <p className="text-sm text-slate-400">Online, reviewing proposal</p>
              </div>
            </div>
            <button className="icon-button" type="button" aria-label="Open chat settings">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4 p-5 text-slate-300">
            Live chat previews were removed until authenticated conversations are connected.
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
              <input
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
                placeholder="Write a reply"
              />
              <button className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 text-slate-950" type="button">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "₹0",
      copy: "For freelancers exploring demand signals.",
      features: ["Basic project search", "5 tracked skills", "Portfolio checklist"]
    },
    {
      name: "Pro Freelancer",
      price: "₹1,499",
      copy: "For serious freelancers growing revenue.",
      features: ["Unlimited skill trends", "AI recommendations", "Client chat insights"],
      popular: true
    },
    {
      name: "Agency",
      price: "₹5,999",
      copy: "For teams matching talent to demand.",
      features: ["Team dashboard", "Talent pipeline", "Advanced market exports"]
    }
  ];

  return (
    <section id="pricing" className="section-shell">
      <SectionHeading
        eyebrow="Pricing"
        title="Pricing in Indian Rupees."
        copy="The pricing table now displays INR so the app matches the Indian market."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <motion.article
            key={tier.name}
            className={`glass-card relative p-6 ${tier.popular ? "border-cyan-300/40 shadow-cyan" : ""}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -7 }}
          >
            {tier.popular && (
              <span className="absolute right-5 top-5 rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-950">
                Popular
              </span>
            )}
            <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{tier.copy}</p>
            <p className="mt-6 font-display text-5xl font-bold text-white">
              {tier.price}
              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <div className="mt-6 space-y-3">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-300/15 text-emerald-200">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {feature}
                </div>
              ))}
            </div>
            <button className={tier.popular ? "btn-primary mt-8 w-full justify-center" : "btn-ghost mt-8 w-full justify-center"} type="button">
              Choose plan
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Customer stories"
        title="Customer stories appear after live accounts are connected."
      />
      <div className="glass-card mx-auto max-w-4xl p-8 text-center text-slate-300 sm:p-10">
        Testimonials were removed because the site should not ship with fake client or freelancer quotes.
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section id="dashboard" className="section-shell">
      <SectionHeading
        eyebrow="Freelancer dashboard"
        title="Your dashboard appears after a real account is connected."
        copy="The demo metrics and sample sidebar content have been removed until the backend returns real user data."
      />
      <div className="glass-card p-8 text-center text-slate-300">
        Dashboard cards, metrics, and sample tasks were removed until real user data is available.
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400">
              <Zap className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-xl font-bold text-white">GigPulse</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            AI-powered opportunity discovery for freelancers who want to follow demand,
            build better portfolios, and win stronger projects.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Linkedin, Github, Globe].map((Icon, index) => (
              <button key={index} className="icon-button" type="button" aria-label="Social link">
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
        {[
          ["Company", "About", "Careers", "Press", "Contact"],
          ["Product", "Projects", "Market Trends", "Dashboard", "Pricing"],
          ["Legal", "Privacy", "Terms", "Security", "Status"]
        ].map(([title, ...links]) => (
          <div key={title}>
            <h4 className="font-bold text-white">{title}</h4>
            <div className="mt-4 grid gap-3">
              {links.map((link) => (
                <a key={link} href="#home" className="text-sm text-slate-400 transition hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500">© 2026 GigPulse. All rights reserved.</p>
        <form className="flex max-w-md gap-2">
          <input
            className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none"
            placeholder="Email for market updates"
          />
          <button className="btn-primary h-11" type="button">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
}

function ClientApp({ onNavigate }) {
  const metrics = [
    { label: "Open roles", value: "12", detail: "3 awaiting review" },
    { label: "Active projects", value: "6", detail: "2 due this week" },
    { label: "Avg time to hire", value: "4.2 days", detail: "-18% vs last month" },
    { label: "Spend in escrow", value: "₹8.6L", detail: "Across 9 milestones" }
  ];

  const proposalPipeline = [
    { stage: "New", count: 18, color: "bg-blue-500/10 text-blue-700" },
    { stage: "Shortlisted", count: 7, color: "bg-cyan-500/10 text-cyan-700" },
    { stage: "Interview", count: 4, color: "bg-emerald-500/10 text-emerald-700" },
    { stage: "Hired", count: 2, color: "bg-slate-900/10 text-slate-700" }
  ];

  const proposals = [
    { name: "Aarav Mehta", role: "Senior React Engineer", rate: "₹4,800/hr", score: "92%", status: "Interview" },
    { name: "Priya Nair", role: "Product Designer", rate: "₹3,600/hr", score: "88%", status: "Shortlisted" },
    { name: "Daniel Chow", role: "Data Engineer", rate: "₹5,200/hr", score: "84%", status: "New" },
  ];

  const comparisons = [
    { name: "Zara Patel", title: "Full-stack Lead", rating: "4.9", projects: "48", badges: ["Verified", "Top 3%"], match: "96%" },
    { name: "Neel Shah", title: "Cloud Architect", rating: "4.8", projects: "38", badges: ["Verified", "Fast responder"], match: "93%" },
    { name: "Maya Collins", title: "Product Strategist", rating: "4.7", projects: "31", badges: ["Verified", "AI-ready"], match: "91%" }
  ];

  const milestones = [
    { title: "Discovery & kickoff", amount: "₹1.2L", due: "May 22", status: "Funded" },
    { title: "Design system delivery", amount: "₹2.8L", due: "Jun 3", status: "In review" },
    { title: "Sprint 1 build", amount: "₹3.1L", due: "Jun 14", status: "Upcoming" }
  ];

  const notifications = [
    { title: "3 proposals require feedback", time: "10 min ago" },
    { title: "Escrow for Project Delta funded", time: "2 hours ago" },
    { title: "AI match update: 4 new top-fit freelancers", time: "Yesterday" }
  ];

  return (
    <div className="client-shell">
      <header className="client-topbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white">GP</span>
            <div>
              <p className="text-sm font-semibold text-slate-900">GigPulse Client</p>
              <p className="text-xs text-slate-500">Hiring workspace</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-10 w-64 rounded-full border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                placeholder="Search freelancers or projects"
              />
            </div>
            <button className="client-btn-ghost" type="button">Invite team</button>
            <button className="client-btn-primary" type="button">Post project</button>
            <button className="icon-button" type="button" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />
            </button>
            <button className="client-btn-ghost" type="button" onClick={() => onNavigate("/")}>Marketing site</button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pb-16 pt-8 lg:flex-row">
        <aside className="client-sidebar w-full p-5 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:w-64">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Workspace</p>
            <p className="mt-2 text-lg font-semibold text-white">Sivon AI Studio</p>
            <p className="text-xs text-slate-400">Enterprise plan</p>
          </div>
          <nav className="grid gap-2">
            {clientNavItems.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400/15 text-cyan-200">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI matching</p>
                <p className="text-xs text-slate-400">4 new matches today</p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white">
              Review matches
            </button>
          </div>
          <div className="mt-6 text-xs text-slate-400">Settings · Security · Billing</div>
        </aside>

        <main className="flex-1 space-y-12">
          <section id="client-hero" className="client-card">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="client-pill inline-flex items-center gap-2">Client workspace</p>
                <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Hire verified freelancers with clarity, control, and speed.
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Organize proposals, manage contracts, and track delivery milestones in one secure workspace.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="client-btn-primary" type="button">
                    Post a premium project
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button className="client-btn-ghost" type="button">View hiring insights</button>
                </div>
              </div>
              <div className="grid gap-4">
                {metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label} className="client-card-muted">
                    <p className="text-sm font-semibold text-slate-700">{metric.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
                    <p className="mt-2 text-xs text-slate-500">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="client-dashboard">
            <ClientSectionHeading
              subtitle="Dashboard"
              title="Client dashboard"
              copy="Track spend, proposal velocity, and delivery confidence across every project."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="client-card">
                  <p className="text-sm text-slate-500">{metric.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{metric.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{metric.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="client-card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">AI freelancer matching</p>
                    <p className="mt-2 text-sm text-slate-500">Shortlist ready-to-hire talent aligned to your scope.</p>
                  </div>
                  <span className="client-badge"><BadgeCheck className="h-3 w-3" /> Verified matches</span>
                </div>
                <div className="mt-6 grid gap-3">
                  {[
                    "Frontend lead with Stripe/Linear design systems experience",
                    "Senior backend engineer with 92% on-time delivery score",
                    "Product designer available within 72 hours"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-600">
                      <Sparkles className="h-4 w-4 text-cyan-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="client-card">
                <p className="text-sm font-semibold text-slate-900">Activity timeline</p>
                <div className="mt-4 space-y-4">
                  {[
                    { title: "New proposal received", meta: "Product design · 12 minutes ago" },
                    { title: "Milestone approved", meta: "Fintech revamp · 2 hours ago" },
                    { title: "Contract signed", meta: "Cloud migration · Yesterday" }
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Smart notifications</p>
                  <div className="mt-3 space-y-3">
                    {notifications.map((note) => (
                      <div key={note.title} className="flex items-center justify-between text-sm text-slate-600">
                        <span>{note.title}</span>
                        <span className="text-xs text-slate-400">{note.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="client-proposals">
            <ClientSectionHeading
              subtitle="Proposal management"
              title="Proposal pipeline"
              copy="Move proposals through a structured, audit-ready pipeline with clear ownership."
            />
            <div className="grid gap-4 lg:grid-cols-4">
              {proposalPipeline.map((stage) => (
                <div key={stage.stage} className="client-card">
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${stage.color}`}>
                    {stage.stage}
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">{stage.count}</p>
                  <p className="text-xs text-slate-500">Proposals in queue</p>
                </div>
              ))}
            </div>

            <div className="mt-6 client-card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Latest proposals</p>
                <button className="client-btn-ghost" type="button">View all</button>
              </div>
              <div className="mt-4 grid gap-3">
                {proposals.map((proposal) => (
                  <div key={proposal.name} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{proposal.name}</p>
                      <p className="text-xs text-slate-500">{proposal.role}</p>
                    </div>
                    <div className="text-xs text-slate-500">{proposal.rate}</div>
                    <span className="client-badge"><BadgeCheck className="h-3 w-3" /> {proposal.score} fit</span>
                    <span className="client-pill">{proposal.status}</span>
                    <button className="client-btn-ghost" type="button">Review</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="client-post">
            <ClientSectionHeading
              subtitle="Post project"
              title="Launch a new project in minutes"
              copy="Structured briefs improve proposal quality and keep hiring aligned with budget and timeline."
            />
            <div className="client-card grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Project title</label>
                  <input className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700" placeholder="e.g., SaaS onboarding redesign" />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Scope summary</label>
                  <textarea className="min-h-[120px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700" placeholder="Key goals, deliverables, and success criteria." />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Budget range</label>
                    <input className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700" placeholder="₹3L - ₹6L" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Timeline</label>
                    <input className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700" placeholder="6 weeks" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Required skills</label>
                  <div className="flex flex-wrap gap-2">
                    {["Product design", "React", "Brand systems", "Analytics"].map((skill) => (
                      <span key={skill} className="client-pill">{skill}</span>
                    ))}
                    <button className="client-btn-ghost" type="button">Add skill</button>
                  </div>
                </div>
              </div>
              <div className="client-card-muted">
                <p className="text-sm font-semibold text-slate-900">Hiring checklist</p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  {[
                    "Define the success metrics",
                    "Assign an internal owner",
                    "Choose payment schedule",
                    "Enable verified-only proposals"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-cyan-500" />
                      {item}
                    </div>
                  ))}
                </div>
                <button className="mt-6 client-btn-primary" type="button">Publish project</button>
              </div>
            </div>
          </section>

          <section id="client-compare">
            <ClientSectionHeading
              subtitle="Freelancer comparison"
              title="Compare shortlisted freelancers"
              copy="Side-by-side insights keep you confident when selecting top talent."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              {comparisons.map((talent) => (
                <div key={talent.name} className="client-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{talent.name}</p>
                      <p className="text-xs text-slate-500">{talent.title}</p>
                    </div>
                    <span className="client-badge"><BadgeCheck className="h-3 w-3" /> Verified</span>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-500" /> {talent.rating}</span>
                    <span>{talent.projects} projects</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {talent.badges.map((badge) => (
                      <span key={badge} className="client-pill">{badge}</span>
                    ))}
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Match score</span>
                      <span className="font-semibold text-slate-700">{talent.match}</span>
                    </div>
                    <div className="client-progress mt-2">
                      <div className="client-progress-bar" style={{ width: talent.match }} />
                    </div>
                  </div>
                  <button className="mt-5 client-btn-ghost" type="button">Open profile</button>
                </div>
              ))}
            </div>
          </section>

          <section id="client-messaging">
            <ClientSectionHeading
              subtitle="Messaging & collaboration"
              title="Stay aligned with freelancers"
              copy="Coordinate timelines, files, and approvals without leaving the workspace."
            />
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="client-card">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Active conversation</p>
                  <span className="client-pill">Project Delta</span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">Hi Sivon, milestone 1 design files are ready for review.</div>
                  <div className="rounded-2xl bg-blue-50 px-4 py-3 text-blue-700">Thanks! I will review and share feedback by EOD.</div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm" placeholder="Type a message" />
                  <button className="client-btn-primary" type="button">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="client-card">
                <p className="text-sm font-semibold text-slate-900">Team collaboration</p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                    <span>Design review with legal</span>
                    <span className="text-xs text-slate-400">Today</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                    <span>Kickoff call scheduled</span>
                    <span className="text-xs text-slate-400">Tomorrow</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                    <span>Contract approvals</span>
                    <span className="text-xs text-slate-400">This week</span>
                  </div>
                </div>
                <button className="mt-5 client-btn-ghost" type="button">Open team board</button>
              </div>
            </div>
          </section>

          <section id="client-payments">
            <ClientSectionHeading
              subtitle="Payments & milestones"
              title="Escrow and milestone tracking"
              copy="Every milestone is funded, approved, and released with audit-ready visibility."
            />
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="client-card">
                <p className="text-sm font-semibold text-slate-900">Escrow status</p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Escrow funded</span>
                    <span className="font-semibold text-slate-900">₹8.6L</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next release</span>
                    <span className="font-semibold text-slate-900">₹2.8L</span>
                  </div>
                  <div className="client-progress">
                    <div className="client-progress-bar" style={{ width: "72%" }} />
                  </div>
                  <p className="text-xs text-slate-400">72% of total budget secured</p>
                </div>
                <button className="mt-6 client-btn-primary" type="button">Release milestone</button>
              </div>
              <div className="client-card">
                <p className="text-sm font-semibold text-slate-900">Milestones</p>
                <div className="mt-4 grid gap-3">
                  {milestones.map((milestone) => (
                    <div key={milestone.title} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{milestone.title}</p>
                        <p className="text-xs text-slate-500">Due {milestone.due}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">{milestone.amount}</p>
                        <p className="text-xs text-slate-500">{milestone.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="client-analytics">
            <ClientSectionHeading
              subtitle="Analytics overview"
              title="Hiring insights & spend performance"
              copy="Executive-ready analytics to measure velocity, quality, and budget utilization."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="client-card">
                <p className="text-sm font-semibold text-slate-900">Proposal velocity</p>
                <div className="mt-4">
                  <LineSpark points={[12, 24, 18, 36, 28, 44, 52]} color="#2563EB" className="h-24 w-full" />
                </div>
                <p className="mt-4 text-xs text-slate-500">+21% proposals reviewed this month</p>
              </div>
              <div className="client-card">
                <p className="text-sm font-semibold text-slate-900">Time-to-hire trend</p>
                <div className="mt-4">
                  <LineSpark points={[40, 38, 36, 33, 31, 29, 27]} color="#06B6D4" className="h-24 w-full" />
                </div>
                <p className="mt-4 text-xs text-slate-500">Median time-to-hire down to 4.2 days</p>
              </div>
              <div className="client-card">
                <p className="text-sm font-semibold text-slate-900">Budget utilization</p>
                <div className="mt-4">
                  <RadialMeter value={72} label="Utilization" />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function FreelancerApp({ onNavigate }) {
  const dashboardStats = [
    { label: "Earnings this month", value: "₹3.4L", detail: "+18% vs last month" },
    { label: "Active proposals", value: "7", detail: "2 awaiting feedback" },
    { label: "Profile strength", value: "92%", detail: "Top 10% in your niche" },
    { label: "New job matches", value: "14", detail: "AI-ranked for you" }
  ];

  const jobMatches = [
    { title: "Product redesign for fintech app", budget: "₹2.5L", tags: ["UI/UX", "Figma", "Design system"], match: "94%" },
    { title: "Framer marketing site build", budget: "₹1.1L", tags: ["Framer", "Webflow", "Motion"], match: "91%" },
    { title: "Creator marketplace dashboard", budget: "₹3.2L", tags: ["React", "Analytics", "SaaS"], match: "89%" }
  ];

  const proposals = [
    { name: "Sprint 0 discovery", status: "Draft", client: "Nova Labs" },
    { name: "Design system refresh", status: "Sent", client: "Arden Finance" },
    { name: "Growth landing page", status: "Negotiation", client: "Orbit Cloud" }
  ];

  const portfolioHighlights = [
    { title: "Fintech onboarding", role: "Product designer" },
    { title: "Creator studio", role: "Brand + UX" },
    { title: "SaaS analytics", role: "Design systems" },
    { title: "Healthtech mobile", role: "UX research" }
  ];

  const achievements = [
    { title: "Top 5% Response Rate", detail: "Replies within 3 hours" },
    { title: "Verified delivery", detail: "26 projects completed" },
    { title: "Client love", detail: "4.9 average rating" }
  ];

  const skillGrowth = [
    { label: "Product strategy", value: 78 },
    { label: "Motion design", value: 66 },
    { label: "AI workflows", value: 72 },
    { label: "Client comms", value: 88 }
  ];

  return (
    <div className="freelancer-shell">
      <header className="freelancer-topbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-white">GP</span>
            <div>
              <p className="text-sm font-semibold text-white">GigPulse Studio</p>
              <p className="text-xs text-slate-400">Freelancer workspace</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                className="h-10 w-64 rounded-full border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-slate-200 outline-none transition focus:border-indigo-400"
                placeholder="Search jobs, clients, skills"
              />
            </div>
            <button className="freelancer-btn-ghost" type="button">Share portfolio</button>
            <button className="freelancer-btn-primary" type="button">New proposal</button>
            <button className="icon-button" type="button" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-400" />
            </button>
            <button className="freelancer-btn-ghost" type="button" onClick={() => onNavigate("/")}>Marketing site</button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pb-16 pt-8 lg:flex-row">
        <aside className="freelancer-sidebar w-full lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:w-64">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Creator hub</p>
            <p className="mt-2 text-lg font-semibold text-white">Sivon Fernandes</p>
            <p className="text-xs text-slate-400">Product designer · Verified</p>
          </div>
          <nav className="grid gap-2">
            {freelancerNavItems.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-purple-500/20 text-purple-200">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Proposal Studio</p>
                <p className="text-xs text-slate-400">3 drafts ready to polish</p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white">
              Launch assistant
            </button>
          </div>
          <div className="mt-6 text-xs text-slate-400">Reputation · Achievements · Settings</div>
        </aside>

        <main className="flex-1 space-y-12">
          <section id="freelancer-dashboard" className="freelancer-card">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="freelancer-pill">Creative dashboard</span>
                <h1 className="freelancer-heading mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Build your next milestone with confidence and creative momentum.
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Your workspace blends portfolio highlights, AI proposal support, and performance insights to keep you ahead.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="freelancer-btn-primary" type="button">
                    Discover new roles
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button className="freelancer-btn-ghost" type="button">Refresh profile</button>
                </div>
              </div>
              <div className="grid gap-4">
                {dashboardStats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="freelancer-card-soft">
                    <p className="text-sm text-slate-300">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-xs text-slate-400">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((stat) => (
                <div key={stat.label} className="freelancer-card">
                  <p className="text-sm text-slate-300">{stat.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-xs text-slate-400">{stat.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="freelancer-portfolio">
            <FreelancerSectionHeading
              subtitle="Portfolio profile"
              title="Portfolio-first profile"
              copy="Showcase signature work, creative process, and verified impact in one immersive profile."
            />
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="freelancer-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Signature profile</p>
                    <p className="mt-2 text-sm text-slate-400">Creative director · Product design</p>
                  </div>
                  <span className="freelancer-badge"><BadgeCheck className="h-3 w-3" /> Verified</span>
                </div>
                <div className="mt-4 space-y-3">
                  {achievements.map((item) => (
                    <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <Star className="h-4 w-4 text-amber-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-slate-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Fintech", "Creator tools", "SaaS", "Brand systems"].map((tag) => (
                    <span key={tag} className="freelancer-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="freelancer-card">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Portfolio gallery</p>
                  <button className="freelancer-btn-ghost" type="button">Customize</button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {portfolioHighlights.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-xs text-slate-400">{item.role}</p>
                      <div className="mt-4 h-20 rounded-xl bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="freelancer-jobs">
            <FreelancerSectionHeading
              subtitle="Job discovery"
              title="AI-ranked job matches"
              copy="Opportunities curated around your niche, portfolio strengths, and availability."
            />
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="freelancer-card">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Recommended jobs</p>
                  <button className="freelancer-btn-ghost" type="button">Filter</button>
                </div>
                <div className="mt-4 space-y-3">
                  {jobMatches.map((job) => (
                    <div key={job.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">{job.title}</p>
                        <span className="freelancer-pill">{job.match} match</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">Budget: {job.budget}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span key={tag} className="freelancer-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="freelancer-card">
                <p className="text-sm font-semibold text-white">Creative productivity</p>
                <div className="mt-4 space-y-4">
                  {[
                    { label: "Daily focus", value: "5.2 hrs", note: "+12%" },
                    { label: "Response time", value: "2.8 hrs", note: "Top 8%" },
                    { label: "Client satisfaction", value: "4.9", note: "Consistent" }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-slate-400">{item.note}</p>
                      </div>
                      <p className="text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-5 freelancer-btn-primary" type="button">Set weekly goals</button>
              </div>
            </div>
          </section>

          <section id="freelancer-proposals">
            <FreelancerSectionHeading
              subtitle="Proposal submission"
              title="AI-assisted proposal flow"
              copy="Draft sharper proposals, track status, and ship confidently."
            />
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="freelancer-card">
                <p className="text-sm font-semibold text-white">Proposal tracker</p>
                <div className="mt-4 space-y-3">
                  {proposals.map((proposal) => (
                    <div key={proposal.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{proposal.name}</p>
                        <p className="text-xs text-slate-400">{proposal.client}</p>
                      </div>
                      <span className="freelancer-pill">{proposal.status}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-5 freelancer-btn-ghost" type="button">View pipeline</button>
              </div>
              <div className="freelancer-card">
                <p className="text-sm font-semibold text-white">AI proposal assistant</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  {[
                    "Suggested intro referencing the client’s KPIs",
                    "Highlight portfolio piece: Fintech onboarding",
                    "Draft timeline and milestone breakdown"
                  ].map((line) => (
                    <div key={line} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <Sparkles className="h-4 w-4 text-cyan-300" />
                      {line}
                    </div>
                  ))}
                </div>
                <button className="mt-5 freelancer-btn-primary" type="button">Generate proposal</button>
              </div>
            </div>
          </section>

          <section id="freelancer-earnings">
            <FreelancerSectionHeading
              subtitle="Earnings & analytics"
              title="Earnings momentum"
              copy="Track revenue, utilization, and repeat-client performance."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="freelancer-card">
                <p className="text-sm font-semibold text-white">Revenue trend</p>
                <div className="mt-4">
                  <LineSpark points={[10, 18, 16, 24, 22, 30, 34]} color="#8B5CF6" className="h-24 w-full" />
                </div>
                <p className="mt-4 text-xs text-slate-400">+22% growth in the last 30 days</p>
              </div>
              <div className="freelancer-card">
                <p className="text-sm font-semibold text-white">Utilization</p>
                <div className="mt-4">
                  <RadialMeter value={76} label="Utilization" />
                </div>
              </div>
              <div className="freelancer-card">
                <p className="text-sm font-semibold text-white">Upcoming payouts</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  {[
                    { title: "Fintech onboarding", value: "₹1.4L", date: "May 25" },
                    { title: "Creator studio", value: "₹1.1L", date: "Jun 2" }
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-slate-400">{item.date}</p>
                      </div>
                      <span className="text-sm font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="freelancer-messages">
            <FreelancerSectionHeading
              subtitle="Client messaging"
              title="Stay close to client feedback"
              copy="Threaded messaging paired with quick actions and deadlines."
            />
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="freelancer-card">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Active thread</p>
                  <span className="freelancer-pill">Orbit Cloud</span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="rounded-2xl bg-white/5 px-4 py-3">We love the direction. Can you explore a darker hero?</div>
                  <div className="rounded-2xl bg-indigo-500/20 px-4 py-3 text-white">Absolutely. I’ll share two variants by tomorrow.</div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input className="h-11 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-slate-200" placeholder="Write a reply" />
                  <button className="freelancer-btn-primary" type="button">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="freelancer-card">
                <p className="text-sm font-semibold text-white">Upcoming touchpoints</p>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  {[
                    { title: "Client review call", time: "Tomorrow · 4:00 PM" },
                    { title: "Proposal follow-up", time: "Friday · 11:30 AM" },
                    { title: "Portfolio feedback", time: "Next week" }
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <span>{item.title}</span>
                      <span className="text-xs text-slate-400">{item.time}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-5 freelancer-btn-ghost" type="button">Open calendar</button>
              </div>
            </div>
          </section>

          <section id="freelancer-skills">
            <FreelancerSectionHeading
              subtitle="Skill growth"
              title="Skills & achievements"
              copy="Track momentum across your core skills and unlock achievement badges."
            />
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="freelancer-card">
                <p className="text-sm font-semibold text-white">Skill analytics</p>
                <div className="mt-4 space-y-4">
                  {skillGrowth.map((skill) => (
                    <div key={skill.label}>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{skill.label}</span>
                        <span>{skill.value}%</span>
                      </div>
                      <div className="freelancer-progress mt-2">
                        <div className="freelancer-progress-bar" style={{ width: `${skill.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="freelancer-card">
                <p className="text-sm font-semibold text-white">Achievement badges</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Top rated", "Fast responder", "Creative strategist", "AI collaborator"
                  ].map((badge) => (
                    <div key={badge} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                      <BadgeCheck className="h-4 w-4 text-cyan-300" />
                      {badge}
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  Unlock premium badges by completing 3 consecutive projects with 5-star feedback.
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function NewProposalButton() {
  const { user } = useAuth();
  function handleClick() {
    if (!user) {
      window.dispatchEvent(new CustomEvent("openAuth", { detail: { type: "login" } }));
      return;
    }
    if (user.role === "client") {
      // clients should post projects
      window.location.href = "#post";
      return;
    }
    // freelancers: open proposal creation flow (placeholder)
    alert("Open New Proposal flow (freelancer)");
  }

  return (
    <button className="btn-primary h-10" type="button" onClick={handleClick}>
      New proposal
    </button>
  );
}

export default function App() {
  const [isLight, setIsLight] = useState(false);
  const [appRoute, setAppRoute] = useState(() => getAppRoute(window.location.pathname));

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    function handleOpenAuth(e) {
      const type = e?.detail?.type || "login";
      openAuth(type);
    }
    function handlePopState() {
      setAppRoute(getAppRoute(window.location.pathname));
    }
    window.addEventListener("openAuth", handleOpenAuth);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("openAuth", handleOpenAuth);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const appClass = useMemo(
    () =>
      isLight
        ? "light min-h-screen overflow-x-hidden bg-slate-100 text-slate-950"
        : "min-h-screen overflow-x-hidden bg-midnight text-white",
    [isLight]
  );

  function navigate(path) {
    window.history.pushState({}, "", path);
    setAppRoute(getAppRoute(path));
  }

  function openAuth(type = "login") {
    navigate(type === "register" ? "/signup" : "/login");
  }

  return (
    <AuthProvider>
      <div className={appClass}>
        {appRoute.type === "auth" ? (
          <AuthModal open onClose={() => navigate("/")} type={appRoute.mode} variant="page" />
        ) : appRoute.type === "client" ? (
          <ClientApp onNavigate={navigate} />
        ) : appRoute.type === "freelancer" ? (
          <FreelancerApp onNavigate={navigate} />
        ) : (
          <>
            <Navbar
              isLight={isLight}
              onToggleTheme={() => setIsLight((current) => !current)}
              onLoginClick={() => openAuth("login")}
              onSignUpClick={() => openAuth("register")}
            />
            <main>
              <Hero />
              <TrendingSkills />
              <Projects />
              <FreelancerProfiles />
              <AIRecommendation />
              <ChatPreview />
              <Dashboard />
              <Pricing />
              <Testimonials />
            </main>
            <Footer />
          </>
        )}
      </div>
    </AuthProvider>
  );
}

function getAppRoute(pathname) {
  const path = (pathname || "/").toLowerCase();
  if (path.startsWith("/login")) return { type: "auth", mode: "login" };
  if (path.startsWith("/signup") || path.startsWith("/register")) return { type: "auth", mode: "register" };
  if (path.startsWith("/client")) return { type: "client" };
  if (path.startsWith("/freelancer")) return { type: "freelancer" };
  return { type: "landing" };
}
