export const servicesData = [
  {
    slug: "ai-automation",
    title: "AI Automation",
    tagline: "Stop doing manually what a machine can do in seconds.",
    heroImg: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80&fit=crop",
    problem:
      "Most businesses waste 30–40% of their team's productive hours on repetitive, rule-based tasks — data entry, invoice matching, report generation, email routing, inventory updates. These tasks don't need human judgement. They need speed, consistency, and zero errors.",
    solution:
      "We identify every repetitive process in your business, map the rules that govern it, and replace it with an intelligent automation pipeline. Our AI agents don't just follow fixed rules — they learn from new data, handle edge cases, and improve over time.",
    steps: [
      {
        step: "01",
        title: "Process Audit",
        desc: "We spend time with your team to document every workflow, identify bottlenecks, and calculate the true cost of manual effort — in hours, errors, and missed opportunities.",
      },
      {
        step: "02",
        title: "AI Pipeline Design",
        desc: "We design a custom automation architecture using the right tools — RPA bots, ML classifiers, NLP extractors, or rule engines — depending on what your process actually needs.",
      },
      {
        step: "03",
        title: "Build, Test & Deploy",
        desc: "We build in parallel with your live process, run extensive testing in staging, then cut over smoothly with zero downtime. Your team gets training and documentation.",
      },
    ],
    metrics: [
      { value: "85%", label: "Reduction in manual processing time" },
      { value: "90%", label: "Fewer human errors" },
      { value: "3–6 months", label: "Typical payback period" },
      { value: "24/7", label: "Automated operation, no overtime" },
    ],
    industries: ["Retail & E-commerce", "Finance & Accounting", "Healthcare Admin", "Logistics", "HR & Recruitment"],
    tech: ["Python", "Apache Airflow", "UiPath RPA", "AWS Lambda", "OpenAI API", "PostgreSQL"],
    cta: "Whether you process 100 invoices a month or 100,000 — we can automate it.",
  },
  {
    slug: "data-analytics",
    title: "Data Analytics & BI",
    tagline: "Your data is speaking. Are you listening?",
    heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&fit=crop",
    problem:
      "Most businesses are sitting on a goldmine of data but have no way to turn it into decisions. Spreadsheets break, reports are always out of date, and no one can answer 'why did sales drop last Tuesday?' without a three-day investigation.",
    solution:
      "We build AI-powered analytics platforms that give you a live, accurate view of your business — with predictive models that tell you what's going to happen next, not just what happened last month.",
    steps: [
      {
        step: "01",
        title: "Data Audit & Consolidation",
        desc: "We connect all your data sources — CRM, ERP, spreadsheets, databases, ad platforms — clean and centralise them into a single source of truth.",
      },
      {
        step: "02",
        title: "Dashboard & Model Design",
        desc: "We build real-time dashboards tailored to your KPIs, and layer in ML models for forecasting, anomaly detection, churn prediction, or whatever your business needs most.",
      },
      {
        step: "03",
        title: "Alerts & Automation",
        desc: "Set thresholds and the system notifies your team the moment something needs attention. No more daily report rituals — the data comes to you.",
      },
    ],
    metrics: [
      { value: "90%", label: "Faster insight generation" },
      { value: "40%", label: "Improvement in forecast accuracy" },
      { value: "Real-time", label: "Data refresh vs. end-of-day batch" },
      { value: "5×", label: "More data sources connected on average" },
    ],
    industries: ["Retail", "SaaS", "Manufacturing", "Healthcare", "Real Estate", "D2C Brands"],
    tech: ["Python", "Apache Spark", "dbt", "Tableau / Metabase", "BigQuery", "scikit-learn"],
    cta: "Stop guessing. Start knowing. We turn your raw data into your competitive edge.",
  },
  {
    slug: "smart-chatbots",
    title: "Smart Chatbots",
    tagline: "Your best support agent works 24/7 and never calls in sick.",
    heroImg: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1400&q=80&fit=crop",
    problem:
      "Support teams are overwhelmed. 70% of customer questions are the same 20 questions asked over and over. Every ticket your team answers manually is money spent on something a well-trained AI could handle in under two seconds — at any hour, in any language.",
    solution:
      "We build intelligent chatbots powered by large language models that understand natural language, access your knowledge base, handle complex multi-step conversations, and escalate gracefully to humans when genuinely needed.",
    steps: [
      {
        step: "01",
        title: "Intent & Knowledge Mapping",
        desc: "We analyse your top support tickets, FAQs, and product docs to define the 80% of questions your bot needs to nail perfectly before launch.",
      },
      {
        step: "02",
        title: "Bot Build & Integration",
        desc: "We build the bot, connect it to your CRM, knowledge base, order management or booking system, and integrate it into your website, WhatsApp, or app.",
      },
      {
        step: "03",
        title: "Train, Launch & Improve",
        desc: "We launch with a monitored rollout, analyse every failed conversation, and continuously retrain the model. Most bots hit 90%+ resolution rates within 60 days.",
      },
    ],
    metrics: [
      { value: "60%", label: "Reduction in support ticket volume" },
      { value: "< 2s", label: "Average response time vs. hours for email" },
      { value: "94%", label: "Resolution rate after 60-day tuning" },
      { value: "3,000+", label: "Tickets handled per day by a single bot" },
    ],
    industries: ["E-commerce", "SaaS", "Healthcare", "Banking", "Travel & Hospitality", "Education"],
    tech: ["OpenAI GPT-4", "LangChain", "Pinecone", "Twilio", "WhatsApp Business API", "React"],
    cta: "Give your customers instant answers and give your team their time back.",
  },
  {
    slug: "computer-vision",
    title: "Computer Vision",
    tagline: "If a human eye can spot it, AI can do it faster — and never get tired.",
    heroImg: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80&fit=crop",
    problem:
      "Visual inspection, document scanning, quality control, and security monitoring are expensive, slow, and inconsistent when done by humans. Fatigue causes errors. Scale causes backlogs. And you can't run your cameras at 3am on a human budget.",
    solution:
      "We build computer vision systems that analyse images and video in real time — detecting defects, reading documents, recognising objects, and triggering actions — at any scale, at any hour, with accuracy that matches or exceeds expert humans.",
    steps: [
      {
        step: "01",
        title: "Data Collection & Labelling",
        desc: "We work with your existing image or video data, supplement with synthetic data if needed, and build a labelled training dataset that covers every edge case your system will face.",
      },
      {
        step: "02",
        title: "Model Training & Optimisation",
        desc: "We train and fine-tune state-of-the-art vision models for your exact task — classification, detection, segmentation, or OCR — and optimise for your hardware constraints.",
      },
      {
        step: "03",
        title: "Deployment & Integration",
        desc: "We deploy the model to your edge devices, cloud infrastructure, or existing camera systems, and integrate outputs into your operations — alerts, dashboards, or automated actions.",
      },
    ],
    metrics: [
      { value: "99.2%", label: "Defect detection accuracy" },
      { value: "200+", label: "Units inspected per minute" },
      { value: "70%", label: "Cost reduction vs. manual inspection" },
      { value: "0", label: "Tired eyes, missed defects, or sick days" },
    ],
    industries: ["Manufacturing", "Agriculture", "Retail", "Healthcare Imaging", "Construction", "Security"],
    tech: ["PyTorch", "YOLOv9", "OpenCV", "TensorRT", "AWS Rekognition", "NVIDIA Jetson"],
    cta: "Your cameras are already watching. Let AI make sense of what they see.",
  },
  {
    slug: "generative-ai",
    title: "Generative AI Integration",
    tagline: "The most powerful AI tools in the world — built into your product.",
    heroImg: "https://images.unsplash.com/photo-1677442136019-21780ecad979?w=1400&q=80&fit=crop",
    problem:
      "LLMs like GPT-4, Claude, and Gemini are transforming what's possible — but 'using ChatGPT' is not a strategy. Most businesses don't know how to integrate AI safely, keep it on-topic, feed it their private data, or build something that actually works reliably at scale.",
    solution:
      "We design and build production-grade generative AI systems — internal knowledge assistants, AI writing tools, code helpers, document Q&A, and RAG pipelines — that are accurate, secure, cost-efficient, and built for your specific workflows.",
    steps: [
      {
        step: "01",
        title: "Use Case & Architecture Design",
        desc: "We define the exact workflow — what the AI reads, what it generates, what guardrails it needs — and design the right architecture: RAG pipeline, fine-tuned model, or agent with tools.",
      },
      {
        step: "02",
        title: "Data Pipeline & Embeddings",
        desc: "We build the data pipeline that feeds your AI: document ingestion, chunking, embedding, and vector storage — so your model always has access to accurate, up-to-date context.",
      },
      {
        step: "03",
        title: "Build, Evaluate & Ship",
        desc: "We build the application, run systematic evals to measure accuracy and safety, then ship with monitoring in place so you know exactly how well it's performing in production.",
      },
    ],
    metrics: [
      { value: "10×", label: "Content production speed" },
      { value: "80%", label: "Reduction in research & drafting time" },
      { value: "Private", label: "Your data stays in your infrastructure" },
      { value: "< 3s", label: "Average response latency in production" },
    ],
    industries: ["Legal", "Finance", "Media & Publishing", "SaaS", "HR", "Customer Service"],
    tech: ["OpenAI GPT-4o", "Anthropic Claude", "LangChain", "Pinecone", "Next.js", "FastAPI"],
    cta: "Stop experimenting with ChatGPT. Start building AI that actually works for your business.",
  },
  {
    slug: "ai-strategy",
    title: "AI Strategy & Consulting",
    tagline: "The most expensive AI mistake is building the wrong thing.",
    heroImg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&fit=crop",
    problem:
      "Most businesses either don't know where to start with AI, or they've already spent money on the wrong tools and seen no return. AI vendors oversell. Generic platforms underdeliver. And without a clear strategy, AI projects drag on for months and quietly die.",
    solution:
      "We audit your business, identify where AI will genuinely create value, and build you a clear, prioritised roadmap. No hype — just an honest assessment of what to build, in what order, with realistic timelines and ROI projections.",
    steps: [
      {
        step: "01",
        title: "Business & Process Audit",
        desc: "We interview your team, review your tech stack, and map every process to understand where time and money are being lost — and which problems AI can actually solve.",
      },
      {
        step: "02",
        title: "Opportunity Scoring",
        desc: "We rank every AI opportunity by three dimensions: potential ROI, implementation effort, and strategic importance — so you invest in what matters most first.",
      },
      {
        step: "03",
        title: "Roadmap & Execution Plan",
        desc: "You receive a detailed 12-month roadmap with project scopes, budget estimates, technology recommendations, and a phased delivery plan you can take to any team or investor.",
      },
    ],
    metrics: [
      { value: "2 weeks", label: "From audit to full strategy delivery" },
      { value: "3–5 ×", label: "Typical ROI identified per $1 spent on strategy" },
      { value: "100%", label: "Unbiased — we recommend what's right, not what's expensive" },
      { value: "Prioritised", label: "Quick wins identified within the first 90 days" },
    ],
    industries: ["Any industry", "Startups", "SMEs", "Enterprises", "Non-profits"],
    tech: ["Technology-agnostic", "Process mapping", "ROI modelling", "Vendor evaluation"],
    cta: "Spend 2 weeks with us and walk away knowing exactly what AI can do for your business.",
  },
]

