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
import gigpulseLogo from "./assets/gigpulse-logo.svg";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import AuthModal from "./components/AuthModal";

const marketingNavItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Explore Projects", href: "#projects", icon: Folder },
  { label: "Market Trends", href: "#trends", icon: LineChart },
  { label: "Freelancers", href: "#freelancers", icon: Users },
  { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
  { label: "Pricing", href: "#pricing", icon: DollarSign }
];

const stats = [
  { label: "Active projects", value: 1284, suffix: "+", icon: Folder },
  { label: "Verified freelancers", value: 842, suffix: "+", icon: Users },
  { label: "Skill signals tracked", value: 96, suffix: "", icon: TrendingUp }
];

const tickerItems = [
  "React demand +22%",
  "AI workflow roles rising",
  "Django APIs holding strong",
  "Cloud migration budgets up",
  "Product design briefs moving faster",
  "Verified profiles win 2.4x more replies"
];

const skills = [
  {
    name: "React",
    demand: 94,
    growth: 22,
    rate: 4200,
    competition: "Medium",
    filters: ["Remote", "High rate", "Fast growth"],
    points: [42, 48, 54, 58, 66, 74, 82],
    tags: ["Frontend", "SaaS", "Design systems"]
  },
  {
    name: "AI Workflows",
    demand: 91,
    growth: 31,
    rate: 5200,
    competition: "Low",
    filters: ["Remote", "High rate", "Fast growth", "Low competition"],
    points: [22, 26, 35, 44, 58, 71, 88],
    tags: ["Automation", "Agents", "Operations"]
  },
  {
    name: "Django",
    demand: 86,
    growth: 14,
    rate: 3900,
    competition: "Low",
    filters: ["Remote", "Low competition"],
    points: [48, 51, 53, 58, 61, 64, 69],
    tags: ["Backend", "APIs", "Security"]
  },
  {
    name: "AWS",
    demand: 89,
    growth: 18,
    rate: 5600,
    competition: "Medium",
    filters: ["High rate", "Fast growth"],
    points: [40, 43, 49, 55, 59, 67, 74],
    tags: ["Cloud", "DevOps", "Deployments"]
  },
  {
    name: "Product Design",
    demand: 84,
    growth: 12,
    rate: 3600,
    competition: "Medium",
    filters: ["Remote"],
    points: [52, 57, 54, 61, 66, 68, 72],
    tags: ["UX", "Research", "Prototyping"]
  },
  {
    name: "Data Engineering",
    demand: 88,
    growth: 19,
    rate: 5000,
    competition: "Low",
    filters: ["High rate", "Fast growth", "Low competition"],
    points: [36, 41, 45, 53, 57, 65, 78],
    tags: ["Pipelines", "Analytics", "Warehousing"]
  }
];

const projects = [
  {
    title: "Build a subscription analytics dashboard",
    client: "MeterStack",
    budget: "₹2.8L - ₹4.5L",
    duration: "6 weeks",
    match: 94,
    tags: ["React", "Django", "Charts"],
    urgency: "Hiring this week"
  },
  {
    title: "AI-assisted onboarding workflow",
    client: "Cloudlane",
    budget: "₹3.2L - ₹5.8L",
    duration: "8 weeks",
    match: 91,
    tags: ["AI Workflows", "UX", "APIs"],
    urgency: "Fast growth niche"
  },
  {
    title: "AWS deployment and reliability audit",
    client: "Northstar Labs",
    budget: "₹1.6L - ₹3.1L",
    duration: "3 weeks",
    match: 88,
    tags: ["AWS", "DevOps", "Security"],
    urgency: "Low competition"
  }
];

const freelancers = [
  {
    name: "Priya Nair",
    title: "Product Designer",
    rate: "₹3,600/hr",
    rating: "4.9",
    score: "96%",
    availability: "Available this week",
    skills: ["UX", "Design systems", "Research"]
  },
  {
    name: "Aarav Mehta",
    title: "Senior React Engineer",
    rate: "₹4,800/hr",
    rating: "4.8",
    score: "94%",
    availability: "2 slots open",
    skills: ["React", "TypeScript", "Stripe"]
  },
  {
    name: "Neel Shah",
    title: "Cloud Architect",
    rate: "₹5,600/hr",
    rating: "4.8",
    score: "92%",
    availability: "Starts Monday",
    skills: ["AWS", "Django", "Reliability"]
  }
];

const testimonials = [
  {
    quote: "GigPulse helped us shortlist verified talent faster and keep every proposal tied to real market signals.",
    name: "Sana Rao",
    role: "Founder, ProductOps Studio"
  },
  {
    quote: "The skill demand view made it obvious where to update my portfolio before pitching premium clients.",
    name: "Karan Iyer",
    role: "Independent full-stack developer"
  }
];

