"use client"

import { useState } from "react"
import { motion } from "framer-motion"

/* ─── Bezier sampling ─────────────────────────────────────────── */
function qPts(x1: number, y1: number, cpx: number, cpy: number, x2: number, y2: number, n = 28) {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1), mt = 1 - t
    return { x: mt * mt * x1 + 2 * mt * t * cpx + t * t * x2, y: mt * mt * y1 + 2 * mt * t * cpy + t * t * y2 }
  })
}
function cPts(x1: number, y1: number, c1x: number, c1y: number, c2x: number, c2y: number, x2: number, y2: number, n = 28) {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1), mt = 1 - t
    return {
      x: mt * mt * mt * x1 + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * x2,
      y: mt * mt * mt * y1 + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * y2,
    }
  })
}

/* ─── Layout constants ────────────────────────────────────────── */
const CX = 450, CY = 266, TBY = 404

const ROOTS = [
  { id: "calls",    label: "Calls",    x: 65,  y: 490, color: "#60a8e0", cpx: 194, cpy: 447 },
  { id: "texts",    label: "Texts",    x: 163, y: 514, color: "#40c0d0", cpx: 267, cpy: 449 },
  { id: "chat",     label: "Web Chat", x: 270, y: 500, color: "#50c890", cpx: 335, cpy: 448 },
  { id: "forms",    label: "Forms",    x: 372, y: 520, color: "#70c060", cpx: 402, cpy: 449 },
  { id: "bookings", label: "Bookings", x: 450, y: 525, color: "#e0c030", cpx: 450, cpy: 451 },
  { id: "reviews",  label: "Reviews",  x: 528, y: 520, color: "#e07030", cpx: 498, cpy: 449 },
  { id: "leads",    label: "Leads",    x: 630, y: 500, color: "#e05050", cpx: 565, cpy: 448 },
  { id: "crm",      label: "CRM",      x: 737, y: 514, color: "#a070e0", cpx: 633, cpy: 449 },
  { id: "requests", label: "Requests", x: 835, y: 490, color: "#5070e0", cpx: 706, cpy: 447 },
] as const

const PILLARS = [
  {
    id: "front-desk", label: "AI Front Desk",           sub: "24/7 response & capture",
    x: 200, y: 140, color: "#e05555",
    d: `M ${CX},${CY} C 370,226 290,175 200,140`,
    c1x: 370, c1y: 226, c2x: 290, c2y: 175,
    niches: ["home", "realestate"],
  },
  {
    id: "follow-up",  label: "AI Follow-Up Engine",     sub: "Automated campaigns & reminders",
    x: CX, y: 100, color: "#e07030",
    d: `M ${CX},${CY} C ${CX},225 ${CX},162 ${CX},100`,
    c1x: CX, c1y: 225, c2x: CX, c2y: 162,
    niches: ["restaurants", "medical"],
  },
  {
    id: "operations", label: "AI Operations Assistant", sub: "Back-office automation",
    x: 700, y: 140, color: "#8060e0",
    d: `M ${CX},${CY} C 530,226 610,175 700,140`,
    c1x: 530, c1y: 226, c2x: 610, c2y: 175,
    niches: ["professional", "retail"],
  },
] as const

const NICHES = [
  { id: "home",         pillar: "front-desk",  label: "Home Services",         tagline: "Missed calls = lost jobs",
    x: 78,  y: 78,  color: "#f5a342", px: 200, py: 140, c1x: 162, c1y: 120, c2x: 110, c2y: 96,  anchor: "end"   as const },
  { id: "realestate",   pillar: "front-desk",  label: "Real Estate",           tagline: "Every lead answered instantly",
    x: 146, y: 30,  color: "#60a8e0", px: 200, py: 140, c1x: 180, c1y: 100, c2x: 160, c2y: 58,  anchor: "end"   as const },
  { id: "restaurants",  pillar: "follow-up",   label: "Restaurants & Salons",  tagline: "More repeat visits",
    x: 320, y: 22,  color: "#e07030", px: CX,  py: 100, c1x: 416, c1y: 72,  c2x: 366, c2y: 42,  anchor: "end"   as const },
  { id: "medical",      pillar: "follow-up",   label: "Medical & Med Spas",    tagline: "Fewer no-shows",
    x: 580, y: 22,  color: "#50c8a0", px: CX,  py: 100, c1x: 484, c1y: 72,  c2x: 534, c2y: 42,  anchor: "start" as const },
  { id: "professional", pillar: "operations",  label: "Professional Services", tagline: "More consultations booked",
    x: 754, y: 30,  color: "#a080f0", px: 700, py: 140, c1x: 720, c1y: 100, c2x: 740, c2y: 58,  anchor: "start" as const },
  { id: "retail",       pillar: "operations",  label: "Retail & Local Shops",  tagline: "Capture more visitors",
    x: 822, y: 78,  color: "#d4a017", px: 700, py: 140, c1x: 738, c1y: 120, c2x: 798, c2y: 96,  anchor: "start" as const },
] as const

