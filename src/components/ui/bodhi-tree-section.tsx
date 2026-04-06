"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wrench, UtensilsCrossed, Building2, Stethoscope, Briefcase, ShoppingBag,
  ArrowRight, ChevronDown, ChevronUp, Phone, MailCheck, Settings2,
} from "lucide-react"
import Link from "next/link"

/* ─── 3 Core Offers ─────────────────────────────────────────── */
const offers = [
  {
    icon: Phone,
    title: "AI Front Desk",
    color: "#e05555",
    desc: "Handles customer questions, missed calls, website chats, booking requests, and lead intake — 24/7, no extra staff.",
    examples: ["Missed-call text back", "Website chat & FAQ", "Booking & scheduling", "Lead capture"],
  },
  {
    icon: MailCheck,
    title: "AI Follow-Up Engine",
    color: "#e07030",
    desc: "Reminders, quote follow-ups, appointment confirmations, reactivation campaigns, and review requests — on autopilot.",
    examples: ["Appointment reminders", "Quote & proposal follow-up", "Review request sequences", "Win-back campaigns"],
  },
  {
    icon: Settings2,
    title: "AI Operations Assistant",
    color: "#a080f0",
    desc: "Routes requests, updates your CRM/sheets, sends daily summaries, assigns staff, and handles repetitive back-office tasks.",
    examples: ["CRM / Sheets updates", "Request routing & triage", "Daily summaries", "Staff assignment"],
  },
]

