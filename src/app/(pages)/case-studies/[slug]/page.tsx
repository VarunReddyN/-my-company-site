import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Quote } from "lucide-react"
import { caseStudiesData } from "@/lib/content"
import { GeoAdVisual } from "@/components/ui/geo-ad-visual"

export function generateStaticParams() {
  return caseStudiesData.map((c) => ({ slug: c.slug }))
}

export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params
  const cs = caseStudiesData.find((c) => c.slug === slug)
  if (!cs) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image src={cs.heroImg} alt={cs.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 max-w-5xl mx-auto w-full">
          <Link href="/#work" className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Work
          </Link>
          <span className="mb-2 inline-block w-fit rounded-full bg-[#800000]/20 border border-[#800000]/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
            {cs.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">{cs.title}</h1>
          <p className="mt-2 text-base text-gray-300">{cs.client}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 space-y-20">

        {/* Challenge */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#e07070] mb-3">The Challenge</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">{cs.challenge}</p>
        </div>

        {/* Geo-AI visual — only for this case study */}
        {slug === "geo-ai-advertising" && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#e07070] mb-4">How It Works</h2>
            <div className="max-w-2xl">
              <GeoAdVisual />
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                Your business (source) feeds one campaign into the AI engine. The engine scores every audience segment by location, time, and buying intent — then routes your ad budget to the highest-converting micro-zones in real time.
              </p>
            </div>
          </div>
        )}

        {/* Solution */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#e07070] mb-3">Our Solution</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mb-8">{cs.solution}</p>
          <h3 className="text-base font-bold text-white mb-4">What We Built</h3>
          <ul className="space-y-3">
            {cs.whatWeDid.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <CheckCircle className="h-5 w-5 text-[#e05555] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Results Table */}
        <div>
          <h2 className="text-2xl font-extrabold mb-6">Results: Before vs After</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#3d4446]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#3d4446] bg-[#141414]">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">Metric</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">Before</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">After</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#e07070]">Change</th>
                </tr>
              </thead>
              <tbody>
                {cs.results.map((row, i) => (
                  <tr key={i} className={`border-b border-[#2a2a2a] ${i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#141414]"}`}>
                    <td className="px-5 py-3.5 font-medium text-white">{row.metric}</td>
                    <td className="px-5 py-3.5 text-gray-500">{row.before}</td>
                    <td className="px-5 py-3.5 text-gray-300">{row.after}</td>
                    <td className="px-5 py-3.5 font-bold text-[#e05555]">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline & Tech */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#3d4446] bg-[#141414] p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#e07070] mb-2">Timeline</h3>
            <p className="text-xl font-bold text-white">{cs.timeline}</p>
          </div>
          <div className="rounded-2xl border border-[#3d4446] bg-[#141414] p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#e07070] mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {cs.tech.map((t) => (
                <span key={t} className="rounded-full border border-[#800000]/30 bg-[#800000]/10 px-3 py-1 text-xs text-[#e07070]">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Client Quote */}
        <div className="relative rounded-2xl border border-[#800000]/30 bg-[#800000]/05 p-8">
          <Quote className="absolute top-5 right-6 h-10 w-10 text-[#800000]/20" />
          <p className="text-lg font-medium text-white leading-relaxed italic mb-4">
            &ldquo;{cs.quote}&rdquo;
          </p>
          <p className="text-sm text-[#e07070] font-semibold">{cs.quoteAuthor}</p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-[#800000]/40 bg-gradient-to-br from-[#800000]/10 to-transparent p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Could this be your business?</h3>
          <p className="text-sm text-gray-400 mb-6">
            Every one of these projects started with a 30-minute conversation. Let&apos;s have one.
          </p>
          <Link href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#800000] hover:bg-[#a00000] px-6 py-3 text-sm font-semibold text-white transition-colors">
            Book a Free Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Other case studies */}
        <div>
          <h2 className="text-2xl font-extrabold mb-6">More Case Studies</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudiesData.filter((c) => c.slug !== slug).slice(0, 3).map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`}
                className="group flex items-center justify-between rounded-xl border border-[#3d4446] bg-[#141414] px-4 py-3 hover:border-[#800000]/50 transition-colors">
                <div>
                  <p className="font-semibold text-sm text-white">{c.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.tag}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-[#e05555] transition-colors shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
