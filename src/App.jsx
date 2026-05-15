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

const stats = [
  { label: "Live projects indexed", value: 48200, suffix: "+", icon: FileText },
  { label: "Avg rate lift", value: 34, suffix: "%", icon: TrendingUp },
  { label: "Skills tracked", value: 1260, suffix: "+", icon: BarChart3 }
];

const tickerItems = [
  "React +22%",
  "AI Agents +41%",
  "AWS Lambda +18%",
  "Django APIs +15%",
  "Flutter +27%",
  "UI Systems +31%",
  "Data Labeling +12%",
  "DevOps +24%"
];

const skills = [
  {
    name: "React",
    demand: 92,
    growth: "+22%",
    rate: "$78/hr",
    projects: "12.8k",
    color: "#3B82F6",
    points: [18, 26, 22, 36, 42, 58, 64, 78, 88, 92]
  },
  {
    name: "AI/ML",
    demand: 96,
    growth: "+41%",
    rate: "$112/hr",
    projects: "9.4k",
    color: "#8B5CF6",
    points: [12, 18, 24, 32, 48, 62, 74, 82, 91, 96]
  },
  {
    name: "AWS",
    demand: 87,
    growth: "+18%",
    rate: "$96/hr",
    projects: "8.1k",
    color: "#06B6D4",
    points: [32, 38, 42, 47, 53, 62, 68, 72, 82, 87]
  },
  {
    name: "Django",
    demand: 78,
    growth: "+15%",
    rate: "$72/hr",
    projects: "5.6k",
    color: "#22C55E",
    points: [28, 31, 35, 44, 49, 51, 61, 68, 74, 78]
  },
  {
    name: "Flutter",
    demand: 83,
    growth: "+27%",
    rate: "$68/hr",
    projects: "6.3k",
    color: "#38BDF8",
    points: [22, 30, 33, 39, 45, 56, 61, 70, 78, 83]
  },
  {
    name: "UI/UX",
    demand: 89,
    growth: "+31%",
    rate: "$82/hr",
    projects: "10.7k",
    color: "#F472B6",
    points: [26, 34, 38, 45, 50, 59, 67, 76, 84, 89]
  }
];

const projects = [
  {
    title: "AI-powered CRM insights dashboard",
    budget: "$8k - $14k",
    rating: "4.9",
    skills: ["React", "LLM", "Charts"],
    duration: "6 weeks",
    proposals: 18,
    match: 94
  },
  {
    title: "Django marketplace API rebuild",
    budget: "$5k - $9k",
    rating: "4.8",
    skills: ["Django", "AWS", "Postgres"],
    duration: "4 weeks",
    proposals: 11,
    match: 88
  },
  {
    title: "Flutter booking app launch",
    budget: "$7k - $12k",
    rating: "5.0",
    skills: ["Flutter", "Firebase", "UX"],
    duration: "8 weeks",
    proposals: 23,
    match: 81
  },
  {
    title: "Stripe billing portal redesign",
    budget: "$4k - $7k",
    rating: "4.7",
    skills: ["UI/UX", "Next.js", "Stripe"],
    duration: "3 weeks",
    proposals: 14,
    match: 86
  }
];

const freelancers = [
  {
    name: "Maya Chen",
    role: "AI product designer",
    rating: "5.0",
    projects: 84,
    earnings: "$186k",
    availability: "Open this week",
    skills: ["UX", "AI flows", "Figma"],
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    name: "Arjun Mehta",
    role: "Django + AWS engineer",
    rating: "4.9",
    projects: 117,
    earnings: "$241k",
    availability: "2 slots left",
    skills: ["Django", "AWS", "APIs"],
    gradient: "from-violet-400 to-fuchsia-500"
  },
  {
    name: "Sofia Rivera",
    role: "React analytics specialist",
    rating: "4.98",
    projects: 96,
    earnings: "$212k",
    availability: "Available now",
    skills: ["React", "D3", "SaaS"],
    gradient: "from-blue-400 to-indigo-500"
  }
];

