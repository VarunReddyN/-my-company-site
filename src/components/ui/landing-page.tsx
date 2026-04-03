"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Menu, X, ArrowRight, ChevronRight, Mail, MapPin, Phone,
  Camera, Send, Briefcase, Code, ArrowUpRight,
  Brain, Zap, BarChart3, Bot, Eye, Sparkles, Shield,
  TrendingUp, Clock, Users, Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AIHeroVisual } from "@/components/ui/ai-hero-visual"
import { JourneyModal } from "@/components/ui/journey-modal"
import { BodhiTreeSection } from "@/components/ui/bodhi-tree-section"

/* ── Animation Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ── Data ── */
const services = [
  {
    slug: "ai-strategy",
    icon: <Shield className="h-8 w-8" />,
    title: "AI Strategy & Consulting",
    desc: "Not sure where to start with AI? We audit your current processes, identify the highest-ROI automation opportunities, and create a clear roadmap. We help you avoid costly mistakes, choose the right tools, and build AI capabilities that last.",
  },
  {
    slug: "ai-automation",
    icon: <Brain className="h-8 w-8" />,
    title: "AI Automation",
    desc: "We map your manual, repetitive processes and replace them with intelligent AI pipelines. From invoice processing to HR onboarding — we automate tasks that drain your team's time, cut errors by up to 90%, and free your people to focus on work that actually matters.",
  },
  {
    slug: "data-analytics",
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Data Analytics & BI",
    desc: "Your data is your most underused asset. We build AI-powered dashboards and predictive models that surface trends before they become problems. Get real-time KPI tracking, forecasting, and anomaly alerts — all tailored to your industry and team.",
  },
  {
    slug: "smart-chatbots",
    icon: <Bot className="h-8 w-8" />,
    title: "Smart Chatbots",
    desc: "Deploy intelligent conversational agents that handle customer support, sales enquiries, lead qualification, and appointment booking — 24 hours a day, 7 days a week, in multiple languages. Reduce support costs by up to 60% while improving response times.",
  },
  {
    slug: "computer-vision",
    icon: <Eye className="h-8 w-8" />,
    title: "Computer Vision",
    desc: "We build vision systems that see and understand images and video at scale. From automated quality inspection on production lines to document digitisation, license plate recognition, and retail shelf analysis — we turn cameras into intelligent decision-makers.",
  },
  {
    slug: "generative-ai",
    icon: <Sparkles className="h-8 w-8" />,
    title: "Generative AI Integration",
    desc: "We embed large language models (LLMs) directly into your products and workflows. Build internal knowledge assistants, AI writing tools, code helpers, or RAG pipelines over your private documents — all hosted securely within your infrastructure.",
  },
]

const metrics = [
  { value: "10×", label: "Faster Processing" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "60%", label: "Cost Reduction" },
  { value: "24/7", label: "Uptime" },
]

const caseStudies = [
  {
    slug: "predictive-inventory",
    title: "Predictive Inventory AI",
    tag: "Retail • Automation",
    desc: "Cut stockouts by 70% and overstock costs by 40% using ML demand forecasting.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
    span: "col-span-2 row-span-2",
  },
  {
    slug: "nlp-support-bot",
    title: "NLP Support Bot",
    tag: "SaaS • Chatbot",
    desc: "Handles 3,000 tickets/day with 94% resolution rate, no human needed.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&fit=crop",
    span: "",
  },
  {
    slug: "vision-qa",
    title: "Vision QA System",
    tag: "Manufacturing • Computer Vision",
    desc: "Automated defect detection on assembly line — 99.2% accuracy at 200 units/min.",
    img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80&fit=crop",
    span: "",
  },
  {
    slug: "fraud-detection",
    title: "Fraud Detection Engine",
    tag: "Fintech • Machine Learning",
    desc: "Stopped $2M in fraudulent transactions in the first 6 months of deployment.",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80&fit=crop",
    span: "",
  },
  {
    slug: "geo-ai-advertising",
    title: "Geo-Targeted AI Advertising",
    tag: "Advertising • Location AI",
    desc: "AI routes ad spend from one source to precision micro-zones — 84% drop in cost per store visit.",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&fit=crop",
    span: "col-span-2",
  },
]

