"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, FileText, File, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DOCUMENT_TYPES } from "@/lib/utils";

interface Document {
  id: string;
  type: string;
  name: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

const TYPE_REQUIRED = ["cv", "transcript", "sop", "lor"];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ type }: { type: string }) {
  const icons: Record<string, string> = { cv: "📄", transcript: "🎓", sop: "✍️", personal_statement: "✍️", research_statement: "🔬", lor: "💌", gre_score: "📊", toefl_score: "📊", ielts_score: "📊", photo: "📷" };
  return <span className="text-2xl">{icons[type] || "📎"}</span>;
}

export default function DocumentsContent() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [docType, setDocType] = useState("cv");
  const [docName, setDocName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const res = await fetch("/api/documents");
    const data = await res.json();
    setDocuments(data);
  }

  useEffect(() => { load(); }, []);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", docType);
    formData.append("name", docName || file.name);
    await fetch("/api/documents", { method: "POST", body: formData });
    setDocName("");
    await load();
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function deleteDoc(id: string) {
    if (!confirm("Delete this document?")) return;
    await fetch("/api/documents", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    await load();
  }

  const uploadedTypes = new Set(documents.map((d) => d.type));

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-500 mt-1">Upload your application documents — they&apos;ll be used for auto-apply</p>
      </div>

      {/* Checklist */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Required Documents Checklist</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2">
            {TYPE_REQUIRED.map((type) => {
              const label = DOCUMENT_TYPES.find((d) => d.value === type)?.label || type;
              const done = uploadedTypes.has(type);
              return (
                <div key={type} className={`flex items-center gap-2 p-2 rounded-lg ${done ? "bg-green-50" : "bg-gray-50"}`}>
                  {done ? <CheckCircle className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                  <span className={`text-sm ${done ? "text-green-700 font-medium" : "text-gray-600"}`}>{label}</span>
                  {done && <Badge variant="success" className="ml-auto text-xs">Uploaded</Badge>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upload Form */}
      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Upload Document</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label className="text-xs mb-1 block">Document Type</Label>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs mb-1 block">Document Name (optional)</Label>
              <Input value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="e.g. CV - January 2025" />
            </div>
          </div>
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" className="hidden" onChange={upload} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">{uploading ? "Uploading..." : "Click to upload or drag & drop"}</p>
            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, PNG, JPG — max 10MB</p>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      {documents.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-900">Uploaded Documents ({documents.length})</h2>
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center gap-4 p-4 bg-white border rounded-xl hover:shadow-sm transition-shadow">
              <FileIcon type={doc.type} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="secondary" className="text-xs capitalize">{DOCUMENT_TYPES.find((t) => t.value === doc.type)?.label || doc.type}</Badge>
                  <span className="text-xs text-gray-400">{formatSize(doc.fileSize)}</span>
                  <span className="text-xs text-gray-400">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <a href={doc.filePath} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </a>
                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteDoc(doc.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {documents.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <File className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No documents uploaded yet</p>
          <p className="text-sm mt-1">Upload your CV, transcripts, and SOP to get started</p>
        </div>
      )}
    </div>
  );
}