const EASE4 = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

/* ─── Particle ────────────────────────────────────────────────── */
function Particle({ pts, color, delay, dur = 1.9, r = 2.2, rd = 0.7 }: {
  pts: { x: number; y: number }[], color: string, delay: number, dur?: number, r?: number, rd?: number,
}) {
  return (
    <motion.circle r={r} fill={color}
      animate={{ cx: pts.map(p => p.x), cy: pts.map(p => p.y), opacity: [0, 1, 1, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear", repeatDelay: rd }}
    />
  )
}

/* ─── Root path (light glow) ─────────────────────────────────── */
function GlowPath({ d, color, w = 1.3, op = 0.55, delay = 0 }: {
  d: string, color: string, w?: number, op?: number, delay?: number,
}) {
  return (
    <g>
      <motion.path d={d} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round"
        opacity={0.10} filter="url(#bglow)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.85, delay, ease: EASE4 }}
      />
      <motion.path d={d} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" opacity={op}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.85, delay, ease: EASE4 }}
      />
    </g>
  )
}

/* ─── Branch (3-layer refined glow) ─────────────────────────── */
function GlowBranch({ d, color, delay = 0, hi = false }: {
  d: string, color: string, delay?: number, hi?: boolean,
}) {
  return (
    <g>
      <motion.path d={d} stroke={color} strokeWidth={hi ? 20 : 14}
        fill="none" strokeLinecap="round" opacity={hi ? 0.18 : 0.07} filter="url(#bglow-xl)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay, ease: EASE4 }}
      />
      <motion.path d={d} stroke={color} strokeWidth={hi ? 8 : 5}
        fill="none" strokeLinecap="round" opacity={hi ? 0.42 : 0.20} filter="url(#bglow-lg)"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay, ease: EASE4 }}
      />
      <motion.path d={d} stroke={color} strokeWidth={hi ? 2.4 : 1.6}
        fill="none" strokeLinecap="round" opacity={hi ? 0.96 : 0.72}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay, ease: EASE4 }}
      />
    </g>
  )
}

/* ─── AI Core ─────────────────────────────────────────────────── */
function CoreNode({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[44, 30, 18].map((r, i) => (
        <motion.circle key={r} cx={x} cy={y} r={r} fill="none"
          stroke={i === 0 ? "#800000" : i === 1 ? "#c03030" : "#e04545"}
          strokeWidth={i === 0 ? 0.4 : 0.75}
          animate={{ r: [r, r + 2.5, r], opacity: [0.12, 0.35 - i * 0.06, 0.12] }}
          transition={{ duration: 2.6 + i * 0.55, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      <motion.circle cx={x} cy={y} r={14} fill="#800000" filter="url(#bglow-lg)"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 18 }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle cx={x} cy={y} r={6} fill="#ff5555" opacity={0.88}
        animate={{ opacity: [0.62, 1, 0.62] }}
        transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <motion.line key={deg} x1={x} y1={y}
            x2={x + Math.cos(rad) * 24} y2={y + Math.sin(rad) * 24}
            stroke="#c04040" strokeWidth={0.5}
            animate={{ opacity: [0.18, 0.45, 0.18] }}
            transition={{ duration: 2.2, delay: deg / 400, repeat: Infinity }}
          />
        )
      })}
      <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="sans-serif">AI</text>
      <motion.text x={x} y={y + 32} textAnchor="middle"
        fill="#e05555" fontSize="5.5" fontWeight="700" fontFamily="monospace" opacity={0.7}
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.4 }}
      >ORCHESTRATION CORE</motion.text>
    </g>
  )
}

