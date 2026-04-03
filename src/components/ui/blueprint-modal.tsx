"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle, Lightbulb, GitBranch, TrendingUp, Map, Clock, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Blueprint } from "@/lib/industry-blueprints"

/* ─── Tab config ─────────────────────────────────────────── */
const TABS = [
  { id: "problems",  label: "Problems",      icon: <AlertTriangle className="h-3.5 w-3.5" /> },
  { id: "solutions", label: "AI Solutions",  icon: <Lightbulb className="h-3.5 w-3.5" /> },
  { id: "arch",      label: "Architecture",  icon: <GitBranch className="h-3.5 w-3.5" /> },
  { id: "roi",       label: "ROI",           icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { id: "roadmap",   label: "Roadmap",       icon: <Map className="h-3.5 w-3.5" /> },
  { id: "day",       label: "Day in Life",   icon: <Clock className="h-3.5 w-3.5" /> },
]

/* ─── Helper ─────────────────────────────────────────────── */
function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold border"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}15`, color }}
    >
      {children}
    </span>
  )
}

/* ─── Tab Panels ─────────────────────────────────────────── */
function ProblemsTab({ bp }: { bp: Blueprint }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 leading-relaxed">{bp.description}</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {bp.problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl border border-[#2a2a2a] bg-[#111] p-4"
          >
            <div className="flex items-start gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: bp.color }} />
              <p className="text-sm font-bold text-white leading-tight">{p.title}</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">{p.desc}</p>
            <span className="text-[10px] font-bold" style={{ color: bp.color }}>{p.cost}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-[#2a2a2a] bg-[#0f0f0f] p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Tools Used Today</p>
        <div className="flex flex-wrap gap-2">
          {bp.currentTools.map((t) => (
            <span key={t} className="rounded-full border border-[#3d4446] bg-[#1a1a1a] px-3 py-1 text-xs text-gray-400">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SolutionsTab({ bp }: { bp: Blueprint }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {bp.solutions.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="rounded-xl border border-[#2a2a2a] bg-[#111] p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-white leading-tight">{s.title}</p>
            <div className="text-right shrink-0">
              <p className="text-lg font-extrabold leading-none" style={{ color: bp.color }}>{s.metric}</p>
              <p className="text-[9px] text-gray-500 leading-tight">{s.metricLabel}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

function ArchitectureTab({ bp }: { bp: Blueprint }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 mb-4">How data flows through your AI system — from raw inputs to decisions your team actually acts on.</p>
      {bp.architecture.map((layer, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border bg-[#0f0f0f] p-4"
          style={{ borderColor: `${layer.color}30` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: layer.color }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: layer.color }}>{layer.label}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {layer.items.map((item) => (
              <span
                key={item}
                className="rounded-lg border px-2.5 py-1 text-[11px] text-gray-300"
                style={{ borderColor: `${layer.color}25`, backgroundColor: `${layer.color}08` }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
      {/* Flow arrows between layers */}
      <div className="flex flex-col items-center gap-0 py-1 opacity-40">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-3 w-px bg-gradient-to-b from-gray-500 to-transparent" />
            <ChevronRight className="h-3 w-3 text-gray-500 rotate-90" />
          </div>
        ))}
      </div>
      {/* Roles row */}
      <div className="rounded-xl border border-[#2a2a2a] bg-[#0f0f0f] p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Who Uses It</p>
        <div className="space-y-2">
          {bp.roles.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="grid grid-cols-[1fr_auto] gap-3 items-start border-b border-[#1a1a1a] pb-2 last:border-0 last:pb-0"
            >
              <div>
                <p className="text-xs font-semibold text-white">{r.title}</p>
                <p className="text-[11px] text-gray-500 leading-snug mt-0.5">{r.painPoint}</p>
              </div>
              <div className="flex items-start gap-1 shrink-0 max-w-[160px]">
                <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5" style={{ color: bp.color }} />
                <p className="text-[11px] text-gray-300 leading-snug">{r.aiGain}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ROITab({ bp }: { bp: Blueprint }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {bp.roi.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-[#2a2a2a] bg-[#111] p-4 text-center"
          >
            <p className="text-lg font-extrabold leading-tight" style={{ color: item.color }}>{item.value}</p>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">{item.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-[#2a2a2a] bg-[#0f0f0f] p-5"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${bp.color}20` }}>
            <TrendingUp className="h-4 w-4" style={{ color: bp.color }} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Payback Period</p>
            <p className="text-xl font-extrabold" style={{ color: bp.color }}>{bp.roi.payback}</p>
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">{bp.roi.summary}</p>
      </motion.div>
    </div>
  )
}

function RoadmapTab({ bp }: { bp: Blueprint }) {
  const [openPhase, setOpenPhase] = useState<number | null>(0)
  return (
    <div className="space-y-2">
      {bp.roadmap.map((phase, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
          className="rounded-xl border border-[#2a2a2a] bg-[#111] overflow-hidden"
        >
          <button
            onClick={() => setOpenPhase(openPhase === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                style={{ backgroundColor: `${bp.color}20`, color: bp.color }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-white">{phase.title}</p>
                <p className="text-[11px] text-gray-500">{phase.duration}</p>
              </div>
            </div>
            <ChevronRight className={`h-4 w-4 text-gray-600 transition-transform ${openPhase === i ? "rotate-90" : ""}`} />
          </button>
          <AnimatePresence>
            {openPhase === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-0 border-t border-[#1a1a1a]">
                  <p className="text-sm text-gray-400 leading-relaxed mt-3 mb-3">{phase.desc}</p>
                  <div className="space-y-1">
                    {phase.wins.map((w, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: bp.color }} />
                        <span className="text-xs text-gray-300">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

function DayInLifeTab({ bp }: { bp: Blueprint }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">See how a single day changes — before and after AI.</p>
      {bp.dayInLife.map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="rounded-xl border border-[#2a2a2a] bg-[#0f0f0f] overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1a1a1a]">
            <span className="font-mono text-xs font-bold" style={{ color: bp.color }}>{d.time}</span>
            <span className="text-xs font-semibold text-white">{d.event}</span>
          </div>
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#1a1a1a]">
            <div className="px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-500/70 mb-1.5">Without AI</p>
              <p className="text-xs text-gray-500 leading-relaxed">{d.withoutAI}</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: bp.color }}>With AI</p>
              <p className="text-xs text-gray-300 leading-relaxed">{d.withAI}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Main Modal ─────────────────────────────────────────── */
export function BlueprintModal({
  blueprint,
  onClose,
}: {
  blueprint: Blueprint | null
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState("problems")

  const bp = blueprint
  if (!bp) return null

  return (
    <AnimatePresence>
      {bp && (
        <motion.div
          key="blueprint-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

          <motion.div
            key="blueprint-panel"
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 28 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl rounded-3xl border border-[#2a2a2a] bg-[#080808] flex flex-col max-h-[92vh]"
          >
            {/* ── Header ────────────────────────────────── */}
            <div
              className="shrink-0 rounded-t-3xl px-6 pt-6 pb-5"
              style={{
                background: `linear-gradient(135deg, ${bp.color}18 0%, transparent 60%)`,
                borderBottom: `1px solid ${bp.color}20`,
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] border border-[#2d2d2d] text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-4 pr-8">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
                  style={{ backgroundColor: `${bp.color}20`, border: `1px solid ${bp.color}30` }}
                >
                  {bp.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <Tag color={bp.color}>AI Blueprint</Tag>
                  <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-white leading-tight">{bp.industry}</h2>
                  <p className="text-sm text-gray-400 mt-1 leading-snug">{bp.tagline}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-5 flex gap-1 overflow-x-auto pb-0 scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all
                      ${activeTab === tab.id
                        ? "text-white"
                        : "text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]"
                      }`}
                    style={activeTab === tab.id ? { backgroundColor: `${bp.color}25`, color: bp.color } : {}}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Content ───────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  {activeTab === "problems"  && <ProblemsTab bp={bp} />}
                  {activeTab === "solutions" && <SolutionsTab bp={bp} />}
                  {activeTab === "arch"      && <ArchitectureTab bp={bp} />}
                  {activeTab === "roi"       && <ROITab bp={bp} />}
                  {activeTab === "roadmap"   && <RoadmapTab bp={bp} />}
                  {activeTab === "day"       && <DayInLifeTab bp={bp} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Footer ────────────────────────────────── */}
            <div className="shrink-0 rounded-b-3xl border-t border-[#1a1a1a] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#080808]">
              <p className="text-sm text-gray-400 text-center sm:text-left">
                Ready to build this for your business?{" "}
                <span className="text-white font-medium">Free 30-min consultation.</span>
              </p>
              <Link
                href="/#contact"
                onClick={onClose}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: bp.color }}
              >
                Start My AI Journey <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
