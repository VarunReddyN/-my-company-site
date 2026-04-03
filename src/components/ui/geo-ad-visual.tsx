"use client"

import { motion } from "framer-motion"

/* ─── Pulsing location pin ───────────────────────────────── */
function Pin({
  x, y, label, color, delay = 0, side = "right",
}: {
  x: number; y: number; label: string; color: string; delay?: number; side?: "left" | "right"
}) {
  return (
    <g>
      {[1, 2, 3].map((n) => (
        <motion.circle
          key={n} cx={x} cy={y} r={8}
          fill="none" stroke={color} strokeWidth={0.5}
          initial={{ r: 8, opacity: 0.6 }}
          animate={{ r: 8 + n * 11, opacity: 0 }}
          transition={{ duration: 2.2, delay: delay + n * 0.5, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <motion.circle
        cx={x} cy={y} r={6}
        fill={`${color}18`} stroke={color} strokeWidth={1.4}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, type: "spring", stiffness: 260, damping: 18 }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.circle
        cx={x} cy={y} r={2.8}
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.15, type: "spring", stiffness: 300 }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />
      <motion.text
        x={side === "right" ? x + 11 : x - 11}
        y={y + 1}
        textAnchor={side === "right" ? "start" : "end"}
        fill={color} fontSize="6.5" fontWeight="700" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        {label}
      </motion.text>
    </g>
  )
}

/* ─── AI Core ────────────────────────────────────────────── */
function AICore({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      {[24, 17, 11].map((r, i) => (
        <motion.circle
          key={r} cx={cx} cy={cy} r={r}
          fill="none"
          stroke={i === 0 ? "#800000" : i === 1 ? "#e05555" : "#ff8888"}
          strokeWidth={i === 0 ? 0.5 : 0.9}
          animate={{ opacity: [0.15, 0.4, 0.15], r: [r, r + 2, r] }}
          transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      <motion.circle
        cx={cx} cy={cy} r={10}
        fill="#800000"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180
        return (
          <motion.line
            key={angle}
            x1={cx} y1={cy}
            x2={cx + Math.cos(rad) * 19}
            y2={cy + Math.sin(rad) * 19}
            stroke="#e05555" strokeWidth={0.6}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 2, delay: angle / 360, repeat: Infinity }}
          />
        )
      })}
      <text x={cx} y={cy + 3} textAnchor="middle" fill="white" fontSize="6" fontWeight="800" fontFamily="monospace">AI</text>
    </g>
  )
}

/* ─── Dashed arc ─────────────────────────────────────────── */
function Arc({ d, color, delay = 0 }: { d: string; color: string; delay?: number }) {
  return (
    <motion.path
      d={d} stroke={color} strokeWidth={0.8}
      strokeDasharray="3 4" fill="none" opacity={0.35}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    />
  )
}

/* ─── Traveling dot interpolated along a quadratic curve ─── */
function TravelDot({
  x1, y1, cx: qcx, qcy, x2, y2, color, delay = 0, dur = 1.8,
}: {
  x1: number; y1: number; cx: number; qcy: number; x2: number; y2: number
  color: string; delay?: number; dur?: number
}) {
  // Sample N points along quadratic bezier Q(t) = (1-t)²P0 + 2t(1-t)P1 + t²P2
  const N = 40
  const xs = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1)
    return (1 - t) ** 2 * x1 + 2 * t * (1 - t) * qcx + t ** 2 * x2
  })
  const ys = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1)
    return (1 - t) ** 2 * y1 + 2 * t * (1 - t) * qcy + t ** 2 * y2
  })

  return (
    <motion.circle
      r={2.8}
      fill={color}
      animate={{ cx: xs, cy: ys, opacity: [0, 1, 1, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
    />
  )
}

/* ─── Ad packet traveling along a curve ─────────────────── */
function AdPacket({
  x1, y1, cx: qcx, qcy, x2, y2, color, label, delay = 0,
}: {
  x1: number; y1: number; cx: number; qcy: number; x2: number; y2: number
  color: string; label: string; delay?: number
}) {
  const N = 30
  const xs = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1)
    return (1 - t) ** 2 * x1 + 2 * t * (1 - t) * qcx + t ** 2 * x2
  })
  const ys = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1)
    return (1 - t) ** 2 * y1 + 2 * t * (1 - t) * qcy + t ** 2 * y2
  })

  return (
    <motion.g
      animate={{ x: xs, y: ys, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.2, delay, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.0 }}
    >
      <rect x={-13} y={-8} width={26} height={15} rx={3} fill={`${color}22`} stroke={color} strokeWidth={0.8} />
      <text x={0} y={3} textAnchor="middle" fill={color} fontSize="5" fontWeight="700" fontFamily="monospace">{label}</text>
    </motion.g>
  )
}

/* ─── Dot grid background ────────────────────────────────── */
function MapGrid() {
  const dots = []
  for (let col = 0; col < 13; col++) {
    for (let row = 0; row < 9; row++) {
      dots.push({ x: 12 + col * 22, y: 12 + row * 20 })
    }
  }
  return (
    <g opacity={0.1}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={0.8} fill="#888" />
      ))}
    </g>
  )
}

