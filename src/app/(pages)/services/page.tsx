import Link from "next/link";

const services = [
  {
    icon: "🤖",
    title: "AI Automation",
    desc: "We identify repetitive processes in your business and replace them with intelligent automation pipelines — saving time and reducing human error.",
    features: ["Workflow automation", "RPA integration", "Custom AI agents"],
  },
  {
    icon: "📊",
    title: "Data Analytics & BI",
    desc: "Unlock the value hidden in your data. We build AI-powered dashboards and predictive models tailored to your industry.",
    features: ["Predictive analytics", "Real-time dashboards", "Data pipelines"],
  },
  {
    icon: "💬",
    title: "Chatbots & Virtual Assistants",
    desc: "Deploy smart conversational AI on your website, app, or internal tools to handle queries, bookings, and support around the clock.",
    features: ["NLP-powered bots", "Multi-channel support", "CRM integration"],
  },
  {
    icon: "🔍",
    title: "AI-Powered Search",
    desc: "Give your users smarter search experiences with semantic search, recommendation engines, and intelligent filtering.",
    features: ["Semantic search", "Recommendation systems", "Search analytics"],
  },
  {
    icon: "🖼️",
    title: "Computer Vision",
    desc: "Automate visual inspection, document processing, and image recognition tasks with state-of-the-art vision models.",
    features: ["Object detection", "Document OCR", "Quality inspection"],
  },
  {
    icon: "📝",
    title: "Generative AI Integration",
    desc: "Embed LLMs into your products — for content generation, summarization, coding assistants, and more.",
    features: ["LLM integration", "RAG pipelines", "Prompt engineering"],
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#800000]/30 border border-[#800000] text-[#e07070] text-xs font-semibold tracking-widest uppercase">
          What We Offer
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Our AI Services
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          End-to-end AI solutions designed to solve real business problems —
          whether you are a two-person startup or a large enterprise.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map(({ icon, title, desc, features }) => (
          <div
            key={title}
            className="rounded-2xl bg-[#2d3436] border border-[#3d4446] p-6 flex flex-col hover:border-[#800000] transition-colors"
          >
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
              {desc}
            </p>
            <ul className="space-y-1">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800000] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-400 mb-4">
          Not sure which service fits your needs?
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 rounded-xl bg-[#800000] hover:bg-[#a00000] text-white font-semibold transition-colors"
        >
          Book a Free Consultation
        </Link>
      </div>
    </div>
  );
}
