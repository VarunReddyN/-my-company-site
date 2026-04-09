import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "creAIve Labs — AI Systems for Service Businesses"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute",
          left: "-100px",
          top: "-100px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,0,0,0.35) 0%, transparent 70%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute",
          right: "-100px",
          bottom: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,0,0,0.25) 0%, transparent 70%)",
          display: "flex",
        }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>

          {/* Logo mark SVG */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "120px", height: "120px", borderRadius: "28px", background: "#0d0d0d", border: "1px solid rgba(128,0,0,0.4)" }}>
            <svg width="80" height="80" viewBox="0 0 32 32">
              <path d="M16 7.5 L23.5 20.5 L8.5 20.5 Z" fill="none" stroke="#800000" strokeOpacity="0.28" strokeWidth="0.6"/>
              <line x1="16" y1="15.5" x2="16" y2="9" stroke="#c03030" strokeWidth="1.1" strokeOpacity="0.80" strokeLinecap="round"/>
              <line x1="16" y1="15.5" x2="22.5" y2="20" stroke="#c03030" strokeWidth="1.1" strokeOpacity="0.80" strokeLinecap="round"/>
              <line x1="16" y1="15.5" x2="9.5" y2="20" stroke="#c03030" strokeWidth="1.1" strokeOpacity="0.80" strokeLinecap="round"/>
              <circle cx="16" cy="7.5" r="2.2" fill="#e05555"/>
              <circle cx="22.5" cy="20.5" r="1.9" fill="#c03535"/>
              <circle cx="9.5" cy="20.5" r="1.9" fill="#c03535"/>
              <circle cx="16" cy="15.5" r="3.6" fill="#cc2020"/>
              <circle cx="16" cy="15.5" r="1.6" fill="#ff7070"/>
            </svg>
          </div>

          {/* Company name */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "0px" }}>
            <span style={{ fontSize: "72px", fontWeight: 300, color: "#e8e8e8", fontFamily: "sans-serif", letterSpacing: "-2px" }}>cre</span>
            <span style={{ fontSize: "72px", fontWeight: 700, color: "#cc2020", fontFamily: "sans-serif", letterSpacing: "-2px" }}>AI</span>
            <span style={{ fontSize: "72px", fontWeight: 300, color: "#e8e8e8", fontFamily: "sans-serif", letterSpacing: "-2px" }}>ve Labs</span>
          </div>

          {/* Tagline */}
          <div style={{ fontSize: "26px", color: "#666666", fontFamily: "sans-serif", letterSpacing: "4px", textTransform: "uppercase" }}>
            AI Systems for Service Businesses
          </div>

          {/* URL */}
          <div style={{ fontSize: "20px", color: "#444444", fontFamily: "sans-serif", letterSpacing: "2px" }}>
            creaivelabs.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
