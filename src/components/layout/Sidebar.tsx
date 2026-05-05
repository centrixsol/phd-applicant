"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GraduationCap, LayoutDashboard, Search, User, FileText, Send, BookOpen, Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/programs", label: "Browse Programs", icon: Search },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/applications", label: "Applications", icon: Send },
  { href: "/statements", label: "Statements", icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-none">PhD Apply</p>
            <p className="text-xs text-slate-400 mt-0.5">ML & AI Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-semibold text-white">AI Auto-Apply</span>
          </div>
          <p className="text-xs text-blue-100 mb-3">Complete your profile and let AI submit applications automatically</p>
          <Link href="/applications" className="block w-full text-center bg-white text-blue-600 text-xs font-semibold py-1.5 rounded-md hover:bg-blue-50 transition-colors">
            Start Applying
          </Link>
        </div>
      </div>
    </aside>
  );
}
