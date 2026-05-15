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
          <div className="mt-8 flex flex-wrap gap-2">
            {["AI agents", "React", "AWS", "No-code ops", "UX systems"].map((item) => (
              <a href="#trends" key={item} className="category-pill">
                {item}
              </a>
            ))}
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
                <p className="mt-1 text-xl font-bold text-white">Client and freelancer</p>
              </div>
              <span className="text-3xl font-bold text-cyan-200">2 roles</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                Role-specific dashboards load after sign-in.
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
      price: "$0",
      copy: "For freelancers exploring demand signals.",
      features: ["Basic project search", "5 tracked skills", "Portfolio checklist"]
    },
    {
      name: "Pro Freelancer",
      price: "$19",
      copy: "For serious freelancers growing revenue.",
      features: ["Unlimited skill trends", "AI recommendations", "Client chat insights"],
      popular: true
    },
    {
      name: "Agency",
      price: "$79",
      copy: "For teams matching talent to demand.",
      features: ["Team dashboard", "Talent pipeline", "Advanced market exports"]
    }
  ];

  return (
    <section id="pricing" className="section-shell">
      <SectionHeading
        eyebrow="Pricing"
        title="Start free, scale with your freelance career."
        copy="Simple tiers for independent freelancers, high-growth specialists, and agencies managing multiple profiles."
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
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("login");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    function handleOpenAuth(e) {
      const type = e?.detail?.type || "login";
      openAuth(type);
    }
    window.addEventListener("openAuth", handleOpenAuth);
    return () => window.removeEventListener("openAuth", handleOpenAuth);
  }, []);

  const appClass = useMemo(
    () =>
      isLight
        ? "light min-h-screen overflow-x-hidden bg-slate-100 text-slate-950"
        : "min-h-screen overflow-x-hidden bg-midnight text-white",
    [isLight]
  );

  function openAuth(type = "login") {
    setAuthType(type);
    setAuthOpen(true);
  }

  return (
    <AuthProvider>
      <div className={appClass}>
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
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} type={authType} />
      </div>
    </AuthProvider>
  );
}
