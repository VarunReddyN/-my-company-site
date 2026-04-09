"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    // Save to Supabase dashboard
    await supabase.from("leads").insert([{
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      company: fd.get("company") as string,
      service: fd.get("service") as string,
      message: fd.get("message") as string,
      source: "contact-page",
      status: "new",
    }])

    // Also send email via Web3Forms
    fd.append("access_key", "2cc16080-a24e-45c3-bf1e-059390d77a26")
    fd.append("subject", "New inquiry — creAIve Labs")
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd })
    const data = await res.json()
    if (data.success) {
      setSubmitted(true)
    } else {
      alert("Error: " + data.message)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#800000]/30 border border-[#800000] text-[#e07070] text-xs font-semibold tracking-widest uppercase">
          Contact Us
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Let&apos;s Build Something
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Tell us about your business and the problem you want to solve. We will
          get back to you within one business day.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Contact info + Calendly */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a href="mailto:hello@creaivelabs.com"
            className="flex-1 rounded-2xl bg-[#2d3436] border border-[#3d4446] p-5 hover:border-[#800000] transition-colors">
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="font-semibold text-white text-sm">hello@creaivelabs.com</p>
            <p className="text-xs text-gray-500 mt-1">I reply within 24 hours</p>
          </a>
          <a href="https://cal.com/creaivelabs" target="_blank" rel="noopener noreferrer"
            className="flex-1 rounded-2xl bg-[#800000]/10 border border-[#800000]/40 p-5 hover:bg-[#800000]/20 transition-colors">
            <p className="text-xs text-[#e07070] mb-1">Prefer a call?</p>
            <p className="font-semibold text-white text-sm">Book a Free 30-Min Call</p>
            <p className="text-xs text-gray-500 mt-1">Pick any time — instant confirmation</p>
          </a>
        </div>
        {submitted ? (
          <div className="rounded-2xl bg-[#2d3436] border border-[#800000] p-10 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold mb-2">Message Received!</h2>
            <p className="text-gray-400">
              Thanks for reaching out. We will be in touch shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-[#2d3436] border border-[#3d4446] p-8 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-400 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className="rounded-lg bg-black border border-[#3d4446] px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#800000] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-400 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jane@company.com"
                  className="rounded-lg bg-black border border-[#3d4446] px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#800000] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-400 font-medium">
                Company (optional)
              </label>
              <input
                type="text"
                name="company"
                placeholder="Acme Corp"
                className="rounded-lg bg-black border border-[#3d4446] px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#800000] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-400 font-medium">
                What are you looking for?
              </label>
              <select
                name="service"
                required
                defaultValue=""
                className="rounded-lg bg-black border border-[#3d4446] px-4 py-2.5 text-white focus:outline-none focus:border-[#800000] transition-colors"
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option>AI Automation</option>
                <option>Data Analytics & BI</option>
                <option>Chatbots & Virtual Assistants</option>
                <option>Computer Vision</option>
                <option>Generative AI Integration</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-400 font-medium">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us about your business and the problem you want to solve..."
                className="rounded-lg bg-black border border-[#3d4446] px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#800000] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#800000] hover:bg-[#a00000] text-white font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
