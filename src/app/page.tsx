import Link from "next/link";
import { GraduationCap, Search, FileText, Zap, DollarSign, ArrowRight, CheckCircle, Briefcase, Sparkles, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">PhD Apply Sweden</span>
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
          <span className="text-base">🇸🇪</span>
          Sweden · Fully Funded PhD Employment
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sweden PhD</span>
          <br />Application Hub
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-6">
          Browse fully-funded PhD positions at Sweden&apos;s top universities — all with employment contracts,
          competitive salaries, and no tuition fees. Upload your documents once, apply everywhere with Claude AI.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm text-slate-300">
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Briefcase className="w-4 h-4 text-blue-400" /> Employed (not scholarship)
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <DollarSign className="w-4 h-4 text-green-400" /> 28,000–38,000 SEK/month
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-4 h-4 text-purple-400" /> Claude AI powered
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <CheckCircle className="w-4 h-4 text-yellow-400" /> No GRE required
          </span>
        </div>
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
            { value: "14+", label: "Swedish Universities", icon: "🇸🇪" },
            { value: "40+", label: "PhD Positions", icon: "🎓" },
            { value: "Top 40", label: "QS Ranked (Karolinska)", icon: "🏆" },
            { value: "4 yrs", label: "Funded Employment", icon: "💼" },
          ].map(({ value, label, icon }) => (
            <div key={label} className="text-center bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-3xl mb-1">{icon}</p>
              <p className="text-3xl font-bold text-blue-400 mb-1">{value}</p>
              <p className="text-slate-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: <Globe className="w-6 h-6 text-blue-400" />,
              step: "1",
              title: "Browse Sweden PhDs",
              desc: "Discover fully-funded positions at KTH, Lund, Uppsala, Chalmers, and 10+ more — ranked by QS.",
            },
            {
              icon: <FileText className="w-6 h-6 text-purple-400" />,
              step: "2",
              title: "Upload Documents Once",
              desc: "Upload your CV, transcripts, and academic certificates. They're reused across all applications.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
              step: "3",
              title: "AI Writes Your Letters",
              desc: "Claude generates tailored motivation letters, research proposals, and answers application questions.",
            },
            {
              icon: <Zap className="w-6 h-6 text-green-400" />,
              step: "4",
              title: "Auto-Apply via Varbi",
              desc: "Our browser automation fills and submits your application on Varbi and other Swedish portals.",
            },
          ].map(({ icon, step, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
              <div className="absolute -top-3 -left-3 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                {step}
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Swedish Universities List */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-4">Top Swedish Universities</h2>
        <p className="text-center text-slate-400 mb-10 text-sm">Ranked by QS World University Rankings</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Karolinska Institute", rank: 40, city: "Stockholm", focus: "Medical AI" },
            { name: "KTH Royal Institute of Technology", rank: 76, city: "Stockholm", focus: "ML & Robotics" },
            { name: "Uppsala University", rank: 99, city: "Uppsala", focus: "Statistical ML" },
            { name: "Lund University", rank: 100, city: "Lund", focus: "Computer Vision" },
            { name: "Stockholm University", rank: 107, city: "Stockholm", focus: "NLP & Data Science" },
            { name: "Chalmers University", rank: 113, city: "Gothenburg", focus: "Autonomous Systems" },
          ].map(({ name, rank, city, focus }) => (
            <div key={name} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
              <span className="text-2xl flex-shrink-0">🇸🇪</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{name}</p>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full flex-shrink-0">#{rank}</span>
                </div>
                <p className="text-xs text-slate-400">{city} · {focus}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/programs" className="text-blue-400 text-sm hover:text-blue-300 underline underline-offset-2">
            View all 14+ universities and 40+ positions →
          </Link>
        </div>
      </section>

      {/* Features list */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Everything You Need</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "40+ fully-funded Swedish PhD employment positions",
              "Ranked from top (Karolinska QS #40) to broader universities",
              "Upload documents once — reused across all applications",
              "Claude AI writes motivation letters tailored to each position",
              "AI answers application questions and drafts research proposals",
              "Varbi portal automation (used by most Swedish universities)",
              "Fixed credential auto-login and account creation",
              "Application status tracker with deadlines",
              "No GRE required for Swedish PhDs",
              "Employment contract — full salary + pension + parental leave",
              "Filter by university, research area, and city",
              "Cold email drafts to Swedish professors",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for Your Swedish PhD?</h2>
        <p className="text-slate-400 mb-8 text-lg">Build your profile once. Let AI apply everywhere.</p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-xl font-semibold text-xl hover:opacity-90 transition-all hover:scale-105">
          <Sparkles className="w-6 h-6" />
          Start with AI
        </Link>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        PhD Apply Sweden — Fully Funded PhD Employment Portal &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
