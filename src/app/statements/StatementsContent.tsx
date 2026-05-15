"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Save, BookOpen, Edit3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Statement {
  id: string;
  type: string;
  title: string;
  content: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
}

const STATEMENT_TYPES = [
  { value: "motivation_letter", label: "Motivation Letter (Sweden)", max: 800 },
  { value: "sop", label: "Statement of Purpose (SOP)", max: 1000 },
  { value: "personal_statement", label: "Personal Statement", max: 800 },
  { value: "research_statement", label: "Research Statement", max: 1500 },
  { value: "research_proposal", label: "Research Proposal", max: 600 },
  { value: "diversity", label: "Diversity Statement", max: 500 },
];

export default function StatementsContent() {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [editing, setEditing] = useState<Statement | null>(null);
  const [creating, setCreating] = useState(false);
  const [newType, setNewType] = useState("sop");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/statements");
    const data = await res.json();
    setStatements(data);
  }

  useEffect(() => { load(); }, []);

  async function create() {
    setSaving(true);
    await fetch("/api/statements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: newType, title: newTitle || STATEMENT_TYPES.find((t) => t.value === newType)?.label, content: newContent }),
    });
    setCreating(false);
    setNewTitle("");
    setNewContent("");
    load();
    setSaving(false);
  }

  async function update() {
    if (!editing) return;
    setSaving(true);
    await fetch("/api/statements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing.id, type: editing.type, title: editing.title, content: editing.content }),
    });
    setEditing(null);
    load();
    setSaving(false);
  }

  async function deleteStmt(id: string) {
    if (!confirm("Delete this statement?")) return;
    await fetch("/api/statements", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  function wordCount(text: string) {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Statements</h1>
          <p className="text-gray-500 mt-1">Write and manage your application statements</p>
        </div>
        <Button onClick={() => setCreating(true)}><Plus className="w-4 h-4 mr-2" /> New Statement</Button>
      </div>

      {/* Create Form */}
      {creating && (
        <Card className="mb-6 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">New Statement</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setCreating(false)}><X className="w-4 h-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs mb-1 block">Statement Type</Label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATEMENT_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1 block">Custom Title (optional)</Label>
                <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. SOP for ML programs" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label className="text-xs">Content</Label>
                <span className="text-xs text-gray-500">{wordCount(newContent)} words</span>
              </div>
              <Textarea rows={12} value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Write your statement here..." className="font-serif text-sm" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreating(false)}>Cancel</Button>
              <Button onClick={create} disabled={saving || !newContent.trim()}>
                <Save className="w-4 h-4 mr-2" />{saving ? "Saving..." : "Save Statement"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Form */}
      {editing && (
        <Card className="mb-6 border-purple-200 bg-purple-50/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Edit Statement</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setEditing(null)}><X className="w-4 h-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs mb-1 block">Type</Label>
                <Select value={editing.type} onValueChange={(v) => setEditing({ ...editing, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATEMENT_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs mb-1 block">Title</Label>
                <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label className="text-xs">Content</Label>
                <span className="text-xs text-gray-500">{wordCount(editing.content)} words</span>
              </div>
              <Textarea rows={14} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="font-serif text-sm" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={update} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />{saving ? "Saving..." : "Update Statement"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statements List */}
      {statements.length === 0 && !creating ? (
        <div className="text-center py-16 text-gray-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg">No statements yet</p>
          <p className="text-sm mt-1">Write your Statement of Purpose and other essays</p>
          <Button className="mt-4" onClick={() => setCreating(true)}><Plus className="w-4 h-4 mr-2" /> Write First Statement</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {statements.map((stmt) => {
            const typeInfo = STATEMENT_TYPES.find((t) => t.value === stmt.type);
            return (
              <Card key={stmt.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="info" className="text-xs">{typeInfo?.label || stmt.type}</Badge>
                        <span className="text-xs text-gray-400">{stmt.wordCount} words</span>
                        {typeInfo && <span className={`text-xs ${stmt.wordCount > typeInfo.max ? "text-red-500" : "text-gray-400"}`}>/ ~{typeInfo.max} max</span>}
                      </div>
                      <h3 className="font-semibold text-gray-900">{stmt.title}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Updated {new Date(stmt.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditing(stmt)}>
                        <Edit3 className="w-3 h-3 mr-1" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => deleteStmt(stmt.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3 font-serif leading-relaxed">{stmt.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
