import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { caseStudiesData } from "@/lib/content"

export const metadata = {
  title: "Case Studies — creAIve Labs | AI Solutions in Action",
  description: "Real AI projects. Real results. See how creAIve Labs has helped businesses cut costs, automate operations, and drive measurable growth.",
}

export default function CaseStudiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#800000]/30 border border-[#800000] text-[#e07070] text-xs font-semibold tracking-widest uppercase">
          Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Real AI. Real Results.
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Every project started with a business problem and a 30-minute conversation.
          Here&apos;s what we built — and what it delivered.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudiesData.map((cs) => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className="group flex flex-col rounded-2xl border border-[#3d4446] bg-[#141414] overflow-hidden hover:border-[#800000]/60 transition-colors"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={cs.heroImg} alt={cs.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-semibold text-[#e07070]">{cs.tag}</span>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <p className="text-xs text-gray-500 mb-1">{cs.client}</p>
              <h2 className="font-bold text-white mb-2 text-base leading-snug">{cs.title}</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1 line-clamp-3">{cs.challenge}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {cs.results.slice(0, 2).map((r) => (
                  <div key={r.metric} className="rounded-lg bg-[#0f0f0f] border border-[#2a2a2a] px-3 py-2">
                    <p className="text-xs font-bold text-[#e05555]">{r.change}</p>
                    <p className="text-[10px] text-gray-500 leading-snug mt-0.5">{r.metric}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#e07070] group-hover:gap-2 transition-all">
                Read case study <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-[#800000]/30 bg-[#800000]/05 p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Could this be your business?</h2>
        <p className="text-sm text-gray-400 mb-6">Every one of these projects started with a 30-minute conversation. Let&apos;s have one.</p>
        <Link href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-[#800000] hover:bg-[#a00000] px-6 py-3 text-sm font-semibold text-white transition-colors">
          Book a Free Consultation <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
