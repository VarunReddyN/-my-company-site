/* ──────────────────────────────────────────────────────────
   Industry AI Blueprint Data
   Each entry is a complete owner-facing AI proposal for that
   vertical — problems, solutions, architecture, ROI, roadmap.
   ────────────────────────────────────────────────────────── */

export type BlueprintProblem = {
  title: string
  desc: string
  cost: string
}

export type BlueprintSolution = {
  title: string
  desc: string
  metric: string
  metricLabel: string
}

export type ArchitectureLayer = {
  label: string
  items: string[]
  color: string
}

export type Role = {
  title: string
  painPoint: string
  aiGain: string
}

export type RoiItem = {
  label: string
  value: string
  color: string
}

export type RoadmapPhase = {
  phase: string
  title: string
  duration: string
  desc: string
  wins: string[]
}

export type DayInLife = {
  time: string
  event: string
  withoutAI: string
  withAI: string
}

export type Blueprint = {
  id: string
  industry: string
  emoji: string
  tagline: string
  description: string
  color: string
  borderColor: string
  bgGradient: string
  currentTools: string[]
  problems: BlueprintProblem[]
  solutions: BlueprintSolution[]
  architecture: ArchitectureLayer[]
  roles: Role[]
  roi: { items: RoiItem[]; payback: string; summary: string }
  roadmap: RoadmapPhase[]
  dayInLife: DayInLife[]
}