/* ─── Pillar node ─────────────────────────────────────────────── */
function PillarNode({ id, x, y, color, label, sub, isActive, onEnter, onLeave }: {
  id: string, x: number, y: number, color: string, label: string, sub: string,
  isActive: boolean, onEnter: () => void, onLeave: () => void,
}) {
  const anchor: "middle" | "end" | "start" = id === "follow-up" ? "middle" : id === "front-desk" ? "end" : "start"
  const lx = id === "follow-up" ? x : id === "front-desk" ? x - 15 : x + 15
  return (
    <g onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ cursor: "pointer" }}>
      <motion.circle cx={x} cy={y} r={52} fill={color} filter="url(#bglow-xl)"
        animate={{ r: [52, 66, 52], opacity: isActive ? [0.12, 0.22, 0.12] : [0.06, 0.12, 0.06] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle cx={x} cy={y} r={28} fill={color} filter="url(#bglow-lg)"
        animate={{ r: [28, 36, 28], opacity: isActive ? [0.18, 0.32, 0.18] : [0.09, 0.18, 0.09] }}
        transition={{ duration: 2.4, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle cx={x} cy={y} r={isActive ? 22 : 16} fill={color} filter="url(#bglow)"
        animate={{ r: isActive ? [22, 28, 22] : [16, 20, 16], opacity: isActive ? [0.18, 0.30, 0.18] : [0.09, 0.16, 0.09] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle cx={x} cy={y} r={12} fill={`${color}25`} stroke={color}
        strokeWidth={isActive ? 2.2 : 1.4}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 2.1, type: "spring", stiffness: 220, damping: 20 }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle cx={x} cy={y} r={5} fill={color}
        animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }}
        initial={{ scale: 0 }} style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.text x={lx} y={y - 18} textAnchor={anchor}
        fill={color} fontSize="7" fontWeight="700" fontFamily="sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0.82 }} transition={{ delay: 2.5 }}
      >{label}</motion.text>
      <motion.text x={lx} y={y - 8} textAnchor={anchor}
        fill="#888" fontSize="5.5" fontFamily="sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: isActive ? 0.82 : 0.46 }} transition={{ delay: 2.6 }}
      >{sub}</motion.text>
    </g>
  )
}

/* ─── Niche node ──────────────────────────────────────────────── */
function NicheNode({ niche, isActive, onEnter, onLeave }: {
  niche: typeof NICHES[number], isActive: boolean, onEnter: () => void, onLeave: () => void,
}) {
  const { x, y, color, label, tagline, anchor } = niche
  const lx = anchor === "end" ? x - 13 : x + 13
  return (
    <g onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ cursor: "pointer" }}>
      <motion.circle cx={x} cy={y} r={36} fill={color} filter="url(#bglow-xl)"
        animate={{ r: [36, 48, 36], opacity: isActive ? [0.10, 0.20, 0.10] : [0.05, 0.10, 0.05] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle cx={x} cy={y} r={isActive ? 18 : 12} fill={color} filter="url(#bglow-lg)"
        animate={{ r: isActive ? [18, 23, 18] : [12, 15, 12], opacity: isActive ? [0.16, 0.28, 0.16] : [0.08, 0.15, 0.08] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle cx={x} cy={y} r={8.5} fill={`${color}20`} stroke={color}
        strokeWidth={isActive ? 2 : 1.5}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 3.2, type: "spring", stiffness: 220, damping: 22 }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle cx={x} cy={y} r={3.5} fill={color}
        animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 2.2, repeat: Infinity }}
        initial={{ scale: 0 }} style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.text x={lx} y={y - 1} textAnchor={anchor}
        fill={color} fontSize="6.5" fontWeight="700" fontFamily="sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0.72 }} transition={{ delay: 3.5 }}
      >{label}</motion.text>
      <motion.text x={lx} y={y + 8} textAnchor={anchor}
        fill="#666" fontSize="5.5" fontFamily="sans-serif"
        initial={{ opacity: 0 }} animate={{ opacity: isActive ? 0.78 : 0.40 }} transition={{ delay: 3.6 }}
      >{tagline}</motion.text>
    </g>
  )
}

