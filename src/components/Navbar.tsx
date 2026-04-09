"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nb-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#800000" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#800000" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="nb-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6060" stopOpacity="1"/>
          <stop offset="55%" stopColor="#cc2020" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#800000" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="#0d0d0d"/>
      <rect width="32" height="32" rx="8" fill="url(#nb-bg)"/>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="7.25" fill="none" stroke="#800000" strokeOpacity="0.4" strokeWidth="0.75"/>
      <path d="M16 7.5 L23.5 20.5 L8.5 20.5 Z" fill="none" stroke="#800000" strokeOpacity="0.28" strokeWidth="0.6"/>
      <line x1="16" y1="15.5" x2="16" y2="9" stroke="#c03030" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="round"/>
      <line x1="16" y1="15.5" x2="22.5" y2="20" stroke="#c03030" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="round"/>
      <line x1="16" y1="15.5" x2="9.5" y2="20" stroke="#c03030" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="round"/>
      <circle cx="16" cy="7.5" r="2.2" fill="#e05555"/>
      <circle cx="22.5" cy="20.5" r="1.9" fill="#c03535"/>
      <circle cx="9.5" cy="20.5" r="1.9" fill="#c03535"/>
      <circle cx="16" cy="15.5" r="3.6" fill="url(#nb-core)"/>
      <circle cx="16" cy="15.5" r="1.6" fill="#ff7070"/>
    </svg>
  )
}

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur border-b border-[#3d4446]">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size={32} />
          <span className="font-bold text-base tracking-tight text-white">
            cre<span className="text-[#e05555]">AI</span>ve <span className="text-gray-500 font-medium">Labs</span>
          </span>
        </Link>
        <ul className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-[#800000] text-white"
                    : "text-gray-300 hover:text-white hover:bg-[#2d3436]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
