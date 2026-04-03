"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, ArrowRight, Brain, BarChart3, Bot, Eye, Sparkles, Shield } from "lucide-react"

const mangoes = [
  {
    slug: "ai-automation",
    icon: <Brain className="h-6 w-6" />,
    title: "AI Automation",
    stat: "85% less manual work",
    color: "#e05555",
    bg: "from-[#800000]/30 to-[#3d0000]/20",
    border: "border-[#800000]/50",
  },
  {
    slug: "data-analytics",
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Data Analytics",
    stat: "90% faster insights",
    color: "#e07030",
    bg: "from-[#7a3000]/30 to-[#3d1800]/20",
    border: "border-[#7a3000]/50",
  },
  {
    slug: "smart-chatbots",
    icon: <Bot className="h-6 w-6" />,
    title: "Smart Chatbots",
    stat: "60% fewer support costs",
    color: "#d4a017",
    bg: "from-[#6b4f00]/30 to-[#3d2d00]/20",
    border: "border-[#6b4f00]/50",
  },
  {
    slug: "computer-vision",
    icon: <Eye className="h-6 w-6" />,
    title: "Computer Vision",
    stat: "99.2% defect accuracy",
    color: "#c0a030",
    bg: "from-[#5a4800]/30 to-[#2d2400]/20",
    border: "border-[#5a4800]/50",
  },
  {
    slug: "generative-ai",
    icon: <Sparkles className="h-6 w-6" />,
    title: "Generative AI",
    stat: "10× content speed",
    color: "#b06080",
    bg: "from-[#600030]/30 to-[#300018]/20",
    border: "border-[#600030]/50",
  },
  {
    slug: "ai-strategy",
    icon: <Shield className="h-6 w-6" />,
    title: "AI Strategy",
    stat: "3–5× ROI identified",
    color: "#8080c0",
    bg: "from-[#300060]/30 to-[#180030]/20",
    border: "border-[#300060]/50",
  },
]

/* Branch start positions as % of tree SVG width/height — where each mango hangs */
const branchOrigins = [
  { x: 30, y: 28 }, // top-left branch
  { x: 70, y: 28 }, // top-right branch
  { x: 20, y: 45 }, // mid-left
  { x: 80, y: 45 }, // mid-right
  { x: 35, y: 60 }, // lower-left
  { x: 65, y: 60 }, // lower-right
]

function MangoTree() {
  return (
    <svg viewBox="0 0 200 180" className="w-full h-full" fill="none">
      {/* Trunk */}
      <motion.path
        d="M100 175 C98 155 96 135 100 110 C104 135 102 155 100 175Z"
        fill="#5c3a1e"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ transformOrigin: "100px 175px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.rect
        x="96" y="110" width="8" height="65"
        fill="#7a4f2a" rx="3"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ transformOrigin: "100px 175px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Main canopy layers */}
      {[
        { cx: 100, cy: 85, r: 55, delay: 0.4 },
        { cx: 70,  cy: 70, r: 42, delay: 0.55 },
        { cx: 130, cy: 70, r: 42, delay: 0.55 },
        { cx: 100, cy: 50, r: 38, delay: 0.7 },
        { cx: 60,  cy: 55, r: 30, delay: 0.8 },
        { cx: 140, cy: 55, r: 30, delay: 0.8 },
        { cx: 100, cy: 30, r: 28, delay: 0.9 },
      ].map((c, i) => (
        <motion.circle
          key={i}
          cx={c.cx} cy={c.cy} r={c.r}
          fill={i === 0 ? "#1a5c1a" : i <= 2 ? "#226622" : "#2d7a2d"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          transition={{ delay: c.delay, duration: 0.5, type: "spring", stiffness: 180 }}
        />
      ))}

      {/* Branch stems to mango positions */}
      {branchOrigins.map((b, i) => (
        <motion.line
          key={i}
          x1={b.x} y1={b.y - 2}
          x2={b.x} y2={b.y + 8}
          stroke="#5c3a1e"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 + i * 0.1 }}
        />
      ))}

      {/* Hanging mangoes on tree (before they fall) */}
      {branchOrigins.map((b, i) => (
        <motion.ellipse
          key={`mango-${i}`}
          cx={b.x} cy={b.y + 12}
          rx="7" ry="9"
          fill={mangoes[i].color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${b.x}px ${b.y + 12}px` }}
          transition={{ delay: 1.1 + i * 0.12, duration: 0.4, type: "spring" }}
        />
      ))}
    </svg>
  )
}

export function MangoTreeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [fallen, setFallen] = useState<boolean[]>(Array(6).fill(false))

  useEffect(() => {
    if (!open) { setFallen(Array(6).fill(false)); return }
    // Stagger-drop each mango after tree is drawn
    mangoes.forEach((_, i) => {
      setTimeout(() => {
        setFallen((prev) => { const n = [...prev]; n[i] = true; return n })
      }, 1600 + i * 280)
    })
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl rounded-3xl border border-[#3d4446] bg-[#0d0d0d] overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#2d3436] text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-2 text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070] mb-3"
              >
                🥭 Your AI Journey Starts Here
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-extrabold text-white"
              >
                Pick the fruit that fits your business
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-500 mt-1"
              >
                Each solution ripens and falls — ready to transform your operations.
              </motion.p>
            </div>

            {/* Tree */}
            <div className="relative mx-auto w-48 h-44 mt-2">
              <MangoTree />
            </div>

            {/* Falling mangoes → landing cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-5 pb-6 mt-1">
              {mangoes.map((m, i) => (
                <div key={m.slug} className="relative min-h-[110px]">
                  <AnimatePresence>
                    {fallen[i] && (
                      <motion.div
                        key="card"
                        initial={{ y: -160, opacity: 0, rotate: -12, scale: 0.7 }}
                        animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 14,
                          mass: 0.9,
                        }}
                      >
                        <Link
                          href={`/services/${m.slug}`}
                          onClick={onClose}
                          className={`group flex flex-col gap-2 rounded-2xl border ${m.border} bg-gradient-to-br ${m.bg} p-4 h-full hover:scale-[1.03] transition-transform`}
                        >
                          {/* Mango dot */}
                          <div className="flex items-center gap-2">
                            <motion.div
                              initial={{ scale: 1.6 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                              style={{ backgroundColor: `${m.color}22`, color: m.color }}
                            >
                              {m.icon}
                            </motion.div>
                            <p className="text-xs font-bold text-white leading-tight">{m.title}</p>
                          </div>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="text-xs font-semibold leading-tight"
                            style={{ color: m.color }}
                          >
                            {m.stat}
                          </motion.p>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="text-[10px] text-gray-500 flex items-center gap-1 group-hover:text-gray-300 transition-colors"
                          >
                            Learn more <ArrowRight className="h-2.5 w-2.5" />
                          </motion.span>
                        </Link>
                      </motion.div>
                    )}
                    {/* Placeholder while waiting to fall */}
                    {!fallen[i] && (
                      <motion.div
                        key="placeholder"
                        exit={{ opacity: 0 }}
                        className="rounded-2xl border border-[#2a2a2a] bg-[#141414] h-[110px] flex items-center justify-center"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                          className="h-5 w-5 rounded-full"
                          style={{ backgroundColor: `${mangoes[i].color}40` }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5 }}
              className="border-t border-[#2a2a2a] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <p className="text-sm text-gray-400 text-center sm:text-left">
                Not sure which fits? <span className="text-white font-medium">Book a free 30-min call.</span>
              </p>
              <Link
                href="/#contact"
                onClick={onClose}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#800000] hover:bg-[#a00000] px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              >
                Let&apos;s Talk <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
