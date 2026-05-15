"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search, MapPin, DollarSign, Calendar, BookOpen, Plus, Filter, X, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatStipend, COUNTRIES, RESEARCH_AREAS } from "@/lib/utils";

interface Program {
  id: string;
  name: string;
  department: string;
  stipendUSD: number | null;
  deadline: string;
  researchAreas: string[];
  annualOpenings: number | null;
  acceptanceRate: number | null;
  portalType: string | null;
  university: { id: string; name: string; country: string; city: string; qsRanking: number | null };
}

const SWEDEN_UNIVERSITIES_ORDER = [
  "Karolinska Institute",
  "KTH Royal Institute of Technology",
  "Uppsala University",
  "Lund University",
  "Stockholm University",
  "Chalmers University of Technology",
  "University of Gothenburg",
  "Linköping University",
  "Umeå University",
  "Örebro University",
  "Malmö University",
  "Mid Sweden University",
  "Jönköping University",
  "Halmstad University",
];

export default function ProgramsContent() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("Sweden");
  const [area, setArea] = useState("all");
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "24",
      ...(search && { search }),
      ...(country && country !== "all" && { country }),
      ...(area && area !== "all" && { area }),
    });
    const res = await fetch(`/api/programs?${params}`);
    const data = await res.json();
    setPrograms(data.programs);
    setTotal(data.total);
    setPages(data.pages);
    setLoading(false);
  }, [page, search, country, area]);

  useEffect(() => { fetchPrograms(); }, [fetchPrograms]);

  useEffect(() => {
    fetch("/api/applications").then((r) => r.json()).then((apps) => {
      setSaved(new Set(apps.map((a: { program: { id: string } }) => a.program.id)));
    });
  }, []);

  async function saveProgram(programId: string) {
    setSaving(programId);
    await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ programId }),
    });
    setSaved((prev) => new Set([...prev, programId]));
    setSaving(null);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPage(1);
    fetchPrograms();
  }

  const isSweden = country === "Sweden";

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <span>🇸🇪</span> PhD Programs in Sweden
        </h1>
        <p className="text-gray-500 mt-1">
          {total} fully-funded PhD positions — all are employment contracts with full salary
        </p>
      </div>

      {/* Sweden Info Banner */}
      {isSweden && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🇸🇪</span>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Why Sweden for your PhD?</p>
              <div className="grid md:grid-cols-3 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Fully employed — salary, not scholarship</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                  <span>~28,000–38,000 SEK/month tax-free net</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                  <span>4 years · No GRE required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="mb-6 space-y-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by university, program, or research area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit">Search</Button>
          <Button type="button" variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-1" /> Filters
          </Button>
        </form>

        {showFilters && (
          <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg border">
            <div className="flex-1 min-w-[180px]">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Country</label>
              <Select value={country} onValueChange={(v) => { setCountry(v); setPage(1); }}>
                <SelectTrigger><SelectValue placeholder="All Countries" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="Sweden">🇸🇪 Sweden (Featured)</SelectItem>
                  {COUNTRIES.filter((c) => c !== "Sweden").map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Research Area</label>
              <Select value={area} onValueChange={(v) => { setArea(v); setPage(1); }}>
                <SelectTrigger><SelectValue placeholder="All Areas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {RESEARCH_AREAS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {(country !== "Sweden" || area !== "all") && (
              <div className="flex items-end">
                <Button variant="ghost" size="sm" onClick={() => { setCountry("Sweden"); setArea("all"); setPage(1); }}>
                  <X className="w-4 h-4 mr-1" /> Reset
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Program Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-52 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {programs.map((program) => (
            <Card key={program.id} className="hover:shadow-md transition-shadow border hover:border-blue-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      {program.university.country === "Sweden" && <span className="text-sm">🇸🇪</span>}
                      <p className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
                        {program.university.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{program.name}</p>
                  </div>
                  {program.university.qsRanking && (
                    <span className="ml-2 text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                      QS #{program.university.qsRanking}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {program.university.city}, {program.university.country}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Briefcase className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span className="text-blue-700 font-medium">
                      {program.university.country === "Sweden" ? "Employed (salary)" : "Fully Funded"}
                    </span>
                    {program.stipendUSD && (
                      <span className="text-green-700 font-medium">· {formatStipend(program.stipendUSD)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                    {program.deadline === "Rolling" ? "Rolling Admissions" : `Deadline: ${program.deadline}`}
                  </div>
                  {program.portalType && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono text-xs">
                        {program.portalType}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {program.researchAreas.slice(0, 3).map((area) => (
                    <Badge key={area} variant="secondary" className="text-xs px-1.5 py-0">
                      {area}
                    </Badge>
                  ))}
                  {program.researchAreas.length > 3 && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0">
                      +{program.researchAreas.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={`/programs/${program.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <BookOpen className="w-3 h-3 mr-1" /> Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="flex-1 text-xs"
                    disabled={saved.has(program.id) || saving === program.id}
                    onClick={() => saveProgram(program.id)}
                    variant={saved.has(program.id) ? "secondary" : "default"}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {saved.has(program.id) ? "Saved" : saving === program.id ? "Saving..." : "Save"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {programs.length === 0 && !loading && (
        <div className="text-center py-16 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg">No programs found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
          {country === "Sweden" && (
            <p className="text-sm mt-2 text-blue-500">
              Swedish programs may need to be seeded — run: <code className="bg-gray-100 px-1 rounded">npm run db:seed:sweden</code>
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
          <span className="text-sm text-gray-600">Page {page} of {pages}</span>
          <Button variant="outline" size="sm" disabled={page === pages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      )}

      {/* Sweden ranking note */}
      {isSweden && programs.length > 0 && (
        <p className="mt-6 text-xs text-center text-gray-400">
          Programs ranked from top-ranked to less-ranked Swedish universities · All positions are fully funded employment contracts
        </p>
      )}
    </div>
  );
}
