"use client";
import { useState } from "react";
import { Sparkles, Loader2, Copy, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  programId?: string;
  applicationId?: string;
  programName?: string;
  universityName?: string;
}

const ACTIONS = [
  { key: "motivation_letter", label: "Motivation Letter", icon: "✍️", desc: "Write a tailored motivation letter for this position" },
  { key: "research_proposal", label: "Research Proposal", icon: "🔬", desc: "Draft a focused research proposal outline" },
  { key: "answer_question", label: "Answer Question", icon: "💬", desc: "Get AI help answering an application question" },
  { key: "cover_email", label: "Cold Email to Prof", icon: "📧", desc: "Write a professional inquiry email to a professor" },
  { key: "improve_text", label: "Improve My Text", icon: "✨", desc: "Enhance your existing draft text" },
];

export default function AiAssistDialog({ programId, applicationId, programName, universityName }: Props) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("motivation_letter");
  const [question, setQuestion] = useState("");
  const [customContext, setCustomContext] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const selectedAction = ACTIONS.find((a) => a.key === action)!;

  async function generate() {
    setLoading(true);
    setResult("");
    setError("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          programId,
          applicationId,
          question: action === "answer_question" ? question : undefined,
          customContext: action === "improve_text" ? customContext : action === "research_proposal" ? customContext : undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.text);
      } else {
        setError(data.error || "Generation failed");
      }
    } catch {
      setError("Network error — please try again");
    }
    setLoading(false);
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!open) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-xs border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
        onClick={() => setOpen(true)}
      >
        <Sparkles className="w-3 h-3 mr-1 text-purple-500" />
        AI Assist
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Claude AI Assistant
              </h2>
              {(universityName || programName) && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {universityName}{programName ? ` · ${programName}` : ""}
                </p>
              )}
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Action selector */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">What do you need?</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ACTIONS.map((a) => (
                <button
                  key={a.key}
                  onClick={() => { setAction(a.key); setResult(""); setError(""); }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    action === a.key
                      ? "border-purple-400 bg-purple-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <span className="text-lg block mb-1">{a.icon}</span>
                  <span className="text-xs font-medium text-gray-800 block">{a.label}</span>
                  <span className="text-xs text-gray-500">{a.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Extra inputs */}
          {action === "answer_question" && (
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Application Question</label>
              <Textarea
                placeholder="Paste the application question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                className="text-sm"
              />
            </div>
          )}

          {action === "improve_text" && (
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Your Draft Text</label>
              <Textarea
                placeholder="Paste the text you want to improve..."
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                rows={4}
                className="text-sm"
              />
            </div>
          )}

          {action === "research_proposal" && (
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Specific Focus (optional)</label>
              <Textarea
                placeholder="Describe any specific research direction you want to pursue..."
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                rows={2}
                className="text-sm"
              />
            </div>
          )}

          {/* Generate button */}
          <Button
            onClick={generate}
            disabled={loading || (action === "answer_question" && !question) || (action === "improve_text" && !customContext)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating with Claude...</>
            ) : (
              <><Sparkles className="w-4 h-4 mr-2" /> Generate {selectedAction.label}</>
            )}
          </Button>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-600">Generated Text</label>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={copyToClipboard}>
                  {copied ? <><Check className="w-3 h-3 mr-1 text-green-500" /> Copied!</> : <><Copy className="w-3 h-3 mr-1" /> Copy</>}
                </Button>
              </div>
              <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto font-serif">
                {result}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {action === "motivation_letter" ? "This letter has been saved to your Statements." : "Copy and paste this into your application."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
