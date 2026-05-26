export const metadata = {
  title: "Privacy Policy | creAIve Labs",
  description: "How creAIve Labs collects, uses, and protects your information.",
}

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-300">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-12">Last updated: May 2026</p>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Overview</h2>
        <p className="leading-relaxed text-sm">
          creAIve Labs ("the Platform") is operated by creAIve Labs. This policy explains how we collect, use, and protect your information when you use our AI-powered business management platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Information We Collect</h2>
        <ul className="list-disc list-inside text-sm space-y-2">
          <li>Email address and account credentials</li>
          <li>Business data you enter (jobs, clients, appointments, invoices)</li>
          <li>GPS location (crew members only, while app is in use)</li>
          <li>Photos uploaded for job documentation</li>
          <li>Time and attendance records</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">How We Use Your Information</h2>
        <ul className="list-disc list-inside text-sm space-y-2">
          <li>To provide and operate the platform's features</li>
          <li>To display crew locations to authorized business owners</li>
          <li>To process and store business records</li>
          <li>To authenticate users and maintain security</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Data Storage</h2>
        <p className="leading-relaxed text-sm">
          All data is stored securely using Supabase (PostgreSQL) with encrypted connections. Job photos are automatically deleted after 48 hours. GPS location data is only retained while crew members are actively using the app.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Google Ads Integration</h2>
        <p className="leading-relaxed text-sm mb-3">
          creAIve Labs allows business owners to optionally connect their Google Ads account to manage advertising campaigns from within the platform. When connected, we request access to read and manage campaigns on your behalf. We use this access solely to operate the advertising features you have requested and do not share your data with third parties.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Facebook / Meta Integration</h2>
        <p className="leading-relaxed text-sm mb-3">
          creAIve Labs allows business owners to optionally connect their Facebook Ad Account to manage advertising campaigns. When connected, we request the following permissions:
        </p>
        <ul className="list-disc list-inside text-sm space-y-2 mb-3">
          <li><strong className="text-white">ads_management</strong> — to create and manage ad campaigns on your behalf</li>
          <li><strong className="text-white">ads_read</strong> — to read campaign performance data</li>
          <li><strong className="text-white">business_management</strong> — to access your Business Manager account</li>
          <li><strong className="text-white">pages_read_engagement</strong> — to read your Facebook Page information</li>
        </ul>
        <p className="leading-relaxed text-sm">
          We use this access solely to operate the advertising features you have requested. You can disconnect your Facebook account at any time from your dashboard settings.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Data Sharing</h2>
        <p className="leading-relaxed text-sm">
          We do not sell or share your data with third parties. Data is only shared between authorized users within the same business account.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Data Deletion</h2>
        <p className="leading-relaxed text-sm">
          You can request deletion of all your data at any time by contacting us at{" "}
          <a href="mailto:hello@creaivelabs.com" className="text-[#e05555] hover:underline">hello@creaivelabs.com</a>{" "}
          or by visiting{" "}
          <a href="https://app.creaivelabs.com/delete-account" className="text-[#e05555] hover:underline">app.creaivelabs.com/delete-account</a>.
          We will process all deletion requests within 30 days.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Contact</h2>
        <p className="leading-relaxed text-sm">
          For privacy questions, contact us at:<br /><br />
          <a href="mailto:hello@creaivelabs.com" className="text-[#e05555] hover:underline">hello@creaivelabs.com</a><br /><br />
          <strong className="text-white">creAIve Labs</strong><br />
          13503 Copper Bed Rd<br />
          Herndon, VA 20171<br />
          United States
        </p>
      </section>
    </div>
  )
}
