const values = [
  {
    icon: "⚡",
    title: "Speed Without Shortcuts",
    desc: "We ship working systems in weeks, not quarters — because a prototype you can use beats a roadmap you can only read.",
  },
  {
    icon: "🎯",
    title: "ROI or Nothing",
    desc: "Every system we build has a measurable outcome — more leads captured, fewer hours wasted, more revenue closed. If we can't show the math, we don't pitch it.",
  },
  {
    icon: "🤝",
    title: "No Handoffs",
    desc: "The person you talk to in the first call is the same person who builds your system and answers your messages at 9pm. No account managers, no junior handoffs.",
  },
  {
    icon: "🔒",
    title: "Built to Last",
    desc: "We don't disappear after go-live. Security, maintenance, and iteration are part of how we work — not upsells you find out about later.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Industries Served" },
  { value: "< 8 wks", label: "Avg. Time to Launch" },
];

const stack = [
  "OpenAI / GPT-4o",
  "Python",
  "Next.js",
  "Supabase",
  "LangChain",
  "Computer Vision",
  "MLOps",
  "NLP",
  "React",
  "PostgreSQL",
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">

      {/* Hero */}
      <div className="max-w-3xl mb-20">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#800000]/30 border border-[#800000] text-[#e07070] text-xs font-semibold tracking-widest uppercase">
          Who We Are
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          We build AI that <span className="text-[#e05555]">actually works</span><br />
          for your business.
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-5">
          Most businesses are told they need AI. Few are told exactly what to build, how long it takes, or what it will cost them if they don't move. We cut through that noise.
        </p>
        <p className="text-gray-400 text-lg leading-relaxed mb-5">
          creAIve Labs designs and deploys AI systems for service businesses — the kind that answer leads at 2am, follow up automatically, flag the opportunities your team is missing, and free up hours your staff can spend doing work that actually matters.
        </p>
        <p className="text-gray-400 text-lg leading-relaxed">
          We are not a software factory. We take on a small number of clients at a time so every project gets our full attention. You get a partner who is invested in your outcome — not a vendor who disappears after the invoice clears.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-20">
        {stats.map(({ value, label }) => (
          <div key={label} className="rounded-2xl bg-[#0d0d0d] border border-white/6 p-6 text-center">
            <div className="text-3xl font-extrabold text-[#e05555] mb-1">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* What makes us different */}
      <div className="mb-20">
        <div className="mb-10">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#800000]/20 border border-[#800000]/40 text-[#e07070] text-xs font-semibold tracking-widest uppercase">
            How We Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Not consultants. Builders.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(({ icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-[#0d0d0d] border border-white/6 p-6 hover:border-[#800000]/50 transition-colors">
              <div className="text-2xl mb-4">{icon}</div>
              <h3 className="text-white font-bold mb-2 text-sm">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder */}
      <div className="mb-20 rounded-2xl bg-[#0d0d0d] border border-white/6 p-8 sm:p-10 max-w-3xl">
        <div className="flex items-start gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#800000]/20 text-[#e05555] text-xl font-extrabold border border-[#800000]/30">
            VR
          </div>
          <div>
            <p className="text-xl font-bold text-white">Varun Reddy</p>
            <p className="text-sm text-[#e07070] mb-5">Founder &amp; AI Engineer — creAIve Labs</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              I started creAIve Labs after seeing the same story play out too many times: a business pays a large agency for an "AI strategy," gets a deck with buzzwords, and walks away with nothing deployed. The problem isn't that AI is hard. It's that the people selling it aren't the ones building it.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              I handle everything personally — discovery, architecture, build, deployment, training, and support. My goal on every project is simple: get something working and valuable into your hands as fast as possible, then keep improving it. That's the whole model.
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span key={s} className="rounded-full bg-[#800000]/10 border border-[#800000]/25 px-3 py-0.5 text-xs text-[#e07070]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-[#800000]/10 border border-[#800000]/30 p-10 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-white mb-3">Ready to build something?</h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Tell us about your business and the problem you want to solve. No sales pitch — just a straight conversation about whether AI makes sense for you right now.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 rounded-xl bg-[#800000] hover:bg-[#a00000] text-white font-semibold text-sm transition-colors"
        >
          Start the Conversation
        </a>
      </div>

    </div>
  );
}
