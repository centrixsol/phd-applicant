"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, FileText, Send, CheckCircle, ArrowRight, Globe, TrendingUp, BookOpen, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusLabel } from "@/lib/utils";

interface Stats {
  totalPrograms: number;
  totalUniversities: number;
  savedApplications: number;
  submittedApplications: number;
  acceptedApplications: number;
  documentsUploaded: number;
  statementsWritten: number;
  profileComplete: number;
  applicationsByStatus?: Record<string, number>;
}

interface Application {
  id: string;
  status: string;
  priority: number;
  program: {
    name: string;
    deadline: string;
    university: { name: string; country: string; qsRanking: number | null };
  };
}

export default function DashboardContent() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentApps, setRecentApps] = useState<Application[]>([]);

  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats);
    fetch("/api/applications").then((r) => r.json()).then((apps) => setRecentApps(apps.slice(0, 5)));
  }, []);

  const statCards = [
    { label: "PhD Programs", value: stats?.totalPrograms ?? "—", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Universities", value: stats?.totalUniversities ?? "—", icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Applications Saved", value: stats?.savedApplications ?? 0, icon: FileText, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Submitted", value: stats?.submittedApplications ?? 0, icon: Send, color: "text-green-600", bg: "bg-green-50" },
    { label: "Documents", value: stats?.documentsUploaded ?? 0, icon: BookOpen, color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "Accepted", value: stats?.acceptedApplications ?? 0, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Your PhD application overview</p>
      </div>

      {/* Profile Completion Banner */}
      {stats && stats.profileComplete < 80 && (
        <div className="mb-6 p-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white flex items-center justify-between">
          <div className="flex-1">
            <p className="font-semibold mb-1">Complete your profile to enable Auto-Apply</p>
            <div className="flex items-center gap-3">
              <Progress value={stats.profileComplete} className="w-48 bg-white/30" />
              <span className="text-sm font-medium">{stats.profileComplete}% complete</span>
            </div>
          </div>
          <Link href="/profile">
            <Button variant="secondary" size="sm" className="ml-4 bg-white text-blue-600 hover:bg-blue-50">
              <User className="w-4 h-4 mr-1" /> Complete Profile
            </Button>
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="text-center">
            <CardContent className="pt-5 pb-4">
              <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { href: "/programs", label: "Browse PhD Programs", sub: "Explore 500+ fully-funded positions", icon: GraduationCap, color: "bg-blue-500" },
              { href: "/profile", label: "Edit My Profile", sub: "Add academic background & research info", icon: User, color: "bg-purple-500" },
              { href: "/documents", label: "Upload Documents", sub: "CV, transcripts, SOP, and more", icon: FileText, color: "bg-orange-500" },
              { href: "/applications", label: "Manage Applications", sub: "Track and auto-apply to programs", icon: Send, color: "bg-green-500" },
              { href: "/statements", label: "Write Statements", sub: "Statement of purpose, research statement", icon: BookOpen, color: "bg-cyan-500" },
            ].map(({ href, label, sub, icon: Icon, color }) => (
              <Link key={href} href={href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Applications</CardTitle>
            <Link href="/applications">
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentApps.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Send className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No applications yet</p>
                <Link href="/programs">
                  <Button size="sm" className="mt-3">Browse Programs</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentApps.map((app) => (
                  <Link key={app.id} href={`/applications/${app.id}`} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{app.program.university.name}</p>
                      <p className="text-xs text-gray-500 truncate">{app.program.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Deadline: {app.program.deadline}</p>
                    </div>
                    <Badge className={getStatusColor(app.status)} variant="outline">
                      {getStatusLabel(app.status)}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="mt-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white border-0">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Getting the Most Out of PhD Apply</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Complete your profile (GPA, research exp, publications) for better auto-fill accuracy</li>
                <li>• Upload your CV and SOP documents before hitting Apply</li>
                <li>• Most deadlines fall in December — start early!</li>
                <li>• Add portal credentials (username/password) for programs you have accounts on</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
