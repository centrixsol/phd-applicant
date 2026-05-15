"use client";
import { useState } from "react";
import { BookOpen, Zap } from "lucide-react";
import ProgramsContent from "./ProgramsContent";
import VarbiContent from "./VarbiContent";

export default function ProgramsPageClient() {
  const [tab, setTab] = useState<"programs" | "varbi">("programs");

  return (
    <div>
      {/* Tab bar */}
      <div className="border-b border-gray-200 px-8 pt-6 bg-white">
        <div className="flex gap-0">
          <button
            onClick={() => setTab("programs")}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === "programs"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            PhD Programs
          </button>
          <button
            onClick={() => setTab("varbi")}
            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === "varbi"
                ? "border-yellow-500 text-yellow-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Zap className="w-4 h-4" />
            Varbi Live
          </button>
        </div>
      </div>

      {tab === "programs" ? <ProgramsContent /> : <VarbiContent />}
    </div>
  );
}