export const caseStudiesData = [
  {
    slug: "predictive-inventory",
    title: "Predictive Inventory AI",
    client: "Solution type: Retail & E-commerce",
    tag: "Retail • AI Automation",
    heroImg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80&fit=crop",
    challenge:
      "Multi-location retailers operating with a central warehouse commonly face a 20–25% stockout rate on fast-moving SKUs and significant overstock on seasonal items. Buying teams make decisions using week-old spreadsheet reports, causing lost revenue from stockouts and capital locked in unsold inventory.",
    solution:
      "We build machine learning demand forecasting systems that ingest point-of-sale data, weather, local event calendars, and competitor pricing signals to predict demand at the SKU × store level — updated every 24 hours — and automate the reorder process end-to-end.",
    whatWeDid: [
      "Unify disconnected data sources (POS, ERP, weather API, Google Trends, competitor data) into a single ML feature store",
      "Train a LightGBM ensemble model with store-specific seasonality, promotional uplift factors, and lead-time awareness",
      "Build an automated reorder engine that raises purchase orders directly in the ERP when stock falls below AI-predicted safety levels",
      "Create a real-time dashboard showing predicted stockout risk by store and SKU with 7-day and 30-day horizons",
      "Integrate SMS and email alerts for store managers when urgent replenishment is needed",
    ],
    results: [
      { metric: "Stockout rate", before: "~22% (industry avg)", after: "~6%", change: "↓ 70%" },
      { metric: "Overstock capital tied up", before: "High (manual ordering)", after: "Reduced significantly", change: "↓ 60–70%" },
      { metric: "Buying team hours/week", before: "100+ hrs manual", after: "~20 hrs review", change: "↓ 80%+" },
      { metric: "Forecast accuracy (MAPE)", before: "~30% error", after: "~8% error", change: "↑ 73%" },
      { metric: "Payback period", before: "—", after: "Typically 6–10 weeks", change: "Fast ROI" },
    ],
    timeline: "Typically 8 weeks from kick-off to production",
    tech: ["Python", "LightGBM", "Apache Airflow", "FastAPI", "React dashboard", "PostgreSQL", "AWS"],
    quote: "This type of system transforms the buying process from reactive guesswork to precision planning — reducing stockout losses and freeing the buying team for strategic decisions.",
    quoteAuthor: "What this means for your retail business",
  },
  {
    slug: "nlp-support-bot",
    title: "NLP Support Bot",
    client: "Solution type: SaaS & B2B Platforms",
    tag: "SaaS • Smart Chatbot",
    heroImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&fit=crop",
    challenge:
      "SaaS platforms with large customer bases typically face a situation where support teams handle thousands of tickets per day — 70–80% of which are the same 30–40 questions repeated over and over. Average first response time runs 4–8 hours, CSAT scores suffer, and hiring more agents is economically unsustainable.",
    solution:
      "We build LLM-powered support bots with a RAG pipeline over your entire documentation, knowledge base, and resolved ticket history — capable of understanding natural language questions, looking up account-specific data, and resolving issues end-to-end without human intervention.",
    whatWeDid: [
      "Process and embed documentation pages, resolved tickets, and SOPs into a vector database for accurate retrieval",
      "Build a multi-step reasoning agent that can query CRMs, check account status, reset features, and trigger actions — not just answer questions",
      "Integrate across Intercom, email, and in-app help widgets simultaneously with a single deployment",
      "Build human escalation flows that transfer full context so agents never ask customers to repeat themselves",
      "Create analytics dashboards tracking resolution rate, escalation reasons, and satisfaction by query category",
    ],
    results: [
      { metric: "Tickets handled by AI", before: "0% automated", after: "80–90% automated", change: "↑ 80+ pts" },
      { metric: "First response time", before: "4–8 hours", after: "< 2 seconds", change: "↓ 99.9%" },
      { metric: "Support cost per ticket", before: "High (human agent)", after: "Fraction of original", change: "↓ 85–95%" },
      { metric: "CSAT score", before: "Typically 3.0–3.5/5", after: "4.5+/5 achievable", change: "↑ 40–50%" },
      { metric: "Payback period", before: "—", after: "Typically 4–8 weeks", change: "Fast ROI" },
    ],
    timeline: "Typically 6 weeks to full production deployment",
    tech: ["GPT-4o", "LangChain", "Pinecone", "Intercom SDK", "FastAPI", "React", "Stripe API"],
    quote: "The right AI support bot eliminates repetitive ticket load, gives customers instant answers, and lets your human agents focus exclusively on the complex problems that actually need human judgement.",
    quoteAuthor: "What this means for your support team",
  },
  {
    slug: "vision-qa",
    title: "Vision QA System",
    client: "Solution type: Manufacturing & Production",
    tag: "Manufacturing • Computer Vision",
    heroImg: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80&fit=crop",
    challenge:
      "Manufacturers running visual quality inspection with human inspectors face well-documented limitations: eye fatigue after 90–120 minutes causes missed defects, throughput is capped by human speed, coverage is sample-based not 100%, and defects that escape to customers trigger costly recalls and warranty claims.",
    solution:
      "We deploy real-time computer vision systems across production lines — cameras at every quality gate, with custom-trained object detection models identifying defect types at production line speeds. 100% coverage, zero fatigue, automated rejection of non-conforming parts.",
    whatWeDid: [
      "Design and install industrial camera arrays at critical inspection points along production lines",
      "Collect and label training images covering all defect types across varying lighting and orientation conditions",
      "Train and optimise YOLOv9 / custom vision models for edge deployment on NVIDIA Jetson devices at each station",
      "Build real-time alerting and automated rejection — defective parts trigger air ejectors automatically",
      "Create quality dashboards with live defect rates by line, shift, and defect type — integrating with ERP systems",
    ],
    results: [
      { metric: "Defect escape rate", before: "1.5–2% (human inspection)", after: "< 0.1%", change: "↓ 90–95%" },
      { metric: "Inspection cost/shift", before: "High (dedicated inspectors)", after: "Near zero (automated)", change: "↓ 90%+" },
      { metric: "Throughput speed", before: "Human-limited", after: "Full line speed", change: "↑ 40–60%" },
      { metric: "Coverage", before: "Sample-based (~5%)", after: "100% of output", change: "↑ 20× coverage" },
      { metric: "Payback period", before: "—", after: "Typically 3–6 months", change: "One recall avoided pays for it" },
    ],
    timeline: "Typically 10 weeks including hardware installation",
    tech: ["YOLOv9", "PyTorch", "NVIDIA Jetson Orin", "OpenCV", "FastAPI", "InfluxDB", "Grafana"],
    quote: "Automated vision inspection eliminates the #1 source of quality escapes — human fatigue — and turns every camera on your line into a tireless, sub-millisecond quality decision-maker.",
    quoteAuthor: "What this means for your production line",
  },
  {
    slug: "fraud-detection",
    title: "Fraud Detection Engine",
    client: "Solution type: Fintech & Payments",
    tag: "Fintech • Machine Learning",
    heroImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&q=80&fit=crop",
    challenge:
      "Digital payments platforms relying on rule-based fraud systems face a fundamental tradeoff: rules tuned to catch fraud also block 3–5% of legitimate transactions (costing customers and revenue), while sophisticated fraud patterns — especially coordinated fraud rings — remain completely invisible to static rules.",
    solution:
      "We build real-time ML fraud detection systems that score every transaction in under 80ms using behavioural signals, graph relationships between accounts, and anomaly detection — replacing static rule engines with adaptive models that improve continuously as new patterns emerge.",
    whatWeDid: [
      "Analyse transaction history to identify fraud patterns invisible to rule-based systems",
      "Build graph neural networks modelling relationships between accounts, devices, and payment flows to detect coordinated fraud rings",
      "Train XGBoost ensembles on 200+ behavioural and contextual features per transaction",
      "Deploy behind a sub-80ms API endpoint capable of handling hundreds of transactions per second at peak",
      "Build an explainability layer so compliance teams understand every flagged transaction — essential for regulatory audits",
    ],
    results: [
      { metric: "Fraud loss reduction", before: "Rule-based, high losses", after: "80–90% reduction typical", change: "↓ 85%+" },
      { metric: "False positive rate", before: "3–5% legitimate blocked", after: "< 0.5%", change: "↓ 90%" },
      { metric: "Detection latency", before: "Manual review: hours", after: "< 80ms per transaction", change: "Real-time" },
      { metric: "Fraud ring detection", before: "0 (undetectable by rules)", after: "Fully detectable", change: "↑ New capability" },
      { metric: "Payback period", before: "—", after: "Typically weeks to 3 months", change: "High ROI" },
    ],
    timeline: "Typically 12 weeks including compliance review",
    tech: ["XGBoost", "Graph Neural Networks", "PyTorch", "Redis", "FastAPI", "Kafka", "AWS SageMaker"],
    quote: "A well-built ML fraud system doesn't just reduce losses — it gives your compliance team explainable decisions, unlocks fraud ring detection that rules can never see, and improves automatically as your transaction patterns evolve.",
    quoteAuthor: "What this means for your payments platform",
  },
  {
    slug: "geo-ai-advertising",
    title: "Geo-Targeted AI Advertising",
    client: "AdReach Media — Hyperlocal Advertising Platform",
    tag: "Advertising • Location AI",
    heroImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=80&fit=crop",
    challenge:
      "AdReach helped 200+ local businesses run ads across cities. Their biggest problem: they spent the same budget advertising to people 80 km away as to people 2 km away. No system knew which audience segment in which neighbourhood was actually converting. 40% of every ad budget was invisible money — spent, but never tracked to a real customer walking through a door.",
    solution:
      "We built an AI-powered geo-targeting engine that maps a business's ideal customer radius, scores every audience segment by location, behaviour, and buying intent, then dynamically routes ad spend to the highest-converting micro-zones — in real time. One campaign. One source. Precision delivery across every target city and neighbourhood.",
    whatWeDid: [
      "Built a location intelligence layer using GPS signals, neighbourhood income data, and foot-traffic patterns to score every 500m radius around a business",
      "Designed an AI audience-matching engine: given a source business profile, it identifies the 3–5 audience clusters most likely to convert — by location, time of day, and past purchase signals",
      "Created a dynamic budget-routing system that shifts ad spend in real time between geographic zones based on live conversion signals (store visits, calls, form fills)",
      "Built an interactive campaign map dashboard where business owners see exactly where their ads are showing, who's seeing them, and which locations are driving actual revenue",
      "Integrated with Meta Ads, Google Ads, and programmatic display networks — all controlled from a single AI-powered campaign manager",
      "Added cross-city expansion module: when a business opens a second location, AI auto-generates a new geo-targeted campaign using learnings from the first",
    ],
    results: [
      { metric: "Ad budget wasted on wrong zones", before: "40%", after: "6%", change: "↓ 85%" },
      { metric: "Cost per store visit (CPV)", before: "$5.10", after: "$0.82", change: "↓ 84%" },
      { metric: "Audience match accuracy", before: "51%", after: "94.3%", change: "↑ 85%" },
      { metric: "Campaign setup time", before: "3–4 days", after: "22 minutes", change: "↓ 96%" },
      { metric: "Revenue attributed to AI-routed ads", before: "$14K/month", after: "$68K/month", change: "↑ 383%" },
      { metric: "Businesses scaled to multi-city", before: "4", after: "67", change: "↑ 16× in 5 months" },
    ],
    timeline: "6 weeks from data connection to live campaigns",
    tech: ["Python", "Meta Marketing API", "Google Ads API", "PostGIS", "Redis", "Next.js", "OpenAI Embeddings", "Mapbox GL"],
    quote: "Before this, we were guessing which areas to target. Now the AI tells us exactly where to spend every dollar — and we can see it working on a live map. Our cost per customer dropped by 84% in 8 weeks.",
    quoteAuthor: "Karan Mehta, Founder — AdReach Media",
  },
]