const testimonials = [
  {
    quote: "Creative AI Works automated our entire supply chain forecasting. We cut stockouts by 70% and overstock by 40% in the first quarter. The model keeps improving every week — it paid for itself in month one.",
    author: "Ravi Kumar",
    company: "COO, RetailPeak",
    rating: 5,
  },
  {
    quote: "Their NLP chatbot now handles over 3,000 support tickets a day with a 94% resolution rate. Our human agents focus only on complex escalations. ROI was visible within two weeks of going live.",
    author: "Jessica Lin",
    company: "Head of Customer Experience, CloudBase",
    rating: 5,
  },
  {
    quote: "The fraud detection model Varun and his team built stopped over $2 million in losses in just six months. The architecture is clean, well-documented, and genuinely world-class. Highly recommended.",
    author: "Ahmed Hassan",
    company: "CTO, FinFlow",
    rating: 5,
  },
  {
    quote: "We had 18 months of backlogged customer feedback data with no way to analyse it. Creative AI Works built a pipeline that processed all of it in under 3 days and surfaced insights we never expected to find.",
    author: "Meera Iyer",
    company: "VP of Data, GrowthLabs",
    rating: 5,
  },
]

/* ── Floating Stat Badge ── */
function StatBadge({ value, label, delay, className }: { value: string; label: string; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      className={`absolute flex items-center gap-2 rounded-2xl border border-[#3d4446] bg-black/80 backdrop-blur px-4 py-2 shadow-xl ${className}`}
    >
      <span className="text-xl font-extrabold text-[#e05555]">{value}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </motion.div>
  )
}

