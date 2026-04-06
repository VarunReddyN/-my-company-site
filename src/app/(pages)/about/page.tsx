const values = [
  {
    icon: "🎯",
    title: "Results-Driven",
    desc: "We measure success by the impact our solutions have on your bottom line, not by lines of code.",
  },
  {
    icon: "🤝",
    title: "Partnership First",
    desc: "We work alongside your team, not just for them — building knowledge transfer into every project.",
  },
  {
    icon: "🔒",
    title: "Secure by Default",
    desc: "Privacy and security are baked into every solution we build, not added as an afterthought.",
  },
  {
    icon: "⚡",
    title: "Fast Iteration",
    desc: "We ship working prototypes quickly, gather feedback, and refine — cutting time-to-value dramatically.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Industries Served" },
  { value: "< 8 wks", label: "Avg. project delivery" },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Intro */}
      <div className="max-w-3xl mb-20">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#800000]/30 border border-[#800000] text-[#e07070] text-xs font-semibold tracking-widest uppercase">
          Who We Are
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
          Builders of <span className="text-[#e05555]">Practical AI</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-4">
          creAIve Labs is Varun Reddy — a senior AI engineer who personally designs, builds, and deploys every solution for every client. No account managers. No juniors assigned after the sales call. When you hire creAIve Labs, you work directly with the person building your system.
        </p>
        <p className="text-gray-400 text-lg leading-relaxed">
          I believe the best AI isn&apos;t the most complex — it&apos;s the kind that ships in weeks, fits your workflow, and shows measurable ROI from the first month. That&apos;s the only kind I build.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-2xl bg-[#2d3436] border border-[#3d4446] p-6 text-center"
          >
            <div className="text-3xl font-extrabold text-[#e05555] mb-1">
              {value}
            </div>
            <div className="text-sm text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl bg-[#2d3436] border border-[#3d4446] p-6 hover:border-[#800000] transition-colors"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder */}
      <div className="mt-16 rounded-2xl bg-[#2d3436] border border-[#3d4446] p-8 max-w-2xl">
        <div className="flex items-start gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#800000]/20 text-[#e05555] text-2xl font-extrabold">
            VR
          </div>
          <div>
            <p className="text-xl font-bold text-white">Varun Reddy</p>
            <p className="text-sm text-[#e07070] mb-4">Founder &amp; Lead AI Engineer — creAIve Labs</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              I started creAIve Labs because I kept watching businesses spend money on consultants who promised AI transformation and delivered slide decks. I build the actual system — deploy it in your environment, train your team, and stay until it works. Every project is mine personally.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Machine Learning", "NLP", "Computer Vision", "MLOps", "Python", "React"].map((skill) => (
                <span key={skill} className="rounded-full bg-[#800000]/10 border border-[#800000]/30 px-3 py-0.5 text-xs text-[#e07070]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
