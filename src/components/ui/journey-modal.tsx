"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight } from "lucide-react"
import { blueprints } from "@/lib/industry-blueprints"
import { BlueprintModal } from "@/components/ui/blueprint-modal"
import type { Blueprint } from "@/lib/industry-blueprints"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const tileVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 220, damping: 20 } },
}

export function JourneyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState<Blueprint | null>(null)

  const handleClose = () => {
    onClose()
    setTimeout(() => setActive(null), 400)
  }

  return (
    <>
      <AnimatePresence>
        {open && !active && (
          <motion.div
            key="journey-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            <motion.div
              key="journey-panel"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-2xl rounded-3xl border border-[#2a2a2a] bg-[#080808] overflow-hidden max-h-[92vh] flex flex-col"
            >
              {/* Subtle grid overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] border border-[#2d2d2d] text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="px-6 pt-7 pb-4 shrink-0 text-center">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#800000]/30 bg-[#800000]/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#e07070] mb-3"
                >
                  ⚡ AI Transformation Blueprints
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-extrabold text-white"
                >
                  What industry are you in?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="mt-1 text-sm text-gray-500"
                >
                  Click your industry to see the exact AI system we&apos;d build for your business.
                </motion.p>
              </div>

              {/* Industry tiles */}
              <div className="flex-1 overflow-y-auto px-5 pb-6">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {blueprints.map((bp) => (
                    <motion.button
                      key={bp.id}
                      variants={tileVariants}
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActive(bp)}
                      className="group relative flex flex-col rounded-2xl border bg-[#0f0f0f] p-4 text-left transition-all overflow-hidden"
                      style={{ borderColor: `${bp.color}30` }}
                    >
                      {/* hover glow */}
                      <div
                        className="pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundColor: `${bp.color}35` }}
                      />

                      {/* Emoji icon */}
                      <div
                        className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-transform group-hover:scale-110 duration-300"
                        style={{ backgroundColor: `${bp.color}15`, border: `1px solid ${bp.color}25` }}
                      >
                        {bp.emoji}
                      </div>

                      {/* Name */}
                      <p className="text-sm font-bold text-white leading-tight mb-1">{bp.industry}</p>

                      {/* Payback */}
                      <p className="text-[10px] font-semibold mb-3" style={{ color: bp.color }}>
                        ROI in {bp.roi.payback}
                      </p>

                      {/* Top problem pills */}
                      <div className="flex flex-col gap-1 mb-3">
                        {bp.problems.slice(0, 2).map((p, i) => (
                          <span
                            key={i}
                            className="text-[9px] leading-tight text-gray-500 flex items-center gap-1"
                          >
                            <span className="h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: bp.color }} />
                            {p.title}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-auto flex items-center gap-1 text-[11px] font-semibold transition-colors" style={{ color: bp.color }}>
                        View Blueprint
                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t border-[#1a1a1a] px-6 py-4 text-center">
                <p className="text-xs text-gray-600">
                  Don&apos;t see your industry?{" "}
                  <a href="/#contact" onClick={handleClose} className="text-[#e07070] hover:text-white transition-colors font-medium">
                    Tell us your business →
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blueprint detail — opens on top */}
      <BlueprintModal
        blueprint={active}
        onClose={() => setActive(null)}
      />
    </>
  )
}