const dashboardMetrics = [
  { label: "Saved opportunities", value: "18", detail: "5 high-fit roles added this week" },
  { label: "Proposal win rate", value: "42%", detail: "+8% after profile updates" },
  { label: "Average rate", value: "₹4,700/hr", detail: "Based on matched skill clusters" }
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

function ActionBanner({ message, tone = "dark" }) {
  if (!message) return null;

  const toneClass =
    tone === "light"
      ? "border-blue-200 bg-blue-50 text-blue-800"
      : "border-cyan-300/20 bg-cyan-300/10 text-cyan-100";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${toneClass}`}>
      {message}
    </div>
  );
}

function scrollToSection(id) {
  const element = document.querySelector(id);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Navbar({ isLight, onToggleTheme, onLoginClick, onSignUpClick, onNavigate }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (query.length < 2) return [];
    return [
      ...skills.map((item) => ({ type: "Skill", label: item.name, href: "#trends" })),
      ...projects.map((item) => ({ type: "Project", label: item.title, href: "#projects" })),
      ...freelancers.map((item) => ({ type: "Talent", label: item.name, href: "#freelancers" }))
    ]
      .filter((item) => item.label.toLowerCase().includes(query))
      .slice(0, 5);
  }, [searchTerm]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const firstResult = searchResults[0];
    if (firstResult) {
      window.location.hash = firstResult.href;
      scrollToSection(firstResult.href);
    } else if (searchTerm.trim()) {
      scrollToSection("#trends");
    }
    setNotificationsOpen(false);
  }

  const notifications = ["React jobs spiked 22% today", "New client reply from MeterStack", "AI agents added to your watchlist"];

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r border-white/10 bg-slate-950/[0.92] px-5 py-5 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl lg:flex">
        <a href="#home" className="flex items-center gap-3 rounded-2xl px-2 py-2">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 shadow-glow">
            <img src={gigpulseLogo} alt="GigPulse" className="h-8 w-8" />
          </span>
          <div>
            <span className="font-display text-xl font-bold text-white">GigPulse</span>
            <p className="text-xs text-slate-400">Market intelligence</p>
          </div>
        </a>

        <nav className="mt-8 grid gap-1">
          {marketingNavItems.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition group-hover:border-cyan-300/30 group-hover:text-cyan-200">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-8 rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Workspace</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Jump into the focused client or freelancer dashboard when you are signed in.
          </p>
          <div className="mt-4 grid gap-2">
            <button className="btn-ghost w-full justify-start px-4" type="button" onClick={() => onNavigate?.("/client")}>
              <Users className="h-4 w-4" />
              Client Workspace
            </button>
            <button className="btn-ghost w-full justify-start px-4" type="button" onClick={() => onNavigate?.("/freelancer")}>
              <UserRound className="h-4 w-4" />
              Freelancer Workspace
            </button>
          </div>
        </div>

        <div className="mt-auto grid gap-3 border-t border-white/10 pt-5">
          {user ? (
            <>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="mt-1 truncate text-sm font-semibold text-white">{user.full_name || user.username || user.email}</p>
              </div>
              <button type="button" onClick={() => logout()} className="btn-ghost w-full">
                Logout
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={onLoginClick} className="btn-ghost px-4">
                Login
              </button>
              <button type="button" onClick={onSignUpClick} className="btn-primary px-4">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/[0.82] backdrop-blur-2xl lg:left-72">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 shadow-glow">
              <img src={gigpulseLogo} alt="GigPulse" className="h-8 w-8" />
            </span>
            <span className="font-display text-lg font-bold text-white">GigPulse</span>
          </a>

          <div className="hidden min-w-0 lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">GigPulse marketplace</p>
            <p className="text-sm text-slate-400">Clean demand signals for smarter freelance decisions</p>
          </div>

          <form className="relative hidden w-full max-w-lg lg:block" onSubmit={handleSearchSubmit}>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:bg-white/10"
              placeholder="Search skills, projects, or freelancers"
            />
            <button
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"
              type="submit"
              aria-label="Search"
            >
              <Filter className="h-4 w-4" />
            </button>
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
                {searchResults.map((result) => (
                  <button
                    key={`${result.type}-${result.label}`}
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10"
                    onClick={() => {
                      setSearchTerm(result.label);
                      window.location.hash = result.href;
                      scrollToSection(result.href);
                    }}
                  >
                    <span className="truncate">{result.label}</span>
                    <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-cyan-300">{result.type}</span>
                  </button>
                ))}
              </div>
            )}
          </form>

          <div className="ml-auto flex items-center gap-2">
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
            {!user && (
              <div className="hidden items-center gap-2 sm:flex">
                <button type="button" onClick={onLoginClick} className="btn-ghost px-4">
                  Login
                </button>
                <button type="button" onClick={onSignUpClick} className="btn-primary px-4">
                  Sign Up
                </button>
              </div>
            )}
            <button
              type="button"
              className="icon-button lg:hidden"
              onClick={() => setOpen((current) => !current)}
              aria-label="Open mobile menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {notificationsOpen && (
          <motion.div
            className="absolute right-4 top-full mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {notifications.map((item) => (
              <div key={item} className="mb-3 flex items-start gap-3 last:mb-0">
                <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </motion.div>
        )}

        {open && (
          <motion.div
            className="border-t border-white/10 bg-slate-950/[0.96] px-4 py-4 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <div className="grid gap-2">
              {marketingNavItems.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                >
                  <Icon className="h-4 w-4 text-cyan-200" />
                  {label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onNavigate?.("/client");
                }}
                className="rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/10"
                type="button"
              >
                Client Workspace
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onNavigate?.("/freelancer");
                }}
                className="rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/10"
                type="button"
              >
                Freelancer Workspace
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="btn-ghost" type="button" onClick={onToggleTheme}>
                {isLight ? "Dark" : "Light"}
              </button>
              {user ? (
                <button className="btn-ghost justify-center" type="button" onClick={() => logout()}>
                  Logout
                </button>
              ) : (
                <>
                  <button className="btn-ghost justify-center" type="button" onClick={onLoginClick}>
                    Login
                  </button>
                  <button className="btn-primary col-span-2 justify-center" type="button" onClick={onSignUpClick}>
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </header>
    </>
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
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('openAuth', { detail: { type: 'register' } }))} className="btn-primary h-12 justify-center px-6 text-base">
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <a href="#trends" className="btn-ghost h-12 justify-center px-6 text-base">
              Explore Trends
              <BarChart3 className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
            Browse live-style market signals, save opportunities, and move into the role-specific workspace after sign-in.
          </div>
        </motion.div>

        <div className="grid gap-5 self-center">
          <motion.div
            className="glass-panel p-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Live data
                </p>
                <p className="mt-1 text-2xl font-bold text-white">React demand</p>
              </div>
              <span className="rounded-full bg-violet-400/15 px-3 py-1 text-sm font-semibold text-violet-200">
                +22%
              </span>
            </div>
            <div className="mt-4">
              <LineSpark points={skills[0].points} color="#06B6D4" className="h-28 w-full" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-slate-400">
              {["Remote", "SaaS", "High rate"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass-panel p-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.38 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Workspaces
                </p>
                <p className="mt-1 text-xl font-bold text-white">Top project fit</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-slate-300">
                94%
              </span>
            </div>
            <div className="space-y-3">
              {projects.slice(0, 2).map((project) => (
                <div key={project.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                  <p className="font-semibold text-white">{project.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{project.budget} · {project.duration}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass-panel p-5"
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
                <p className="font-semibold text-white">Create profile</p>
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
        <div className="ticker-mask mx-auto flex max-w-7xl gap-3 overflow-hidden px-4 sm:px-6 lg:px-8">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`} className="ticker-chip shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingSkills() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const filteredSkills = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesQuery =
        !normalized ||
        skill.name.toLowerCase().includes(normalized) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(normalized));
      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.every((filter) => skill.filters.includes(filter));
      return matchesQuery && matchesFilters;
    });
  }, [activeFilters, query]);

  function toggleFilter(filter) {
    setActiveFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter]
    );
  }

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 bg-slate-950/40 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-300/70"
            placeholder="Search React, AI/ML, AWS, Django..."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["Remote", "High rate", "Fast growth", "Low competition"].map((item) => (
            <button
              key={item}
              className={`category-pill ${activeFilters.includes(item) ? "border-cyan-300/50 bg-cyan-300/15 text-white" : ""}`}
              type="button"
              onClick={() => toggleFilter(item)}
            >
              {item}
            </button>
          ))}
          <button className="btn-ghost h-12" type="button" onClick={() => setActiveFilters([])}>
            <SlidersHorizontal className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {filteredSkills.map((skill, index) => (
          <motion.article
            key={skill.name}
            className="glass-card min-w-0 p-5"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{skill.tags.join(" · ")}</p>
              </div>
              <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                {skill.demand}% demand
              </span>
            </div>
            <LineSpark points={skill.points} color="#06B6D4" className="mt-5 h-28 w-full" />
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-slate-400">Growth</p>
                <p className="mt-1 font-semibold text-white">+{skill.growth}%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-slate-400">Rate</p>
                <p className="mt-1 font-semibold text-white">₹{skill.rate.toLocaleString()}/hr</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-slate-400">Comp.</p>
                <p className="mt-1 font-semibold text-white">{skill.competition}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {skill.filters.map((filter) => (
                <span key={filter} className="skill-badge">{filter}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
      {filteredSkills.length === 0 && (
        <div className="glass-card p-8 text-center text-slate-300">
          No skill signals match that search. Clear filters or try another keyword.
        </div>
      )}
    </section>
  );
}

function Projects() {
  const [query, setQuery] = useState("");
  const [savedProjects, setSavedProjects] = useState([]);
  const [message, setMessage] = useState("");

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(normalized) ||
        project.client.toLowerCase().includes(normalized) ||
        project.tags.some((tag) => tag.toLowerCase().includes(normalized))
    );
  }, [query]);

  function toggleSaved(projectTitle) {
    setSavedProjects((current) =>
      current.includes(projectTitle)
        ? current.filter((item) => item !== projectTitle)
        : [...current, projectTitle]
    );
    setMessage(
      savedProjects.includes(projectTitle)
        ? "Project removed from saved jobs."
        : "Project saved to your dashboard."
    );
  }

  function viewProject(projectTitle) {
    setMessage(`Opening the brief for "${projectTitle}". Sign in to submit a proposal.`);
    window.dispatchEvent(new CustomEvent("openAuth", { detail: { type: "login" } }));
  }

  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Explore projects"
        title="High-signal freelance work, ranked by fit and demand."
        copy="Every project card blends client quality, required skills, competition, budget, and timing so freelancers can act faster."
      />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-300/70"
            placeholder="Filter by title, client, or skill"
          />
        </div>
        <ActionBanner message={message} />
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {filteredProjects.map((project, index) => {
          const isSaved = savedProjects.includes(project.title);
          return (
            <motion.article
              key={project.title}
              className="glass-card flex min-w-0 flex-col p-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">{project.client}</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{project.title}</h3>
                </div>
                <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-sm font-semibold text-emerald-100">
                  {project.match}% fit
                </span>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <span>Budget</span>
                  <span className="font-semibold text-white">{project.budget}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <span>Timeline</span>
                  <span className="font-semibold text-white">{project.duration}</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="skill-badge">{tag}</span>
                ))}
              </div>
              <p className="mt-4 text-sm text-cyan-100">{project.urgency}</p>
              <div className="mt-auto flex gap-3 pt-6">
                <button className="btn-primary flex-1 justify-center" type="button" onClick={() => viewProject(project.title)}>
                  View brief
                </button>
                <button
                  className="icon-button shrink-0"
                  type="button"
                  onClick={() => toggleSaved(project.title)}
                  aria-label={isSaved ? "Unsave project" : "Save project"}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? "fill-cyan-300 text-cyan-300" : ""}`} />
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function FreelancerProfiles() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const filteredFreelancers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return freelancers;
    return freelancers.filter(
      (person) =>
        person.name.toLowerCase().includes(normalized) ||
        person.title.toLowerCase().includes(normalized) ||
        person.skills.some((skill) => skill.toLowerCase().includes(normalized))
    );
  }, [query]);

  return (
    <section id="freelancers" className="section-shell">
      <SectionHeading
        eyebrow="Freelancers"
        title="Profiles that convert demand into credibility."
        copy="Verification, portfolio previews, earnings proof, and skill tags help clients understand fit in seconds."
      />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-300/70"
            placeholder="Search talent by skill or role"
          />
        </div>
        <ActionBanner message={message} />
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {filteredFreelancers.map((person, index) => (
          <motion.article
            key={person.name}
            className="glass-card flex min-w-0 flex-col p-5"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 text-lg font-bold text-white">
                {person.name.split(" ").map((part) => part[0]).join("")}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-xl font-bold text-white">{person.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{person.title}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-slate-400">Rate</p>
                <p className="mt-1 font-semibold text-white">{person.rate}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-slate-400">Rating</p>
                <p className="mt-1 font-semibold text-white">{person.rating}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <p className="text-slate-400">Match</p>
                <p className="mt-1 font-semibold text-white">{person.score}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {person.skills.map((skill) => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-cyan-100">{person.availability}</p>
            <button
              className="btn-ghost mt-6 justify-center"
              type="button"
              onClick={() => setMessage(`${person.name}'s profile is ready to review in the client workspace.`)}
            >
              Open profile
              <ArrowUpRight className="h-4 w-4" />
            </button>
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
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-300">
              <div className="space-y-3">
                {[
                  "Add AI workflow examples to your portfolio this week.",
                  "Prioritize React + analytics briefs above low-budget landing pages.",
                  "Raise cloud reliability proposals by 12% where AWS is required."
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatPreview() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState([
    { side: "left", text: "Can you share a short milestone plan for the analytics dashboard?" },
    { side: "right", text: "Yes. I will split it into discovery, prototype, build, and QA checkpoints." },
    { side: "left", text: "Perfect. Please include weekly review windows." }
  ]);

  function sendReply() {
    const trimmed = reply.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { side: "right", text: trimmed }]);
    setReply("");
  }

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
            <button
              className="icon-button"
              type="button"
              aria-label="Open chat settings"
              onClick={() => setSettingsOpen((current) => !current)}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          {settingsOpen && (
            <div className="border-b border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-slate-300">
              Chat settings: notifications on, project context pinned, secure file sharing enabled.
            </div>
          )}
          <div className="space-y-4 p-5 text-slate-300">
            {messages.map((message, index) => (
              <div key={`${message.text}-${index}`} className={`message-bubble ${message.side}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendReply();
                }}
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
                placeholder="Write a reply"
              />
              <button className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 text-slate-950" type="button" onClick={sendReply}>
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
  const [selectedPlan, setSelectedPlan] = useState("");
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
            <button
              className={tier.popular ? "btn-primary mt-8 w-full justify-center" : "btn-ghost mt-8 w-full justify-center"}
              type="button"
              onClick={() => {
                setSelectedPlan(tier.name);
                window.dispatchEvent(new CustomEvent("openAuth", { detail: { type: "register" } }));
              }}
            >
              {selectedPlan === tier.name ? "Selected" : "Choose plan"}
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
        title="Freelancers and clients move faster with clearer signals."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {testimonials.map((story) => (
          <article key={story.name} className="glass-card p-6">
            <p className="text-lg leading-8 text-slate-200">"{story.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-300/10 font-bold text-cyan-100">
                {story.name.split(" ").map((part) => part[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-white">{story.name}</p>
                <p className="text-sm text-slate-400">{story.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Dashboard() {
  const [activeMetric, setActiveMetric] = useState(dashboardMetrics[0].label);

  return (
    <section id="dashboard" className="section-shell">
      <SectionHeading
        eyebrow="Freelancer dashboard"
        title="Your dashboard turns signals into next actions."
        copy="Preview the kind of opportunity, proposal, and rate insights available after sign-in."
      />
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="glass-card p-4">
          <div className="grid gap-2">
            {sidebarItems.slice(0, 6).map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                  activeMetric === label ? "bg-cyan-300/10 text-white" : "text-slate-300 hover:bg-white/10"
                }`}
                onClick={() => setActiveMetric(label)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {dashboardMetrics.map((metric) => (
            <button
              key={metric.label}
              type="button"
              className="glass-card p-5 text-left transition hover:-translate-y-1 hover:border-cyan-300/40"
              onClick={() => setActiveMetric(metric.label)}
            >
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-3 text-2xl font-bold text-white">{metric.value}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{metric.detail}</p>
            </button>
          ))}
          <div className="glass-card sm:col-span-3 p-5">
            <p className="text-sm font-semibold text-white">Selected workspace area</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {activeMetric} is active. Sign in to sync this preview with your real saved jobs, profile data, and proposal pipeline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setMessage("Enter a valid email to subscribe.");
      return;
    }
    setMessage("Subscribed. Market updates will arrive in your inbox.");
    setEmail("");
  }

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
            {[
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Globe, href: "#home", label: "Website" }
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} className="icon-button" href={href} aria-label={label}>
                <Icon className="h-4 w-4" />
              </a>
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
                <a key={link} href={link === "Pricing" ? "#pricing" : link === "Projects" ? "#projects" : link === "Market Trends" ? "#trends" : "#home"} className="text-sm text-slate-400 transition hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-500">© 2026 GigPulse. All rights reserved.</p>
        <form className="flex w-full max-w-md flex-col gap-2 sm:flex-row" onSubmit={handleSubscribe}>
          <div className="min-w-0 flex-1">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none"
              placeholder="Email for market updates"
              type="email"
            />
            {message && <p className="mt-2 text-xs text-cyan-100">{message}</p>}
          </div>
          <button className="btn-primary h-11 justify-center" type="submit">
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

  const [notice, setNotice] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [projectDraft, setProjectDraft] = useState({
    title: "",
    scope: "",
    budget: "",
    timeline: ""
  });
  const [projectSkills, setProjectSkills] = useState(["Product design", "React", "Brand systems", "Analytics"]);
  const [publishedProjects, setPublishedProjects] = useState([]);
  const [clientMessages, setClientMessages] = useState([
    { side: "left", text: "Hi Sivon, milestone 1 design files are ready for review." },
    { side: "right", text: "Thanks! I will review and share feedback by EOD." }
  ]);
  const [clientMessage, setClientMessage] = useState("");
  const [clientMilestones, setClientMilestones] = useState(milestones);
  const [releasedTotal, setReleasedTotal] = useState(0);

  function notify(message) {
    setNotice(message);
  }

  function updateProjectDraft(field, value) {
    setProjectDraft((current) => ({ ...current, [field]: value }));
  }

  function addProjectSkill() {
    const options = ["AI workflows", "Django", "AWS", "Data pipelines"];
    const nextSkill = options.find((skill) => !projectSkills.includes(skill));
    if (!nextSkill) {
      notify("All suggested skills are already added.");
      return;
    }
    setProjectSkills((current) => [...current, nextSkill]);
    notify(`${nextSkill} added to required skills.`);
  }

  function publishProject() {
    if (!projectDraft.title.trim() || !projectDraft.scope.trim()) {
      notify("Add a project title and scope summary before publishing.");
      return;
    }
    setPublishedProjects((current) => [
      {
        ...projectDraft,
        skills: projectSkills,
        id: Date.now()
      },
      ...current
    ]);
    setProjectDraft({ title: "", scope: "", budget: "", timeline: "" });
    notify("Project published to your proposal pipeline.");
  }

  function sendClientMessage() {
    const trimmed = clientMessage.trim();
    if (!trimmed) return;
    setClientMessages((current) => [...current, { side: "right", text: trimmed }]);
    setClientMessage("");
    notify("Message sent to the project thread.");
  }

  function releaseMilestone() {
    const nextMilestone = clientMilestones.find((milestone) => milestone.status !== "Released");
    if (!nextMilestone) {
      notify("All milestones are already released.");
      return;
    }
    setClientMilestones((current) =>
      current.map((milestone) =>
        milestone.title === nextMilestone.title
          ? { ...milestone, status: "Released" }
          : milestone
      )
    );
    setReleasedTotal((current) => current + 1);
    notify(`${nextMilestone.title} released successfully.`);
  }

  return (
    <div className="client-shell">
      <header className="client-topbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900/90">
              <img src={gigpulseLogo} alt="GigPulse" className="h-8 w-8" />
            </span>
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
            <button className="client-btn-ghost" type="button" onClick={() => notify("Team invite link created and ready to share.")}>Invite team</button>
            <button className="client-btn-primary" type="button" onClick={() => scrollToSection("#client-post")}>Post project</button>
            <button
              className="icon-button"
              type="button"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen((current) => !current)}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />
            </button>
            <button className="client-btn-ghost" type="button" onClick={() => onNavigate("/")}>Marketing site</button>
          </div>
        </div>
        {notificationsOpen && (
          <div className="mx-auto max-w-7xl px-6 pb-4">
            <div className="ml-auto grid max-w-md gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
              {notifications.map((note) => (
                <button
                  key={note.title}
                  type="button"
                  className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                  onClick={() => notify(note.title)}
                >
                  <span>{note.title}</span>
                  <span className="shrink-0 text-xs text-slate-400">{note.time}</span>
                </button>
              ))}
            </div>
          </div>
        )}
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
            <button
              className="mt-4 w-full rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
              type="button"
              onClick={() => scrollToSection("#client-compare")}
            >
              Review matches
            </button>
          </div>
          <div className="mt-6 text-xs text-slate-400">Settings · Security · Billing</div>
        </aside>

        <main className="min-w-0 flex-1 space-y-12">
          <ActionBanner message={notice} tone="light" />
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
                  <button className="client-btn-primary" type="button" onClick={() => scrollToSection("#client-post")}>
                    Post a premium project
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button className="client-btn-ghost" type="button" onClick={() => scrollToSection("#client-analytics")}>View hiring insights</button>
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
                <button className="client-btn-ghost" type="button" onClick={() => notify("Showing all proposals in the current pipeline.")}>View all</button>
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
                    <button className="client-btn-ghost" type="button" onClick={() => notify(`${proposal.name}'s proposal opened for review.`)}>Review</button>
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
                  <input
                    value={projectDraft.title}
                    onChange={(e) => updateProjectDraft("title", e.target.value)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                    placeholder="e.g., SaaS onboarding redesign"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Scope summary</label>
                  <textarea
                    value={projectDraft.scope}
                    onChange={(e) => updateProjectDraft("scope", e.target.value)}
                    className="min-h-[120px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                    placeholder="Key goals, deliverables, and success criteria."
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Budget range</label>
                    <input
                      value={projectDraft.budget}
                      onChange={(e) => updateProjectDraft("budget", e.target.value)}
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                      placeholder="₹3L - ₹6L"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Timeline</label>
                    <input
                      value={projectDraft.timeline}
                      onChange={(e) => updateProjectDraft("timeline", e.target.value)}
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                      placeholder="6 weeks"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Required skills</label>
                  <div className="flex flex-wrap gap-2">
                    {projectSkills.map((skill) => (
                      <span key={skill} className="client-pill">{skill}</span>
                    ))}
                    <button className="client-btn-ghost" type="button" onClick={addProjectSkill}>Add skill</button>
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
                <button className="mt-6 client-btn-primary" type="button" onClick={publishProject}>Publish project</button>
                {publishedProjects.length > 0 && (
                  <div className="mt-4 rounded-2xl border border-blue-100 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Latest published</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{publishedProjects[0].title}</p>
                    <p className="mt-1 text-xs text-slate-500">{publishedProjects[0].skills.join(", ")}</p>
                  </div>
                )}
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
                  <button className="mt-5 client-btn-ghost" type="button" onClick={() => notify(`${talent.name}'s comparison profile is open.`)}>Open profile</button>
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
                  {clientMessages.map((message, index) => (
                    <div
                      key={`${message.text}-${index}`}
                      className={message.side === "right" ? "rounded-2xl bg-blue-50 px-4 py-3 text-blue-700" : "rounded-2xl bg-slate-50 px-4 py-3"}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendClientMessage();
                    }}
                    className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-400"
                    placeholder="Type a message"
                  />
                  <button className="client-btn-primary" type="button" onClick={sendClientMessage}>
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
                <button className="mt-5 client-btn-ghost" type="button" onClick={() => notify("Team board opened with three active collaboration tasks.")}>Open team board</button>
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
                    <span>Released milestones</span>
                    <span className="font-semibold text-slate-900">{releasedTotal}/{clientMilestones.length}</span>
                  </div>
                  <div className="client-progress">
                    <div className="client-progress-bar" style={{ width: "72%" }} />
                  </div>
                  <p className="text-xs text-slate-400">72% of total budget secured</p>
                </div>
                <button className="mt-6 client-btn-primary" type="button" onClick={releaseMilestone}>Release milestone</button>
              </div>
              <div className="client-card">
                <p className="text-sm font-semibold text-slate-900">Milestones</p>
                <div className="mt-4 grid gap-3">
                  {clientMilestones.map((milestone) => (
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

  const [notice, setNotice] = useState("");
  const [profileRefreshes, setProfileRefreshes] = useState(0);
  const [filteredJobs, setFilteredJobs] = useState(false);
  const [proposalList, setProposalList] = useState(proposals);
  const [freelancerMessages, setFreelancerMessages] = useState([
    { side: "left", text: "We love the direction. Can you explore a darker hero?" },
    { side: "right", text: "Absolutely. I’ll share two variants by tomorrow." }
  ]);
  const [freelancerReply, setFreelancerReply] = useState("");
  const [weeklyGoalSet, setWeeklyGoalSet] = useState(false);

  const visibleJobMatches = filteredJobs
    ? jobMatches.filter((job) => Number.parseInt(job.match, 10) >= 90)
    : jobMatches;

  function notify(message) {
    setNotice(message);
  }

  function sharePortfolio() {
    navigator.clipboard?.writeText(window.location.origin + "/freelancer").catch(() => {});
    notify("Portfolio link copied for sharing.");
  }

  function refreshProfile() {
    setProfileRefreshes((current) => current + 1);
    notify("Profile refreshed with the latest portfolio and skill signals.");
  }

  function generateProposal() {
    const nextProposal = {
      name: "AI workflow implementation",
      status: "Draft",
      client: "Cloudlane"
    };
    setProposalList((current) => [nextProposal, ...current]);
    notify("New proposal draft generated in the tracker.");
  }

  function sendFreelancerReply() {
    const trimmed = freelancerReply.trim();
    if (!trimmed) return;
    setFreelancerMessages((current) => [...current, { side: "right", text: trimmed }]);
    setFreelancerReply("");
    notify("Reply sent to Orbit Cloud.");
  }

  return (
    <div className="freelancer-shell">
      <header className="freelancer-topbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10">
              <img src={gigpulseLogo} alt="GigPulse" className="h-8 w-8" />
            </span>
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
            <button className="freelancer-btn-ghost" type="button" onClick={sharePortfolio}>Share portfolio</button>
            <button className="freelancer-btn-primary" type="button" onClick={generateProposal}>New proposal</button>
            <button className="icon-button" type="button" aria-label="Notifications" onClick={() => notify("You have 3 proposal drafts and 2 client follow-ups due today.")}>
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
            <button
              className="mt-4 w-full rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
              type="button"
              onClick={() => scrollToSection("#freelancer-proposals")}
            >
              Launch assistant
            </button>
          </div>
          <div className="mt-6 text-xs text-slate-400">Reputation · Achievements · Settings</div>
        </aside>

        <main className="min-w-0 flex-1 space-y-12">
          <ActionBanner message={notice} />
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
                  <button className="freelancer-btn-primary" type="button" onClick={() => scrollToSection("#freelancer-jobs")}>
                    Discover new roles
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button className="freelancer-btn-ghost" type="button" onClick={refreshProfile}>
                    {profileRefreshes ? `Refreshed ${profileRefreshes}x` : "Refresh profile"}
                  </button>
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
                  <button className="freelancer-btn-ghost" type="button" onClick={() => notify("Portfolio customization panel opened.")}>Customize</button>
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
                  <button className="freelancer-btn-ghost" type="button" onClick={() => setFilteredJobs((current) => !current)}>
                    {filteredJobs ? "Show all" : "Filter"}
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {visibleJobMatches.map((job) => (
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
                <button
                  className="mt-5 freelancer-btn-primary"
                  type="button"
                  onClick={() => {
                    setWeeklyGoalSet(true);
                    notify("Weekly goal set: submit 3 high-fit proposals and update 2 case studies.");
                  }}
                >
                  {weeklyGoalSet ? "Goals set" : "Set weekly goals"}
                </button>
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
                  {proposalList.map((proposal) => (
                    <div key={proposal.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{proposal.name}</p>
                        <p className="text-xs text-slate-400">{proposal.client}</p>
                      </div>
                      <span className="freelancer-pill">{proposal.status}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-5 freelancer-btn-ghost" type="button" onClick={() => notify(`${proposalList.length} proposals are visible in your pipeline.`)}>View pipeline</button>
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
                <button className="mt-5 freelancer-btn-primary" type="button" onClick={generateProposal}>Generate proposal</button>
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
                  {freelancerMessages.map((message, index) => (
                    <div
                      key={`${message.text}-${index}`}
                      className={message.side === "right" ? "rounded-2xl bg-indigo-500/20 px-4 py-3 text-white" : "rounded-2xl bg-white/5 px-4 py-3"}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input
                    value={freelancerReply}
                    onChange={(e) => setFreelancerReply(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendFreelancerReply();
                    }}
                    className="h-11 min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-slate-200 outline-none transition focus:border-indigo-300"
                    placeholder="Write a reply"
                  />
                  <button className="freelancer-btn-primary" type="button" onClick={sendFreelancerReply}>
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
                <button className="mt-5 freelancer-btn-ghost" type="button" onClick={() => notify("Calendar opened with 3 upcoming touchpoints.")}>Open calendar</button>
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
      window.location.href = "/client#client-post";
      return;
    }
    window.location.href = "/freelancer#freelancer-proposals";
  }

  return (
    <button className="btn-primary h-10" type="button" onClick={handleClick}>
      New proposal
    </button>
  );
}

function FreelancerGate({ onNavigate, loading }) {
  return (
    <div className="freelancer-shell flex min-h-screen items-center justify-center px-6">
      <div className="freelancer-card max-w-xl text-center">
        <span className="freelancer-pill">Freelancer workspace</span>
        <h2 className="freelancer-heading mt-4 text-2xl font-semibold text-white">
          {loading ? "Loading your workspace" : "Sign in as a freelancer"}
        </h2>
        <p className="mt-3 text-sm text-slate-300">
          {loading
            ? "Syncing your profile and portfolio data."
            : "This area is reserved for freelancer accounts so your portfolio and earnings stay protected."}
        </p>
        {!loading && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="freelancer-btn-primary" type="button" onClick={() => onNavigate("/login")}
            >
              Login
            </button>
            <button className="freelancer-btn-ghost" type="button" onClick={() => onNavigate("/signup")}
            >
              Create freelancer account
            </button>
            <button className="freelancer-btn-ghost" type="button" onClick={() => onNavigate("/")}
            >
              Back to home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ClientGate({ onNavigate, loading }) {
  return (
    <div className="client-shell flex min-h-screen items-center justify-center px-6">
      <div className="client-card max-w-xl text-center">
        <span className="client-pill">Client workspace</span>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">
          {loading ? "Loading your client workspace" : "Sign in as a client"}
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          {loading
            ? "Syncing your hiring dashboard and proposal pipeline."
            : "This area is reserved for client accounts to keep proposals, contracts, and billing secure."}
        </p>
        {!loading && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="client-btn-primary" type="button" onClick={() => onNavigate("/login")}
            >
              Login
            </button>
            <button className="client-btn-ghost" type="button" onClick={() => onNavigate("/signup")}
            >
              Create client account
            </button>
            <button className="client-btn-ghost" type="button" onClick={() => onNavigate("/")}
            >
              Back to home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AppShell() {
  const { user, loading } = useAuth();
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
    const url = new URL(path, window.location.origin);
    setAppRoute(getAppRoute(url.pathname));
    if (url.hash) {
      window.setTimeout(() => scrollToSection(url.hash), 80);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function openAuth(type = "login") {
    navigate(type === "register" ? "/signup" : "/login");
  }

  if (appRoute.type === "auth") {
    return <AuthModal open onClose={() => navigate("/")} type={appRoute.mode} variant="page" />;
  }

  if (appRoute.type === "client") {
    if (loading || user?.role !== "client") {
      return <ClientGate onNavigate={navigate} loading={loading} />;
    }
    return <ClientApp onNavigate={navigate} />;
  }

  if (appRoute.type === "freelancer") {
    if (loading || user?.role !== "freelancer") {
      return <FreelancerGate onNavigate={navigate} loading={loading} />;
    }
    return <FreelancerApp onNavigate={navigate} />;
  }

  return (
    <div className={appClass}>
      <Navbar
        isLight={isLight}
        onToggleTheme={() => setIsLight((current) => !current)}
        onLoginClick={() => openAuth("login")}
        onSignUpClick={() => openAuth("register")}
        onNavigate={navigate}
      />
      <main className="lg:pl-72">
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
      <div className="lg:pl-72">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
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
