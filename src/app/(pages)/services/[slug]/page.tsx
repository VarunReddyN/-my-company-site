import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react"
import { servicesData } from "@/lib/content"

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }))
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params
  const service = servicesData.find((s) => s.slug === slug)
  if (!service) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative h-[380px] w-full overflow-hidden">
        <Image src={service.heroImg} alt={service.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 max-w-5xl mx-auto w-full">
          <Link href="/services" className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>
          <span className="mb-2 inline-block w-fit rounded-full bg-[#800000]/20 border border-[#800000]/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#e07070]">
            Service
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">{service.title}</h1>
          <p className="mt-2 text-lg text-gray-300">{service.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 space-y-20">

        {/* Problem & Solution */}
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-[#3d4446] bg-[#111] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#e07070] mb-3">The Problem</h2>
            <p className="text-gray-300 leading-relaxed">{service.problem}</p>
          </div>
          <div className="rounded-2xl border border-[#800000]/40 bg-[#800000]/05 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#e07070] mb-3">Our Solution</h2>
            <p className="text-gray-300 leading-relaxed">{service.solution}</p>
          </div>
        </div>

        {/* How We Do It */}
        <div>
          <h2 className="text-2xl font-extrabold mb-8">How We Do It</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {service.steps.map((step) => (
              <div key={step.step} className="relative rounded-2xl border border-[#3d4446] bg-[#141414] p-6">
                <span className="text-5xl font-extrabold text-[#800000]/20 absolute top-4 right-4 select-none leading-none">{step.step}</span>
                <h3 className="text-base font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div>
          <h2 className="text-2xl font-extrabold mb-8">What You Can Expect</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {service.metrics.map(({ value, label }) => (
              <div key={label} className="rounded-2xl border border-[#3d4446] bg-[#141414] p-5 text-center">
                <div className="text-2xl font-extrabold text-[#e05555] mb-1">{value}</div>
                <div className="text-xs text-gray-400 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold mb-5">Industries We Serve</h2>
            <div className="flex flex-wrap gap-2">
              {service.industries.map((ind) => (
                <span key={ind} className="rounded-full border border-[#3d4446] bg-[#2d3436]/50 px-4 py-1.5 text-sm text-gray-300">
                  {ind}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold mb-5">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {service.tech.map((t) => (
                <span key={t} className="rounded-full border border-[#800000]/30 bg-[#800000]/10 px-4 py-1.5 text-sm text-[#e07070]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-[#800000]/40 bg-gradient-to-br from-[#800000]/10 to-transparent p-8 text-center">
          <p className="text-lg font-semibold text-white mb-2">{service.cta}</p>
          <p className="text-sm text-gray-400 mb-6">Book a free 30-minute consultation. No commitment, no sales pressure.</p>
          <Link href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#800000] hover:bg-[#a00000] px-6 py-3 text-sm font-semibold text-white transition-colors">
            Let&apos;s Talk <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Other services */}
        <div>
          <h2 className="text-2xl font-extrabold mb-6">Other Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicesData.filter((s) => s.slug !== slug).slice(0, 3).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}
                className="group flex items-center justify-between rounded-xl border border-[#3d4446] bg-[#141414] px-4 py-3 hover:border-[#800000]/50 transition-colors">
                <div>
                  <p className="font-semibold text-sm text-white">{s.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{s.tagline}</p>
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