export const blueprints: Blueprint[] = [
  /* ─── 1. Food & Beverage ─────────────────────────────── */
  {
    id: "food-beverage",
    industry: "Food & Beverage",
    emoji: "☕",
    tagline: "Turn guesswork into profit — from the first brew to closing time.",
    description:
      "Coffee shops, cafés, and restaurants lose 15–20% of revenue to waste, labor overlap, and stockouts every single week. AI sits on top of your Square POS, inventory logs, and staff schedule — and turns that data into exact prep quantities, optimized shifts, and zero-surprise ordering.",
    color: "#e07030",
    borderColor: "#7a3000",
    bgGradient: "from-[#7a3000]/20 to-[#3d1800]/10",
    currentTools: ["Square POS", "Excel recipe costing", "Manual staff scheduling", "Paper inventory logs", "WhatsApp ordering"],
    problems: [
      { title: "Food Waste 15–20%", desc: "Milk, pastries, sandwiches, and syrups spoil because ordering is based on gut feel, not real demand data.", cost: "$800–$1,200/month wasted" },
      { title: "Labor Overlap", desc: "3 baristas scheduled during a slow Tuesday afternoon, 1 during Friday morning rush — no data-driven shift planning.", cost: "$4,000+/year in excess labor" },
      { title: "Stockouts on Best Sellers", desc: "You run out of oat milk on Saturday at 10 AM, turning away your highest-margin orders.", cost: "$300–$600/weekend in lost sales" },
      { title: "Blind Ordering", desc: "No one knows how much coffee beans, syrups, or cups to order for next week — managers over-order to be safe.", cost: "15–25% over-procurement each week" },
      { title: "Zero Demand Foresight", desc: "A local festival brings 40% more foot traffic and you're caught with no extra prep, no extra staff, and long queues.", cost: "Lost revenue + poor reviews" },
    ],
    solutions: [
      { title: "Demand Forecasting", desc: "Predicts tomorrow's sales by item (latte, cold brew, croissant, sandwich) using 90 days of history, weather, day-of-week, and local events.", metric: "92%", metricLabel: "Forecast accuracy" },
      { title: "Waste Prediction", desc: "Flags slow-moving inventory 48 hrs ahead — 'You have 12 croissants likely to expire tomorrow, push a 15% discount on your app now.'", metric: "−78%", metricLabel: "Food waste" },
      { title: "Labor Optimizer", desc: "Builds next-week schedules by predicted hourly demand — right number of baristas at 7 AM rush vs 2 PM lull.", metric: "4 hrs/wk", metricLabel: "Less labor overlap" },
      { title: "Smart Reorder Engine", desc: "Computes exact order quantities per ingredient every Sunday evening. Sends vendor order drafts directly to the manager for 1-click approval.", metric: "−22%", metricLabel: "Over-procurement" },
      { title: "Rush Hour Alert", desc: "Pushes a phone alert to the shift lead at 6 AM: 'High traffic day ahead — prep 40% more cold brew and bring in 2nd barista by 8 AM.'", metric: "Zero", metricLabel: "Surprise rushes" },
      { title: "Owner Profit Dashboard", desc: "Weekly summary: revenue, waste cost, labor efficiency, top-selling items, lowest-margin items — all in one screen.", metric: "15 min/wk", metricLabel: "Owner review time" },
    ],
    architecture: [
      { label: "DATA INPUTS", color: "#e07030", items: ["Square POS Sales", "Hourly Item Sales", "Inventory Counts", "Weather API", "Local Events Calendar", "Holiday Calendar", "Staff Availability", "Vendor Lead Times", "Waste Log"] },
      { label: "AI ENGINE", color: "#d4a017", items: ["Demand Forecasting Model", "Waste Prediction Engine", "Labor Optimization Model", "Inventory Replenishment AI", "Rush Hour Predictor", "Margin Analyzer"] },
      { label: "MANAGER OUTPUTS", color: "#4caf7d", items: ["Daily Prep Sheet", "Shift Schedule Recommendation", "Reorder Suggestions", "Low-Stock Alerts", "Waste Risk Warnings", "Promo Triggers for Slow Stock"] },
      { label: "OWNER OUTPUTS", color: "#8080c0", items: ["Weekly Profit Dashboard", "Waste Cost Summary", "Labor Efficiency Score", "Top/Bottom Sellers", "Margin by Daypart", "Monthly ROI Report"] },
    ],
    roles: [
      { title: "Barista / Crew Member", painPoint: "No idea how busy the next hour will be. Over-preps or under-preps.", aiGain: "Tablet prep screen shows exactly how many drinks to prep by 30-min block." },
      { title: "Shift Lead", painPoint: "Manually counts inventory, guesses daily order quantities, reacts to stockouts.", aiGain: "Gets AI prep plan every morning + low-stock alert before items run out." },
      { title: "Kitchen / Prep Lead", painPoint: "Over-bakes pastries Monday, runs short Friday. No visibility into weekend traffic.", aiGain: "Receives daily bake quantities based on predicted demand and waste history." },
      { title: "Assistant Manager", painPoint: "Builds schedules in Excel by hand, misses event days, over-books slow shifts.", aiGain: "AI suggests next-week schedule in 5 minutes. Manager approves, done." },
      { title: "General Manager", painPoint: "Spends 2 hrs/day on reports, vendor calls, and scheduling. Little time for customer experience.", aiGain: "Daily briefing in 5 minutes: what to watch, what to push, what to cut." },
      { title: "Business Owner", painPoint: "No real-time visibility. Finds out about a bad week after payroll hits.", aiGain: "Live dashboard: profit, waste %, labor efficiency, best/worst sellers — from any device." },
    ],
    roi: {
      items: [
        { label: "Monthly Waste Reduction", value: "$900 saved", color: "#4caf7d" },
        { label: "Annual Labor Savings", value: "$4,800/yr", color: "#d4a017" },
        { label: "Stockout Revenue Recovery", value: "+$500/month", color: "#e07030" },
        { label: "Manager Time Freed", value: "6 hrs/week", color: "#8080c0" },
        { label: "Food Cost % Improvement", value: "15% → 8%", color: "#e05555" },
        { label: "Procurement Over-ordering", value: "−22%", color: "#4caf7d" },
      ],
      payback: "2–3 months",
      summary: "A typical single-location café saves $18,000–$24,000 per year by eliminating waste, tightening labor, and preventing stockouts — with full ROI in under 90 days.",
    },
    roadmap: [
      { phase: "Phase 1", title: "Connect Your Data", duration: "Week 1–2", desc: "Plug Square POS into the platform. Import 90 days of sales history. Set up inventory baseline.", wins: ["Live sales dashboard", "Item-level trends visible", "No more guessing what sold"] },
      { phase: "Phase 2", title: "Demand Forecasting Live", duration: "Week 3–4", desc: "AI starts predicting daily and hourly demand per item. Prep sheets auto-generated every morning.", wins: ["Daily prep plan delivered by 7 AM", "Weather + event signals active", "Waste starts dropping immediately"] },
      { phase: "Phase 3", title: "Inventory & Reorder AI", duration: "Month 2", desc: "AI calculates exact reorder quantities every week. Sends vendor drafts to manager for approval.", wins: ["Over-ordering drops 20%+", "Stockouts near zero", "Food cost % falls"] },
      { phase: "Phase 4", title: "Labor Optimization", duration: "Month 2–3", desc: "AI builds shift schedules based on predicted traffic by day and hour. Integrates with your payroll.", wins: ["Labor overlap eliminated", "$400/month saved", "Staff satisfaction improves"] },
      { phase: "Phase 5", title: "Owner Dashboard + Alerts", duration: "Month 3", desc: "Full weekly profit report. Mobile push alerts for rush hours, waste risks, and low stock.", wins: ["Owner has full visibility", "Manager review cut to 10 min/day", "No surprise bad weeks"] },
      { phase: "Phase 6", title: "Growth Mode", duration: "Month 4+", desc: "Seasonal menu planning, loyalty program optimization, multi-location expansion support.", wins: ["Seasonal prep accuracy", "Higher repeat customer rate", "Scales to any # of locations"] },
    ],
    dayInLife: [
      { time: "6:30 AM", event: "Opening Prep", withoutAI: "Shift lead guesses how much to prep based on yesterday's feel.", withAI: "Prep sheet already on tablet: 45 lattes, 30 cold brews, 18 croissants for 7–10 AM block." },
      { time: "9:00 AM", event: "Mid-Morning Rush", withoutAI: "Runs out of oat milk. Customer turns away. No early warning.", withAI: "Alert at 8:45 AM: 'Oat milk running low — pull backup from storage now.'" },
      { time: "11:00 AM", event: "Inventory Check", withoutAI: "Manager spends 45 min counting everything by hand into a spreadsheet.", withAI: "System auto-updates inventory from sales. Manager spot-checks in 10 min." },
      { time: "2:00 PM", event: "Slow Afternoon", withoutAI: "3 baristas standing around. No one knew it would be this slow.", withAI: "AI flagged yesterday: 'Tuesday 1–4 PM historically quiet — schedule 1 barista, not 3.'" },
      { time: "4:30 PM", event: "Vendor Order", withoutAI: "Manager calls vendor, guesses quantities, often over-orders milk and beans.", withAI: "AI sends pre-calculated order draft via WhatsApp/email. Manager approves in 2 taps." },
      { time: "9:00 PM", event: "End of Day Report", withoutAI: "Owner calls manager for update. Takes 20 minutes. Still incomplete.", withAI: "Owner gets automated summary on phone: revenue, waste, top sellers, tomorrow's prep preview." },
    ],
  },

  /* ─── 2. DTC E-commerce ──────────────────────────────── */
  {
    id: "dtc-ecommerce",
    industry: "DTC E-commerce",
    emoji: "🛒",
    tagline: "Predict demand. Cut dead stock. Turn browsers into buyers — automatically.",
    description:
      "DTC brands bleed money in three places: ad spend that doesn't convert, inventory they can't move, and customers they lose after the first order. AI connects your Shopify, Meta Ads, and warehouse data to predict what will sell, who will churn, and exactly how much to stock — before it costs you.",
    color: "#4caf7d",
    borderColor: "#1a5c3a",
    bgGradient: "from-[#1a5c3a]/20 to-[#0a2d1e]/10",
    currentTools: ["Shopify", "Meta/Google Ads", "Klaviyo", "Excel forecasting", "Manual reorder triggers", "Basic Google Analytics"],
    problems: [
      { title: "Dead Stock / Overstock", desc: "You bought 500 units of a color that didn't sell. It's sitting in your warehouse costing you storage fees and tied-up capital.", cost: "$10K–$50K in dead inventory/year" },
      { title: "Stockouts on Winners", desc: "Your best-selling SKU sells out on Black Friday because you didn't forecast the spike. Lost sales, lost ranking, lost customers.", cost: "$20K–$100K in lost BFCM revenue" },
      { title: "Ad Spend Waste", desc: "30–40% of your Meta/Google budget goes to audiences, creatives, and SKUs that have already peaked — no AI to rotate spend in real time.", cost: "30–40% ad budget wasted monthly" },
      { title: "Post-Purchase Churn", desc: "70% of customers never buy again. No system identifies who's about to churn and sends the right offer at the right time.", cost: "CAC never recovered on 70% of buyers" },
      { title: "No Demand Foresight", desc: "Seasonal buying, influencer spikes, trend moments — you find out after the fact. Orders placed too late, arrivals too early or too late.", cost: "Missed revenue + markdown cycles" },
    ],
    solutions: [
      { title: "SKU-Level Demand Forecast", desc: "Predicts units sold per SKU per week using seasonality, trend velocity, promo calendar, and external signals (TikTok virality, Google Trends).", metric: "95%", metricLabel: "Forecast accuracy" },
      { title: "Intelligent Replenishment", desc: "Calculates reorder point, reorder quantity, and lead-time buffer per SKU. Auto-creates POs for warehouse review.", metric: "−40%", metricLabel: "Stockout events" },
      { title: "Ad Budget Optimizer", desc: "Analyzes ROAS by SKU, audience, and creative. Recommends daily budget shifts to highest-converting combinations.", metric: "+28%", metricLabel: "Blended ROAS" },
      { title: "Churn Prediction Engine", desc: "Scores every customer daily on churn probability. Triggers Klaviyo flow with personalized win-back offer before they're gone.", metric: "−35%", metricLabel: "Customer churn rate" },
      { title: "Markdown Optimizer", desc: "Identifies slow-moving inventory 30 days before it becomes a problem. Recommends discount %, bundle strategy, or channel reallocation.", metric: "+18%", metricLabel: "Gross margin" },
      { title: "Personalization Engine", desc: "Recommends next-best product per customer based on purchase history, browse behavior, and cohort patterns. Powers homepage, email, and post-checkout.", metric: "+22%", metricLabel: "Average Order Value" },
    ],
    architecture: [
      { label: "DATA INPUTS", color: "#4caf7d", items: ["Shopify Orders + SKU Sales", "Meta/Google Ads Spend + ROAS", "Email Open/Click Rates", "Website Browse Behavior", "Warehouse Inventory Levels", "Supplier Lead Times", "Return Reasons", "Google Trends + Social Signals", "Promo Calendar"] },
      { label: "AI ENGINE", color: "#d4a017", items: ["SKU-Level Demand Forecasting", "Churn Probability Model", "Ad Spend Optimization", "Personalization Engine", "Markdown / Clearance Optimizer", "Anomaly Detection (Viral Spikes)"] },
      { label: "OPERATOR OUTPUTS", color: "#e07030", items: ["Weekly PO Recommendations", "Ad Reallocation Suggestions", "Churn Risk Alerts", "Markdown Action List", "Upsell/Cross-sell Triggers", "Inventory Health Score"] },
      { label: "FOUNDER OUTPUTS", color: "#8080c0", items: ["Revenue Forecast (30/60/90 day)", "Inventory Capital Efficiency", "Customer LTV by Cohort", "Contribution Margin by SKU", "Weekly Brand Health Score"] },
    ],
    roles: [
      { title: "Warehouse / Ops Manager", painPoint: "Manually generates POs based on gut feel, often too late or too much.", aiGain: "AI-generated PO drafts arrive weekly with exact quantities and timing." },
      { title: "Paid Media Manager", painPoint: "Manually adjusts budgets, misses trend spikes, slow to reallocate.", aiGain: "Daily AI brief: top-performing SKUs for today, suggested budget moves." },
      { title: "Email / CRM Manager", painPoint: "Blasts same sequence to all customers regardless of intent signals.", aiGain: "AI scores each customer and auto-triggers the right flow at the right time." },
      { title: "Merchandising Lead", painPoint: "Identifies slow movers only when it's too late to do anything but discount.", aiGain: "30-day early warning on slow-movers with specific action recommendations." },
      { title: "Head of Growth", painPoint: "CAC rising, LTV unclear, attribution messy — hard to make channel decisions.", aiGain: "Clean LTV:CAC by cohort, channel contribution, and forecast-adjusted budget plan." },
      { title: "Founder / CEO", painPoint: "No single truth on inventory health, ad efficiency, and customer retention simultaneously.", aiGain: "Weekly brand health dashboard: margin, growth trajectory, risks, and opportunities." },
    ],
    roi: {
      items: [
        { label: "Dead Stock Reduction", value: "−40% inventory write-offs", color: "#4caf7d" },
        { label: "ROAS Improvement", value: "+28% blended ROAS", color: "#d4a017" },
        { label: "Customer Retention", value: "+35% repeat rate", color: "#e07030" },
        { label: "AOV Increase", value: "+22% via personalization", color: "#8080c0" },
        { label: "Ops Time Saved", value: "8 hrs/week on forecasting", color: "#e05555" },
        { label: "Gross Margin Lift", value: "+4–6 margin points", color: "#4caf7d" },
      ],
      payback: "60–90 days",
      summary: "A $2M/year DTC brand typically recovers $180K–$280K annually through better inventory management, improved ad efficiency, and higher customer retention. Full system pays for itself within the first quarter.",
    },
    roadmap: [
      { phase: "Phase 1", title: "Connect Store + Ads", duration: "Week 1", desc: "Shopify + Meta + Google integrated. Full SKU-level sales and ad performance history loaded.", wins: ["Single source of truth dashboard", "SKU performance visible", "Ad ROAS by product live"] },
      { phase: "Phase 2", title: "Demand Forecasting", duration: "Week 2–3", desc: "AI trains on 12+ months of sales data. Weekly SKU demand forecast with confidence intervals.", wins: ["Stop guessing reorder quantities", "First PO recommendations generated", "Seasonal planning unlocked"] },
      { phase: "Phase 3", title: "Ad Optimization", duration: "Month 2", desc: "AI analyzes spend vs margin by SKU and audience. Daily reallocation suggestions.", wins: ["+20–30% ROAS improvement", "Budget waste identified immediately", "Creative fatigue detection"] },
      { phase: "Phase 4", title: "Churn + Retention AI", duration: "Month 2–3", desc: "Customer scoring live. Klaviyo integration sends AI-triggered win-back flows.", wins: ["First win-back campaigns live", "Churn rate starts falling", "LTV measurement accurate"] },
      { phase: "Phase 5", title: "Personalization Engine", duration: "Month 3", desc: "Product recommendations on site, in email, and post-purchase. Upsell flows automated.", wins: ["+15–22% AOV", "Recommendation engine on homepage", "Post-purchase sequence optimized"] },
      { phase: "Phase 6", title: "Full Brand Intelligence", duration: "Month 4+", desc: "Contribution margin by SKU, cohort LTV forecasting, 90-day revenue planning.", wins: ["Founder has full clarity", "Capital allocation optimized", "Scales with new product lines"] },
    ],
    dayInLife: [
      { time: "8:00 AM", event: "Morning Brief", withoutAI: "Founder checks Shopify dashboard, Meta ads, then emails warehouse. 3 different tools, no unified view.", withAI: "One AI brief on phone: yesterday's revenue, ROAS by SKU, 3 inventory alerts, 1 action needed." },
      { time: "10:00 AM", event: "PO Review", withoutAI: "Ops manager opens Excel, manually calculates reorder needs, emails supplier.", withAI: "AI PO draft waiting in dashboard. Ops manager reviews, approves in 5 minutes, done." },
      { time: "12:00 PM", event: "Ad Check", withoutAI: "Media buyer manually pulls ROAS reports. Moves budget after a 2-day lag.", withAI: "AI flags at 9 AM: 'Shift $800 from SKU-22 to SKU-07 today — ROAS gap widening.'" },
      { time: "3:00 PM", event: "Inventory Health", withoutAI: "Warehouse emails: 'We're low on product X.' Already too late for standard lead time.", withAI: "AI flagged 3 weeks ago. PO already placed. Stock arrives on time." },
      { time: "5:00 PM", event: "Customer Retention", withoutAI: "CRM manager manually checks who hasn't ordered in 60 days. Sends same discount to all.", withAI: "AI auto-scored all customers at risk. Klaviyo flow already triggered with personalized offer." },
      { time: "Friday PM", event: "Weekly Review", withoutAI: "Founder pulls 6 reports, tries to synthesize, 2 hours later still no clear picture.", withAI: "Weekly brand report ready: margin, growth, risks, next week's forecast. 15-minute review." },
    ],
  },

  /* ─── 3. Digital Marketing Agency ────────────────────── */
  {
    id: "digital-agency",
    industry: "Digital Marketing Agency",
    emoji: "📈",
    tagline: "Deliver better results for every client — in less time, with less guesswork.",
    description:
      "Agencies lose margin on manual reporting, reactive campaign management, and overservicing unprofitable clients. AI automates the repetitive work, predicts campaign performance before the budget runs out, and shows you exactly which clients to grow — and which are quietly draining your team.",
    color: "#5ba4e0",
    borderColor: "#1a3a6b",
    bgGradient: "from-[#1a3a6b]/20 to-[#0a1d3d]/10",
    currentTools: ["Google Ads / Meta Ads Manager", "HubSpot / Salesforce", "Looker Studio", "Manual reporting", "Slack for approvals", "Excel for billing"],
    problems: [
      { title: "Reporting Takes Forever", desc: "Account managers spend 8–12 hours/week pulling data from 5 platforms, formatting slides, and sending client reports manually.", cost: "12 hrs/week × $50/hr = $2,400/month wasted" },
      { title: "Reactive Campaign Management", desc: "You find out a campaign is underperforming after it's spent 80% of the budget. No predictive signal to act early.", cost: "$5K–$20K wasted per client/quarter" },
      { title: "Client Profitability Blindspot", desc: "You service 40 clients but have no clear view of which ones are actually profitable after accounting for team hours.", cost: "20–30% of clients subsidized by others" },
      { title: "Talent Bottleneck", desc: "Senior strategists spend time on repetitive copy, reports, and analysis instead of high-value strategy and client relationships.", cost: "50% of senior time on low-value tasks" },
      { title: "No Predictive Insights", desc: "You present last month's results. Clients want to know what's going to happen next month and what to do about it.", cost: "Lost retainers to more data-forward agencies" },
    ],
    solutions: [
      { title: "Automated Client Reporting", desc: "AI assembles white-label client reports every Monday — pulling from Google, Meta, GA4, and CRM. Delivered to clients before 9 AM without a single manual step.", metric: "10 hrs/week", metricLabel: "Saved per account manager" },
      { title: "Campaign Performance Predictor", desc: "Analyzes spend velocity, CTR decay, and audience saturation in real time. Alerts account managers 48 hrs before a campaign goes off-track.", metric: "−60%", metricLabel: "Budget waste" },
      { title: "Client Profitability Engine", desc: "Tracks actual hours, cost of service, and revenue per client. Flags unprofitable accounts and recommends upsell or repricing.", metric: "+25%", metricLabel: "Agency gross margin" },
      { title: "AI Copy & Brief Generator", desc: "Generates first-draft ad copy, email subject lines, and creative briefs in 2 minutes. Strategists refine — not write from scratch.", metric: "3× faster", metricLabel: "Content production" },
      { title: "Predictive Budget Allocation", desc: "AI recommends monthly budget allocation across channels and campaigns based on predicted ROAS by audience, season, and client goal.", metric: "+32%", metricLabel: "Client ROAS" },
      { title: "Churn Risk Scoring", desc: "Scores each client monthly on renewal probability using sentiment signals, performance gaps, and engagement data. Triggers proactive outreach before they leave.", metric: "−40%", metricLabel: "Client churn" },
    ],
    architecture: [
      { label: "DATA INPUTS", color: "#5ba4e0", items: ["Google Ads API", "Meta Business API", "GA4 / Pixel Events", "CRM (HubSpot/Salesforce)", "Billing & Invoices", "Time Tracking (Harvest/Toggl)", "Client Email Sentiment", "Competitor Ad Intelligence"] },
      { label: "AI ENGINE", color: "#d4a017", items: ["Campaign Performance Predictor", "Auto-Reporting Engine", "Client Profitability Model", "Churn Risk Scorer", "Budget Allocation Optimizer", "AI Copy Generator"] },
      { label: "TEAM OUTPUTS", color: "#4caf7d", items: ["Daily Campaign Alerts", "Weekly Auto-Reports (per client)", "48hr Performance Warnings", "Copy/Brief Drafts", "Budget Reallocation Flags", "Upsell Opportunity Triggers"] },
      { label: "LEADERSHIP OUTPUTS", color: "#e05555", items: ["Agency Profit Dashboard", "Client Health Scorecard", "Revenue Forecasting (90-day)", "Team Utilization Report", "Account Expansion Pipeline"] },
    ],
    roles: [
      { title: "Junior Account Exec", painPoint: "Spends 3 days/week pulling data, formatting reports, and answering 'how did we do?' emails.", aiGain: "Reports auto-generated and delivered. Junior AE focuses on client relationship, not spreadsheets." },
      { title: "Paid Media Specialist", painPoint: "Reacts to performance drops after the damage is done. Manually optimizes one campaign at a time.", aiGain: "AI flags anomalies before they become problems. Specialist acts on insights, not hunches." },
      { title: "Creative Strategist", painPoint: "Spends 4 hours writing a brief from scratch. 60% of that time is repetitive structure.", aiGain: "AI generates structured brief in 3 minutes. Strategist adds insight, positioning, and refinement." },
      { title: "Account Director", painPoint: "No clear view of which clients are profitable, which are at risk, which are ready for upsell.", aiGain: "Client health dashboard surfaces the right conversation at the right time." },
      { title: "Agency Owner / CEO", painPoint: "Manages 40 client relationships, a team of 20, and has no real-time view of agency profitability.", aiGain: "Live dashboard: revenue, margin, churn risk, team utilization — weekly in 15 minutes." },
    ],
    roi: {
      items: [
        { label: "Reporting Time Saved", value: "10 hrs/week per AM", color: "#5ba4e0" },
        { label: "Campaign Waste Reduced", value: "−60% budget waste", color: "#d4a017" },
        { label: "Client Churn Reduction", value: "−40% churn rate", color: "#4caf7d" },
        { label: "Gross Margin Improvement", value: "+25% agency margin", color: "#e07030" },
        { label: "Client ROAS Delivered", value: "+32% average ROAS", color: "#e05555" },
        { label: "Team Capacity Freed", value: "Serve 30% more clients", color: "#8080c0" },
      ],
      payback: "45–60 days",
      summary: "A 15-person agency adds the equivalent of 3–4 full-time account managers worth of capacity through automation — without a single new hire. Gross margin typically increases 20–30% in the first 6 months.",
    },
    roadmap: [
      { phase: "Phase 1", title: "Data Unification", duration: "Week 1–2", desc: "Connect Google, Meta, GA4, HubSpot, and billing into one central platform.", wins: ["Single dashboard per client", "No more manual data pulls", "Baseline performance visible"] },
      { phase: "Phase 2", title: "Auto-Reporting Live", duration: "Week 2–3", desc: "White-label weekly reports auto-generated and delivered to clients.", wins: ["10 hrs/week recovered per AM", "Client reporting consistent", "First impressions already improving"] },
      { phase: "Phase 3", title: "Performance Intelligence", duration: "Month 2", desc: "Campaign predictor and anomaly detection live. 48hr advance warnings for underperformers.", wins: ["Budget waste falls", "Proactive client calls", "Performance reviews transformed"] },
      { phase: "Phase 4", title: "Client Profitability + Retention", duration: "Month 2–3", desc: "Profitability model live. Churn risk scoring per account. Upsell triggers automated.", wins: ["Unprofitable clients identified", "Churn interventions automated", "Upsell revenue increases"] },
      { phase: "Phase 5", title: "AI Content Production", duration: "Month 3", desc: "Brief generator and copy AI live. Integrated with creative workflow.", wins: ["Creative output 3× faster", "Senior time on strategy", "More campaigns deliverable"] },
      { phase: "Phase 6", title: "Agency Intelligence Layer", duration: "Month 4+", desc: "90-day revenue forecasting, team utilization optimization, and expansion planning.", wins: ["Full agency visibility", "Scalable to 2× client load", "Investment-ready reporting"] },
    ],
    dayInLife: [
      { time: "8:00 AM", event: "Client Reports Due", withoutAI: "Account manager pulls data from 5 tools, formats slides, QAs numbers. 3 hours per client.", withAI: "Reports auto-generated and emailed to 12 clients by 8 AM. AMs review in 20 minutes total." },
      { time: "10:00 AM", event: "Campaign Check", withoutAI: "Media buyer logs into Google and Meta separately, scans for problems, finds one 30% over-CPA.", withAI: "Alert arrived at 9:30 AM: 'Client A Campaign C: CPA up 31%, audience fatigue detected. Recommend pause + rotate creative.'" },
      { time: "1:00 PM", event: "New Client Brief", withoutAI: "Strategist spends 2 hrs writing a discovery brief from a blank doc.", withAI: "AI generates structured brief with audience insights, channel recommendations, and benchmarks in 4 minutes." },
      { time: "3:00 PM", event: "Account Review", withoutAI: "Account director reviews client list manually. Not sure who's at risk of churning.", withAI: "Client health dashboard shows: 3 clients with declining sentiment + performance gap. Calls scheduled for tomorrow." },
      { time: "5:00 PM", event: "Budget Planning", withoutAI: "Media buyer manually allocates next month's budget across channels based on gut and last month's results.", withAI: "AI recommendation: 'Shift 25% of Client B budget from Search to Reels — predicted +18% ROAS based on audience overlap.'" },
      { time: "Friday PM", event: "Agency Health Review", withoutAI: "Owner spends 3 hrs pulling billing, utilization, and performance data. Still feels incomplete.", withAI: "Agency dashboard: revenue, margin per client, team load, churn risk list. 15-minute review, clear action items." },
    ],
  },

  /* ─── 4. Landscaping Company ─────────────────────────── */
  {
    id: "landscaping",
    industry: "Landscaping Company",
    emoji: "🌿",
    tagline: "Route smarter. Quote accurately. Never lose a job to weather again.",
    description:
      "Landscaping companies bleed margin on inefficient crew routing, weather-disrupted schedules, under-priced jobs, and idle equipment. AI turns your job history, weather data, and crew GPS into the fastest routes, the most accurate quotes, and a schedule that actually survives Monday morning.",
    color: "#4caf7d",
    borderColor: "#1a5c3a",
    bgGradient: "from-[#1a5c3a]/20 to-[#0d3020]/10",
    currentTools: ["ServiceTitan / Jobber", "Google Maps for routing", "Paper job sheets", "Manual quoting", "Phone scheduling", "Excel time tracking"],
    problems: [
      { title: "Inefficient Crew Routing", desc: "Crews drive 40+ minutes between jobs that could be grouped by neighborhood. Fuel, time, and payroll wasted every single day.", cost: "$1,200–$2,000/month in wasted drive time" },
      { title: "Weather Disruptions", desc: "Rain cancels a full day of jobs. No system reschedules, re-routes, or notifies customers efficiently. Crew still gets paid.", cost: "$800–$1,500 per weather day lost" },
      { title: "Inaccurate Job Quotes", desc: "Quoting is based on experience and gut feel. Jobs take longer than expected, eating margin. Or quotes are too high and you lose the bid.", cost: "5–15% margin erosion per quote error" },
      { title: "Equipment Downtime", desc: "A mower breaks mid-week because maintenance was skipped. Crew sits idle while equipment is repaired. Job delayed, customer unhappy.", cost: "$500–$2,000 per unplanned repair incident" },
      { title: "No Job Profitability Visibility", desc: "You complete 150 jobs per week and have no clear view of which jobs, crews, or neighborhoods are actually profitable vs. just busy.", cost: "Subsidizing unprofitable routes unknowingly" },
    ],
    solutions: [
      { title: "AI Route Optimizer", desc: "Groups jobs by proximity, crew skill, equipment availability, and time windows. Builds optimal daily routes for every crew — the night before.", metric: "−30%", metricLabel: "Drive time" },
      { title: "Weather-Aware Scheduling", desc: "Integrates real-time and 10-day weather forecast. Auto-reschedules rained-out jobs, notifies customers, and rebuilds the week's route automatically.", metric: "Zero", metricLabel: "Weather-day revenue loss" },
      { title: "Smart Quote Engine", desc: "Analyzes historical job data (size, terrain, services, crew, duration) to generate accurate time and cost estimates for new quotes.", metric: "+18%", metricLabel: "Quote-to-close rate" },
      { title: "Predictive Maintenance", desc: "Tracks engine hours, service intervals, and failure patterns on all equipment. Pushes maintenance reminders before breakdowns happen.", metric: "−70%", metricLabel: "Unplanned downtime" },
      { title: "Job Profitability Tracker", desc: "Scores every completed job: actual hours vs. estimated, drive time, crew cost, materials. Shows real profit by job, neighborhood, and service type.", metric: "15%", metricLabel: "Margin improvement" },
      { title: "Customer Retention AI", desc: "Tracks service frequency, satisfaction signals, and renewal timing. Sends automated follow-up and upsell offers at exactly the right moment.", metric: "+40%", metricLabel: "Renewal rate" },
    ],
    architecture: [
      { label: "DATA INPUTS", color: "#4caf7d", items: ["Job Management System (Jobber/ServiceTitan)", "Crew GPS Tracking", "Weather API (10-day forecast)", "Equipment Telematics", "Customer Address + Service History", "Job Duration History", "Material Costs", "Invoice + Payment Data"] },
      { label: "AI ENGINE", color: "#d4a017", items: ["Route Optimization Model", "Weather Disruption Handler", "Quote Accuracy Engine", "Equipment Maintenance Predictor", "Job Profitability Scorer", "Customer Churn Predictor"] },
      { label: "CREW / FIELD OUTPUTS", color: "#e07030", items: ["Optimized Daily Route (Mobile)", "Real-Time Re-routing", "Job Instructions + Photos", "Equipment Check Alerts", "Weather Reschedule Notifications", "Upsell Prompts On-Site"] },
      { label: "OWNER OUTPUTS", color: "#8080c0", items: ["Weekly Profitability Report", "Crew Efficiency Scorecard", "Equipment Health Dashboard", "Quote Win Rate Analysis", "Revenue Forecasting (30/60/90 day)"] },
    ],
    roles: [
      { title: "Crew Member", painPoint: "Gets paper job sheet, figures out route themselves, shows up late to first job.", aiGain: "Mobile app shows optimized route, job details, photos, and check-in on arrival." },
      { title: "Crew Lead", painPoint: "Calls dispatch for every scheduling change. Wastes 30 min/day on logistics.", aiGain: "Sees live route updates on phone. Changes pushed automatically when jobs shuffle." },
      { title: "Dispatcher / Scheduler", painPoint: "Rebuilds schedule manually every rain day. Takes 2 hours, customers still unhappy.", aiGain: "AI rebuilds schedule in 3 minutes. Dispatcher reviews and sends customer notifications in 1 click." },
      { title: "Sales / Estimator", painPoint: "Manually calculates quote from gut feel. Under-prices complex jobs regularly.", aiGain: "AI suggests quote range based on 500+ similar past jobs. Estimator adjusts, accuracy improves." },
      { title: "Operations Manager", painPoint: "No visibility into which crews are profitable, which routes are efficient.", aiGain: "Weekly crew efficiency dashboard: jobs per day, drive time %, margin per crew." },
      { title: "Business Owner", painPoint: "No clear picture of which jobs, neighborhoods, or services are making money.", aiGain: "Monthly profit report by service type, crew, and geography. Easy scaling decisions." },
    ],
    roi: {
      items: [
        { label: "Fuel & Drive Time Savings", value: "$1,500/month", color: "#4caf7d" },
        { label: "Equipment Repair Avoidance", value: "$6,000/year", color: "#d4a017" },
        { label: "Margin Improvement", value: "+15% per job", color: "#e07030" },
        { label: "Jobs Per Day Per Crew", value: "+25% more jobs", color: "#5ba4e0" },
        { label: "Quote Accuracy", value: "Within 5% of actual", color: "#e05555" },
        { label: "Customer Renewal Rate", value: "+40% retention", color: "#8080c0" },
      ],
      payback: "45–75 days",
      summary: "A landscaping company running 10 crews typically recovers $30K–$60K per year through better routing, accurate quoting, and predictive maintenance — while improving customer satisfaction scores significantly.",
    },
    roadmap: [
      { phase: "Phase 1", title: "Job Data Integration", duration: "Week 1–2", desc: "Connect Jobber or ServiceTitan. Load 12 months of job history, crew data, and routes.", wins: ["First route analysis", "Job profitability baseline set", "Equipment inventory logged"] },
      { phase: "Phase 2", title: "Route Optimization Live", duration: "Week 2–3", desc: "AI daily route plans for all crews delivered the night before via mobile app.", wins: ["−30% drive time from week 1", "$1,000+/month fuel savings", "Crews start earlier, finish earlier"] },
      { phase: "Phase 3", title: "Weather Intelligence", duration: "Month 2", desc: "10-day weather integration live. Auto-rescheduling and customer notifications automated.", wins: ["Zero weather-day chaos", "Customer satisfaction improves", "Revenue preserved on rain days"] },
      { phase: "Phase 4", title: "Smart Quoting", duration: "Month 2–3", desc: "Historical job data trains quote engine. New estimates AI-assisted in seconds.", wins: ["Under-pricing eliminated", "Win rate improves", "Margin per job increases"] },
      { phase: "Phase 5", title: "Equipment + Profitability", duration: "Month 3", desc: "Maintenance predictor live. Job profitability scoring by crew, route, and service type.", wins: ["No surprise breakdowns", "Unprofitable routes identified", "Crew efficiency visible"] },
      { phase: "Phase 6", title: "Scale Mode", duration: "Month 4+", desc: "Expansion planning, seasonal forecasting, customer retention automation.", wins: ["Growth decisions data-driven", "Customer retention automated", "Scales with every new crew"] },
    ],
    dayInLife: [
      { time: "6:00 AM", event: "Crew Dispatch", withoutAI: "Dispatcher calls each crew lead, reads off job list, they plan their own route. 45 minutes of calls.", withAI: "Each crew lead opens the app — optimized route, job details, and photos already waiting." },
      { time: "7:30 AM", event: "Weather Check", withoutAI: "Owner sees rain forecast, manually calls dispatcher, rebuilds entire day. Customer calls coming in.", withAI: "AI already rescheduled rained-out jobs at 6 AM. Customer texts sent automatically. Crews re-routed." },
      { time: "10:00 AM", event: "On-Site Quote", withoutAI: "Estimator walks property, estimates in head, types into Excel back at office. Error-prone.", withAI: "Estimator uses app on-site: AI suggests range based on 200 similar properties. Quote sent in 10 min." },
      { time: "12:00 PM", event: "Equipment Issue", withoutAI: "Mower makes a strange noise. Crew pushes through. Mower breaks at 2 PM. Day ruined.", withAI: "System flagged mower service due 3 days ago. Was serviced yesterday. No breakdown." },
      { time: "4:00 PM", event: "End-of-Day Review", withoutAI: "Dispatcher updates paper log. Owner has no idea how the day went until tomorrow.", withAI: "Owner dashboard: 47 jobs completed, avg drive time 18 min, 2 flagged for quote review." },
      { time: "Friday PM", event: "Weekly Planning", withoutAI: "Owner spends 3 hrs scheduling next week, calling crews, checking weather, pricing jobs.", withAI: "AI pre-built next week's schedule. Owner reviews route map and approves in 20 minutes." },
    ],
  },

  /* ─── 5. Manufacturing Plant ─────────────────────────── */
  {
    id: "manufacturing",
    industry: "Manufacturing Plant",
    emoji: "🏭",
    tagline: "Predict failures before they happen. Cut waste. Ship on time, every time.",
    description:
      "Manufacturers lose millions to unplanned downtime, quality defects, and supply chain surprises. AI monitors every machine, every batch, and every supplier — and tells your team what's about to go wrong before it does. The result: higher output, fewer defects, and a supply chain that never blindsides you.",
    color: "#b0a0e0",
    borderColor: "#4a3080",
    bgGradient: "from-[#4a3080]/20 to-[#28184d]/10",
    currentTools: ["ERP (SAP/Oracle)", "Manual QC inspection", "Excel production scheduling", "Paper maintenance logs", "Basic MES system", "Email supplier communication"],
    problems: [
      { title: "Unplanned Equipment Downtime", desc: "A critical CNC machine or conveyor fails mid-shift. The production line stops. Maintenance scrambles. Delivery delayed. Customer penalized.", cost: "$8K–$50K per unplanned downtime event" },
      { title: "Quality Defects Reach Customers", desc: "Manual inspection misses subtle defects — wrong dimensions, surface flaws, assembly errors. Products get returned. Warranty claims pile up.", cost: "2–5% defect rate = $200K–$500K/year in rework" },
      { title: "Supply Chain Disruptions", desc: "A key component is backordered. You find out when production is already scheduled. Rush orders, line stoppages, expediting fees.", cost: "$20K–$100K per supply disruption event" },
      { title: "Energy Waste", desc: "Machines run at full power during low-demand periods. HVAC, compressors, and motors not optimized for actual production load.", cost: "15–25% energy over-consumption" },
      { title: "Production Schedule Misalignment", desc: "Schedule built in Excel can't react to machine issues, material shortages, or demand changes. Manual replanning takes hours.", cost: "10–20% production capacity lost to replanning" },
    ],
    solutions: [
      { title: "Predictive Maintenance AI", desc: "Monitors vibration, temperature, current draw, and cycle counts on every machine. Predicts failures 72–96 hours in advance. Maintenance happens on schedule — never as an emergency.", metric: "−85%", metricLabel: "Unplanned downtime" },
      { title: "Computer Vision Quality Control", desc: "AI camera system inspects 100% of output at line speed — detecting dimensional deviations, surface defects, and assembly errors invisible to the human eye.", metric: "99.2%", metricLabel: "Defect detection accuracy" },
      { title: "Supply Chain Risk AI", desc: "Monitors supplier delivery performance, geopolitical risk signals, and component lead times. Flags shortages 4–6 weeks before they impact production.", metric: "−70%", metricLabel: "Supply disruptions" },
      { title: "Dynamic Production Scheduling", desc: "AI-driven schedule that adjusts in real time to machine status, material availability, and order priority. Replanning that used to take 4 hours now happens in 90 seconds.", metric: "+22%", metricLabel: "Production throughput" },
      { title: "Energy Optimization Engine", desc: "Controls machine power states, HVAC, compressors, and lighting based on real-time production load and utility rate schedules.", metric: "−20%", metricLabel: "Energy costs" },
      { title: "Yield & OEE Intelligence", desc: "Tracks Overall Equipment Effectiveness per machine per shift. Identifies bottlenecks, micro-stoppages, and operator performance patterns automatically.", metric: "+18%", metricLabel: "OEE score" },
    ],
    architecture: [
      { label: "DATA INPUTS", color: "#b0a0e0", items: ["Machine Sensors (IoT)", "PLC / SCADA Systems", "ERP (SAP/Oracle)", "Quality Inspection Records", "Supplier Delivery Data", "Energy Meters", "Production Orders", "Weather + Logistics Data", "Operator Logs"] },
      { label: "AI ENGINE", color: "#d4a017", items: ["Predictive Maintenance Model", "Computer Vision QC Engine", "Supply Chain Risk Predictor", "Dynamic Scheduling Optimizer", "Energy Management AI", "OEE & Yield Analyzer"] },
      { label: "FLOOR OUTPUTS", color: "#4caf7d", items: ["Machine Health Alerts", "QC Pass/Fail in Real Time", "Maintenance Work Orders (auto-generated)", "Production Schedule Updates", "Operator Guidance Screen", "Material Shortage Warnings"] },
      { label: "MANAGEMENT OUTPUTS", color: "#e05555", items: ["Plant Performance Dashboard", "Downtime Cost Report", "Supplier Risk Scorecard", "Quality Trend Analysis", "Energy Cost Breakdown", "On-Time Delivery Score"] },
    ],
    roles: [
      { title: "Machine Operator", painPoint: "Doesn't know machine is degrading until it stops. Reacts to breakdowns.", aiGain: "Screen shows machine health score. Operator follows guided maintenance steps before failure." },
      { title: "QC Inspector", painPoint: "Samples 5% of output. Defects slip through. Rework and returns follow.", aiGain: "Vision AI inspects 100% of output. Inspector reviews flagged anomalies only." },
      { title: "Maintenance Technician", painPoint: "Responds to emergency breakdowns. Works nights and weekends. High stress.", aiGain: "Scheduled work orders based on predicted failures. Planned maintenance, no emergencies." },
      { title: "Production Planner", painPoint: "Rebuilds schedule in Excel every time something changes. 4 hrs of manual replanning.", aiGain: "AI reschedules in 90 seconds when machine goes down or material is short." },
      { title: "Plant Manager", painPoint: "No real-time visibility of OEE, quality rates, and energy costs simultaneously.", aiGain: "Live plant dashboard: throughput, quality rate, energy cost, top bottlenecks." },
      { title: "Plant / Factory Owner", painPoint: "Finds out about major quality or downtime events after customer complaints arrive.", aiGain: "Real-time alerts on phone. Weekly executive report: cost, efficiency, quality, forecast." },
    ],
    roi: {
      items: [
        { label: "Downtime Reduction", value: "−85% unplanned stops", color: "#b0a0e0" },
        { label: "Quality Cost Reduction", value: "−90% defect rework", color: "#4caf7d" },
        { label: "Energy Savings", value: "−20% electricity bill", color: "#d4a017" },
        { label: "Throughput Increase", value: "+22% production output", color: "#e07030" },
        { label: "Supply Disruptions", value: "−70% stockout events", color: "#e05555" },
        { label: "Annual Net Savings", value: "$500K–$2M+/plant", color: "#8080c0" },
      ],
      payback: "4–8 months",
      summary: "A mid-size manufacturing plant with $20M annual revenue typically achieves $500K–$2M in savings per year through predictive maintenance, quality automation, and supply chain optimization. ROI is often the highest of any AI application in any industry.",
    },
    roadmap: [
      { phase: "Phase 1", title: "Sensor & Data Integration", duration: "Month 1", desc: "Connect IoT sensors to critical machines. Integrate ERP and production data into central platform.", wins: ["Machine health baseline established", "First anomalies detected", "Energy consumption mapped"] },
      { phase: "Phase 2", title: "Predictive Maintenance Live", duration: "Month 1–2", desc: "AI models trained on machine data. Failure prediction with 72–96hr advance warning.", wins: ["First prevented breakdown", "Maintenance schedule optimized", "Emergency weekend calls drop"] },
      { phase: "Phase 3", title: "Computer Vision QC", duration: "Month 2–3", desc: "Vision AI cameras installed at key inspection points. 100% inspection live.", wins: ["Defect escape rate drops", "Inspector time refocused", "Customer returns falling"] },
      { phase: "Phase 4", title: "Dynamic Scheduling", duration: "Month 3", desc: "AI production scheduler live. Integrates machine status, material availability, and order priority.", wins: ["Replanning time cut 95%", "On-time delivery improves", "Throughput increases"] },
      { phase: "Phase 5", title: "Supply Chain + Energy AI", duration: "Month 4", desc: "Supplier risk monitoring live. Energy optimization engine controlling plant consumption.", wins: ["Supply disruptions anticipated", "Energy bill drops", "Procurement more proactive"] },
      { phase: "Phase 6", title: "Plant Intelligence Layer", duration: "Month 5+", desc: "Full OEE dashboard, executive reporting, multi-plant rollout capability.", wins: ["Full plant visibility", "Expansion-ready architecture", "Benchmark vs. industry standards"] },
    ],
    dayInLife: [
      { time: "6:00 AM", event: "Shift Start", withoutAI: "Operator starts machine, no idea of its health. QC inspector sets up manual sampling plan.", withAI: "Machine health scores on tablet. QC camera already running. Overnight anomaly report reviewed in 5 min." },
      { time: "8:30 AM", event: "Machine Alert", withoutAI: "Machine vibration increasing. Nobody notices until it seizes at 11 AM. Line down for 6 hours.", withAI: "Alert at 8:30 AM: 'Bearing 3 on Line 2 showing early failure signature. Schedule maintenance before next shift.'" },
      { time: "10:00 AM", event: "Quality Check", withoutAI: "Inspector samples 50 parts from 1,000 produced. 3 defective batches slip through.", withAI: "Vision AI flagged 12 parts at 9:47 AM. Batch quarantined. Root cause identified: tooling wear on CNC-4." },
      { time: "1:00 PM", event: "Material Shortage", withoutAI: "Planner discovers Component X out of stock. Production stops. Emergency PO placed. 3-day delay.", withAI: "AI flagged Component X shortage risk 4 weeks ago. PO placed then. Stock arrived 2 days ago." },
      { time: "3:00 PM", event: "Schedule Change", withoutAI: "Rush order comes in. Planner rebuilds schedule manually in Excel. Takes 3 hours. Others wait.", withAI: "Rush order entered. AI reschedules all affected lines in 90 seconds. Team notified automatically." },
      { time: "5:00 PM", event: "End of Shift Report", withoutAI: "Plant manager manually compiles OEE, quality rate, and energy data. Report ready by 7 PM.", withAI: "Dashboard auto-updated. Manager reviews in 10 minutes. Sends exec summary with 2 clicks." },
    ],
  },

  /* ─── 6. Hospital ────────────────────────────────────── */
  {
    id: "hospital",
    industry: "Hospital & Healthcare",
    emoji: "🏥",
    tagline: "Predict patient demand. Deploy the right staff. Save more lives — with less chaos.",
    description:
      "Hospitals face a constant tension between capacity and demand: too few nurses on a floor, too many patients in the ED, equipment unused in one wing and unavailable in another. AI predicts patient admission volumes, optimizes nurse deployment, reduces readmissions, and ensures the right resource is always in the right place.",
    color: "#5ba4e0",
    borderColor: "#1a4060",
    bgGradient: "from-[#1a4060]/20 to-[#0a2030]/10",
    currentTools: ["Epic / Cerner EHR", "Manual nurse scheduling", "Paper bed boards", "Excel capacity planning", "Phone coordination between floors", "Reactive discharge planning"],
    problems: [
      { title: "ED Overcrowding", desc: "Emergency departments are overwhelmed at peak hours because no system predicts surge volumes. Patients wait 4–8 hours. Staff burn out. Outcomes worsen.", cost: "Patient diversion revenue loss + satisfaction scores drop" },
      { title: "Nurse Staffing Mismatches", desc: "Floor A has 3 nurses for 15 patients. Floor B has 5 nurses for 8 patients. No AI to dynamically balance staffing to patient acuity.", cost: "Overtime costs + adverse events from understaffing" },
      { title: "Bed Bottleneck", desc: "Admitted patients wait hours in the ED because no inpatient beds are available — not because there are no beds, but because discharge is uncoordinated.", cost: "$1,000–$3,000 per unnecessary ED boarding hour" },
      { title: "Preventable Readmissions", desc: "30% of readmissions within 30 days are preventable. No system identifies high-risk patients before discharge and triggers follow-up protocols.", cost: "Readmission penalty + $15K average readmission cost" },
      { title: "Equipment & Supply Waste", desc: "Surgical instruments, IV pumps, and specialty equipment are over-ordered, lost, or idle across departments — no AI to track or predict usage.", cost: "10–20% supply chain waste annually" },
    ],
    solutions: [
      { title: "Admission Volume Predictor", desc: "Uses historical data, seasonality, local events, flu trends, and weather to predict ED visit volumes by hour — up to 72 hours in advance.", metric: "89%", metricLabel: "Prediction accuracy" },
      { title: "Nurse Staffing Optimizer", desc: "Matches nurse deployment to patient acuity scores and predicted demand by floor and shift. Recommends float pool deployment and float adjustments 4 hours ahead.", metric: "−25%", metricLabel: "Nurse overtime" },
      { title: "Bed Flow Intelligence", desc: "Predicts likely discharges 8–12 hours ahead. Coordinates housekeeping, transport, and admissions automatically to minimize bed turnaround time.", metric: "−40%", metricLabel: "ED boarding time" },
      { title: "Readmission Risk Engine", desc: "Scores every patient at discharge on 30-day readmission risk using 120+ clinical and social variables. Triggers care management and follow-up protocols for high-risk patients.", metric: "−32%", metricLabel: "30-day readmissions" },
      { title: "OR Schedule Optimizer", desc: "Predicts surgical case duration more accurately than historical estimates. Reduces first-case delays, late-running ORs, and after-hours case overruns.", metric: "+18%", metricLabel: "OR utilization" },
      { title: "Supply Chain AI", desc: "Predicts medical supply consumption by department using procedure schedules and acuity. Auto-generates PAR level adjustments and purchase recommendations.", metric: "−18%", metricLabel: "Supply waste" },
    ],
    architecture: [
      { label: "DATA INPUTS", color: "#5ba4e0", items: ["EHR (Epic/Cerner)", "ED Registration Data", "ADT Events (Admit/Discharge/Transfer)", "Nurse Scheduling System", "Acuity Scores", "OR Schedule", "Lab & Imaging Volume", "Flu/Disease Surveillance", "Weather + Local Events", "Claims / Billing Data"] },
      { label: "AI ENGINE", color: "#d4a017", items: ["Admission Volume Forecaster", "Nurse Staffing Optimizer", "Bed Flow & Discharge Predictor", "Readmission Risk Model", "OR Schedule Optimizer", "Supply Demand Predictor"] },
      { label: "CLINICAL TEAM OUTPUTS", color: "#4caf7d", items: ["Surge Alerts (4–8hr advance)", "Float Pool Recommendations", "High-Risk Discharge Flags", "Bed Availability Forecast", "OR Delay Risk Warnings", "Supply PAR Alerts"] },
      { label: "LEADERSHIP OUTPUTS", color: "#e05555", items: ["Daily Capacity Dashboard", "Nurse Staffing Cost Report", "Readmission Rate Tracker", "OR Revenue Utilization", "ED Wait Time Trend", "Quality Metrics vs. Benchmark"] },
    ],
    roles: [
      { title: "Bedside Nurse", painPoint: "Finds out about new admissions at the last minute. Rushed handoffs, incomplete preparation.", aiGain: "Receives predicted new admissions for next 4 hours. Prep time built in. Safer handoffs." },
      { title: "Charge Nurse", painPoint: "Manually reassigns staff mid-shift based on gut feel. Often too late to prevent unsafe ratios.", aiGain: "AI flags staffing imbalance 4 hours ahead. Float recommendations made before crisis hits." },
      { title: "ED Nurse / Triage", painPoint: "Surge arrives with no warning. Beds full, patients boarding, staff overwhelmed.", aiGain: "Surge prediction 72 hours out. Additional staff scheduled in advance. Beds pre-cleared." },
      { title: "Case Manager / Discharge Planner", painPoint: "Reactive discharge planning. Patients stay 1–2 extra days waiting for paperwork, transport, or placement.", aiGain: "8–12 hr discharge prediction. Coordination triggered early. Bed available for next patient." },
      { title: "CNO / Nurse Manager", painPoint: "Overtime costs spiral. No visibility into where staffing is misaligned with patient demand.", aiGain: "Weekly staffing intelligence report: acuity-adjusted ratios, overtime cause analysis, float deployment." },
      { title: "CEO / CMO / CFO", painPoint: "Readmission penalties, CMS scores, OR revenue, and nurse turnover are tracked in silos.", aiGain: "Unified executive dashboard: quality scores, financial performance, capacity forecast, risk flags." },
    ],
    roi: {
      items: [
        { label: "Nurse Overtime Reduction", value: "−25% overtime costs", color: "#5ba4e0" },
        { label: "Readmission Penalty Avoidance", value: "−32% 30-day readmissions", color: "#4caf7d" },
        { label: "ED Boarding Time", value: "−40% boarding hours", color: "#d4a017" },
        { label: "OR Revenue Recovery", value: "+18% OR utilization", color: "#e07030" },
        { label: "Supply Chain Savings", value: "−18% supply waste", color: "#b0a0e0" },
        { label: "Annual Net Impact", value: "$2M–$8M/facility", color: "#e05555" },
      ],
      payback: "6–12 months",
      summary: "A 300-bed hospital typically achieves $2M–$8M in annual financial impact through reduced overtime, readmission penalty avoidance, OR efficiency gains, and supply chain optimization — while improving patient safety scores and staff satisfaction simultaneously.",
    },
    roadmap: [
      { phase: "Phase 1", title: "EHR & ADT Integration", duration: "Month 1–2", desc: "Connect Epic/Cerner ADT feeds, nursing schedules, and OR data into central AI platform.", wins: ["Baseline capacity metrics", "Real-time census visible", "Historical patterns emerge"] },
      { phase: "Phase 2", title: "Admission Forecasting Live", duration: "Month 2–3", desc: "ED and inpatient volume predictions active with 72-hour lookahead.", wins: ["Surge preparation begins", "First staffing recommendations", "ED wait time baseline tracked"] },
      { phase: "Phase 3", title: "Nurse Staffing AI", duration: "Month 3–4", desc: "Float pool recommendations live. Acuity-adjusted staffing ratios per floor per shift.", wins: ["Overtime starts falling", "Staffing mismatches surfaced", "Nurse satisfaction improves"] },
      { phase: "Phase 4", title: "Bed Flow Optimization", duration: "Month 4–5", desc: "Discharge prediction and coordinated bed management live. Housekeeping + transport integrated.", wins: ["ED boarding hours fall", "Length of stay improves", "Bed availability visible system-wide"] },
      { phase: "Phase 5", title: "Readmission + Quality AI", duration: "Month 5–6", desc: "High-risk discharge scoring live. Care management protocols auto-triggered.", wins: ["Readmission rate drops", "CMS penalties reduced", "Patient outcomes improve"] },
      { phase: "Phase 6", title: "Executive Intelligence Layer", duration: "Month 6+", desc: "Full quality, financial, and operational dashboard. Multi-facility expansion ready.", wins: ["Board-ready reporting", "Full ROI measurable", "Foundation for system-wide scale"] },
    ],
    dayInLife: [
      { time: "6:00 AM", event: "Morning Huddle", withoutAI: "Charge nurse reviews paper census, calls other floors for bed status. 30-minute coordination chaos.", withAI: "Capacity dashboard shows: 12 expected discharges by noon, 8 ED admissions predicted by 10 AM. 5-minute huddle." },
      { time: "8:00 AM", event: "Staffing Adjustment", withoutAI: "Floor B is suddenly busy. Charge nurse calls float pool. No one available. Nurse ratio goes unsafe.", withAI: "AI flagged yesterday at 4 PM: 'Floor B will need +1 nurse from 8–4 tomorrow.' Float already scheduled." },
      { time: "10:00 AM", event: "Discharge Planning", withoutAI: "Case manager learns patient in 412 is medically ready — but family hasn't been called, transport not arranged, bed not cleaned.", withAI: "AI flagged 412 at 7 AM: 'High discharge probability.' Case manager, transport, and housekeeping notified at 7:30 AM." },
      { time: "1:00 PM", event: "ED Surge", withoutAI: "Unexpected flu surge hits ED. Waiting room at capacity. No backup plan. Patients diverted. Revenue lost.", withAI: "AI predicted surge 48 hours ago. Extra staff scheduled. 4 inpatient beds pre-cleared. No diversion." },
      { time: "3:00 PM", event: "Discharge Risk Scoring", withoutAI: "Patient discharged with no flag. Readmitted in 8 days. Hospital absorbs penalty.", withAI: "AI scored patient 78% readmission risk at morning rounds. Care management enrolled. Follow-up call scheduled for day 3." },
      { time: "5:00 PM", event: "Executive Summary", withoutAI: "CFO asks for occupancy, overtime, and ED metrics. Operations team spends 2 hours pulling data.", withAI: "Executive dashboard updated in real time. CFO reviews today's performance in 15 minutes." },
    ],
  },
]
