"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, ArrowRight } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const GREETING = "Hey! I'm Reddy — happy to help with any questions about creAIve Labs or AI in general. What's on your mind? 😊"

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: "user", content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages([...next, { role: "assistant", content: data.message || "Sorry, I couldn't respond. Email hello@creaivelabs.com" }])
    } catch {
      setMessages([...next, { role: "assistant", content: "Something went wrong. Email hello@creaivelabs.com" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] sm:w-[380px] rounded-2xl border border-white/8 bg-[#0a0a0a] shadow-2xl shadow-black/60 flex flex-col overflow-hidden"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-[#0d0d0d]">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-[#800000]/20 border border-[#800000]/40 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 32 32">
                      <path d="M16 7.5 L23.5 20.5 L8.5 20.5 Z" fill="none" stroke="#800000" strokeOpacity="0.35" strokeWidth="0.8"/>
                      <line x1="16" y1="15.5" x2="16" y2="9" stroke="#c03030" strokeWidth="1.4" strokeOpacity="0.9" strokeLinecap="round"/>
                      <line x1="16" y1="15.5" x2="22.5" y2="20" stroke="#c03030" strokeWidth="1.4" strokeOpacity="0.9" strokeLinecap="round"/>
                      <line x1="16" y1="15.5" x2="9.5" y2="20" stroke="#c03030" strokeWidth="1.4" strokeOpacity="0.9" strokeLinecap="round"/>
                      <circle cx="16" cy="7.5" r="2.2" fill="#e05555"/>
                      <circle cx="22.5" cy="20.5" r="1.9" fill="#c03535"/>
                      <circle cx="9.5" cy="20.5" r="1.9" fill="#c03535"/>
                      <circle cx="16" cy="15.5" r="2.8" fill="#cc2020"/>
                      <circle cx="16" cy="15.5" r="1.2" fill="#ff7070"/>
                    </svg>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#0d0d0d]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-none">Reddy</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">creAIve Labs AI</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: "340px" }}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#800000] text-white rounded-br-sm"
                        : "bg-[#161616] border border-white/6 text-gray-300 rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#161616] border border-white/6 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1.5 items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#800000] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#800000] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#800000] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Book a call CTA */}
            <div className="px-4 pb-2">
              <a href="https://cal.com/creaivelabs" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between w-full rounded-xl border border-[#800000]/30 bg-[#800000]/10 px-3.5 py-2.5 hover:bg-[#800000]/20 transition-colors"
              >
                <span className="text-xs font-semibold text-[#e07070]">Book a Free 30-Min Call</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#e07070]" />
              </a>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-[#161616] px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="text-[#800000] hover:text-[#e05555] transition-colors disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-[#800000] hover:bg-[#a00000] shadow-lg shadow-[#800000]/30 flex items-center justify-center transition-colors relative"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.15 }}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 7.5 L23.5 20.5 L8.5 20.5 Z" stroke="white" strokeOpacity="0.4" strokeWidth="0.8" fill="none"/>
                <line x1="16" y1="15.5" x2="16" y2="9" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="16" y1="15.5" x2="22.5" y2="20" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="16" y1="15.5" x2="9.5" y2="20" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="16" cy="7.5" r="2.2" fill="white"/>
                <circle cx="22.5" cy="20.5" r="1.9" fill="white" fillOpacity="0.8"/>
                <circle cx="9.5" cy="20.5" r="1.9" fill="white" fillOpacity="0.8"/>
                <circle cx="16" cy="15.5" r="2.8" fill="white"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#030303] animate-pulse" />
        )}
      </motion.button>
    </div>
  )
}
