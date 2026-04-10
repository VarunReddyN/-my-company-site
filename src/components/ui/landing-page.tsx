"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Menu, X, ArrowRight, ChevronRight, Mail, MapPin,
  Send, Briefcase, Code, Zap, Phone, MailCheck, Settings2,
  Users, Clock, TrendingUp, Shield, CheckCircle, XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AIBodhiTree } from "@/components/ui/ai-bodhi-tree"
import { BodhiTreeSection } from "@/components/ui/bodhi-tree-section"
import { JourneyModal } from "@/components/ui/journey-modal"

/* ─── Animation presets ────────────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }
const itemAnim = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

/* ─── Static data ──────────────────────────────────────────────── */
const NAV_LINKS = ["Services", "How It Works", "About", "Contact"]

const PILLARS = [
  {
    color: "#e05555",
    icon: <Phone className="h-6 w-6" />,
    title: "AI Front Desk",
    headline: "Never miss a lead again.",
    desc: "We deploy an AI system that answers every inquiry, texts back missed calls in under 60 seconds, handles website chat, qualifies leads, and books appointments — around the clock, no extra staff needed.",
    tags: ["Missed-call text back", "Website chat & FAQ", "Booking & scheduling", "Lead capture"],
  },
  {
    color: "#e07030",
    icon: <MailCheck className="h-6 w-6" />,
    title: "AI Follow-Up Engine",
    headline: "No lead ever goes cold.",
    desc: "Automated sequences follow up on every inquiry, confirm appointments, send review requests, chase quotes, and reactivate old customers — on a schedule that would be impossible to manage manually.",
    tags: ["Appointment reminders", "Quote follow-up", "Review requests", "Win-back campaigns"],
  },
  {
    color: "#8060e0",
    icon: <Settings2 className="h-6 w-6" />,
    title: "AI Operations Assistant",
    headline: "Your back-office, automated.",
    desc: "Routine admin workflows — CRM updates, request routing, staff assignments, daily summaries — run automatically. Your team focuses on customers, not paperwork.",
    tags: ["CRM & Sheets updates", "Request routing", "Daily summaries", "Staff assignment"],
  },
]

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Map Your Business",
    desc: "We spend 30 minutes learning how leads come in, where follow-up breaks down, and which tasks your team repeats every single day. No assumptions — we learn your actual workflow.",
    color: "#e05555",
  },
  {
    n: "02",
    title: "Design the System",
    desc: "We design a custom AI system around your specific business type, customer journey, and bottlenecks. You see exactly what we'll build before we write a single line of code.",
    color: "#e07030",
  },
  {
    n: "03",
    title: "Build & Deploy",
    desc: "We build and launch your AI Front Desk, Follow-Up Engine, or Operations Assistant in 4-8 weeks. No disruption to your current operations. We handle every technical detail.",
    color: "#8060e0",
  },
  {
    n: "04",
    title: "Capture & Grow",
    desc: "Your system runs 24/7. Every lead gets a response. Every appointment gets a reminder. Every quote gets followed up. You measure the difference in your calendar and your revenue.",
    color: "#50c8a0",
  },
]

const BEFORE = [
  "Calls go to voicemail after hours. The lead calls your competitor.",
  "Inquiries sit unread for hours — or days.",
  "Follow-up is inconsistent. Half of it never happens.",
  "Staff spend their mornings answering the same 10 questions.",
  "No-shows cost you 10–15% of your appointments.",
  "CRM is outdated. No one has time to update it.",
]

const AFTER = [
  "Every missed call gets an instant text-back. Lead captured.",
  "AI responds in under 60 seconds — even at midnight.",
  "Every lead gets followed up automatically, on the right schedule.",
  "FAQs, bookings, and routine questions handled by AI.",
  "Automated reminder sequences reduce no-shows by up to 40%.",
  "CRM updates itself after every customer interaction.",
]

const WORK_ITEMS = [
  {
    tag: "Home Services",
    title: "How a roofing contractor stopped losing jobs after hours",
    metrics: ["3–5 leads/week recovered", "< 60 sec response time", "Booked from missed calls"],
    color: "#f5a342",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fit=crop",
    slug: "fraud-detection",
  },
  {
    tag: "Medical & Med Spa",
    title: "How a med spa reduced front-desk overload and no-shows",
    metrics: ["40% fewer no-shows", "2–3 hrs/day staff time saved", "Patient reactivation automated"],
    color: "#50c8a0",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&fit=crop",
    slug: "nlp-support-bot",
  },
  {
    tag: "Professional Services",
    title: "How a law firm doubled its consultation bookings in 8 weeks",
    metrics: ["2× more consultations booked", "Intake fully automated", "Zero dropped inquiries"],
    color: "#a080f0",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80&fit=crop",
    slug: "vision-qa",
  },
]

