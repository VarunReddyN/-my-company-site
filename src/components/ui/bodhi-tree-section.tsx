"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Coffee, BarChart2, ShoppingBag, Leaf, Code2, Factory,
  ArrowRight, ChevronDown, ChevronUp,
} from "lucide-react"
import Link from "next/link"

/* ── Branch Data ── */
const branches = [
  {
    id: 0, label: "Local Coffee Shop", side: "left" as const,
    icon: Coffee, accent: "#f5c842",
    tipX: 88, tipY: 148,
    path: "M 250 288 C 210 268, 155 208, 88 148",
    legacy: ["Excel for recipe costing", "Square POS", "Manual staff scheduling"],
    aiHelp: "AI forecasts inventory and optimises shift scheduling by cross-referencing historical sales with local weather, holidays, and foot traffic — predicting exactly what will sell tomorrow.",
    savings: [
      { label: "Food Waste", from: "15–20%", to: "< 5%", gain: "$800 back per month" },
      { label: "Labour Overlap", from: "4 hrs/wk wasted", to: "Optimised shifts", gain: "$4,000 saved per year" },
    ],
  },
  {
    id: 1, label: "Digital Marketing Agency", side: "right" as const,
    icon: BarChart2, accent: "#f09030",
    tipX: 412, tipY: 148,
    path: "M 250 288 C 290 268, 345 208, 412 148",
    legacy: ["Manual spreadsheets", "Human sentiment analysis", "Basic CRM dashboards"],
    aiHelp: "NLP models instantly analyse thousands of customer reviews and generate targeted ad-copy variations — work that previously took a junior analyst days.",
    savings: [
      { label: "Avoided Hire", from: "1 junior analyst + copywriter", to: "AI handles it", gain: "$50k–60k salary saved" },
      { label: "Client Retention", from: "Manual error-prone reports", to: "Automated real-time dashboards", gain: "Reduced churn cost" },
    ],
  },
  {
    id: 2, label: "DTC E-commerce Owner", side: "left" as const,
    icon: ShoppingBag, accent: "#e8c040",
    tipX: 68, tipY: 258,
    path: "M 250 318 C 205 308, 150 280, 68 258",
    legacy: ["Basic Shopify analytics", "Disconnected email platforms", "Static inventory spreadsheets"],
    aiHelp: "AI unifies all transaction streams to predict which customers will repurchase and precisely when to reorder stock — turning a data game into a winning advantage.",
    savings: [
      { label: "Marketing Efficiency", from: "Spray-and-pray ad spend", to: "Targeted high-intent buyers", gain: "CAC reduced 20–30%" },
      { label: "Inventory Holding", from: "Dead stock in warehouses", to: "Predictive reorder points", gain: "Hundreds of thousands freed up" },
    ],
  },
  {
    id: 3, label: "Landscaping Company", side: "right" as const,
    icon: Leaf, accent: "#80d860",
    tipX: 432, tipY: 258,
    path: "M 250 318 C 295 308, 350 280, 432 258",
    legacy: ["Whiteboard schedules", "Basic GPS trackers", "Reactive equipment repair"],
    aiHelp: "AI generates fuel-efficient daily routes that adjust for real-time traffic, while IoT sensors predict when mowers or trucks will fail — before they break.",
    savings: [
      { label: "Fuel & Fleet", from: "Unoptimised routing", to: "10% less drive time", gain: "Thousands saved in fuel" },
      { label: "Maintenance", from: "$3,000 engine replacement", to: "$50 proactive belt fix", gain: "Zero idle crew time" },
    ],
  },
  {
    id: 4, label: "SaaS Startup Founder", side: "left" as const,
    icon: Code2, accent: "#a080f0",
    tipX: 105, tipY: 345,
    path: "M 250 358 C 218 352, 168 345, 105 345",
    legacy: ["Manual code review", "Human tier-1 helpdesk", "Standard product analytics"],
    aiHelp: "AI coding assistants write boilerplate faster, while an integrated chatbot resolves 60% of support tickets instantly — no extra headcount needed.",
    savings: [
      { label: "Developer Velocity", from: "4-person team output", to: "Equivalent of 5 people", gain: "$150k+ saved on avoided hire" },
      { label: "Support Scaling", from: "Hire for every growth spike", to: "AI absorbs 60% of tickets", gain: "3× users, flat support cost" },
    ],
  },
  {
    id: 5, label: "Manufacturing Plant Owner", side: "right" as const,
    icon: Factory, accent: "#50c8f0",
    tipX: 395, tipY: 345,
    path: "M 250 358 C 282 352, 332 345, 395 345",
    legacy: ["Clipboards for safety checks", "Reactive machine maintenance", "Manual supply-chain forecasting"],
    aiHelp: "Machine vision cameras spot microscopic defects in real time, while IoT sensors feed predictive models that anticipate overheating before it happens.",
    savings: [
      { label: "Scrap Reduction", from: "Defect caught late", to: "Caught instantly on line", gain: "Tens of thousands saved monthly" },
      { label: "Uptime Protection", from: "Downtime: $10k+/hr", to: "Predictive maintenance", gain: "Near-zero surprise breakdowns" },
    ],
  },
]