const testimonials = [
  {
    quote:
      "GigPulse showed me that AI workflow design was exploding before my profile caught up. Two months later I doubled my average project size.",
    name: "Leah Torres",
    role: "Freelance product strategist"
  },
  {
    quote:
      "The project recommendations feel like a senior talent agent. We found vetted cloud engineers faster than any marketplace we had used.",
    name: "Daniel Wu",
    role: "Founder, MeterStack"
  },
  {
    quote:
      "The demand signals helped me stop guessing. I rebuilt my portfolio around React dashboards and started winning higher-value work.",
    name: "Priya Shah",
    role: "Frontend consultant"
  }
];

const dashboardMetrics = [
  { label: "Earnings", value: "$18.4k", delta: "+18%", icon: Wallet },
  { label: "Success rate", value: "96%", delta: "+4%", icon: ShieldCheck },
  { label: "Profile views", value: "7.2k", delta: "+31%", icon: Eye },
  { label: "Proposals", value: "42", delta: "+12%", icon: Send }
];

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
          <button onClick={onLoginClick} className="btn-ghost">Login</button>
          <button onClick={onSignUpClick} className="btn-primary">Sign Up</button>
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
                  Demand pulse
                </p>
                <p className="mt-1 text-2xl font-bold text-white">AI/ML</p>
              </div>
              <span className="rounded-full bg-violet-400/15 px-3 py-1 text-sm font-semibold text-violet-200">
                +41%
              </span>
            </div>
            <LineSpark points={skills[1].points} color="#8B5CF6" className="mt-4 h-28 w-full" />
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
                  Match score
                </p>
                <p className="mt-1 text-xl font-bold text-white">Django + AWS</p>
              </div>
              <span className="text-3xl font-bold text-cyan-200">82%</span>
            </div>
            <div className="space-y-3">
              {["High-paying APIs", "Cloud migrations", "SaaS backends"].map((item, index) => (
                <div key={item}>
                  <div className="mb-1 flex justify-between text-xs text-slate-400">
                    <span>{item}</span>
                    <span>{78 + index * 6}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${78 + index * 6}%` }}
                      transition={{ duration: 0.9, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
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
                <p className="text-sm text-slate-400">Next best skill</p>
                <p className="font-semibold text-white">AI Agents</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map(({ label, value, suffix, icon: Icon }) => (
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
          ))}
        </div>
      </div>

      <div className="border-y border-white/10 bg-white/[0.03] py-3 backdrop-blur-xl">
        <div className="ticker-mask overflow-hidden">
          <div className="flex min-w-max animate-ticker gap-3">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="ticker-chip">
                {item}
              </span>
            ))}
          </div>
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

      <div className="grid gap-5 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <motion.article
            key={skill.name}
            className="glass-card overflow-hidden p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -6 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{skill.projects} open projects</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                {skill.growth}
              </span>
            </div>
            <LineSpark points={skill.points} color={skill.color} className="mt-5 h-24 w-full" />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-950/40 p-3">
                <p className="text-xs text-slate-500">Avg freelance rate</p>
                <p className="mt-1 text-lg font-bold text-white">{skill.rate}</p>
              </div>
              <div className="rounded-2xl bg-slate-950/40 p-3">
                <p className="text-xs text-slate-500">Demand score</p>
                <p className="mt-1 text-lg font-bold text-white">{skill.demand}/100</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs text-slate-400">
                <span>Hiring momentum</span>
                <span>{skill.demand}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, #06B6D4)`
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.demand}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="glass-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Hiring trend graph</h3>
              <p className="text-sm text-slate-400">Weekly demand across premium project posts</p>
            </div>
            <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
              Live
            </span>
          </div>
          <BarStack values={[46, 70, 52, 84, 68, 92, 78, 88, 64, 96, 74, 86]} />
        </div>

        <div className="glass-card p-5">
          <h3 className="text-xl font-bold text-white">Portfolio alignment</h3>
          <p className="mt-1 text-sm text-slate-400">Circular fit chart based on your skill graph</p>
          <div className="mt-6 space-y-6">
            <RadialMeter value={82} label="Django + AWS" />
            <RadialMeter value={74} label="React + Analytics" />
          </div>
        </div>
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
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="glass-card flex min-h-[320px] flex-col p-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -7 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full bg-blue-400/10 px-3 py-1 text-sm font-semibold text-blue-100">
                {project.match}% match
              </span>
              <div className="flex items-center gap-1 text-sm text-amber-200">
                <Star className="h-4 w-4 fill-current" />
                {project.rating}
              </div>
            </div>
            <h3 className="text-xl font-bold leading-snug text-white">{project.title}</h3>
            <p className="mt-3 text-2xl font-bold text-cyan-100">{project.budget}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span key={skill} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-auto grid gap-3 pt-6 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  Duration
                </span>
                <span>{project.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-500" />
                  Proposals
                </span>
                <span>{project.proposals}</span>
              </div>
              <button className="mt-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02]">
                View opportunity
              </button>
            </div>
          </motion.article>
        ))}
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
      <div className="grid gap-5 lg:grid-cols-3">
        {freelancers.map((freelancer, index) => (
          <motion.article
            key={freelancer.name}
            className="glass-card overflow-hidden p-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -7 }}
          >
            <div className="flex items-center gap-4">
              <div
                className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${freelancer.gradient} text-xl font-bold text-white shadow-lg`}
              >
                {freelancer.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{freelancer.name}</h3>
                  <BadgeCheck className="h-5 w-5 fill-cyan-300 text-slate-950" />
                </div>
                <p className="text-sm text-slate-400">{freelancer.role}</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-sm text-slate-500">Rating</p>
                  <p className="mt-1 font-bold text-white">{freelancer.rating}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Projects</p>
                  <p className="mt-1 font-bold text-white">{freelancer.projects}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Earned</p>
                  <p className="mt-1 font-bold text-white">{freelancer.earnings}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {freelancer.skills.map((skill) => (
                <span key={skill} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="h-24 bg-[radial-gradient(circle_at_25%_25%,rgba(6,182,212,0.35),transparent_34%),linear-gradient(135deg,rgba(59,130,246,0.45),rgba(139,92,246,0.28))]" />
              <div className="flex items-center justify-between p-4">
                <span className="flex items-center gap-2 text-sm text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  {freelancer.availability}
                </span>
                <button className="text-sm font-semibold text-cyan-200" type="button">
                  View portfolio
                </button>
              </div>
            </div>
          </motion.article>
        ))}
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
            <div className="rounded-2xl bg-gradient-to-r from-blue-500/15 to-violet-500/15 p-4">
              <p className="text-lg font-semibold leading-8 text-white">
                Your Django + AWS skills match 82% of high-paying projects.
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Add AI agents and Stripe billing examples to unlock an estimated
                $28/hr rate lift.
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Learn", "AI agents", "+41%"],
                ["Watch", "Vector DBs", "+29%"],
                ["Pitch", "SaaS APIs", "$9.2k avg"]
              ].map(([label, value, delta]) => (
                <div key={value} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
                  <p className="mt-2 font-bold text-white">{value}</p>
                  <p className="mt-1 text-sm text-cyan-200">{delta}</p>
                </div>
              ))}
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
          <div className="space-y-4 p-5">
            <div className="message-bubble left">
              The analytics prototype looks strong. Could you add a market-demand view for AWS roles?
            </div>
            <div className="message-bubble right">
              Yes. I can add a skill demand chart, hourly rate trend, and proposal competition score.
            </div>
            <div className="message-bubble left max-w-[80%]">
              Perfect. Can you include it in the first milestone?
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="typing-dot" />
              <span className="typing-dot animation-delay-150" />
              <span className="typing-dot animation-delay-300" />
              Nora is typing
            </div>
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
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  return (
    <section className="section-shell">
      <SectionHeading
        eyebrow="Customer stories"
        title="Freelancers and clients use GigPulse to move before the market is obvious."
      />
      <div className="glass-card mx-auto max-w-4xl p-6 text-center sm:p-10">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-white">
          {testimonial.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>
        <motion.blockquote
          key={testimonial.quote}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl"
        >
          "{testimonial.quote}"
        </motion.blockquote>
        <p className="mt-6 font-bold text-cyan-100">{testimonial.name}</p>
        <p className="text-sm text-slate-400">{testimonial.role}</p>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              className={`h-2.5 rounded-full transition-all ${
                active === index ? "w-10 bg-cyan-300" : "w-2.5 bg-white/20"
              }`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section id="dashboard" className="section-shell">
      <SectionHeading
        eyebrow="Freelancer dashboard"
        title="Your work, pipeline, analytics, and AI insights in one command center."
        copy="The logged-in experience combines Stripe-style metrics, Linear-speed navigation, and market intelligence built for daily freelance decisions."
      />
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button className="icon-button" type="button" aria-label="Toggle sidebar">
              <PanelLeft className="h-4 w-4" />
            </button>
            <div>
              <p className="text-sm text-slate-400">Welcome back</p>
              <h3 className="text-xl font-bold text-white">Arjun's Pulse</h3>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                className="h-10 w-72 rounded-full border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white outline-none"
                placeholder="Search messages, jobs, insights"
              />
            </div>
            <NewProposalButton />
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr]">
          <aside className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
            <div className="flex gap-2 overflow-x-auto lg:grid lg:gap-2 lg:overflow-visible">
              {sidebarItems.map(({ label, icon: Icon }, index) => (
                <button
                  key={label}
                  className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    index === 0
                      ? "bg-gradient-to-r from-blue-500/25 to-cyan-400/15 text-white"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </aside>

          <main className="p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {dashboardMetrics.map(({ label, value, delta, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-cyan-200">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-emerald-200">{delta}</span>
                  </div>
                  <p className="mt-5 text-sm text-slate-400">{label}</p>
                  <p className="mt-1 text-2xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white">Earnings analytics</h4>
                    <p className="text-sm text-slate-400">Revenue, demand, and proposal momentum</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                    90 days
                  </span>
                </div>
                <LineSpark
                  points={[28, 34, 31, 48, 46, 59, 71, 67, 82, 88, 84, 96]}
                  color="#06B6D4"
                  className="h-72 w-full"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h4 className="text-lg font-bold text-white">AI recommendations</h4>
                <div className="mt-4 space-y-3">
                  {[
                    "Publish AWS cost dashboard case study",
                    "Bid on 3 SaaS API projects this week",
                    "Add vector search to portfolio tags"
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-950/40 p-3">
                      <Sparkles className="mt-0.5 h-4 w-4 text-cyan-200" />
                      <p className="text-sm leading-6 text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-dashed border-white/15 p-4">
                  <p className="text-sm font-semibold text-white">Saved Jobs</p>
                  <p className="mt-1 text-sm text-slate-500">
                    No saved jobs match the current AI filter.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 xl:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white">Recent activity</h4>
                  <button className="text-sm font-semibold text-cyan-200" type="button">
                    View all
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    ["Proposal accepted", "AI CRM dashboard", "2h ago"],
                    ["Portfolio viewed", "Cloudlane CTO", "5h ago"],
                    ["Milestone due", "Stripe billing redesign", "Tomorrow"]
                  ].map(([event, detail, time]) => (
                    <div key={event} className="flex items-center justify-between rounded-2xl bg-slate-950/40 p-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-semibold text-white">{event}</p>
                          <p className="text-sm text-slate-400">{detail}</p>
                        </div>
                      </div>
                      <span className="text-sm text-slate-500">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h4 className="text-lg font-bold text-white">Onboarding</h4>
                <div className="mt-4 space-y-3">
                  {["Connect portfolio", "Choose skill watchlist", "Send first smart proposal"].map(
                    (item, index) => (
                      <motion.div
                        key={item}
                        className="rounded-2xl bg-slate-950/40 p-4"
                        initial={{ opacity: 0.4, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-100">
                            {index + 1}
                          </span>
                          <p className="font-medium text-white">{item}</p>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
                <div className="mt-5 space-y-2">
                  <div className="skeleton-line w-full" />
                  <div className="skeleton-line w-4/5" />
                  <div className="skeleton-line w-2/3" />
                </div>
              </div>
            </div>
          </main>
        </div>
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
    // placeholder: open proposal creation flow
    alert("Open New Proposal flow (not implemented)");
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