/* ─── Main Visual ─────────────────────────────────────────── */
export function GeoAdVisual() {
  // Key coordinates
  const srcX = 50,  srcY = 90   // Advertiser
  const aiX  = 140, aiY  = 88   // AI Engine
  const t1X  = 228, t1Y  = 52   // Audience A
  const t2X  = 238, t2Y  = 100  // Audience B
  const t3X  = 218, t3Y  = 148  // Audience C

  // Quad-bezier control points (bend up or down)
  const cpSrcAI  = { cx: (srcX + aiX) / 2,  cy: (srcY + aiY) / 2 - 36 }
  const cpAIT1   = { cx: (aiX + t1X)  / 2,  cy: (aiY + t1Y)  / 2 - 28 }
  const cpAIT2   = { cx: (aiX + t2X)  / 2,  cy: (aiY + t2Y)  / 2 + 4  }
  const cpAIT3   = { cx: (aiX + t3X)  / 2,  cy: (aiY + t3Y)  / 2 + 32 }

  const arcSrcAI = `M ${srcX} ${srcY} Q ${cpSrcAI.cx} ${cpSrcAI.cy} ${aiX} ${aiY}`
  const arcAIT1  = `M ${aiX} ${aiY} Q ${cpAIT1.cx} ${cpAIT1.cy} ${t1X} ${t1Y}`
  const arcAIT2  = `M ${aiX} ${aiY} Q ${cpAIT2.cx} ${cpAIT2.cy} ${t2X} ${t2Y}`
  const arcAIT3  = `M ${aiX} ${aiY} Q ${cpAIT3.cx} ${cpAIT3.cy} ${t3X} ${t3Y}`

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ aspectRatio: "16/10", background: "#050505" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 55% at 50% 50%, #80000012 0%, transparent 70%)" }}
      />

      <svg viewBox="0 0 280 180" className="w-full h-full" fill="none">
        <MapGrid />

        {/* Arcs */}
        <Arc d={arcSrcAI} color="#e05555" delay={0.5} />
        <Arc d={arcAIT1}  color="#e07030" delay={0.8} />
        <Arc d={arcAIT2}  color="#d4a017" delay={0.95} />
        <Arc d={arcAIT3}  color="#4caf7d" delay={1.1} />

        {/* Traveling dots: src → AI */}
        <TravelDot x1={srcX} y1={srcY} cx={cpSrcAI.cx} qcy={cpSrcAI.cy} x2={aiX} y2={aiY} color="#e05555" delay={1.2} dur={1.6} />
        <TravelDot x1={srcX} y1={srcY} cx={cpSrcAI.cx} qcy={cpSrcAI.cy} x2={aiX} y2={aiY} color="#e05555" delay={2.8} dur={1.6} />

        {/* Ad packets: AI → targets */}
        <AdPacket x1={aiX} y1={aiY} cx={cpAIT1.cx} qcy={cpAIT1.cy} x2={t1X} y2={t1Y} color="#e07030" label="📍 AD" delay={1.7} />
        <AdPacket x1={aiX} y1={aiY} cx={cpAIT2.cx} qcy={cpAIT2.cy} x2={t2X} y2={t2Y} color="#d4a017" label="📍 AD" delay={2.3} />
        <AdPacket x1={aiX} y1={aiY} cx={cpAIT3.cx} qcy={cpAIT3.cy} x2={t3X} y2={t3Y} color="#4caf7d" label="📍 AD" delay={2.9} />

        {/* AI Core */}
        <AICore cx={aiX} cy={aiY} />

        {/* Pins */}
        <Pin x={srcX} y={srcY} label="YOUR BUSINESS" color="#e05555" delay={0.2} side="right" />
        <Pin x={t1X}  y={t1Y}  label="AUDIENCE A"    color="#e07030" delay={0.9} side="left" />
        <Pin x={t2X}  y={t2Y}  label="AUDIENCE B"    color="#d4a017" delay={1.05} side="left" />
        <Pin x={t3X}  y={t3Y}  label="AUDIENCE C"    color="#4caf7d" delay={1.2} side="left" />

        {/* AI label */}
        <motion.text x={aiX} y={aiY + 30} textAnchor="middle"
          fill="#e05555" fontSize="5.5" fontWeight="700" fontFamily="monospace" opacity={0.65}
          initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ delay: 1.5 }}
        >AI TARGETING ENGINE</motion.text>

        {/* Source sub-label */}
        <motion.text x={srcX} y={srcY + 22} textAnchor="middle"
          fill="#888" fontSize="4.5" fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.6 }}
        >AD CAMPAIGN</motion.text>

        {/* Scatter dots near target cluster */}
        {[
          { x: 248, y: 68 }, { x: 255, y: 92 }, { x: 248, y: 130 },
          { x: 232, y: 60 }, { x: 262, y: 112 }, { x: 242, y: 158 },
        ].map((d, i) => (
          <motion.circle key={i} cx={d.x} cy={d.y} r={1.2} fill="#e07030" opacity={0.3}
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity }}
          />
        ))}

        {/* Stats badge bottom-left */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
          <rect x={7} y={146} width={72} height={28} rx={4}
            fill="#0f0f0f" stroke="#800000" strokeWidth={0.6} opacity={0.95} />
          <text x={43} y={157} textAnchor="middle" fill="#e07070" fontSize="5" fontWeight="700" fontFamily="monospace">
            GEO AI TARGETING
          </text>
          <text x={43} y={167} textAnchor="middle" fill="#666" fontSize="4.5" fontFamily="monospace">
            1 SOURCE → N AUDIENCES
          </text>
        </motion.g>

        {/* Accuracy badge bottom-right */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, type: "spring" }}
          style={{ transformOrigin: "237px 164px" }}
        >
          <rect x={201} y={155} width={72} height={18} rx={4}
            fill="#4caf7d1a" stroke="#4caf7d" strokeWidth={0.6} />
          <text x={237} y={166} textAnchor="middle" fill="#4caf7d" fontSize="5" fontWeight="700" fontFamily="monospace">
            94.3% AUDIENCE MATCH
          </text>
        </motion.g>
      </svg>
    </div>
  )
}