/* ─── 6 Business Niches ─────────────────────────────────────── */
const branches = [
  {
    id: 0, label: "Home Services & Contractors", side: "left" as const,
    icon: Wrench, accent: "#f5a342",
    tipX: 88, tipY: 148,
    path: "M 250 288 C 210 268, 155 208, 88 148",
    tagline: "Missed calls = lost jobs",
    needs: ["Missed-call text back", "Lead intake from website", "Appointment scheduling", "Review requests after each job"],
    weBuilt: "An AI receptionist texts back every missed call instantly. Website chat captures leads 24/7. Auto-reminders reduce no-shows. Post-job review requests run automatically so your ratings grow without you lifting a finger.",
    savings: [
      { label: "Missed Calls", from: "Up to 40% go unanswered", to: "Instant text-back captures the lead", gain: "~$2–5k/mo recovered" },
      { label: "Admin Time", from: "2–3 hrs/day on scheduling & follow-up", to: "AI handles intake, reminders, reviews", gain: "15+ hrs/week freed" },
    ],
  },
  {
    id: 1, label: "Restaurants, Cafes & Salons", side: "right" as const,
    icon: UtensilsCrossed, accent: "#e07030",
    tipX: 412, tipY: 148,
    path: "M 250 288 C 290 268, 345 208, 412 148",
    tagline: "More repeat visits, less front-desk chaos",
    needs: ["Reservations & booking help", "Hours, menu & service FAQs", "Review requests after visits", "Repeat-visit promotions"],
    weBuilt: "AI booking assistant handles reservations 24/7. SMS promotions drive repeat visits. Automated review requests go out after every service. Customer reactivation campaigns bring lapsed guests back — no manual effort required.",
    savings: [
      { label: "Front-Desk Overload", from: "Staff answering the same questions all day", to: "AI handles FAQs, bookings & confirmations", gain: "3–4 hrs of staff time saved daily" },
      { label: "Google Reviews", from: "Rarely asking customers for reviews", to: "Automated post-visit review requests", gain: "2–4× more reviews per month" },
    ],
  },
  {
    id: 2, label: "Real Estate & Property Managers", side: "left" as const,
    icon: Building2, accent: "#60a8e0",
    tipX: 68, tipY: 258,
    path: "M 250 318 C 205 308, 150 280, 68 258",
    tagline: "Every lead answered in seconds",
    needs: ["Instant lead response & qualification", "Tour scheduling", "Property / listing FAQs", "Tenant maintenance triage"],
    weBuilt: "AI responds to every inquiry in seconds, qualifies the lead, and books tours automatically — no back-and-forth emails. Tenant bots handle maintenance requests and route to the right person. CRM is updated automatically after every interaction.",
    savings: [
      { label: "Lead Response Time", from: "Hours or days to reply manually", to: "AI responds in under 60 seconds", gain: "3–5× more tours booked" },
      { label: "Tenant Admin", from: "Hours on maintenance calls & texts", to: "Bot triages and routes all requests", gain: "5–8 hrs/week saved" },
    ],
  },
  {
    id: 3, label: "Medical, Dental & Med Spas", side: "right" as const,
    icon: Stethoscope, accent: "#50c8a0",
    tipX: 432, tipY: 258,
    path: "M 250 318 C 295 308, 350 280, 432 258",
    tagline: "Fewer no-shows, less front-desk work",
    needs: ["Patient intake forms", "Appointment reminders", "Insurance & services FAQs", "Reactivation of lapsed patients"],
    weBuilt: "AI intake assistant collects patient info before the visit. Automated reminder sequences cut no-shows by up to 40%. FAQ chatbot handles routine questions so staff focus on patients in the room. Reactivation campaigns bring back patients who haven't visited in months.",
    savings: [
      { label: "No-Shows", from: "10–15% of appointments lost", to: "Multi-step automated reminder sequence", gain: "~40% reduction in no-shows" },
      { label: "Front-Desk Load", from: "Staff repeating the same 10 answers", to: "AI handles routine FAQs & intake", gain: "2–3 hrs/day freed" },
    ],
  },
  {
    id: 4, label: "Professional Services", side: "left" as const,
    icon: Briefcase, accent: "#a080f0",
    tipX: 105, tipY: 345,
    path: "M 250 358 C 218 352, 168 345, 105 345",
    tagline: "Turn every inquiry into a booked consultation",
    needs: ["Lead capture & qualification", "Consultation scheduling", "Proposal & quote follow-up", "Client onboarding automation"],
    weBuilt: "AI intake assistant captures and qualifies inquiries 24/7. Consultation scheduler books calls without email back-and-forth. Automated sequences follow up on proposals and quotes. Onboarding checklists and document collection run automatically.",
    savings: [
      { label: "Dropped Inquiries", from: "30–50% of leads go cold with no follow-up", to: "Instant AI response + automated follow-up", gain: "2× more consultations booked" },
      { label: "Manual Admin", from: "Intake, scheduling, chasing — all manual", to: "Fully automated intake pipeline", gain: "6–10 hrs/week back" },
    ],
  },
  {
    id: 5, label: "Retail & Local Shops", side: "right" as const,
    icon: ShoppingBag, accent: "#d4a017",
    tipX: 395, tipY: 345,
    path: "M 250 358 C 282 352, 332 345, 395 345",
    tagline: "Capture more visitors and repeat buyers",
    needs: ["Product FAQs & availability", "Promotions & loyalty campaigns", "Abandoned cart or visit follow-up", "Post-purchase review requests"],
    weBuilt: "AI chat on website handles product questions and availability 24/7 — so no visitor leaves without an answer. SMS and email promotions drive repeat purchases. Abandoned visit follow-up runs automatically. Post-purchase review requests improve your local search ranking.",
    savings: [
      { label: "Lost Visitors", from: "Questions unanswered — buyer leaves", to: "AI answers instantly, captures the lead", gain: "15–25% more conversions" },
      { label: "Repeat Revenue", from: "No system for follow-up or reactivation", to: "Automated post-purchase sequences", gain: "20–30% higher customer LTV" },
    ],
  },
]

