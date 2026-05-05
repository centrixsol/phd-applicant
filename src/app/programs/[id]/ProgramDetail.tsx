"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, DollarSign, Calendar, Globe, ArrowLeft, Plus, ExternalLink, Users, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatStipend } from "@/lib/utils";

interface Program {
  id: string;
  name: string;
  department: string;
  degree: string;
  stipendUSD: number | null;
  deadline: string;
  duration: string;
  greRequired: boolean;
  toeflMin: number | null;
  ieltsMin: number | null;
  applicationUrl: string;
  portalType: string | null;
  researchAreas: string[];
  notableFaculty: string | null;
  acceptanceRate: number | null;
  annualOpenings: number | null;
  description: string | null;
  university: { id: string; name: string; country: string; city: string; qsRanking: number | null; website: string | null };
}

export default function ProgramDetail({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const { id } = use(paramsPromise);
  const [program, setProgram] = useState<Program | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/programs/${id}`).then((r) => r.json()).then(setProgram);
    fetch("/api/applications").then((r) => r.json()).then((apps) => {
      setSaved(apps.some((a: { program: { id: string } }) => a.program.id === id));
    });
  }, [id]);

  async function saveProgram() {
    setSaving(true);
    await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ programId: id }),
    });
    setSaved(true);
    setSaving(false);
  }

  if (!program) {
    return <div className="p-8 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/programs" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Programs
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {program.university.qsRanking && (
                <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                  QS #{program.university.qsRanking}
                </span>
              )}
              <Badge variant="success">Fully Funded</Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{program.university.name}</h1>
            <p className="text-xl text-gray-600 mt-1">{program.name}</p>
            <p className="text-gray-500 text-sm mt-1">{program.department} · {program.degree} · {program.duration}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a href={program.applicationUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-1" /> Visit Portal
              </Button>
            </a>
            <Button disabled={saved || saving} onClick={saveProgram}>
              <Plus className="w-4 h-4 mr-1" />
              {saved ? "Saved" : saving ? "Saving..." : "Save & Apply"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: <DollarSign className="w-4 h-4 text-green-500" />, label: "Annual Stipend", value: formatStipend(program.stipendUSD), highlight: true },
          { icon: <Calendar className="w-4 h-4 text-orange-500" />, label: "Deadline", value: program.deadline },
          { icon: <MapPin className="w-4 h-4 text-blue-500" />, label: "Location", value: `${program.university.city}, ${program.university.country}` },
          { icon: <Users className="w-4 h-4 text-purple-500" />, label: "Annual Openings", value: program.annualOpenings ? `~${program.annualOpenings} spots` : "Not specified" },
          { icon: <Percent className="w-4 h-4 text-red-500" />, label: "Acceptance Rate", value: program.acceptanceRate ? `${program.acceptanceRate}%` : "Not specified" },
          { icon: <Globe className="w-4 h-4 text-cyan-500" />, label: "Portal Type", value: program.portalType || "University Portal" },
        ].map(({ icon, label, value, highlight }) => (
          <Card key={label}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                {icon}
                <span className="text-xs text-gray-500">{label}</span>
              </div>
              <p className={`font-semibold ${highlight ? "text-green-700" : "text-gray-900"}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Research Areas</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {program.researchAreas.map((area) => (
                <Badge key={area} variant="secondary">{area}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Requirements</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">GRE</span>
              <span className={program.greRequired ? "text-orange-600 font-medium" : "text-green-600 font-medium"}>
                {program.greRequired ? "Required" : "Not Required"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">TOEFL Minimum</span>
              <span className="font-medium">{program.toeflMin ? `${program.toeflMin}` : "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">IELTS Minimum</span>
              <span className="font-medium">{program.ieltsMin ? `${program.ieltsMin}` : "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Funding</span>
              <span className="text-green-600 font-medium">Fully Funded</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Application Portal</CardTitle>
          <Badge variant="info">{program.portalType}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            This program uses <strong>{program.portalType}</strong> for applications. Our auto-apply system supports this platform.
          </p>
          <a href={program.applicationUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-3 h-3 mr-1.5" /> Open Application Portal
            </Button>
          </a>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-3">
        <Button className="flex-1" disabled={saved || saving} onClick={saveProgram} size="lg">
          <Plus className="w-4 h-4 mr-2" />
          {saved ? "Saved to Applications" : "Save & Add to Applications"}
        </Button>
        {saved && (
          <Link href="/applications" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">View in Applications</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
