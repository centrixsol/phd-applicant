import Link from "next/link";
import { GraduationCap, Search, FileText, Zap, Globe, DollarSign, ArrowRight, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">PhD Apply</span>
        </div>
        <div className="flex gap-3">
          <Link href="/programs" className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">
            Browse Programs
          </Link>
          <Link href="/dashboard" className="px-4 py-2 bg-blue-500 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-8">
          <Zap className="w-4 h-4" />
          AI-Powered PhD Application Platform
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Apply to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">500+ ML & AI</span>
          <br />PhD Programs Worldwide
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
          Discover fully-funded PhD opportunities at the world&apos;s top universities, build your profile once, and let our AI system apply automatically on your behalf.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-blue-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-all hover:scale-105">
            Start Applying <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/programs" className="inline-flex items-center gap-2 border border-slate-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all">
            <Search className="w-5 h-5" />
            Browse Programs
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "PhD Programs" },
            { value: "100+", label: "Top Universities" },
            { value: "30+", label: "Countries" },
            { value: "$55K", label: "Max Stipend/Year" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-4xl font-bold text-blue-400 mb-1">{value}</p>
              <p className="text-slate-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Globe className="w-6 h-6 text-blue-400" />,
              title: "Discover Programs",
              desc: "Browse 500+ fully-funded ML & AI PhD programs from MIT, Stanford, Oxford, ETH Zurich, and 100+ top universities worldwide. Filter by country, research area, stipend, and deadline.",
            },
            {
              icon: <FileText className="w-6 h-6 text-purple-400" />,
              title: "Build Your Profile",
              desc: "Upload your CV, transcripts, statement of purpose, letters of recommendation, and test scores. Write and save customized statements for each application.",
            },
            {
              icon: <Zap className="w-6 h-6 text-yellow-400" />,
              title: "Auto-Apply",
              desc: "Select programs, hit Apply, and our AI automation engine fills out application forms using your profile data — supporting ApplyYourself, CollegeNET, Slate, and university portals.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features list */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Everything You Need</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "500+ fully-funded ML & AI PhD programs",
              "Top 100 universities worldwide",
              "Smart profile that auto-fills applications",
              "Document vault for CV, transcripts, SOP",
              "Statement editor with word count",
              "Application status tracker",
              "AI automation with Playwright",
              "Supports ApplyYourself, Slate, CollegeNET",
              "Deadline reminders and tracking",
              "Research area matching",
              "Stipend and funding comparison",
              "University ranking integration",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your PhD Journey?</h2>
        <p className="text-slate-400 mb-8 text-lg">Build your profile once. Apply everywhere.</p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-xl font-semibold text-xl hover:opacity-90 transition-all hover:scale-105">
          <DollarSign className="w-6 h-6" />
          Get Started Free
        </Link>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        PhD Apply — ML & AI Program Portal &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
