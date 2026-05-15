"use client";
import { useEffect, useState, useCallback } from "react";
import { Search, MapPin, Calendar, ExternalLink, RefreshCw, Zap, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RESEARCH_AREAS } from "@/lib/utils";

interface VarbiPosition {
  id: string;
  jobId: string;
  title: string;
  university: string;
  universityCode: string;
  city: string;
  qsRanking: number | null;
  applicationUrl: string;
  deadline: string | null;
  department: string | null;
  researchAreas: string[];
  stipendUSD: number | null;
  scrapedAt: string;
}

interface CrawlMeta { count: number; lastScraped: string | null }

export default function VarbiContent() {
  const [positions, setPositions] = useState<VarbiPosition[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [crawlMsg, setCrawlMsg] = useState("");
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [meta, setMeta] = useState<CrawlMeta | null>(null);

  const fetchPositions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "24",
      ...(search && { search }),
      ...(area && area !== "all" && { area }),
    });
    const res = await fetch(`/api/varbi-positions?${params}`);
    const data = await res.json();
    setPositions(data.positions ?? []);
    setTotal(data.total ?? 0);
    setPages(data.pages ?? 1);
    setLoading(false);
  }, [page, search, area]);

  const fetchMeta = useCallback(async () => {
    const res = await fetch("/api/crawl");
    const data = await res.json();
    setMeta(data);
  }, []);

  useEffect(() => { fetchPositions(); }, [fetchPositions]);
  useEffect(() => { fetchMeta(); }, [fetchMeta]);

  async function runCrawl() {
    setCrawling(true);
    setCrawlMsg("Crawling Varbi portals — this takes 2–4 minutes...");
    try {
      const res = await fetch("/api/crawl", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ maxUniversities: 14 }) });
      const data = await res.json();
      if (!res.ok) {
        setCrawlMsg(`Error: ${data.error ?? "Crawl failed"}`);
      } else {
        setCrawlMsg(`Done! Found ${data.found} positions, saved ${data.saved} to database.`);
        await fetchPositions();
        await fetchMeta();
      }
    } catch (e) {
      setCrawlMsg(`Network error: ${String(e)}`);
    } finally {
      setCrawling(false);
    }
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPage(1);
    fetchPositions();
  }

  const lastScraped = meta?.lastScraped
    ? new Date(meta.lastScraped).toLocaleString()
    : "Never";

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Zap className="w-7 h-7 text-yellow-500" />
          Varbi Live — ML/AI/Quantum PhD Positions
        </h1>
        <p className="text-gray-500 mt-1">
          {total > 0 ? `${total} live positions scraped from Swedish university Varbi portals` : "No scraped positions yet — run a crawl to fetch live listings"}
        </p>
      </div>

      {/* Crawl Control Banner */}
      <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm">Live Scraper</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Last scraped: {lastScraped} · {meta?.count ?? 0} positions in database
            </p>
            {crawlMsg && (
              <p className={`text-xs mt-1 font-medium ${crawlMsg.startsWith("Error") ? "text-red-600" : crawlMsg.startsWith("Done") ? "text-green-600" : "text-blue-600"}`}>
                {crawlMsg}
              </p>
            )}
          </div>
          <Button
            onClick={runCrawl}
            disabled={crawling}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${crawling ? "animate-spin" : ""}`} />
            {crawling ? "Crawling..." : "Scrape Varbi Now"}
          </Button>
        </div>
        {crawling && (
          <div className="mt-3 bg-yellow-100 rounded-lg p-2">
            <p className="text-xs text-yellow-800">
              Visiting {meta?.count ?? 0} university portals: KTH, Karolinska, Uppsala, Lund, Stockholm, Chalmers, Gothenburg, Linköping, Umeå, and more...
            </p>
          </div>
        )}
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by title, university, department..."
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
            {area !== "all" && (
              <div className="flex items-end">
                <Button variant="ghost" size="sm" onClick={() => { setArea("all"); setPage(1); }}>
                  <X className="w-4 h-4 mr-1" /> Reset
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Position Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-52 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {positions.map((pos) => (
            <Card key={pos.id} className="hover:shadow-md transition-shadow border hover:border-yellow-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-sm">🇸🇪</span>
                      <p className="font-semibold text-gray-900 text-sm leading-tight">
                        {pos.university}
                      </p>
                    </div>
                    <p className="text-xs text-gray-700 leading-snug mt-0.5 line-clamp-2">{pos.title}</p>
                  </div>
                  {pos.qsRanking && (
                    <span className="ml-2 text-xs bg-yellow-50 text-yellow-700 font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                      QS #{pos.qsRanking}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {pos.city}, Sweden
                  </div>
                  {pos.department && (
                    <p className="text-xs text-gray-500 truncate">{pos.department}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                    {pos.deadline && pos.deadline !== "Rolling"
                      ? `Deadline: ${pos.deadline}`
                      : pos.deadline === "Rolling" ? "Rolling" : "See posting"}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="px-1.5 py-0.5 bg-yellow-50 text-yellow-700 rounded text-xs font-mono">
                      Varbi · Live
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(pos.scrapedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {pos.researchAreas.slice(0, 3).map((a) => (
                    <Badge key={a} variant="secondary" className="text-xs px-1.5 py-0 bg-yellow-50 text-yellow-800 border-yellow-200">
                      {a}
                    </Badge>
                  ))}
                  {pos.researchAreas.length > 3 && (
                    <Badge variant="outline" className="text-xs px-1.5 py-0">
                      +{pos.researchAreas.length - 3}
                    </Badge>
                  )}
                </div>

                <a
                  href={pos.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button size="sm" className="w-full text-xs bg-yellow-500 hover:bg-yellow-600 text-white">
                    <ExternalLink className="w-3 h-3 mr-1" /> Apply on Varbi
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {positions.length === 0 && !loading && (
        <div className="text-center py-16 text-gray-400">
          <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg">No live positions yet</p>
          <p className="text-sm mt-1">Click &ldquo;Scrape Varbi Now&rdquo; to fetch current ML/AI/Quantum PhD openings</p>
          <p className="text-xs mt-3 text-gray-400">
            Requires the automation service running: <code className="bg-gray-100 px-1 rounded">cd automation && python main.py</code>
          </p>
        </div>
      )}

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
          <span className="text-sm text-gray-600">Page {page} of {pages}</span>
          <Button variant="outline" size="sm" disabled={page === pages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}
