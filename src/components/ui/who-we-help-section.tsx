"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { blueprints } from "@/lib/industry-blueprints"
import { BlueprintModal } from "@/components/ui/blueprint-modal"
import type { Blueprint } from "@/lib/industry-blueprints"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

export function WhoWeHelpSection() {
  const [active, setActive] = useState<Blueprint | null>(null)

  return (
    <section className="w-full py-20 md:py-28 bg-[#060606]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#800000]/30 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070] mb-4">
            Industries We Transform
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Who We Help
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-400 leading-relaxed">
            Every industry has a different problem. Every AI solution we build is tailored to it.
            Click any industry to see the complete AI blueprint we&apos;d build for your business.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {blueprints.map((bp) => (
            <motion.button
              key={bp.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActive(bp)}
              className="group relative flex flex-col rounded-2xl border bg-[#0d0d0d] p-6 text-left transition-all hover:shadow-xl overflow-hidden"
              style={{
                borderColor: `${bp.color}30`,
              }}
            >
              {/* Glow corner */}
              <div
                className="absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                style={{ backgroundColor: `${bp.color}30` }}
              />

              {/* Icon + emoji */}
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl transition-transform group-hover:scale-110 duration-300"
                style={{ backgroundColor: `${bp.color}15`, border: `1px solid ${bp.color}25` }}
              >
                {bp.emoji}
              </div>

              {/* Title */}
              <h3 className="text-lg font-extrabold text-white mb-1">{bp.industry}</h3>
              <p className="text-sm text-gray-500 leading-snug mb-4 flex-1">{bp.tagline}</p>

              {/* Top 3 problems as pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {bp.problems.slice(0, 3).map((p, i) => (
                  <span
                    key={i}
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium border"
                    style={{
                      borderColor: `${bp.color}25`,
                      backgroundColor: `${bp.color}10`,
                      color: `${bp.color}`,
                    }}
                  >
                    {p.title}
                  </span>
                ))}
              </div>

              {/* ROI teaser */}
              <div
                className="rounded-xl px-3 py-2 mb-4 text-xs font-medium text-gray-300"
                style={{ backgroundColor: `${bp.color}10`, border: `1px solid ${bp.color}20` }}
              >
                <span style={{ color: bp.color }} className="font-bold">Payback: </span>
                {bp.roi.payback} · {bp.roi.items[0].value}
              </div>

              {/* CTA row */}
              <div className="flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: bp.color }}>
                <span>View Full AI Blueprint</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center text-sm text-gray-600"
        >
          Don&apos;t see your industry?{" "}
          <a href="#contact" className="text-[#e07070] hover:text-white transition-colors font-medium">
            Tell us your business — we&apos;ll build the blueprint.
          </a>
        </motion.p>
      </div>

      {/* Blueprint detail modal */}
      <BlueprintModal blueprint={active} onClose={() => setActive(null)} />
    </section>
  )
}
