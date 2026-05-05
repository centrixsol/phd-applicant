"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Send, Trash2, Zap, MapPin, DollarSign, Calendar, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getStatusColor, getStatusLabel, formatStipend } from "@/lib/utils";

interface Application {
  id: string;
  status: string;
  priority: number;
  notes: string | null;
  submittedAt: string | null;
  automationLog: string | null;
  createdAt: string;
  program: {
    id: string;
    name: string;
    deadline: string;
    stipendUSD: number | null;
    applicationUrl: string;
    portalType: string | null;
    researchAreas: string[];
    university: { name: string; country: string; city: string; qsRanking: number | null };
  };
}

const STATUS_FILTERS = ["all", "saved", "ready", "submitting", "submitted", "pending", "interview", "accepted", "rejected"];

export default function ApplicationsContent() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [applying, setApplying] = useState<string | null>(null);
  const [applyResult, setApplyResult] = useState<{ id: string; msg: string; ok: boolean } | null>(null);

  async function load() {
    const res = await fetch("/api/applications");
    const data = await res.json();
    setApplications(data);
  }

  useEffect(() => { load(); }, []);

  async function deleteApp(id: string) {
    if (!confirm("Remove this application?")) return;
    await fetch("/api/applications", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/applications", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    load();
  }

  async function autoApply(appId: string) {
    setApplying(appId);
    setApplyResult(null);
    try {
      const res = await fetch("/api/apply", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ applicationId: appId }) });
      const data = await res.json();
      if (res.ok) {
        setApplyResult({ id: appId, msg: data.message || "Application submitted!", ok: true });
      } else {
        setApplyResult({ id: appId, msg: data.error + (data.issues ? ": " + data.issues.join(", ") : ""), ok: false });
      }
    } catch {
      setApplyResult({ id: appId, msg: "Network error", ok: false });
    }
    setApplying(null);
    load();
  }

  const filtered = statusFilter === "all" ? applications : applications.filter((a) => a.status === statusFilter);

  const counts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-500 mt-1">{applications.length} programs saved · {counts.submitted || 0} submitted</p>
        </div>
        <Link href="/programs">
          <Button><Send className="w-4 h-4 mr-2" /> Add Programs</Button>
        </Link>
      </div>

      {/* Status Bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              statusFilter === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
            }`}
          >
            {s === "all" ? "All" : getStatusLabel(s)} {s !== "all" && counts[s] ? `(${counts[s]})` : ""}
          </button>
        ))}
      </div>

      {/* Result Banner */}
      {applyResult && (
        <div className={`mb-4 p-4 rounded-xl flex items-start gap-3 ${applyResult.ok ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          {applyResult.ok ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
          <div>
            <p className={`text-sm font-medium ${applyResult.ok ? "text-green-800" : "text-red-800"}`}>{applyResult.msg}</p>
            {applyResult.ok && <p className="text-xs text-green-600 mt-0.5">Check the application log for details</p>}
          </div>
          <button onClick={() => setApplyResult(null)} className="ml-auto text-gray-400 hover:text-gray-600">✕</button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Send className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg">{statusFilter !== "all" ? `No ${getStatusLabel(statusFilter)} applications` : "No applications yet"}</p>
          <p className="text-sm mt-1">Browse programs and save ones you want to apply to</p>
          <Link href="/programs"><Button className="mt-4">Browse Programs</Button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => (
            <Card key={app.id} className={`border-l-4 ${app.status === "accepted" ? "border-l-green-500" : app.status === "rejected" ? "border-l-red-400" : app.status === "interview" ? "border-l-cyan-500" : app.status === "submitted" || app.status === "pending" ? "border-l-purple-500" : "border-l-gray-300"}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{app.program.university.name}</h3>
                      {app.program.university.qsRanking && (
                        <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">#{app.program.university.qsRanking}</span>
                      )}
                      <Badge className={getStatusColor(app.status)} variant="outline">{getStatusLabel(app.status)}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{app.program.name}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{app.program.university.city}, {app.program.university.country}</span>
                      <span className="flex items-center gap-1 text-green-600 font-medium"><DollarSign className="w-3 h-3" />{formatStipend(app.program.stipendUSD)}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Deadline: {app.program.deadline}</span>
                    </div>
                    {app.submittedAt && (
                      <p className="text-xs text-gray-400 mt-1">Submitted: {new Date(app.submittedAt).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Select value={app.status} onValueChange={(v) => updateStatus(app.id, v)}>
                      <SelectTrigger className="w-36 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["saved", "ready", "submitted", "pending", "interview", "accepted", "rejected", "withdrawn"].map((s) => (
                          <SelectItem key={s} value={s} className="text-xs">{getStatusLabel(s)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      size="sm"
                      className="h-8 text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
                      disabled={applying === app.id || ["submitted", "accepted"].includes(app.status)}
                      onClick={() => autoApply(app.id)}
                    >
                      {applying === app.id
                        ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Applying...</>
                        : <><Zap className="w-3 h-3 mr-1" /> Auto-Apply</>
                      }
                    </Button>

                    <Button variant="ghost" size="sm" className="h-8 text-xs text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteApp(app.id)}>
                      <Trash2 className="w-3 h-3 mr-1" /> Remove
                    </Button>
                  </div>
                </div>

                {/* Automation Log */}
                {app.automationLog && (
                  <details className="mt-3">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">View automation log</summary>
                    <pre className="mt-2 text-xs bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono">
                      {app.automationLog}
                    </pre>
                  </details>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