const FAQ_ITEMS = [
  { q: "Do you work with small businesses?", a: "Yes — small businesses are our primary focus. A local contractor gets the same senior attention as a regional chain. The system is sized to your budget; the engineering quality is the same." },
  { q: "How long does it take to go live?", a: "Most AI Front Desk and Follow-Up systems go live in 4–6 weeks. More complex Operations builds run 6–10 weeks. You see a working prototype before we launch." },
  { q: "How much does it cost?", a: "A discovery strategy call is free. AI system builds typically start from $3,500 USD. We give you a fixed-scope quote after the strategy call — no surprises, no hourly billing." },
  { q: "Do I need to be technical?", a: "No. You need to understand your business operations — we handle all the technical work. Setup, training, and launch are fully managed by us." },
  { q: "What happens after launch?", a: "Every project includes 30 days of post-launch support. Monthly maintenance retainers are available for ongoing performance monitoring and improvements." },
  { q: "Is my business data safe?", a: "Yes. Your data stays in your infrastructure. We don't store or retain any customer or business data. Privacy and security are engineered in from day one." },
]

/* ─── Logo mark — no letters, neural triangle ────────────────── */
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="lm-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#800000" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#800000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="lm-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6060" stopOpacity="1"/>
          <stop offset="55%" stopColor="#cc2020" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#800000" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="#0d0d0d"/>
      <rect width="32" height="32" rx="8" fill="url(#lm-bg)"/>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="7.25" fill="none" stroke="#800000" strokeOpacity="0.4" strokeWidth="0.75"/>
      {/* Outer triangle */}
      <path d="M16 7.5 L23.5 20.5 L8.5 20.5 Z" fill="none" stroke="#800000" strokeOpacity="0.28" strokeWidth="0.6"/>
      {/* Spokes center → nodes */}
      <line x1="16" y1="15.5" x2="16" y2="9" stroke="#c03030" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="round"/>
      <line x1="16" y1="15.5" x2="22.5" y2="20" stroke="#c03030" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="round"/>
      <line x1="16" y1="15.5" x2="9.5" y2="20" stroke="#c03030" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="round"/>
      {/* Top node */}
      <circle cx="16" cy="7.5" r="2.2" fill="#e05555"/>
      {/* Bottom nodes */}
      <circle cx="22.5" cy="20.5" r="1.9" fill="#c03535"/>
      <circle cx="9.5" cy="20.5" r="1.9" fill="#c03535"/>
      {/* Glowing core */}
      <circle cx="16" cy="15.5" r="3.6" fill="url(#lm-core)"/>
      <circle cx="16" cy="15.5" r="1.6" fill="#ff7070"/>
    </svg>
  )
}

/* ─── Scroll glow — zero on hero, builds from page 2, fades at end ── */
function ScrollGlowLayer() {
  const { scrollYProgress } = useScroll()

  // 0 through entire hero → ramps 0→1 across Services/BodhiTree/HowItWorks
  // → holds through BeforeAfter + CaseStudies → descends 1→0 through About/FAQ/CTA/Contact
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.44, 0.64, 0.96, 1],
    [0,  0,    1,    1,    0,   0],
  )

  // Parallax drift keeps them moving while opacity drives the 0-10 feel
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "-48vh"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["6vh", "-40vh"])

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ opacity, zIndex: 1, willChange: "opacity", contain: "strict" }}
    >
      {/* Left crimson — builds in from services section */}
      <motion.div style={{
        y: y1, willChange: "transform",
        position: "absolute", left: "-5%", top: "4%", width: "52%", height: "92%",
        background: "radial-gradient(ellipse at 18% 50%, rgba(155,0,0,0.22) 0%, rgba(95,0,0,0.08) 44%, transparent 70%)",
      }} />
      {/* Right crimson — brand red mirror */}
      <motion.div style={{
        y: y2, willChange: "transform",
        position: "absolute", right: "-5%", top: "8%", width: "50%", height: "86%",
        background: "radial-gradient(ellipse at 82% 44%, rgba(160,0,0,0.18) 0%, rgba(100,0,0,0.07) 44%, transparent 70%)",
      }} />
    </motion.div>
  )
}