/* ─── Glowing Neural Tree SVG ─────────────────────────────────── */
function NeuralTree({ active, onBranchClick }: { active: number | null; onBranchClick: (id: number) => void }) {
  // Trunk junction nodes — exactly where each branch pair leaves the trunk
  const junctions = [
    { x: 250, y: 288 },
    { x: 250, y: 318 },
    { x: 250, y: 358 },
  ]
  // Midpoint nodes — cubic bezier at t=0.5 for each branch path
  const midpoints = [
    { x: 179, y: 233, color: branches[0].accent }, // branch 0
    { x: 321, y: 233, color: branches[1].accent }, // branch 1
    { x: 173, y: 293, color: branches[2].accent }, // branch 2
    { x: 327, y: 293, color: branches[3].accent }, // branch 3
    { x: 189, y: 349, color: branches[4].accent }, // branch 4
    { x: 311, y: 349, color: branches[5].accent }, // branch 5
  ]
  const roots = [
    "M 250 420 C 220 435, 170 448, 110 460",
    "M 250 420 C 280 435, 330 448, 390 460",
    "M 250 430 C 230 442, 195 452, 155 458",
    "M 250 430 C 270 442, 305 452, 345 458",
    "M 250 440 C 245 448, 235 455, 220 462",
    "M 250 440 C 255 448, 265 455, 280 462",
  ]
  const rootTips = [
    { x: 110, y: 460 }, { x: 390, y: 460 },
    { x: 155, y: 458 }, { x: 345, y: 458 },
    { x: 220, y: 462 }, { x: 280, y: 462 },
  ]

  return (
    <svg viewBox="0 0 500 490" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <filter id="treeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="strongGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="ultraGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="trunkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#c8a05a" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f0d080" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c8a05a" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8a05a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#c8a05a" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="treeBg" cx="50%" cy="38%" r="56%">
          <stop offset="0%"  stopColor="#c8a05a" stopOpacity="0.14" />
          <stop offset="38%" stopColor="#c8a05a" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Canopy background glow ── */}
      <motion.ellipse cx={250} cy={260} rx={210} ry={185}
        fill="url(#treeBg)"
        animate={{ rx: [210, 225, 210], ry: [185, 198, 185], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Per-tip color halos — subtle ambient bloom */}
      {branches.map((b, i) => (
        <motion.circle key={`halo-${b.id}`} cx={b.tipX} cy={b.tipY} r={32}
          fill={b.accent} filter="url(#strongGlow)"
          animate={{ r: [32, 42, 32], opacity: active === b.id ? [0.14, 0.22, 0.14] : [0.05, 0.10, 0.05] }}
          transition={{ duration: 3.5 + i * 0.3, delay: i * 0.45, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${b.tipX}px ${b.tipY}px` }}
        />
      ))}

      {/* Outer ellipse ring */}
      <motion.ellipse cx={250} cy={280} rx={160} ry={200}
        fill="none" stroke="#c8a05a" strokeWidth="0.5" opacity="0.06"
        animate={{ rx: [160, 170, 160], ry: [200, 210, 200] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* Roots */}
      {roots.map((r, i) => (
        <motion.path key={i} d={r}
          stroke="url(#rootGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
          filter="url(#softGlow)"
        />
      ))}
      {rootTips.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r="2.5"
          fill="#c8a05a" opacity="0.4"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.9 + i * 0.08 }}
          filter="url(#softGlow)"
        />
      ))}

      {/* Trunk */}
      <motion.path d="M 250 425 L 250 285"
        stroke="url(#trunkGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"
        filter="url(#treeGlow)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.path d="M 250 425 L 250 285"
        stroke="#f0d080" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.09"
        filter="url(#treeGlow)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* ── Branch paths — 2-layer refined glow ── */}
      {branches.map((b, i) => (
        <g key={b.id}>
          {/* Mid bloom */}
          <motion.path d={b.path}
            stroke={active === b.id ? b.accent : "#c8a05a"}
            strokeWidth={active === b.id ? 8 : 5}
            fill="none" strokeLinecap="round"
            opacity={active === b.id ? 0.30 : 0.12}
            filter="url(#strongGlow)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
          />
          {/* Bright centerline */}
          <motion.path d={b.path}
            stroke={active === b.id ? b.accent : "#e8c878"}
            strokeWidth={active === b.id ? 2 : 1.3}
            fill="none" strokeLinecap="round"
            opacity={active === b.id ? 1 : 0.68}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
          />
        </g>
      ))}

      {/* ── Junction nodes — precisely where branches leave the trunk ── */}
      {junctions.map((j, i) => (
        <motion.g key={`junc-${i}`}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.85 + i * 0.08, type: "spring" }}
          style={{ transformOrigin: `${j.x}px ${j.y}px` }}
        >
          <motion.circle cx={j.x} cy={j.y} r={9}
            fill="#c8a05a" opacity={0} filter="url(#treeGlow)"
            animate={{ r: [9, 13, 9], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${j.x}px ${j.y}px` }}
          />
          <circle cx={j.x} cy={j.y} r={4.5} fill="#1a0800" stroke="#f0d080" strokeWidth={1.2} />
          <circle cx={j.x} cy={j.y} r={2} fill="#f0d080" />
        </motion.g>
      ))}

      {/* ── Midpoint nodes — exactly at t=0.5 on each branch curve ── */}
      {midpoints.map((m, i) => (
        <motion.g key={`mid-${i}`}
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.05 + i * 0.07, type: "spring" }}
          style={{ transformOrigin: `${m.x}px ${m.y}px` }}
        >
          <motion.circle cx={m.x} cy={m.y} r={6}
            fill={m.color} opacity={0} filter="url(#treeGlow)"
            animate={{ r: [6, 9, 6], opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 2.2 + i * 0.18, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${m.x}px ${m.y}px` }}
          />
          <circle cx={m.x} cy={m.y} r={3} fill={m.color} opacity={0.65} filter="url(#softGlow)" />
          <circle cx={m.x} cy={m.y} r={1.4} fill={m.color} />
        </motion.g>
      ))}

      {/* ── Tip nodes — at the end of each branch ── */}
      {branches.map((b) => (
        <g key={`tip-${b.id}`} style={{ cursor: "pointer" }} onClick={() => onBranchClick(b.id)}>
          <motion.circle cx={b.tipX} cy={b.tipY} r={12}
            fill={b.accent} opacity={active === b.id ? 0.20 : 0.07}
            animate={{ r: active === b.id ? [12, 17, 12] : [12, 14, 12] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            filter="url(#treeGlow)"
            style={{ transformOrigin: `${b.tipX}px ${b.tipY}px` }}
          />
          <motion.circle cx={b.tipX} cy={b.tipY} r={8}
            fill="none" stroke={b.accent}
            strokeWidth={active === b.id ? 1.8 : 1.1}
            opacity={active === b.id ? 0.85 : 0.45}
            filter="url(#softGlow)"
          />
          <motion.circle cx={b.tipX} cy={b.tipY} r={4.5}
            fill={active === b.id ? b.accent : "#f0d080"}
            filter={active === b.id ? "url(#treeGlow)" : "none"}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            whileHover={{ scale: 1.5 }}
            style={{ transformOrigin: `${b.tipX}px ${b.tipY}px` }}
          />
        </g>
      ))}

      {/* AI Core */}
      <motion.circle cx={250} cy={410} r={36}
        fill="#c8a05a" opacity={0.05}
        animate={{ r: [36, 44, 36] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        style={{ transformOrigin: "250px 410px" }}
      />
      <motion.circle cx={250} cy={410} r={22}
        fill="none" stroke="#f0d080" strokeWidth={1} opacity={0.3}
        filter="url(#softGlow)"
        animate={{ r: [22, 26, 22] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ transformOrigin: "250px 410px" }}
      />
      <motion.circle cx={250} cy={410} r={13}
        fill="#1a0800" stroke="#f0d080" strokeWidth={1.5}
        filter="url(#treeGlow)"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 180 }}
        style={{ transformOrigin: "250px 410px" }}
      />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        return (
          <motion.line key={i}
            x1={250} y1={410}
            x2={250 + Math.cos(rad) * 10} y2={410 + Math.sin(rad) * 10}
            stroke="#f0d080" strokeWidth="0.8" opacity="0.5"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
            transition={{ delay: 1 + i * 0.08 }}
          />
        )
      })}
      <motion.text x={250} y={410} textAnchor="middle" dominantBaseline="middle"
        fontSize="5.5" fill="#f5e090" fontWeight="800" fontFamily="sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
      >AI</motion.text>

      {/* Trunk energy pulses */}
      {[0, 1.5, 3].map((delay, i) => (
        <motion.circle key={`trunkpulse-${i}`} r={2.5}
          fill="#f5e090" filter="url(#treeGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0], cy: [425, 285] }}
          transition={{ delay, duration: 1.2, repeat: Infinity, repeatDelay: 2, ease: "easeIn" }}
          cx={250}
        />
      ))}
    </svg>
  )
}

/* ─── Branch Card ─────────────────────────────────────────────── */
function BranchCard({ branch, onClose }: { branch: typeof branches[0]; onClose: () => void }) {
  const Icon = branch.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: -15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="rounded-2xl border bg-[#0b0b0b] overflow-hidden"
      style={{ borderColor: `${branch.accent}50` }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: `${branch.accent}25`, background: `${branch.accent}0d` }}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: `${branch.accent}20`, color: branch.accent }}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-white block">{branch.label}</span>
            <span className="text-[10px] font-semibold" style={{ color: branch.accent }}>{branch.tagline}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-xs text-gray-600 hover:text-white transition-colors px-2 py-1">✕</button>
      </div>

      <div className="p-4 space-y-4 text-xs">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-gray-600 mb-2">What you need</p>
          <ul className="space-y-1">
            {branch.needs.map((n) => (
              <li key={n} className="flex items-start gap-2 text-gray-400">
                <span className="mt-0.5 shrink-0" style={{ color: branch.accent }}>→</span>{n}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${branch.accent}60)` }} />
          <ArrowRight className="h-3 w-3" style={{ color: branch.accent }} />
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${branch.accent}60)` }} />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: branch.accent }}>What we build</p>
          <p className="text-gray-300 leading-relaxed">{branch.weBuilt}</p>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-green-500">What it saves</p>
          {branch.savings.map((s) => (
            <div key={s.label} className="rounded-xl border border-green-900/30 bg-green-950/15 px-3 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-white">{s.label}</span>
                <span className="text-green-400 font-bold">{s.gain}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-600">
                <span className="line-through">{s.from}</span>
                <ArrowRight className="h-2 w-2 text-gray-700 shrink-0" />
                <span className="text-gray-400">{s.to}</span>
              </div>
            </div>
          ))}
        </div>

        <Link href="/#contact"
          className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white transition-colors"
          style={{ background: `${branch.accent}25`, border: `1px solid ${branch.accent}45` }}>
          Get this for my business <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  )
}

/* ─── Mobile Accordion ──────────────────────────────────────── */
function MobileAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-2 mt-6">
      {branches.map((b) => {
        const Icon = b.icon
        const isOpen = open === b.id
        return (
          <div key={b.id} className="rounded-2xl border overflow-hidden"
            style={{ borderColor: isOpen ? `${b.accent}50` : "#222" }}>
            <button className="w-full flex items-center justify-between px-4 py-3 text-left"
              style={{ background: isOpen ? `${b.accent}0f` : "transparent" }}
              onClick={() => setOpen(isOpen ? null : b.id)}>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl"
                  style={{ background: `${b.accent}20`, color: b.accent }}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-white block">{b.label}</span>
                  <span className="text-[10px]" style={{ color: b.accent }}>{b.tagline}</span>
                </div>
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4 text-gray-500 shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <div className="px-4 pb-4">
                    <BranchCard branch={b} onClose={() => setOpen(null)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Main Export ─────────────────────────────────────────────── */
export function BodhiTreeSection() {
  const [active, setActive] = useState<number | null>(null)
  const leftBranches  = branches.filter((b) => b.side === "left")
  const rightBranches = branches.filter((b) => b.side === "right")

  return (
    <section className="w-full py-20 md:py-28" style={{ background: "radial-gradient(ellipse at center, #0d0a04 0%, #050505 70%)" }}>
      <div className="mx-auto max-w-7xl px-6">

        {/* ── Section Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <span className="inline-block mb-3 rounded-full border border-[#c8a05a]/40 bg-[#c8a05a]/08 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#c8a05a]">
            The AI Bodhi Tree
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            We Don&apos;t Sell &ldquo;AI.&rdquo;{" "}
            <span className="bg-gradient-to-r from-[#c8a05a] to-[#f5e090] bg-clip-text text-transparent">
              We Sell Results.
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-gray-500 text-base">
            Faster responses. Fewer missed customers. More bookings. Better follow-up. Less admin work.
            Click your business type below to see exactly what we&apos;d build for you — and what it saves.
          </p>
        </motion.div>

        {/* ── 3 Core Offers Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
        >
          {offers.map((o, i) => {
            const Icon = o.icon
            return (
              <div key={i}
                className="rounded-2xl border bg-[#0f0f0f] px-5 py-4 flex items-start gap-4"
                style={{ borderColor: `${o.color}30` }}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${o.color}18`, color: o.color }}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">{o.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">{o.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {o.examples.map((ex) => (
                      <span key={ex} className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${o.color}15`, color: o.color, border: `1px solid ${o.color}25` }}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* ── Desktop Tree Layout ── */}
        <div className="hidden md:grid md:grid-cols-[270px_1fr_270px] gap-6 items-start">
          <div className="space-y-3 pt-8">
            {leftBranches.map((b) => (
              <div key={b.id}>
                <AnimatePresence mode="wait">
                  {active === b.id
                    ? <BranchCard key="card" branch={b} onClose={() => setActive(null)} />
                    : (
                      <motion.button key="btn"
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                        onClick={() => setActive(b.id)}
                        className="w-full flex items-center gap-3 rounded-2xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-left hover:border-[#c8a05a]/40 transition-colors group"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                          style={{ background: `${b.accent}18`, color: b.accent }}>
                          <b.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{b.label}</p>
                          <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">{b.tagline}</p>
                        </div>
                      </motion.button>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="h-[490px]">
            <NeuralTree active={active} onBranchClick={(id) => setActive(active === id ? null : id)} />
          </div>

          <div className="space-y-3 pt-8">
            {rightBranches.map((b) => (
              <div key={b.id}>
                <AnimatePresence mode="wait">
                  {active === b.id
                    ? <BranchCard key="card" branch={b} onClose={() => setActive(null)} />
                    : (
                      <motion.button key="btn"
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                        onClick={() => setActive(b.id)}
                        className="w-full flex items-center gap-3 rounded-2xl border border-[#222] bg-[#0a0a0a] px-4 py-3 text-left hover:border-[#c8a05a]/40 transition-colors group"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                          style={{ background: `${b.accent}18`, color: b.accent }}>
                          <b.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{b.label}</p>
                          <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">{b.tagline}</p>
                        </div>
                      </motion.button>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden">
          <div className="h-[360px] mx-auto max-w-sm">
            <NeuralTree active={active} onBranchClick={(id) => setActive(active === id ? null : id)} />
          </div>
          <MobileAccordion />
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }} className="mt-14 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Don&apos;t see your business type? We work with any local service business.
          </p>
          <Link href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-[#c8a05a]/40 bg-[#c8a05a]/10 px-5 py-2.5 text-sm font-semibold text-[#c8a05a] hover:bg-[#c8a05a]/20 transition-colors">
            Tell us about your business — free 30-min call <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
