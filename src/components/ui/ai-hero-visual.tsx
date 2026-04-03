"use client"

import { motion } from "framer-motion"

export function AIHeroVisual() {
  const nodes = [
    { x: 50, y: 50, r: 22, label: "AI Core" },
    { x: 50, y: 15, r: 13, label: "Analytics" },
    { x: 82, y: 30, r: 13, label: "Automation" },
    { x: 82, y: 70, r: 13, label: "Vision" },
    { x: 50, y: 85, r: 13, label: "Chatbot" },
    { x: 18, y: 70, r: 13, label: "GenAI" },
    { x: 18, y: 30, r: 13, label: "Security" },
  ]

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black rounded-3xl overflow-hidden border border-[#3d4446]">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(128,0,0,0.18)_0%,transparent_65%)]" />

      <svg viewBox="0 0 100 100" className="relative z-10 w-[85%] h-[85%]">
        <defs>
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e05555" />
            <stop offset="100%" stopColor="#800000" />
          </radialGradient>
          <radialGradient id="outerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3d4446" />
            <stop offset="100%" stopColor="#2d3436" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="#800000"
            strokeWidth="0.4"
            strokeOpacity="0.6"
            strokeDasharray="3 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.8 }}
          />
        ))}

        {/* Travelling data pulses */}
        {edges.map(([a, b], i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="0.8"
            fill="#e05555"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [nodes[a].x, nodes[b].x],
              cy: [nodes[a].y, nodes[b].y],
            }}
            transition={{
              delay: 1 + i * 0.4,
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Outer nodes */}
        {nodes.slice(1).map((n, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5, type: "spring" }}
            style={{ transformOrigin: `${n.x}% ${n.y}%` }}
          >
            <circle cx={n.x} cy={n.y} r={n.r + 2} fill="#800000" fillOpacity="0.08" />
            <circle cx={n.x} cy={n.y} r={n.r} fill="url(#outerGrad)" stroke="#3d4446" strokeWidth="0.5" />
            <text x={n.x} y={n.y + 0.5} textAnchor="middle" dominantBaseline="middle"
              fontSize="3.2" fill="#e07070" fontWeight="600" fontFamily="sans-serif">
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* Centre core node */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
          style={{ transformOrigin: "50% 50%" }}
        >
          <motion.circle
            cx="50" cy="50" r="26"
            fill="#800000" fillOpacity="0.06"
            animate={{ r: [26, 29, 26] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="50" cy="50" r={nodes[0].r} fill="url(#nodeGrad)" filter="url(#glow)" />
          <text x="50" y="49" textAnchor="middle" dominantBaseline="middle"
            fontSize="4" fill="#fff" fontWeight="700" fontFamily="sans-serif">
            AI
          </text>
          <text x="50" y="54.5" textAnchor="middle" dominantBaseline="middle"
            fontSize="2.8" fill="#ffbbbb" fontFamily="sans-serif">
            Core
          </text>
        </motion.g>
      </svg>

      {/* Floating metric chips */}
      {[
        { label: "Small Business", sub: "Affordable AI plans", pos: "bottom-5 left-5" },
        { label: "Enterprise", sub: "Scale-ready models", pos: "top-5 right-5" },
      ].map(({ label, sub, pos }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className={`absolute ${pos} flex flex-col rounded-xl border border-[#3d4446] bg-black/80 backdrop-blur px-3 py-2`}
        >
          <span className="text-xs font-bold text-white">{label}</span>
          <span className="text-[10px] text-gray-500">{sub}</span>
        </motion.div>
      ))}
    </div>
  )
}