/* ── Glowing Neural Tree SVG ── */
function NeuralTree({ active, onBranchClick }: { active: number | null; onBranchClick: (id: number) => void }) {
  // Neural node positions scattered on branches
  const neuralNodes = [
    { x: 250, y: 288 }, { x: 250, y: 318 }, { x: 250, y: 358 },
    { x: 200, y: 270 }, { x: 300, y: 270 }, { x: 170, y: 240 }, { x: 330, y: 240 },
    { x: 145, y: 210 }, { x: 355, y: 210 }, { x: 118, y: 185 }, { x: 382, y: 185 },
    { x: 140, y: 290 }, { x: 360, y: 290 }, { x: 178, y: 350 }, { x: 322, y: 350 },
    { x: 250, y: 250 }, { x: 230, y: 310 }, { x: 270, y: 310 },
  ]

  // Root paths spreading downward
  const roots = [
    "M 250 420 C 220 435, 170 448, 110 460",
    "M 250 420 C 280 435, 330 448, 390 460",
    "M 250 430 C 230 442, 195 452, 155 458",
    "M 250 430 C 270 442, 305 452, 345 458",
    "M 250 440 C 245 448, 235 455, 220 462",
    "M 250 440 C 255 448, 265 455, 280 462",
  ]

  // Root tip nodes
  const rootTips = [
    { x: 110, y: 460 }, { x: 390, y: 460 },
    { x: 155, y: 458 }, { x: 345, y: 458 },
    { x: 220, y: 462 }, { x: 280, y: 462 },
  ]

  return (
    <svg viewBox="0 0 500 490" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        {/* Main glow filter */}
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

        {/* Golden gradient for trunk */}
        <linearGradient id="trunkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#c8a05a" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f0d080" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c8a05a" stopOpacity="0.4" />
        </linearGradient>

        {/* Root gradient */}
        <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8a05a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#c8a05a" stopOpacity="0.05" />
        </linearGradient>

        {/* Active branch gradient */}
        {branches.map((b) => (
          <linearGradient key={b.id} id={`branchGrad${b.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0d080" stopOpacity="0.9" />
            <stop offset="100%" stopColor={b.accent} stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>

      {/* ── Outer ambient glow around whole tree ── */}
      <motion.ellipse cx="250" cy="280" rx="160" ry="200"
        fill="none" stroke="#c8a05a" strokeWidth="0.5" opacity="0.06"
        animate={{ rx: [160, 170, 160], ry: [200, 210, 200] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* ── Root system ── */}
      {roots.map((r, i) => (
        <motion.path key={i} d={r}
          stroke="url(#rootGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
          filter="url(#softGlow)"
        />
      ))}

      {/* Root tip nodes */}
      {rootTips.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r="2.5"
          fill="#c8a05a" opacity="0.4"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.9 + i * 0.08 }}
          filter="url(#softGlow)"
        />
      ))}

      {/* ── Trunk (glowing line) ── */}
      <motion.path
        d="M 250 425 L 250 285"
        stroke="url(#trunkGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"
        filter="url(#treeGlow)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {/* Trunk glow halo */}
      <motion.path
        d="M 250 425 L 250 285"
        stroke="#f0d080" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.08"
        filter="url(#treeGlow)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* ── Branches ── */}
      {branches.map((b, i) => (
        <g key={b.id}>
          {/* Outer glow */}
          <motion.path d={b.path}
            stroke={active === b.id ? b.accent : "#c8a05a"}
            strokeWidth={active === b.id ? 8 : 4}
            fill="none" strokeLinecap="round"
            opacity={active === b.id ? 0.18 : 0.07}
            filter="url(#treeGlow)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
          />
          {/* Core line */}
          <motion.path d={b.path}
            stroke={active === b.id ? b.accent : "#e8c878"}
            strokeWidth={active === b.id ? 2 : 1.2}
            fill="none" strokeLinecap="round"
            opacity={active === b.id ? 1 : 0.55}
            filter="url(#softGlow)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
          />
        </g>
      ))}

      {/* ── Neural nodes on branches ── */}
      {neuralNodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r="2.8"
          fill="#f0d080"
          opacity={0.5}
          filter="url(#softGlow)"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.9 + i * 0.05, type: "spring" }}
        />
      ))}

      {/* ── Animated energy pulses along branches ── */}
      {branches.map((b, i) => (
        <motion.circle key={`pulse-${b.id}`} r="3"
          fill={b.accent} filter="url(#treeGlow)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            offsetDistance: ["0%", "100%"],
          }}
          style={{ offsetPath: `path("${b.path}")` } as React.CSSProperties}
          transition={{
            delay: 1.5 + i * 0.5,
            duration: 1.8,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Animated pulse along trunk (root → crown) ── */}
      {[0, 1.5, 3].map((delay, i) => (
        <motion.circle key={`trunkpulse-${i}`} r="2.5"
          fill="#f5e090" filter="url(#treeGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0], cy: [425, 285] }}
          transition={{ delay, duration: 1.2, repeat: Infinity, repeatDelay: 2, ease: "easeIn" }}
          cx={250}
        />
      ))}

      {/* ── Branch tip dots (interactive) ── */}
      {branches.map((b) => (
        <g key={`tip-${b.id}`} style={{ cursor: "pointer" }} onClick={() => onBranchClick(b.id)}>
          {/* Ambient halo */}
          <motion.circle cx={b.tipX} cy={b.tipY} r="16"
            fill={b.accent} opacity={active === b.id ? 0.2 : 0.06}
            animate={{ r: active === b.id ? [16, 22, 16] : 16 }}
            transition={{ repeat: active === b.id ? Infinity : 0, duration: 1.4 }}
          />
          {/* Inner ring */}
          <motion.circle cx={b.tipX} cy={b.tipY} r="9"
            fill="none" stroke={b.accent}
            strokeWidth={active === b.id ? 2 : 1}
            opacity={active === b.id ? 0.9 : 0.4}
            filter="url(#softGlow)"
          />
          {/* Core dot */}
          <motion.circle cx={b.tipX} cy={b.tipY} r="5"
            fill={active === b.id ? b.accent : "#f0d080"}
            filter={active === b.id ? "url(#treeGlow)" : "url(#softGlow)"}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            whileHover={{ scale: 1.6 }}
          />
        </g>
      ))}

      {/* ── AI Core (trunk base) ── */}
      {/* Outer ambient */}
      <motion.circle cx="250" cy="410" r="36"
        fill="#c8a05a" opacity="0.05"
        animate={{ r: [36, 44, 36] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      />
      {/* Mid ring */}
      <motion.circle cx="250" cy="410" r="22"
        fill="none" stroke="#f0d080" strokeWidth="1" opacity="0.3"
        filter="url(#softGlow)"
        animate={{ r: [22, 26, 22] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      {/* Core */}
      <motion.circle cx="250" cy="410" r="13"
        fill="#1a0800" stroke="#f0d080" strokeWidth="1.5"
        filter="url(#treeGlow)"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 180 }}
      />
      {/* Neural spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        return (
          <motion.line key={i}
            x1="250" y1="410"
            x2={250 + Math.cos(rad) * 10} y2={410 + Math.sin(rad) * 10}
            stroke="#f0d080" strokeWidth="0.8" opacity="0.5"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
            transition={{ delay: 1 + i * 0.08 }}
          />
        )
      })}
      <motion.text x="250" y="410" textAnchor="middle" dominantBaseline="middle"
        fontSize="5.5" fill="#f5e090" fontWeight="800" fontFamily="sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
      >
        AI
      </motion.text>
    </svg>
  )
}

/* ── Branch Card ── */
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
          <span className="font-bold text-sm text-white">{branch.label}</span>
        </div>
        <button onClick={onClose} className="text-xs text-gray-600 hover:text-white transition-colors px-2 py-1">✕</button>
      </div>

      <div className="p-4 space-y-4 text-xs">
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-gray-600 mb-2">Legacy Tools</p>
          <ul className="space-y-1">
            {branch.legacy.map((l) => (
              <li key={l} className="flex items-start gap-2 text-gray-500"><span className="text-gray-700 mt-0.5">—</span>{l}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${branch.accent}60)` }} />
          <ArrowRight className="h-3 w-3" style={{ color: branch.accent }} />
          <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${branch.accent}60)` }} />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: branch.accent }}>With AI</p>
          <p className="text-gray-300 leading-relaxed">{branch.aiHelp}</p>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-green-500">Savings</p>
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

/* ── Mobile Accordion ── */
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
                <span className="font-semibold text-sm text-white">{b.label}</span>
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
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

/* ── Main Export ── */
export function BodhiTreeSection() {
  const [active, setActive] = useState<number | null>(null)
  const leftBranches  = branches.filter((b) => b.side === "left")
  const rightBranches = branches.filter((b) => b.side === "right")

  return (
    <section className="w-full py-20 md:py-28" style={{ background: "radial-gradient(ellipse at center, #0d0a04 0%, #050505 70%)" }}>
      <div className="mx-auto max-w-7xl px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block mb-3 rounded-full border border-[#c8a05a]/40 bg-[#c8a05a]/08 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#c8a05a]">
            The AI Bodhi Tree
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            Every Business Has a{" "}
            <span className="bg-gradient-to-r from-[#c8a05a] to-[#f5e090] bg-clip-text text-transparent">
              Branch to Grow
            </span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-gray-500 text-base">
            Click a glowing branch to see exactly how AI cuts costs and saves time for your type of business.
          </p>
        </motion.div>

        {/* Desktop */}
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
                          <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">Click to reveal →</p>
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
                          <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">Click to reveal →</p>
                        </div>
                      </motion.button>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="h-[360px] mx-auto max-w-sm">
            <NeuralTree active={active} onBranchClick={(id) => setActive(active === id ? null : id)} />
          </div>
          <MobileAccordion />
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }} className="mt-12 text-center text-sm text-gray-600">
          Every branch above is a real project type we have delivered.{" "}
          <Link href="/#contact" className="text-[#c8a05a] hover:underline underline-offset-4">
            Tell us which branch is yours →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