/* ─── Main export ─────────────────────────────────────────────── */
export function AIBodhiTree({ className }: { className?: string }) {
  const [hoveredNiche, setHoveredNiche]   = useState<string | null>(null)
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null)

  const isNicheActive  = (id: string) => hoveredNiche === id || (hoveredPillar !== null && NICHES.find(n => n.id === id)?.pillar === hoveredPillar)
  const isPillarActive = (id: string) => hoveredPillar === id || (hoveredNiche !== null && NICHES.find(n => n.id === hoveredNiche)?.pillar === id)

  const rootPts   = ROOTS.map(r => qPts(r.x, r.y, r.cpx, r.cpy, CX, TBY))
  const trunkPts  = qPts(CX, TBY, CX, (TBY + CY) / 2, CX, CY)
  const pillarPts = PILLARS.map(p => cPts(CX, CY, p.c1x, p.c1y, p.c2x, p.c2y, p.x, p.y))
  const nichePts  = NICHES.map(n => cPts(n.px, n.py, n.c1x, n.c1y, n.c2x, n.c2y, n.x, n.y))

  return (
    <div className={className ?? "w-full h-auto"}>
      <svg viewBox="-60 -90 1020 736" className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <filter id="bglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bglow-lg" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="bglow-xl" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="18" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="trunk-g" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%"   stopColor="#c8a05a" stopOpacity="0.85" />
            <stop offset="55%"  stopColor="#f0d080" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#c8a05a" stopOpacity="0.4"  />
          </linearGradient>
          <radialGradient id="cg" cx="50%" cy="48%" r="42%">
            <stop offset="0%"   stopColor="#80000018" />
            <stop offset="100%" stopColor="#80000000" />
          </radialGradient>
          <radialGradient id="tree-halo" cx="50%" cy="30%" r="55%">
            <stop offset="0%"   stopColor="#800000" stopOpacity="0.16" />
            <stop offset="40%"  stopColor="#600000" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0"    />
          </radialGradient>
          <pattern id="dotgrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="#ffffff07" />
          </pattern>
        </defs>

        {/* Background — fills expanded viewBox */}
        <rect x="-60" y="-90" width="1020" height="736" fill="url(#dotgrid)" />
        <ellipse cx={CX} cy={CY} rx="240" ry="195" fill="url(#cg)" />

        {/* Subtle tree canopy glow */}
        <motion.ellipse cx={CX} cy={175} rx={360} ry={200}
          fill="url(#tree-halo)"
          animate={{ rx: [360, 378, 360], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── ROOT PATHS ── */}
        {ROOTS.map((r, i) => (
          <GlowPath key={r.id}
            d={`M ${r.x},${r.y} Q ${r.cpx},${r.cpy} ${CX},${TBY}`}
            color={r.color} w={0.9} op={0.32} delay={i * 0.055}
          />
        ))}

        {/* ── ROOT NODES ── */}
        {ROOTS.map((r, i) => (
          <motion.g key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 + i * 0.055 }}>
            <motion.circle cx={r.x} cy={r.y} r={11} fill={r.color} opacity={0.07} filter="url(#bglow)"
              animate={{ r: [11, 15, 11] }}
              transition={{ duration: 2.2 + i * 0.18, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${r.x}px ${r.y}px` }}
            />
            <circle cx={r.x} cy={r.y} r={4.5} fill={r.color} opacity={0.72} />
            <circle cx={r.x} cy={r.y} r={2}   fill={r.color} />
            <motion.text x={r.x} y={r.y + 15} textAnchor="middle"
              fill={r.color} fontSize="5.5" fontFamily="monospace" opacity={0.52}
              initial={{ opacity: 0 }} animate={{ opacity: 0.52 }} transition={{ delay: 0.3 + i * 0.05 }}
            >{r.label}</motion.text>
          </motion.g>
        ))}

        {/* ── ROOT PARTICLES ── */}
        {rootPts.map((pts, i) => [
          <Particle key={`rpa-${i}`} pts={pts} color={ROOTS[i].color} delay={0.55 + i * 0.38} dur={1.75} r={2}   rd={0.9 + i * 0.18} />,
          <Particle key={`rpb-${i}`} pts={pts} color={ROOTS[i].color} delay={2.30 + i * 0.28} dur={1.75} r={1.5} rd={1.6 + i * 0.15} />,
        ])}

        {/* ── TRUNK ── */}
        <motion.line x1={CX} y1={TBY} x2={CX} y2={CY}
          stroke="url(#trunk-g)" strokeWidth={12} strokeLinecap="round" opacity={0.15} filter="url(#bglow)"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ delay: 0.88, duration: 0.65, ease: EASE4 }}
          style={{ transformOrigin: `${CX}px ${TBY}px` }}
        />
        <motion.line x1={CX} y1={TBY} x2={CX} y2={CY}
          stroke="url(#trunk-g)" strokeWidth={2.2} strokeLinecap="round" opacity={0.78}
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ delay: 0.88, duration: 0.65, ease: EASE4 }}
          style={{ transformOrigin: `${CX}px ${TBY}px` }}
        />
        <motion.circle cx={CX} cy={TBY} r={7} fill="#c8a05a" opacity={0.82} filter="url(#bglow)"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.82, type: "spring" }}
          style={{ transformOrigin: `${CX}px ${TBY}px` }}
        />
        <motion.text x={CX} y={TBY + 18} textAnchor="middle"
          fill="#c8a05a" fontSize="5.5" fontWeight="600" fontFamily="monospace" opacity={0.48}
          initial={{ opacity: 0 }} animate={{ opacity: 0.48 }} transition={{ delay: 2.0 }}
        >CUSTOMER INPUTS</motion.text>

        {/* Trunk particles */}
        {[1.55, 2.75, 3.95, 5.1].map((d, i) => (
          <Particle key={`tp-${i}`} pts={trunkPts} color="#f0d080" delay={d} dur={1.2} r={2.6} rd={0.75} />
        ))}

        {/* ── SERVICE BRANCHES ── */}
        {PILLARS.map((p, i) => (
          <GlowBranch key={p.id} d={p.d} color={p.color} delay={1.85 + i * 0.11} hi={isPillarActive(p.id)} />
        ))}

        {/* Branch particles */}
        {pillarPts.map((pts, i) => [
          <Particle key={`ppa-${i}`} pts={pts} color={PILLARS[i].color} delay={2.6 + i * 0.45} dur={1.55} r={2.3} rd={0.55 + i * 0.28} />,
          <Particle key={`ppb-${i}`} pts={pts} color={PILLARS[i].color} delay={3.9 + i * 0.35} dur={1.55} r={1.8} rd={1.15 + i * 0.2} />,
        ])}

        {/* ── AI CORE bloom ── */}
        <motion.circle cx={CX} cy={CY} r={96}
          fill="rgba(100,0,0,0.05)" filter="url(#bglow-xl)"
          animate={{ r: [96, 114, 96], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <motion.circle cx={CX} cy={CY} r={62}
          fill="rgba(160,0,0,0.09)" filter="url(#bglow-lg)"
          animate={{ r: [62, 76, 62], opacity: [0.60, 1, 0.60] }}
          transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* ── AI CORE ── */}
        <CoreNode x={CX} y={CY} />

        {/* ── NICHE BRANCHES ── */}
        {NICHES.map((n, i) => (
          <GlowBranch key={n.id}
            d={`M ${n.px},${n.py} C ${n.c1x},${n.c1y} ${n.c2x},${n.c2y} ${n.x},${n.y}`}
            color={n.color} delay={2.88 + i * 0.075} hi={isNicheActive(n.id)}
          />
        ))}

        {/* Niche particles */}
        {nichePts.map((pts, i) => (
          <Particle key={`np-${i}`} pts={pts} color={NICHES[i].color}
            delay={3.6 + i * 0.32} dur={1.4} r={2.1} rd={0.85 + i * 0.22}
          />
        ))}

        {/* ── PILLAR NODES ── */}
        {PILLARS.map(p => (
          <PillarNode key={p.id} id={p.id} x={p.x} y={p.y} color={p.color} label={p.label} sub={p.sub}
            isActive={isPillarActive(p.id)}
            onEnter={() => setHoveredPillar(p.id)} onLeave={() => setHoveredPillar(null)}
          />
        ))}

        {/* ── NICHE NODES ── */}
        {NICHES.map(n => (
          <NicheNode key={n.id} niche={n}
            isActive={isNicheActive(n.id)}
            onEnter={() => setHoveredNiche(n.id)} onLeave={() => setHoveredNiche(null)}
          />
        ))}
      </svg>
    </div>
  )
}
