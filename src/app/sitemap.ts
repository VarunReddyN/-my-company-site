import { MetadataRoute } from "next"

const BASE = "https://www.creaivelabs.com"
const NOW  = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,              lastModified: NOW, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,         lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`,      lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/case-studies`,  lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/contact`,       lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/ai-automation`,   lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/data-analytics`,  lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/smart-chatbots`,  lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/computer-vision`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/generative-ai`,   lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/ai-strategy`,     lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/case-studies/predictive-inventory`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/case-studies/nlp-support-bot`,      lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/case-studies/vision-qa`,            lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/case-studies/fraud-detection`,      lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/case-studies/geo-ai-advertising`,   lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
  ]
  return pages
}