/* ── Main Component ── */
export function CreativeAIWorks() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [journeyOpen, setJourneyOpen] = useState(false)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, -80])

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40))
    return unsub
  }, [scrollY])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <JourneyModal open={journeyOpen} onClose={() => setJourneyOpen(false)} />

      {/* ── NAVBAR ── */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-lg shadow-black/30" : ""}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary"
            >
              <Brain className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <span className="font-bold text-lg">
              Creative<span className="text-[#e05555]"> AI Works</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {["Services", "Work", "About", "Contact"].map((label) => (
              <Link
                key={label}
                href={`#${label.toLowerCase()}`}
                className="px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-muted"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button size="sm" className="rounded-xl" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Book a Free Call <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 bg-background flex flex-col"
        >
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <span className="font-bold text-lg">Creative<span className="text-[#e05555]"> AI Works</span></span>
            <button onClick={() => setMenuOpen(false)}><X className="h-6 w-6" /></button>
          </div>
          <motion.nav variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-1 p-6">
            {["Services", "Work", "About", "Contact"].map((label) => (
              <motion.div key={label} variants={item}>
                <Link
                  href={`#${label.toLowerCase()}`}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-medium hover:bg-muted"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </motion.div>
            ))}
            <motion.div variants={item} className="flex flex-col gap-3 pt-6">
              <Button className="w-full rounded-xl" onClick={() => { setMenuOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }}>Book a Free Call</Button>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative min-h-[92vh] overflow-hidden flex items-center">
          {/* Background layers */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(128,0,0,0.18)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,52,54,0.4)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#0a0a0a)]" />

          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }}
          />

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_560px] items-center">
              {/* Left */}
              <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
                <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-sm text-[#e07070]">
                  <Zap className="h-3.5 w-3.5" />
                  AI Engineering — Deployed in Weeks, Not Months
                </motion.div>

                <motion.h1 variants={item} className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl xl:text-7xl">
                  Your Business Runs{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-[#e05555] via-[#c04040] to-[#800000] bg-clip-text text-transparent">on Repetitive Work.</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-[#800000] to-transparent"
                    />
                  </span>
                  <br />
                  We Replace It With AI.
                </motion.h1>

                <motion.p variants={item} className="max-w-lg text-lg text-muted-foreground leading-relaxed">
                  I&apos;m Varun — I personally design, build, and deploy AI that cuts your operational costs, eliminates repetitive work, and gives you real-time visibility into your business. Senior-level engineering. No juniors. No outsourcing. Delivered in weeks.
                </motion.p>

                <motion.div variants={item} className="flex flex-wrap gap-3">
                  <Button size="lg" className="rounded-xl group h-12 px-6" onClick={() => setJourneyOpen(true)}>
                    Get a Free AI Assessment
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline" size="lg" className="rounded-xl h-12 px-6"
                    onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    See Client Results
                  </Button>
                </motion.div>

                {/* Metric row */}
                <motion.div variants={item} className="flex flex-wrap gap-6 pt-2">
                  {metrics.map(({ value, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="text-2xl font-extrabold text-[#e05555]">{value}</span>
                      <span className="text-xs text-muted-foreground leading-tight">{label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right — Hero image with floating badges */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="h-[520px] w-full">
                  <AIHeroVisual />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── TRUSTED BY ── */}
        <section className="w-full py-14">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mx-auto max-w-7xl px-6"
          >
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              Documented client outcomes
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { value: "₹18.7Cr", label: "Fraud prevented for one fintech client" },
                { value: "86%", label: "Tickets automated for a SaaS platform" },
                { value: "0", label: "Product recalls since vision AI deployment" },
                { value: "↓84%", label: "Ad cost per customer for a media platform" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-[#2a2a2a] bg-[#0f0f0f] px-4 py-5">
                  <p className="text-2xl font-extrabold text-[#e05555] mb-1">{value}</p>
                  <p className="text-xs text-gray-500 leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="w-full py-20 md:py-28">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mx-auto max-w-7xl px-6"
          >
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                What We Do
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                AI Services That <span className="text-[#e05555]">Move the Needle</span>
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-muted-foreground text-lg">
                End-to-end AI capabilities — from raw data to production-grade models.
              </p>
            </div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((s, i) => (
                <motion.div
                  key={i} variants={item}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-[#800000]/50 transition-colors"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#800000]/10 text-[#e05555]">
                      {s.icon}
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    <Link href={`/services/${s.slug}`} className="mt-5 flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4">
                      <span>Learn more</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── BODHI TREE ── */}
        <BodhiTreeSection />

        {/* ── CASE STUDIES ── */}
        <section id="work" className="w-full py-20 md:py-28">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mx-auto max-w-7xl px-6"
          >
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                Portfolio
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Real AI. <span className="text-[#e05555]">Real Results.</span>
              </h2>
              <p className="mt-4 mx-auto max-w-xl text-muted-foreground text-lg">
                A selection of AI solutions we've shipped across industries.
              </p>
            </div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[220px]"
            >
              {caseStudies.map((cs, i) => (
                <motion.div
                  key={i} variants={item}
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative overflow-hidden rounded-2xl ${cs.span}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity z-10" />
                  <Image
                    src={cs.img} alt={cs.title} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                    <span className="mb-1 text-xs font-medium text-[#e07070]">{cs.tag}</span>
                    <h3 className="font-bold text-white text-base lg:text-lg">{cs.title}</h3>
                    <p className="mt-1 text-xs text-white/70 leading-relaxed line-clamp-2">{cs.desc}</p>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Link href={`/case-studies/${cs.slug}`}>
                        <Button variant="outline" size="sm" className="rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs">
                          View Case Study <ArrowUpRight className="ml-1.5 h-3 w-3" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10 text-center">
              <Link href="/case-studies">
                <Button variant="outline" size="lg" className="rounded-xl">
                  See All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="w-full py-20 md:py-28">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mx-auto max-w-7xl px-6"
          >
            <div className="grid gap-12 lg:grid-cols-2 items-center mb-20">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
                <span className="inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                  Who We Are
                </span>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Builders of <span className="text-[#e05555]">Practical AI</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Creative AI Works is a boutique AI firm run by Varun Reddy — one senior AI engineer who personally designs, builds, and deploys every solution. No juniors assigned to your project after the sales call. No agency markup. Just direct, senior-level AI engineering.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I believe the best AI isn&apos;t the most complex — it&apos;s the kind that ships fast, fits your workflow, and delivers measurable ROI from day one. That&apos;s the only kind I build.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-xl" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                    Work With Me
                  </Button>
                  <Link href="/case-studies">
                    <Button variant="outline" className="rounded-xl">View All Case Studies</Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <div className="relative h-[400px] overflow-hidden rounded-3xl border border-border">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&fit=crop"
                    alt="Our Team" fill className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#800000]/20 to-transparent" />
                </div>
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20"
            >
              {[
                { icon: <TrendingUp className="h-5 w-5" />, value: "50+", label: "Projects Shipped" },
                { icon: <Users className="h-5 w-5" />, value: "30+", label: "Happy Clients" },
                { icon: <Clock className="h-5 w-5" />, value: "3 yrs", label: "In Business" },
                { icon: <Clock className="h-5 w-5" />, value: "< 8 wks", label: "Avg. project delivery" },
              ].map(({ icon, value, label }) => (
                <motion.div key={label} variants={item}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center"
                >
                  <div className="text-[#e05555]">{icon}</div>
                  <span className="text-3xl font-extrabold text-[#e05555]">{value}</span>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Founder */}
            <h3 className="text-2xl font-bold mb-8">The Person Behind It</h3>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="max-w-xl"
            >
              <div className="flex items-start gap-6 rounded-2xl border border-border bg-card p-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#800000]/15 text-[#e05555] text-2xl font-extrabold">
                  VR
                </div>
                <div>
                  <p className="text-lg font-bold">Varun Reddy</p>
                  <p className="text-sm text-[#e07070] mb-3">Founder & CEO — Creative AI Works</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I started Creative AI Works with one belief: AI should be accessible to every business, not just the
                    ones with deep pockets. I design, build, and deploy every solution personally — which means you get
                    senior-level expertise on every project, every time. No juniors, no outsourcing.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Machine Learning", "NLP", "Computer Vision", "MLOps", "Python", "React"].map((skill) => (
                      <span key={skill} className="rounded-full bg-[#800000]/10 border border-[#800000]/30 px-3 py-0.5 text-xs text-[#e07070]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="w-full py-20 md:py-28 bg-[#0d0d0d]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mx-auto max-w-7xl px-6"
          >
            <div className="mb-14 text-center">
              <span className="mb-3 inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                Testimonials
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                What Our <span className="text-[#e05555]">Clients Say</span>
              </h2>
            </div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid gap-4 md:grid-cols-2"
            >
              {testimonials.map((t, i) => (
                <motion.div key={i} variants={item} whileHover={{ y: -6 }}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
                >
                  <div>
                    <div className="flex gap-0.5 text-yellow-500 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-base leading-relaxed text-foreground/90">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <div className="h-9 w-9 rounded-full bg-[#800000]/20 flex items-center justify-center text-[#e05555] font-bold text-sm">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full py-20 md:py-24 bg-[#060606]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mx-auto max-w-3xl px-6"
          >
            <div className="text-center mb-12">
              <span className="mb-3 inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                FAQ
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Questions Before You Reach Out
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { q: "Do you work with small businesses or only enterprises?", a: "Both. A local café with an inventory problem gets the same senior attention as a manufacturer with 4 production lines. The solution is sized to your budget and business — the quality is the same." },
                { q: "How long does a project take?", a: "Most projects go live in 6–12 weeks. The AI Strategy engagement delivers your full roadmap in 2 weeks. Complex platform builds run 10–14 weeks. I don't do 18-month projects." },
                { q: "What does a project cost?", a: "AI Strategy consulting starts from ₹75,000. Automation and chatbot builds start from ₹3,00,000. Full AI platform builds from ₹10,00,000. I'll give you an exact quote after a 30-min discovery call — no commitment required." },
                { q: "Is my business data safe?", a: "Yes. Every build is designed with your data staying inside your infrastructure. I don't store or retain your business data. Security and privacy are built in from day one, not added later." },
                { q: "What happens after launch?", a: "Every project includes 30 days of post-launch support. Monthly maintenance and model-improvement retainers are available for clients who need continuous performance monitoring." },
                { q: "Do I need a technical team on my side?", a: "No. I handle all the technical work — build, deploy, and training. You need someone who understands your business processes and can answer domain questions. That's all." },
              ].map(({ q, a }, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group rounded-2xl border border-[#2a2a2a] bg-[#0f0f0f] px-5 py-4 cursor-pointer"
                >
                  <summary className="flex items-center justify-between gap-4 text-sm font-semibold text-white list-none select-none">
                    {q}
                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">{a}</p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="w-full py-20 md:py-28">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-start"
          >
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <span className="inline-block rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
                Get in Touch
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Tell Me Your Problem.<br />
                <span className="text-[#e05555]">I&apos;ll Tell You What AI Can Do.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Most clients know something&apos;s broken — they just don&apos;t know if AI is the right fix. That&apos;s what the first call is for. No pitch. No pressure. Honest answer in 30 minutes.
              </p>
              <div className="space-y-4 pt-2">
                {[
                  { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Hyderabad, India" },
                  { icon: <Mail className="h-5 w-5" />, label: "Email", value: "hello@creativeaiworks.com" },
                ].map(({ icon, label, value }) => (
                  <motion.div key={label} whileHover={{ x: 6 }} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#800000]/10 text-[#e05555]">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-medium text-sm">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            {/* Book a call CTA */}
            <motion.a
              href="https://calendly.com/varunreddy-ai/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between gap-4 rounded-2xl border border-[#800000]/50 bg-[#800000]/10 px-6 py-4 mb-4 hover:bg-[#800000]/20 transition-colors cursor-pointer"
            >
              <div>
                <p className="font-bold text-white text-sm">Book a Free 30-Min Strategy Call</p>
                <p className="text-xs text-gray-400 mt-0.5">Pick a time that works for you — instant confirmation</p>
              </div>
              <ArrowRight className="h-5 w-5 text-[#e05555] shrink-0" />
            </motion.a>
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <h3 className="text-xl font-bold mb-1">Send a Message</h3>
              <p className="text-sm text-muted-foreground mb-6">We&apos;ll get back to you within 24 hours.</p>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const fd = new FormData(e.currentTarget)
                  fd.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_KEY_HERE")
                  fd.append("subject", "New inquiry from Creative AI Works website")
                  await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd })
                  ;(e.target as HTMLFormElement).reset()
                  alert("Message sent! I'll reply within 24 hours.")
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">First name</label>
                    <Input name="first_name" placeholder="John" className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Last name</label>
                    <Input name="last_name" placeholder="Doe" className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email</label>
                  <Input name="email" type="email" placeholder="john@company.com" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Service needed</label>
                  <select name="service" className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground">
                    <option value="">Select a service</option>
                    <option>AI Automation</option>
                    <option>Data Analytics</option>
                    <option>Chatbot Development</option>
                    <option>Computer Vision</option>
                    <option>Generative AI</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea name="message" placeholder="Tell us about your project..." className="min-h-[120px] rounded-xl" />
                </div>
                <Button type="submit" className="w-full rounded-xl h-11">
                  Send Message <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full border-t border-border bg-[#080808]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mx-auto max-w-7xl grid gap-8 px-6 py-12 lg:grid-cols-4"
        >
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Creative<span className="text-[#e05555]"> AI Works</span></span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Building AI solutions that transform businesses of all sizes — from startups to enterprises.
            </p>
            <div className="flex gap-3">
              {[Camera, Send, Briefcase, Code].map((Icon, i) => (
                <motion.div key={i} whileHover={{ y: -4 }}>
                  <Link href="#" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {[
            { title: "Company", links: ["About Us", "Our Process", "Careers", "Blog"] },
            { title: "Services", links: ["AI Automation", "Data Analytics", "Chatbots", "Computer Vision"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <nav className="flex flex-col gap-2">
                {links.map((l) => (
                  <Link key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </motion.div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} Creative AI Works. All rights reserved.</span>
            <span>Built with passion in Hyderabad, India</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