/* ─── Aurora blob (GPU-optimised) ────────────────────────────── */
function AuroraBlob({
  color, w, h, style, delay = 0, dur = 5, scale: _scale = 0.1,
}: {
  color: string; w: number; h: number; style: React.CSSProperties; delay?: number; dur?: number; scale?: number;
}) {
  // Blur capped at 50px — larger values force massive GPU texture uploads
  const blur = Math.min(Math.round((w + h) / 14), 50)
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: w, height: h,
        background: `radial-gradient(ellipse, ${color} 0%, transparent 72%)`,
        filter: `blur(${blur}px)`,
        willChange: "opacity",
        ...style,
      }}
      animate={{ opacity: [0.75, 1, 0.75] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

/* ─── Main component ───────────────────────────────────────────── */
export function CreAIveConditioner() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [journeyOpen, setJourneyOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 480], [1, 0])
  const heroY = useTransform(scrollY, [0, 480], [0, -90])

  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 40))
    return unsub
  }, [scrollY])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="flex min-h-screen flex-col bg-[#030303] text-white overflow-x-hidden">
      <JourneyModal open={journeyOpen} onClose={() => setJourneyOpen(false)} />

      {/* ── NAVBAR ── */}
      <motion.header
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "border-b border-white/5 bg-[#030303]/90 backdrop-blur-xl shadow-2xl shadow-black/40" : "bg-transparent"}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <motion.div whileHover={{ rotate: 6, scale: 1.08 }} transition={{ type: "spring", stiffness: 400, damping: 14 }}>
              <LogoMark size={36} />
            </motion.div>
            <span className="font-bold text-base tracking-tight">
              cre<span className="text-[#e05555]">AI</span>ve <span className="text-gray-500 font-medium">Labs</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(label => (
              <button key={label}
                onClick={() => scrollTo(label.toLowerCase().replace(" ", "-"))}
                className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >{label}</button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-xl text-gray-400 hover:text-white" onClick={() => setJourneyOpen(true)}>
              Industry Blueprint
            </Button>
            <Button size="sm" className="rounded-xl bg-[#800000] hover:bg-[#a00000] text-white border-0"
              onClick={() => scrollTo("contact")}>
              Book a Free Call <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-[#030303] flex flex-col"
          >
            <div className="flex h-16 items-center justify-between px-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <LogoMark size={30} />
                <span className="font-bold">cre<span className="text-[#e05555]">AI</span>ve <span className="text-gray-500 font-medium text-sm">Labs</span></span>
              </div>
              <button onClick={() => setMenuOpen(false)}><X className="h-6 w-6" /></button>
            </div>
            <nav className="flex flex-col gap-1 p-6">
              {NAV_LINKS.map(label => (
                <button key={label} onClick={() => { setMenuOpen(false); scrollTo(label.toLowerCase().replace(" ", "-")) }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-medium hover:bg-white/5 text-left"
                >
                  {label} <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              ))}
              <div className="pt-6 space-y-3">
                <Button className="w-full rounded-xl bg-[#800000] hover:bg-[#a00000] border-0"
                  onClick={() => { setMenuOpen(false); scrollTo("contact") }}>
                  Book a Free Call
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <ScrollGlowLayer />
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center">
          {/* ── Aurora glow layer — 4 blobs max, GPU-safe ── */}
          <div className="absolute inset-x-0 -top-24 bottom-0 pointer-events-none">
            {/* ── Ultra-wide horizontal aurora band — sweeps edge to edge ── */}
            <AuroraBlob color="rgba(140,0,0,0.18)" w={1800} h={280} dur={7.0} delay={0}
              style={{ left: "50%", top: "18%", transform: "translate(-50%,-50%)" }} />
            {/* Crimson — AI Core zone */}
            <AuroraBlob color="rgba(168,0,0,0.20)" w={700} h={620} dur={4.5} delay={0}
              style={{ left: "64%", top: "46%", transform: "translate(-50%,-50%)" }} />
            {/* Amber — trunk & roots */}
            <AuroraBlob color="rgba(200,160,90,0.12)" w={480} h={320} dur={5.5} delay={1.2}
              style={{ left: "63%", top: "76%", transform: "translate(-50%,-50%)" }} />
            {/* Violet — Operations branch */}
            <AuroraBlob color="rgba(128,96,224,0.10)" w={340} h={320} dur={6.0} delay={1.8}
              style={{ right: "3%", top: "28%", transform: "translateY(-50%)" }} />
          </div>

          {/* Page-fade to black at bottom */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_65%,#030303)] pointer-events-none" />
          {/* Subtle grid texture */}
          <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }}
          />

          <motion.div style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-12 pb-8"
          >
            <div className="grid gap-10 lg:grid-cols-[48%_52%] items-center">
              {/* ── LEFT: copy ── */}
              <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-7">
                <motion.div variants={itemAnim}
                  className="inline-flex items-center gap-2 rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-sm text-[#e07070]"
                >
                  <Zap className="h-3.5 w-3.5" />
                  AI Automation for Service Businesses
                </motion.div>

                <motion.h1 variants={itemAnim}
                  className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.08] tracking-tight"
                >
                  The Intelligence Layer{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-[#e05555] via-[#c04040] to-[#800000] bg-clip-text text-transparent">
                      Between Your Business
                    </span>
                    <motion.span
                      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                      transition={{ delay: 0.9, duration: 0.7 }}
                      className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-[#800000] to-transparent"
                    />
                  </span>
                  {" "}and Your Customers.
                </motion.h1>

                <motion.p variants={itemAnim} className="max-w-lg text-lg text-gray-400 leading-relaxed">
                  We build AI-powered front-desk, follow-up, and operations systems that help service businesses{" "}
                  <span className="text-gray-200 font-medium">capture more leads</span>,{" "}
                  <span className="text-gray-200 font-medium">respond instantly</span>, and{" "}
                  <span className="text-gray-200 font-medium">eliminate repetitive admin work</span> — without hiring more staff.
                </motion.p>

                <motion.div variants={itemAnim} className="flex flex-wrap gap-3">
                  <Button size="lg" className="rounded-xl h-12 px-6 bg-[#800000] hover:bg-[#a00000] border-0 text-white"
                    onClick={() => scrollTo("contact")}>
                    Book a Free Call <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline"
                    className="rounded-xl h-12 px-6 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25"
                    onClick={() => scrollTo("how-it-works")}>
                    See How It Works
                  </Button>
                </motion.div>

                {/* Outcome stats row */}
                <motion.div variants={itemAnim}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
                >
                  {[
                    { val: "< 60s", lab: "First response" },
                    { val: "3–5×", lab: "More leads captured" },
                    { val: "40%", lab: "Fewer no-shows" },
                    { val: "10 hrs", lab: "Saved per week" },
                  ].map(({ val, lab }) => (
                    <div key={lab} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-center">
                      <p className="text-xl font-extrabold text-[#e05555]">{val}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{lab}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* ── RIGHT: AI tree ── */}
              <motion.div
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="absolute inset-0 -m-8 bg-[radial-gradient(ellipse_at_center,rgba(128,0,0,0.07)_0%,transparent_70%)]" />
                <AIBodhiTree className="w-full h-auto relative z-10" />
              </motion.div>
            </div>

            {/* Mobile tree */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 lg:hidden"
            >
              <AIBodhiTree className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="w-full py-20 md:py-28 relative overflow-hidden bg-[#030303]">
          {/* ── Section transition glow — fires once as hero exits ── */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: [0, 1, 0.5, 0], scaleX: [0.4, 1, 1, 1] }}
            viewport={{ once: true, margin: "0px 0px -40% 0px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 -top-px pointer-events-none"
            style={{
              height: "3px",
              background: "linear-gradient(to right, transparent 0%, rgba(160,0,0,0.5) 20%, rgba(224,85,85,0.9) 50%, rgba(160,0,0,0.5) 80%, transparent 100%)",
              boxShadow: "0 0 32px 10px rgba(140,0,0,0.35), 0 0 80px 28px rgba(90,0,0,0.18)",
              zIndex: 10,
            }}
          />
          {/* Bloom dome behind the line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.7, 0] }}
            viewport={{ once: true, margin: "0px 0px -40% 0px" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "240px",
              background: "radial-gradient(ellipse at 50% 0%, rgba(160,0,0,0.22) 0%, rgba(100,0,0,0.09) 45%, transparent 72%)",
              zIndex: 5,
            }}
          />
          {/* Services aurora — each pillar color converges at center */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <AuroraBlob color="rgba(160,0,0,0.10)"    w={560} h={420} dur={5.5} delay={0}
              style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
            <AuroraBlob color="rgba(224,85,85,0.08)"  w={340} h={300} dur={6.5} delay={0.5}
              style={{ left: "18%", top: "60%", transform: "translate(-50%,-50%)" }} />
            <AuroraBlob color="rgba(224,112,48,0.07)" w={320} h={280} dur={7.0} delay={1.2}
              style={{ left: "50%", top: "60%", transform: "translate(-50%,-50%)" }} />
            <AuroraBlob color="rgba(128,96,224,0.07)" w={320} h={280} dur={6.5} delay={1.8}
              style={{ right: "12%", top: "60%", transform: "translateY(-50%)" }} />
          </div>
          <div className="mx-auto max-w-7xl px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-14"
            >
              <span className="mb-3 inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                Three Core Systems
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                AI That Pays for Itself <span className="text-[#e05555]">in Weeks</span>
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-gray-500 text-lg">
                We don&apos;t sell &ldquo;AI.&rdquo; We sell faster response, more bookings, better follow-up, and less admin work — packaged into three focused systems.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid gap-5 md:grid-cols-3"
            >
              {PILLARS.map((p, i) => (
                <motion.div key={i} variants={itemAnim} whileHover={{ y: -8, transition: { duration: 0.22 } }}
                  className="group relative overflow-hidden rounded-3xl border border-white/6 bg-[#0a0a0a] p-7 flex flex-col transition-all hover:border-white/12"
                >
                  {/* Color top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl transition-all duration-500"
                    style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }}
                  />
                  {/* Hover glow */}
                  <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ backgroundColor: `${p.color}20` }}
                  />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5 relative"
                    style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}28` }}
                  >
                    {p.icon}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: p.color }}>{p.title}</p>
                  <h3 className="text-xl font-extrabold text-white mb-3">{p.headline}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}22` }}
                      >{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WORK / CASE STUDIES ── */}
        <section id="work" className="w-full py-20 md:py-28 bg-[#060606]">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-14"
            >
              <span className="mb-3 inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                Systems We Build
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                AI Systems Designed{" "}
                <span className="text-[#e05555]">for Real Businesses</span>
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-gray-500 text-lg">
                Each project is a custom-built AI system — scoped, built, and deployed for a specific business type and workflow.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid gap-5 md:grid-cols-3"
            >
              {WORK_ITEMS.map((w, i) => (
                <motion.div key={i} variants={itemAnim} whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/6 bg-[#0a0a0a] flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image src={w.img} alt={w.title} fill className="object-cover transition-transform duration-600 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#0a0a0a]" />
                    <span className="absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{ background: `${w.color}25`, color: w.color, border: `1px solid ${w.color}35` }}
                    >{w.tag}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-extrabold text-white text-base leading-snug mb-4">{w.title}</h3>
                    <ul className="space-y-2 flex-1 mb-5">
                      {w.metrics.map(m => (
                        <li key={m} className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: w.color }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/case-studies/${w.slug}`}
                      className="flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:underline underline-offset-4"
                      style={{ color: w.color }}
                    >
                      View Case Study <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 text-center">
              <Link href="/case-studies">
                <Button variant="outline" size="lg" className="rounded-xl border-white/12 bg-white/4 text-white hover:bg-white/8">
                  See All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── BODHI TREE SECTION (detailed interactive) ── */}
        <BodhiTreeSection />

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="w-full py-20 md:py-28 bg-[#060606] relative">
          {/* Cinematic glow bleeds into the What Changes section below */}
          <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(90,0,0,0.10) 60%, rgba(60,0,0,0.18) 100%)"
          }} />
          <div className="mx-auto max-w-7xl px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-16"
            >
              <span className="mb-3 inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                The Process
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                From Zero to Running{" "}
                <span className="text-[#e05555]">in 4–8 Weeks</span>
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-gray-500 text-lg">
                No endless planning phases. No generic templates. Every system is built specifically for your business workflows.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative"
            >
              {/* Connector line (desktop) */}
              <div className="hidden lg:block absolute top-[2.6rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent z-0" />

              {HOW_IT_WORKS.map((step, i) => (
                <motion.div key={i} variants={itemAnim}
                  className="relative flex flex-col gap-4 rounded-3xl border border-white/6 bg-[#0a0a0a] p-6 z-10"
                >
                  {/* Numbered badge */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-base font-extrabold"
                    style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}28` }}
                  >{step.n}</div>
                  <h3 className="font-bold text-white text-base">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Button size="lg" className="rounded-xl h-12 px-8 bg-[#800000] hover:bg-[#a00000] border-0 text-white"
                onClick={() => scrollTo("contact")}>
                Start the Process — Free Call <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── OUTCOMES: BEFORE / AFTER ── */}
        <section className="w-full py-20 md:py-28 relative overflow-hidden">
          {/* ── Cinematic backdrop — pure gradients, no filter:blur ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{
            background: [
              "radial-gradient(ellipse 55% 100% at 0% 50%, rgba(150,0,0,0.22) 0%, transparent 65%)",
              "radial-gradient(ellipse 55% 100% at 100% 50%, rgba(100,0,0,0.16) 0%, transparent 65%)",
              "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(110,0,0,0.18) 0%, transparent 68%)",
              "radial-gradient(ellipse 85% 55% at 50% 100%, rgba(90,0,0,0.15) 0%, transparent 68%)",
            ].join(", "),
          }} />
          <div className="mx-auto max-w-7xl px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-14"
            >
              <span className="mb-3 inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                The Transformation
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                What Changes When AI{" "}
                <span className="text-[#e05555]">Runs Your Front Desk</span>
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Before */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="rounded-3xl border border-red-900/25 bg-[#0a0505] p-7"
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-900/25">
                    <XCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Before creAIve</p>
                    <p className="text-xs text-gray-600 mt-0.5">How most service businesses operate today</p>
                  </div>
                </div>
                <ul className="space-y-3.5">
                  {BEFORE.map((item, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 text-sm text-gray-400"
                    >
                      <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-red-500/60" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* After */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="rounded-3xl border border-emerald-900/25 bg-[#040a06] p-7"
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-900/25">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">After creAIve</p>
                    <p className="text-xs text-gray-600 mt-0.5">What your business looks like with AI running the gaps</p>
                  </div>
                </div>
                <ul className="space-y-3.5">
                  {AFTER.map((item, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="w-full py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-14 lg:grid-cols-[1fr_420px] items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-7"
              >
                <span className="inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                  Who We Are
                </span>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.1]">
                  We Build Useful AI Systems.{" "}
                  <span className="text-[#e05555]">Not Hype.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  creAIve Labs is a boutique AI firm run by Varun Reddy — one senior AI engineer who personally designs, builds, and deploys every system. You will never be handed off to a junior developer or an account manager after the sales call.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  I started this because I believe AI should create real operational value for real businesses — not just look impressive in a pitch deck. Every system I build is measured by one thing: does it save you time, capture more revenue, or reduce operational friction? If not, we redesign it.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { icon: <Users className="h-5 w-5" />, title: "Direct with the founder", desc: "You work with me personally, start to finish." },
                    { icon: <Clock className="h-5 w-5" />, title: "Live in 4–8 weeks", desc: "No endless planning phases or pilot programs." },
                    { icon: <TrendingUp className="h-5 w-5" />, title: "ROI built in", desc: "Every system is instrumented to show its impact." },
                    { icon: <Shield className="h-5 w-5" />, title: "Fixed-scope pricing", desc: "What we quote is what you pay. No surprises." },
                  ].map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#800000]/12 text-[#e05555] mt-0.5">{d.icon}</div>
                      <div>
                        <p className="font-bold text-sm text-white">{d.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{d.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button className="rounded-xl bg-[#800000] hover:bg-[#a00000] border-0 text-white"
                    onClick={() => scrollTo("contact")}>
                    Work With Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link href="/case-studies">
                    <Button variant="outline" className="rounded-xl border-white/12 bg-white/4 text-white hover:bg-white/8">
                      View Case Studies
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Founder card */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
              >
                <div className="rounded-3xl border border-white/8 bg-[#0a0a0a] overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=800&q=80&fit=crop"
                      alt="Varun Reddy" fill className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
                  </div>
                  <div className="px-6 pt-4 pb-6 space-y-4">
                    <div>
                      <p className="text-lg font-extrabold text-white">Varun Reddy</p>
                      <p className="text-sm text-[#e07070]">Founder & AI Engineer — creAIve Labs</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      I build every system personally. Before writing code, I understand your business. After launch, I measure outcomes. That&apos;s the difference between AI that sits in a dashboard and AI that actually changes your operations.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["AI Automation", "NLP", "Machine Learning", "React", "Python", "MLOps"].map(s => (
                        <span key={s} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-[#800000]/25 bg-[#800000]/10 text-[#e07070]">{s}</span>
                      ))}
                    </div>
                    <div className="pt-1">
                      <motion.a href="https://cal.com/creaivelabs" target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-[#800000]/35 bg-[#800000]/10 px-4 py-3 hover:bg-[#800000]/18 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-bold text-white">Book a Free 30-Min Call</p>
                          <p className="text-xs text-gray-500">Pick a time — instant confirmation</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-[#e05555] shrink-0" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Founding client offer */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="mt-14 rounded-3xl border border-[#800000]/35 bg-gradient-to-br from-[#800000]/10 via-transparent to-transparent p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div>
                <p className="text-lg font-extrabold text-white mb-1.5">We&apos;re actively taking on founding clients.</p>
                <p className="text-sm text-gray-400 max-w-2xl">
                  You get direct founder access, priority scheduling, founding-client pricing, and a partner who is genuinely invested in making your first AI system a proven success. Limited spots.
                </p>
              </div>
              <Button size="lg" className="rounded-xl shrink-0 h-12 px-7 bg-[#800000] hover:bg-[#a00000] border-0 text-white"
                onClick={() => scrollTo("contact")}>
                Become a Founding Client <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full py-20 md:py-24 bg-[#060606]">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-12"
            >
              <span className="mb-3 inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">FAQ</span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Questions Before You Reach Out</h2>
            </motion.div>
            <div className="space-y-2">
              {FAQ_ITEMS.map(({ q, a }, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="rounded-2xl border border-white/6 bg-[#0a0a0a] overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-white text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {q}
                    <ChevronRight className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${openFaq === i ? "rotate-90" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="w-full py-24 md:py-32 relative overflow-hidden bg-[#030303]">
          {/* ── Ultra-wide stage aurora — left + right wings bleed off screen ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Center bloom — dense crimson core */}
            <AuroraBlob color="rgba(180,0,0,0.28)" w={900} h={700} dur={5.0} delay={0}
              style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
            {/* Ultra-wide sweep — full stage width */}
            <AuroraBlob color="rgba(155,0,0,0.18)" w={2000} h={420} dur={6.5} delay={0.4}
              style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
            {/* Left wing — bleeds off left edge */}
            <AuroraBlob color="rgba(200,30,30,0.15)" w={700} h={560} dur={7.0} delay={0.8}
              style={{ left: "-8%", top: "50%", transform: "translateY(-50%)" }} />
            {/* Right wing — bleeds off right edge */}
            <AuroraBlob color="rgba(170,0,0,0.14)" w={700} h={560} dur={7.0} delay={1.2}
              style={{ right: "-8%", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.022] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }}
          />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={itemAnim}
                className="inline-flex items-center gap-2 rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-sm text-[#e07070] mb-6"
              >
                <Zap className="h-3.5 w-3.5" /> Ready to build your AI system?
              </motion.div>
              <motion.h2 variants={itemAnim} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.08]">
                Let&apos;s Build the Intelligence Layer{" "}
                <span className="text-[#e05555]">Behind Your Business.</span>
              </motion.h2>
              <motion.p variants={itemAnim} className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Tell us how leads come in, where follow-up breaks down, and what your team repeats every day. We&apos;ll show you exactly where AI creates the biggest impact — no pitch, no pressure, honest answer in 30 minutes.
              </motion.p>
              <motion.div variants={itemAnim} className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="rounded-xl h-13 px-8 text-base bg-[#800000] hover:bg-[#a00000] border-0 text-white"
                  onClick={() => scrollTo("contact")}>
                  Book a Free Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline"
                  className="rounded-xl h-13 px-8 text-base border-white/15 bg-white/5 text-white hover:bg-white/10"
                  onClick={() => setJourneyOpen(true)}>
                  See Your Industry Blueprint
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="w-full py-20 md:py-28 bg-[#060606]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-start"
          >
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <span className="inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                Get in Touch
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.1]">
                Tell Me Your Problem.<br />
                <span className="text-[#e05555]">I&apos;ll Show You What AI Can Do.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Most clients come in knowing something is broken — they just don&apos;t know if AI is the right fix. That&apos;s what the first call is for. No pitch. No pressure. Honest answer in 30 minutes.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "United States" },
                  { icon: <Phone className="h-5 w-5" />, label: "Phone", value: "+1 (469) 777-6057" },
                  { icon: <Mail className="h-5 w-5" />, label: "Email", value: "hello@creaivelabs.com" },
                ].map(({ icon, label, value }) => (
                  <motion.div key={label} whileHover={{ x: 6 }} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#800000]/12 text-[#e05555]">{icon}</div>
                    <div>
                      <p className="text-xs text-gray-600">{label}</p>
                      <p className="font-medium text-sm text-white">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-4">
              <motion.a href="https://cal.com/creaivelabs" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between gap-4 rounded-2xl border border-[#800000]/45 bg-[#800000]/10 px-6 py-4 hover:bg-[#800000]/18 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-bold text-white text-sm">Book a Free 30-Min Strategy Call</p>
                  <p className="text-xs text-gray-500 mt-0.5">Pick a time — instant confirmation</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#e05555] shrink-0" />
              </motion.a>

              <div className="rounded-3xl border border-white/6 bg-[#0a0a0a] p-7">
                <h3 className="text-xl font-bold mb-1 text-white">Send a Message</h3>
                <p className="text-sm text-gray-500 mb-6">We&apos;ll get back to you within 24 hours.</p>
                <form className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const fd = new FormData(e.currentTarget)

                    // Save to Supabase dashboard
                    const { supabase } = await import("@/lib/supabase")
                    await supabase.from("leads").insert([{
                      name: `${fd.get("first_name")} ${fd.get("last_name")}`.trim(),
                      email: fd.get("email") as string,
                      service: fd.get("service") as string,
                      message: fd.get("message") as string,
                      source: "homepage",
                      status: "new",
                    }])

                    // Also send email via Web3Forms
                    fd.append("access_key", "2cc16080-a24e-45c3-bf1e-059390d77a26")
                    fd.append("subject", "New inquiry from creAIve Labs website")
                    await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd })
                    ;(e.target as HTMLFormElement).reset()
                    alert("Message sent! I'll reply within 24 hours.")
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">First name</label>
                      <Input name="first_name" placeholder="John" className="rounded-xl bg-white/4 border-white/8 text-white placeholder:text-gray-600" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300">Last name</label>
                      <Input name="last_name" placeholder="Doe" className="rounded-xl bg-white/4 border-white/8 text-white placeholder:text-gray-600" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input name="email" type="email" placeholder="john@company.com" className="rounded-xl bg-white/4 border-white/8 text-white placeholder:text-gray-600" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Business type</label>
                    <select name="service" className="flex h-10 w-full rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#800000]">
                      <option value="" className="bg-[#111]">What type of business do you have?</option>
                      <option className="bg-[#111]">Home Services / Contractor</option>
                      <option className="bg-[#111]">Restaurant / Cafe / Salon</option>
                      <option className="bg-[#111]">Real Estate / Property Management</option>
                      <option className="bg-[#111]">Medical / Dental / Med Spa</option>
                      <option className="bg-[#111]">Professional Services</option>
                      <option className="bg-[#111]">Retail / Local Shop</option>
                      <option className="bg-[#111]">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Message</label>
                    <Textarea name="message" placeholder="Tell us where leads fall through or what your team repeats every day..." className="min-h-[110px] rounded-xl bg-white/4 border-white/8 text-white placeholder:text-gray-600" />
                  </div>
                  <Button type="submit" className="w-full rounded-xl h-11 bg-[#800000] hover:bg-[#a00000] border-0 text-white">
                    Send Message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full border-t border-white/5 bg-[#030303] relative overflow-hidden">
        {/* ── Footer aurora: deep crimson rising from bottom ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Ultra-wide base — wide crimson horizon rising from floor */}
          <AuroraBlob
            color="rgba(140,0,0,0.22)" w={1600} h={500} dur={6.0} delay={0}
            style={{ left: "50%", bottom: "-160px", transform: "translateX(-50%)" }}
          />
          {/* Mid bloom — brighter red core */}
          <AuroraBlob
            color="rgba(200,20,20,0.16)" w={780} h={320} dur={7.5} delay={1.0}
            style={{ left: "50%", bottom: "-80px", transform: "translateX(-50%)" }}
          />
          {/* Tight hot core — intense center point */}
          <AuroraBlob
            color="rgba(230,50,50,0.12)" w={380} h={200} dur={5.0} delay={2.0}
            style={{ left: "50%", bottom: "-30px", transform: "translateX(-50%)" }}
          />
        </div>
        <div className="mx-auto max-w-7xl grid gap-10 px-6 py-14 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
                  <LogoMark size={36} />
              <span className="font-bold text-base">cre<span className="text-[#e05555]">AI</span>ve <span className="text-gray-500 font-medium text-sm">Labs</span></span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              The intelligence layer between your business and your customers. Built by one senior AI engineer, delivered in weeks.
            </p>
            <div className="flex gap-3">
              {[Send, Briefcase, Code].map((Icon, i) => (
                <motion.div key={i} whileHover={{ y: -3 }}>
                  <Link href="#" className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:text-gray-300 transition-colors border border-white/6 bg-white/3">
                    <Icon className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {[
            {
              title: "Services",
              links: [
                { label: "AI Front Desk", href: "/services/smart-chatbots" },
                { label: "AI Follow-Up Engine", href: "/services/ai-automation" },
                { label: "AI Operations Assistant", href: "/services/ai-strategy" },
                { label: "All Services", href: "/services" },
              ],
            },
            {
              title: "Industries",
              links: [
                { label: "Home Services", href: "/#work" },
                { label: "Medical & Med Spas", href: "/#work" },
                { label: "Professional Services", href: "/#work" },
                { label: "Restaurants & Salons", href: "/#work" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About Us", href: "/about" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Contact", href: "/#contact" },
                { label: "Book a Call", href: "https://cal.com/creaivelabs" },
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold text-sm text-white mb-5">{title}</h4>
              <nav className="flex flex-col gap-2.5">
                {links.map(l => (
                  <Link key={l.label} href={l.href}
                    className="text-sm text-gray-600 hover:text-gray-300 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-5 text-xs text-gray-700">
            <span>&copy; {new Date().getFullYear()} creAIve Labs. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>AI systems for service businesses — United States</span>
              <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/company/creaivelabs/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="text-gray-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/creaivelabs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="text-gray-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
